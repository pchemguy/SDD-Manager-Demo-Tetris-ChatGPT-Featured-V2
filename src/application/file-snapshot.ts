/** C-10: pure portable snapshot contract and strict JSON codec; no file/browser effects. */
import validate from './generated/game-save-validator.js';
import {validateResults,type GameResult} from './leaderboard.js';
import {createConfiguration,type GameConfiguration} from './configuration.js';
export interface FileSnapshot {formatVersion:1;results:GameResult[];settings:GameConfiguration}
/** Schema validation precedes semantic domain checks; always return detached values. */
export function validateSnapshot(value:unknown):FileSnapshot {
 if(!validate(value)){
  const error=validate.errors?.[0],message='Invalid save file: '+(error?.instancePath||'/')+' '+(error?.message||'schema mismatch');
  if(['type','required','additionalProperties'].includes(error?.keyword??''))throw new TypeError(message);
  throw new RangeError(message);
 }
 const data=value as FileSnapshot;
 return {formatVersion:1,results:validateResults(data.results),settings:createConfiguration().update(data.settings)};
}
/** Scan already syntactically validated JSON without recursive descent or lossy key handling. */
function rejectDuplicateMembers(text:string):void {
 const stack:(Set<string>|null)[]=[];
 for(let i=0;i<text.length;i++) {
  const c=text[i];
  if(c==='{')stack.push(new Set());else if(c==='[')stack.push(null);else if(c==='}'||c===']')stack.pop();
  else if(c==='"') {
   const start=i++;while(i<text.length){if(text[i]==='\\'){i+=2;continue}if(text[i]==='"')break;i++}
   let next=i+1;while(/\s/.test(text[next]??'')&&next<text.length)next++;
   if(text[next]===':') {const key=JSON.parse(text.slice(start,i+1)) as string,keys=stack.at(-1)!;if(keys.has(key))throw new RangeError('Duplicate JSON member name');keys.add(key)}
  }
 }
}
export function decodeJson(text:string):FileSnapshot {
 if(typeof text!=='string')throw new TypeError('JSON text is required');
 if(text.length>1048576)throw new RangeError('Save file exceeds 1 MiB');
 const value:unknown=JSON.parse(text);rejectDuplicateMembers(text);return validateSnapshot(value);
}
export function encodeJson(value:unknown):string {return JSON.stringify(validateSnapshot(value),null,2)+'\n'}
