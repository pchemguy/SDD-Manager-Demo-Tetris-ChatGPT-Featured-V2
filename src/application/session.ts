/** Deterministic session transactions. Only explicit durations and random inputs enter. */
import type { Board, Piece } from '../core/types.js';
import { KINDS, spawn, rotate } from '../core/pieces.js';
import { createBoard, canPlace, move, lock } from '../core/board.js';
import { progress, gravityInterval } from '../core/progression.js';
export type Action='start'|'restart'|'left'|'right'|'rotate'|'softDrop'|'pause'|'resume';
export interface Snapshot {status:'ready'|'running'|'paused'|'game-over';board:Board;active:Piece|null;score:number;lines:number;level:number}
interface State extends Snapshot { remainder:number }
const actions:Action[]=['start','restart','left','right','rotate','softDrop','pause','resume'];
const copy=(s:State):State=>({...s,board:s.board.map(r=>r.slice()),active:s.active?{...s.active}:null});
/** Construct ready state; no draw occurs until start. Listener failures are isolated. */
export function createSession(random:()=>number,onListenerError:(e:unknown)=>void=()=>{}) {
 const initial=():State=>({status:'ready',board:createBoard(),active:null,score:0,lines:0,level:1,remainder:0});
 let state=initial(),busy=false;
 const listeners=new Set<(s:Snapshot)=>void>();
 const getSnapshot=():Snapshot=>{const {remainder:_,...snapshot}=copy(state);return snapshot};
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
 function down(s:State,soft:boolean):{next:State;locked:boolean} {
  const p=move(s.board,s.active!,0,1);
  if(p)return {next:{...s,active:p,score:s.score+(soft?1:0)},locked:false};
  const result=lock(s.board,s.active!);
  const nextPiece=draw(); // Validate before any public state is committed.
  const stats=progress(s,result.cleared);
  const legal=canPlace(result.board,nextPiece);
  return {next:{...s,...stats,board:result.board,active:legal?nextPiece:null,status:legal?'running':'game-over',remainder:0},locked:true};
 }
 const dispatch=(action:Action):Snapshot=>run(s=>{
  if(!actions.includes(action))throw new RangeError('Unknown action');
  if(action==='restart'||(action==='start'&&s.status==='ready'))return {...initial(),status:'running',active:draw()};
  if(action==='pause')return s.status==='running'?{...s,status:'paused'}:s;
  if(action==='resume')return s.status==='paused'?{...s,status:'running'}:s;
  if(s.status!=='running'||!s.active)return s;
  if(action==='softDrop')return down(s,true).next;
  if(action==='left'||action==='right')return {...s,active:move(s.board,s.active,action==='left'?-1:1,0)??s.active};
  if(action==='rotate'){const p=rotate(s.active);return {...s,active:canPlace(s.board,p)?p:s.active}}
  return s;
 });
 const advance=(elapsed:number):Snapshot=>run(s=>{
  if(!Number.isFinite(elapsed)||elapsed<0)throw new RangeError('Elapsed time must be finite and nonnegative');
  if(s.status!=='running')return s;
  s.remainder+=elapsed;
  while(s.remainder>=gravityInterval(s.level)) {
   s.remainder-=gravityInterval(s.level);
   const result=down(s,false);s=result.next;if(result.locked)break;
  }
  return s;
 });
 const subscribe=(listener:(s:Snapshot)=>void):(()=>void)=>{listeners.add(listener);return ()=>{listeners.delete(listener)}};
 return {getSnapshot,dispatch,advance,subscribe};
}
export type Session=ReturnType<typeof createSession>;
