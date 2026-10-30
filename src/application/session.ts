/** Deterministic session transactions. Only explicit durations, random and completion-metadata inputs enter. */
import type { Board, Piece, Kind, Appearance } from '../core/types.js';
import { spawn } from '../core/pieces.js';
import { createBoard, canPlace, move, lockWithAppearance, createAppearance, landing } from '../core/board.js';
import {shuffleBag} from '../core/bag.js';
import {canTraverse,penetratingLanding} from '../core/penetrator.js';
import {tryRotate} from '../core/kicks.js';
import {createConfiguration,toRuleOptions,type RuleOptions} from './configuration.js';
import {recordResult,type GameResult,type ResultMetadataSource} from './leaderboard.js';
import { progress, gravityInterval } from '../core/progression.js';
export type Action='start'|'restart'|'left'|'right'|'rotate'|'softDrop'|'rotateCCW'|'hold'|'hardDrop'|'pause'|'resume'|'activatePenetrator';
/** Legacy input/mirror retained; complete RuleOptions selects the expanded active rules. */
export interface SessionOptions {immediateHardDropLock:boolean}
export interface Snapshot {leaderboard:GameResult[];status:'ready'|'running'|'paused'|'game-over';board:Board;active:Piece|null;score:number;lines:number;level:number;next:Kind|null;held:Kind|null;canHold:boolean;ghost:Piece|null;options:SessionOptions;rules:RuleOptions;penetratorActive:boolean;penetratorBonuses:number;penetratorCells:Appearance}
interface State extends Omit<Snapshot,'ghost'> { remainder:number; lockRemaining:number|null;bag:Kind[] }
const actions:Action[]=['start','restart','left','right','rotate','softDrop','rotateCCW','hold','hardDrop','pause','resume','activatePenetrator'];
const copy=(s:State):State=>({...s,leaderboard:s.leaderboard.map(result=>({...result})),options:{...s.options},rules:{...s.rules},bag:s.bag.slice(),board:s.board.map(r=>r.slice()),penetratorCells:s.penetratorCells.map(r=>r.slice()),active:s.active?{...s.active}:null});
/** Construct ready state and empty controller-lifetime history; resets preserve results.
 * No draw occurs until start. Metadata sources supply a UUIDv4 and real UTC completion time.
 * Sources are explicit host inputs; failures before publication preserve state/history.
 * Listener failures are isolated after the atomic commit. */
