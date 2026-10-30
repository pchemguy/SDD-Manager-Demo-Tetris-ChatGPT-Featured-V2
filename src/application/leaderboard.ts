/** C-09: pure, stable top-ten ranking. The session owns completed-game history. */
export interface GameResult {score:number}
function scoreValue(value:unknown):asserts value is number {
 if(typeof value!=='number')throw new TypeError('Score must be numeric');
 if(!Number.isFinite(value)||!Number.isInteger(value)||value<0)throw new RangeError('Score must be a finite nonnegative integer');
}
/** Validate inputs before returning detached entries; earlier equal scores retain priority. */
export function recordResult(history:readonly GameResult[],score:number):GameResult[] {
 if(!Array.isArray(history))throw new TypeError('History must be an array');
 scoreValue(score);
 let previous=Infinity;
 const result=Array.from(history,entry=>{
  if(entry===null||typeof entry!=='object'||Array.isArray(entry)||Reflect.ownKeys(entry).length!==1||!Object.hasOwn(entry,'score'))throw new TypeError('Result requires only score');
  scoreValue(entry.score);
  if(entry.score>previous)throw new RangeError('History must be descending');
  previous=entry.score;return {score:entry.score};
 });
 if(result.length>10)throw new RangeError('History exceeds ten results');
 const index=result.findIndex(entry=>entry.score<score);
 result.splice(index<0?result.length:index,0,{score});return result.slice(0,10);
}
