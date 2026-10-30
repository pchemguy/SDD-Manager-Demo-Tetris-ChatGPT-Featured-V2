/** Explicit deterministic completion inputs for unit/source-only fixtures. Never shipped. */
import {createSession as construct} from '../../src/application/session.js';
export type {Session,Snapshot,Action} from '../../src/application/session.js';
export function createSession(random:()=>number,onError:(e:unknown)=>void=()=>{}) {
 let sequence=0;
 return construct(random,onError,{newId:()=>`00000000-0000-4000-8000-${(++sequence).toString(16).padStart(12,'0')}`,completedAt:()=> '2026-10-30T00:00:00.000Z'});
}