export function createSession(random:()=>number,onListenerError:(e:unknown)=>void=()=>{},metadata:ResultMetadataSource) {
 const initial=():State=>({leaderboard:[],status:'ready',board:createBoard(),penetratorActive:false,penetratorBonuses:0,penetratorCells:createAppearance(),active:null,score:0,lines:0,level:1,remainder:0,lockRemaining:null,bag:[],next:null,held:null,canHold:false,options:{immediateHardDropLock:false},rules:toRuleOptions(createConfiguration().getSnapshot())});
 let state=initial(),busy=false;
 const listeners=new Set<(s:Snapshot)=>void>();
 const getSnapshot=():Snapshot=>{const {remainder:_,lockRemaining:__,bag:___,...snapshot}=copy(state);return {...snapshot,ghost:projected(snapshot)}};
 /** Consume candidate-owned sequence and keep exactly one public look-ahead. */
 const draw=(s:State):Piece=>{
  if(s.bag.length===0)s.bag=shuffleBag(random);
  const piece=spawn(s.bag.shift()!);
  if(s.bag.length===0)s.bag=shuffleBag(random);
  s.next=s.bag[0];return piece;
 };
 function run(operation:(s:State)=>State):Snapshot {
  if(busy)throw new Error('Reentrant session operation');
  busy=true;
  try {
   const next=operation(copy(state));
   // Capture once inside the transaction, before state publication and observers.
   if(state.status==='running'&&next.status==='game-over')next.leaderboard=recordResult(next.leaderboard,{id:metadata.newId(),score:next.score,timestamp:metadata.completedAt()});
   if(JSON.stringify(next)!==JSON.stringify(state)) {
    state=next;
    for(const listener of [...listeners]) {
     try {listener(getSnapshot())} catch(e){try{onListenerError(e)}catch{/* A broken reporter must not starve observers. */}}
    }
   }
   return getSnapshot();
  } finally {busy=false}
 }
 /** One canonical projection drives ghost, hard drop and support. */
 function projected(s:Pick<Snapshot,'board'|'active'|'penetratorActive'>):Piece|null {
  return s.active?(s.penetratorActive?penetratingLanding(s.board,s.active):landing(s.board,s.active)):null;
 }
 function shifted(s:State,dx:number,dy:number):Piece|null {
  if(!s.penetratorActive)return move(s.board,s.active!,dx,dy);
  const candidate={...s.active!,x:s.active!.x+dx,y:s.active!.y+dy};return canTraverse(s.board,candidate)?candidate:null;
 }
 /** Re-evaluate support after each placement; continuous support never resets. */
 function grounding(s:State):State {
  if(s.rules.generalLockPolicy==='failed-downward')return {...s,lockRemaining:null};
  return {...s,lockRemaining:s.active&&projected(s)!.y===s.active.y?s.lockRemaining??gravityInterval(s.level):null};
 }
 function settle(s:State):State {
  const result=lockWithAppearance(s.board,s.active!,s.penetratorCells,s.penetratorActive);
  const nextPiece=draw(s); // Validate before any public state is committed.
  const stats=progress(s,result.cleared),legal=canPlace(result.board,nextPiece);
  return grounding({...s,...stats,board:result.board,penetratorCells:result.penetratorCells,penetratorActive:false,penetratorBonuses:Math.min(3,s.penetratorBonuses+(result.cleared===4?1:0)),active:legal?nextPiece:null,status:legal?'running':'game-over',canHold:legal&&s.rules.holdEnabled,remainder:0,lockRemaining:null});
 }
 function down(s:State,soft:boolean):State {
  const p=shifted(s,0,1);
  if(!p&&s.rules.generalLockPolicy==='failed-downward')return settle(s);
  return grounding(p?{...s,active:p,score:s.score+(soft?1:0)}:s);
 }
 /** Normalize exact legacy or complete rule input, without retaining caller objects. */
 function selectedRules(options:SessionOptions|RuleOptions):RuleOptions {
  if(options===null||typeof options!=='object'||Array.isArray(options))throw new TypeError('Invalid session rule options');
  const keys=Reflect.ownKeys(options),configuration=createConfiguration();
  if(keys.length===1&&Object.hasOwn(options,'immediateHardDropLock')){
   const value=Reflect.get(options,'immediateHardDropLock');
   if(typeof value!=='boolean')throw new TypeError('immediateHardDropLock must be boolean');
   return toRuleOptions(configuration.update({hardDropLockPolicy:value?'immediate':'general'}));
  }
  const fields=['hardDropEnabled','holdEnabled','generalLockPolicy','hardDropLockPolicy'];
  if(keys.length!==4||keys.some(k=>typeof k!=='string'||!fields.includes(k)))throw new TypeError('Options require complete rules or legacy immediateHardDropLock');
  return toRuleOptions(configuration.update(options as RuleOptions));
 }
 /** Active rules are copied only at Start/Restart; page preferences remain separate. */
 const dispatch=(action:Action,options?:SessionOptions|RuleOptions):Snapshot=>run(s=>{
  if(!actions.includes(action))throw new RangeError('Unknown action');
  let selected:RuleOptions|undefined;
  if(options!==undefined){
   if(!['start','restart'].includes(action))throw new TypeError('Options only accepted on start/restart');
   selected=selectedRules(options);
  }
  if(action==='restart'||(action==='start'&&s.status==='ready')){
   const fresh=initial();fresh.leaderboard=s.leaderboard.map(result=>({...result}));fresh.rules={...(selected??s.rules)};
   fresh.options={immediateHardDropLock:fresh.rules.hardDropLockPolicy==='immediate'};
   fresh.status='running';fresh.active=draw(fresh);fresh.canHold=fresh.rules.holdEnabled;return grounding(fresh);
  }
  if(action==='pause')return s.status==='running'?{...s,status:'paused'}:s;
  if(action==='resume')return s.status==='paused'?{...s,status:'running'}:s;
  if(s.status!=='running'||!s.active)return s;
  if(action==='activatePenetrator'){
   if(s.penetratorActive||s.penetratorBonuses===0)return s;
   return grounding({...s,penetratorActive:true,penetratorBonuses:s.penetratorBonuses-1,canHold:false});
  }
  if(action==='hardDrop'){
   if(!s.rules.hardDropEnabled)return s;
   const target=projected(s)!;const dropped={...s,active:target,score:s.score+2*(target.y-s.active.y)};
   return s.rules.hardDropLockPolicy==='immediate'?settle(dropped):grounding(dropped);
  }
  if(action==='hold'){
   if(s.penetratorActive||!s.rules.holdEnabled||!s.canHold)return s;
   const outgoing=s.active.type,incoming=s.held?spawn(s.held):draw(s),legal=canPlace(s.board,incoming);
   return grounding({...s,held:outgoing,active:legal?incoming:null,canHold:false,status:legal?'running':'game-over',remainder:0,lockRemaining:null});
  }
  if(action==='softDrop')return down(s,true);
  if(action==='left'||action==='right')return grounding({...s,active:shifted(s,action==='left'?-1:1,0)??s.active});
  if(action==='rotate'||action==='rotateCCW')return grounding({...s,active:tryRotate(s.board,s.active,action==='rotate'?1:-1,s.penetratorActive?canTraverse:canPlace)??s.active});
  return s;
 });
 const advance=(elapsed:number):Snapshot=>run(s=>{
  if(!Number.isFinite(elapsed)||elapsed<0)throw new RangeError('Elapsed time must be finite and nonnegative');
  if(s.status!=='running')return s;
  let left=elapsed;
  while(left>0) {
   const interval=gravityInterval(s.level);
   const step=Math.min(left,interval-s.remainder,s.lockRemaining??Infinity);
   left-=step;s.remainder+=step;if(s.lockRemaining!==null)s.lockRemaining-=step;
   if(s.lockRemaining!==null&&s.lockRemaining<=0)return settle(s);
   if(s.remainder>=interval){s.remainder-=interval;if(s.rules.generalLockPolicy==='failed-downward'&&!shifted(s,0,1))return settle(s);s=down(s,false)}
  }
  return s;
 });
 const subscribe=(listener:(s:Snapshot)=>void):(()=>void)=>{listeners.add(listener);return ()=>{listeners.delete(listener)}};
 return {getSnapshot,dispatch,advance,subscribe};
}
export type Session=ReturnType<typeof createSession>;
