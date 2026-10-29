/** Pure classic score/level updates; awards use the level before the clear. */
export interface Progress { score:number; lines:number; level:number }
export function progress(p:Progress,cleared:number,soft=0):Progress {
 const lines=p.lines+cleared;
 return {score:p.score+[0,40,100,300,1200][cleared]*p.level+soft,lines,level:1+Math.floor(lines/10)};
}
/** Level speed bottoms out at a tenth of a second. */
export const gravityInterval=(level:number):number=>Math.max(100,1000-75*(level-1));
