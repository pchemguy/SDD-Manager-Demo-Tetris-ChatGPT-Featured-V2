/** C-09: pure complete-result validation and stable top-ten ranking. */
export interface GameResult {id:string;score:number;timestamp:string}
export interface ResultMetadataSource {newId():string;completedAt():string}
export const resultIdPattern='^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
export const utcTimestampPattern='^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{3}Z$';
/** Validate the actual UTC calendar, not just timestamp punctuation. */
export function isUtcTimestamp(value:unknown):value is string {
 if(typeof value!=='string'||!new RegExp(utcTimestampPattern).test(value))return false;
 const time=new Date(value);return Number.isFinite(time.getTime())&&time.toISOString()===value;
}
export function validateResult(value:unknown):GameResult {
 if(value===null||typeof value!=='object'||Array.isArray(value)||Reflect.ownKeys(value).length!==3||!['id','score','timestamp'].every(k=>Object.hasOwn(value,k)))throw new TypeError('Result requires id, score and timestamp');
 const {id,score,timestamp}=value as GameResult;
 if(typeof id!=='string'||typeof score!=='number'||typeof timestamp!=='string')throw new TypeError('Invalid result field types');
 if(!new RegExp(resultIdPattern).test(id))throw new RangeError('Invalid result UUIDv4');
 if(!Number.isSafeInteger(score)||score<0)throw new RangeError('Score must be a nonnegative safe integer');
 if(!isUtcTimestamp(timestamp))throw new RangeError('Invalid canonical UTC completion timestamp');
 return {id,score:score===0?0:score,timestamp};
}
/** Validate and detach an already-ranked history without sorting invalid input. */
export function validateResults(history:unknown):GameResult[] {
 if(!Array.isArray(history))throw new TypeError('History must be an array');
 if(history.length>10)throw new RangeError('History exceeds ten results');
 let previous=Infinity;const ids=new Set<string>();
 return Array.from(history,entry=>{const result=validateResult(entry);if(ids.has(result.id))throw new RangeError('Duplicate result ID');ids.add(result.id);if(result.score>previous)throw new RangeError('History must be descending');previous=result.score;return result});
}
/** Earlier equal-score entries retain priority; inputs and metadata remain untouched. */
export function recordResult(history:readonly GameResult[],entry:GameResult):GameResult[] {
 const result=validateResults(history),value=validateResult(entry);
 if(result.some(item=>item.id===value.id))throw new RangeError('Duplicate result ID');
 const index=result.findIndex(item=>item.score<value.score);
 result.splice(index<0?result.length:index,0,value);return result.slice(0,10);
}
