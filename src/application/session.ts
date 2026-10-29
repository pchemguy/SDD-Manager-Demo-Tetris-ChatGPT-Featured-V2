/** Deterministic session transactions. Only explicit durations and random inputs enter. */
import type { Board, Piece } from '../core/types.js';
import { KINDS, spawn } from '../core/pieces.js';
import { createBoard, canPlace, move, lock } from '../core/board.js';
import {tryRotate} from '../core/kicks.js';
import { progress, gravityInterval } from '../core/progression.js';
export type Action='start'|'restart'|'left'|'right'|'rotate'|'softDrop'|'rotateCCW'|'pause'|'resume';
export interface Snapshot {status:'ready'|'running'|'paused'|'game-over';board:Board;active:Piece|null;score:number;lines:number;level:number}
interface State extends Snapshot { remainder:number; lockRemaining:number|null }
const actions:Action[]=['start','restart','left','right','rotate','softDrop','rotateCCW','pause','resume'];
const copy=(s:State):State=>({...s,board:s.board.map(r=>r.slice()),active:s.active?{...s.active}:null});
/** Construct ready state; no draw occurs until start. Listener failures are isolated. */
export function createSession(random:()=>number,onListenerError:(e:unknown)=>void=()=>{}) {
 const initial=():State=>({status:'ready',board:createBoard(),active:null,score:0,lines:0,level:1,remainder:0,lockRemaining:null});
 let state=initial(),busy=false;
 const listeners=new Set<(s:Snapshot)=>void>();
 const getSnapshot=():Snapshot=>{const {remainder:_,lockRemaining:__,...snapshot}=copy(state);return snapshot};
 const draw=():Piece=>{const r=random();if(!Number.isFinite(r)||r<0||r>=1)throw new RangeError('Random value must be in [0,1)');return spawn(KINDS[Math.floor(r*7)])};
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
  const nextPiece=draw(); // Validate before any public state is committed.
  const stats=progress(s,result.cleared),legal=canPlace(result.board,nextPiece);
  return grounding({...s,...stats,board:result.board,active:legal?nextPiece:null,status:legal?'running':'game-over',remainder:0,lockRemaining:null});
 }
 function down(s:State,soft:boolean):State {
  const p=move(s.board,s.active!,0,1);
  return grounding(p?{...s,active:p,score:s.score+(soft?1:0)}:s);
 }
 const dispatch=(action:Action):Snapshot=>run(s=>{
  if(!actions.includes(action))throw new RangeError('Unknown action');
  if(action==='restart'||(action==='start'&&s.status==='ready'))return {...initial(),status:'running',active:draw()};
  if(action==='pause')return s.status==='running'?{...s,status:'paused'}:s;
  if(action==='resume')return s.status==='paused'?{...s,status:'running'}:s;
  if(s.status!=='running'||!s.active)return s;
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
