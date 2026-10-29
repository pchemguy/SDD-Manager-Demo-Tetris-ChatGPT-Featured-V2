/** Deterministic session transactions. Only explicit durations and random inputs enter. */
import type { Board, Piece, Kind } from '../core/types.js';
import { spawn } from '../core/pieces.js';
import { createBoard, canPlace, move, lock, landing } from '../core/board.js';
import {shuffleBag} from '../core/bag.js';
import {tryRotate} from '../core/kicks.js';
import { progress, gravityInterval } from '../core/progression.js';
export type Action='start'|'restart'|'left'|'right'|'rotate'|'softDrop'|'rotateCCW'|'hold'|'hardDrop'|'pause'|'resume';
export interface SessionOptions {immediateHardDropLock:boolean}
export interface Snapshot {status:'ready'|'running'|'paused'|'game-over';board:Board;active:Piece|null;score:number;lines:number;level:number;next:Kind|null;held:Kind|null;canHold:boolean;ghost:Piece|null;options:SessionOptions}
interface State extends Omit<Snapshot,'ghost'> { remainder:number; lockRemaining:number|null;bag:Kind[] }
const actions:Action[]=['start','restart','left','right','rotate','softDrop','rotateCCW','hold','hardDrop','pause','resume'];
const copy=(s:State):State=>({...s,options:{...s.options},bag:s.bag.slice(),board:s.board.map(r=>r.slice()),active:s.active?{...s.active}:null});
/** Construct ready state; no draw occurs until start. Listener failures are isolated. */
export function createSession(random:()=>number,onListenerError:(e:unknown)=>void=()=>{}) {
 const initial=():State=>({status:'ready',board:createBoard(),active:null,score:0,lines:0,level:1,remainder:0,lockRemaining:null,bag:[],next:null,held:null,canHold:false,options:{immediateHardDropLock:false}});
 let state=initial(),busy=false;
 const listeners=new Set<(s:Snapshot)=>void>();
 const getSnapshot=():Snapshot=>{const {remainder:_,lockRemaining:__,bag:___,...snapshot}=copy(state);return {...snapshot,ghost:snapshot.active?landing(snapshot.board,snapshot.active):null}};
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
   if(JSON.stringify(next)!==JSON.stringify(state)) {
    state=next;
    for(const listener of [...listeners]) {
     try {listener(getSnapshot())} catch(e){try{onListenerError(e)}catch{/* A broken reporter must not starve observers. */}}
    }
   }
   return getSnapshot();
  } finally {busy=false}
 }
 /** Re-evaluate support after each placement; continuous support never resets. */
 function grounding(s:State):State {
  return {...s,lockRemaining:s.active&&!move(s.board,s.active,0,1)?s.lockRemaining??gravityInterval(s.level):null};
 }
 function settle(s:State):State {
  const result=lock(s.board,s.active!);
  const nextPiece=draw(s); // Validate before any public state is committed.
  const stats=progress(s,result.cleared),legal=canPlace(result.board,nextPiece);
  return grounding({...s,...stats,board:result.board,active:legal?nextPiece:null,status:legal?'running':'game-over',canHold:legal,remainder:0,lockRemaining:null});
 }
 function down(s:State,soft:boolean):State {
  const p=move(s.board,s.active!,0,1);
  return grounding(p?{...s,active:p,score:s.score+(soft?1:0)}:s);
 }
 /** Options are copied only at start/restart; active rules stay fixed until replacement. */
 const dispatch=(action:Action,options?:SessionOptions):Snapshot=>run(s=>{
  if(!actions.includes(action))throw new RangeError('Unknown action');
  let selected:SessionOptions|undefined;
  if(options!==undefined){
   if(!['start','restart'].includes(action)||options===null||typeof options!=='object'||Array.isArray(options)||Reflect.ownKeys(options).length!==1||!Object.hasOwn(options,'immediateHardDropLock')||typeof options.immediateHardDropLock!=='boolean')throw new TypeError('Options require exactly immediateHardDropLock:boolean on start/restart');
   selected={immediateHardDropLock:options.immediateHardDropLock};
  }
  if(action==='restart'||(action==='start'&&s.status==='ready')){const fresh=initial();fresh.options=selected??{...s.options};fresh.status='running';fresh.active=draw(fresh);fresh.canHold=true;return grounding(fresh)}
  if(action==='pause')return s.status==='running'?{...s,status:'paused'}:s;
  if(action==='resume')return s.status==='paused'?{...s,status:'running'}:s;
  if(s.status!=='running'||!s.active)return s;
  if(action==='hardDrop'){
   const target=landing(s.board,s.active);const dropped={...s,active:target,score:s.score+2*(target.y-s.active.y)};
   return s.options.immediateHardDropLock?settle(dropped):grounding(dropped);
  }
  if(action==='hold'){
   if(!s.canHold)return s;
   const outgoing=s.active.type,incoming=s.held?spawn(s.held):draw(s),legal=canPlace(s.board,incoming);
   return grounding({...s,held:outgoing,active:legal?incoming:null,canHold:false,status:legal?'running':'game-over',remainder:0,lockRemaining:null});
  }
  if(action==='softDrop')return down(s,true);
  if(action==='left'||action==='right')return grounding({...s,active:move(s.board,s.active,action==='left'?-1:1,0)??s.active});
  if(action==='rotate'||action==='rotateCCW')return grounding({...s,active:tryRotate(s.board,s.active,action==='rotate'?1:-1)??s.active});
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
   if(s.remainder>=interval){s.remainder-=interval;s=down(s,false)}
  }
  return s;
 });
 const subscribe=(listener:(s:Snapshot)=>void):(()=>void)=>{listeners.add(listener);return ()=>{listeners.delete(listener)}};
 return {getSnapshot,dispatch,advance,subscribe};
}
export type Session=ReturnType<typeof createSession>;
