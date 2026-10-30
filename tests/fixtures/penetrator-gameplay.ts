/** Legal placements, never state injection: nine pieces tile columns0–8/rows16–19. */
import type {Kind} from '../../src/core/types.js';import type {Session} from '../../src/application/session.js';
export const WELL=[['I',0,0],['J',0,0],['L',0,6],['O',0,6],['Z',0,3],['T',3,4],['S',0,2],['J',2,6],['T',2,0],['I',1,7]] as const;
export const BAGS:Kind[][]=[["I", "J", "L", "O", "Z", "T", "S"], ["J", "T", "I", "O", "L", "S", "Z"], ["J", "O", "T", "Z", "L", "S", "I"], ["Z", "S", "L", "T", "I", "O", "J"], ["J", "I", "T", "Z", "S", "O", "L"], ["L", "T", "Z", "J", "I", "O", "S"]];
export const CAP_TRACE=[["O", 0, 7], ["L", 0, 4], ["S", 0, 2], ["Z", 1, 0], ["J", 1, -1], ["O", 0, 3], ["T", 1, 4], ["Z", 0, 6], ["L", 0, 0], ["S", 1, 6], ["I", 3, 8], ["Z", 0, 2], ["S", 1, 3], ["L", 3, 5], ["T", 3, 7], ["I", 0, 4], ["O", 0, 2], ["J", 3, 0], ["J", 1, -1], ["I", 3, 8], ["T", 0, 3], ["Z", 0, 5], ["S", 1, 6], ["O", 0, 0], ["L", 3, 1], ["L", 2, 0], ["T", 1, 2], ["Z", 0, 4], ["J", 2, 6], ["I", 3, 8]] as const;
/** Produce exact Fisher–Yates input draws for specified legal seven-piece permutations. */
export function traceRandom(bags:Kind[][]=BAGS):()=>number {
 const values:number[]=[];
 for(const target of bags){const a:Kind[]=['I','J','L','O','S','T','Z'];for(let i=6;i>0;i--){const j=a.indexOf(target[i]);if(j>i||j<0)throw Error('Invalid bag fixture');values.push((j+0.5)/(i+1));[a[i],a[j]]=[a[j],a[i]]}}
 let n=0;return ()=>values[n++]??0.999999;
}
export function place(session:Session,rotation:number,x:number){
 for(let i=0;i<rotation;i++)session.dispatch('rotate');
 for(let i=0;i<12&&session.getSnapshot().active!.x!==x;i++)session.dispatch(session.getSnapshot().active!.x>x?'left':'right');
 if(session.getSnapshot().active!.x!==x)throw Error('Trace placement unreachable');
 // Soft drop works for all active rules; a large advance locks at most this piece.
 for(let i=0;i<20;i++){if(session.getSnapshot().active!.y===session.getSnapshot().ghost!.y)break;session.dispatch('softDrop')}
 session.advance(100000);
}
export function earn(session:Session){for(const [type,rotation,x] of WELL){if(session.getSnapshot().active?.type!==type)throw Error('Trace bag mismatch');place(session,rotation,x)}}
