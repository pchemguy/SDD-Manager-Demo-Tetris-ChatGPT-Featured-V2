/** Best-effort browser persistence around one pure selected-configuration authority. */
import {createConfiguration,type ConfigurationController,type GameConfiguration} from '../../application/configuration.js';
import {configurationKeys,cookieName,cookieScope,cookieAssignment,resolveConfiguration,updateConfigurationUrl} from './configuration-codec.js';
/** The page binds browser objects; tests/future hosts can supply explicit access boundaries. */
export interface BrowserConfigurationAccess {
 readUrl():string;
 readCookies():string;
 writeCookie(assignment:string):void;
 replaceUrl(url:string):void;
}
/** Restore before returning a compatible controller; persistence failures never undo memory. */
export function createBrowserConfiguration(access:BrowserConfigurationAccess):ConfigurationController {
 const selected=createConfiguration();
 let href='',search='',cookies='';
 try{
  href=access.readUrl();const url=new URL(href);
  if(['http:','https:'].includes(url.protocol))search=url.search;
 }catch{/* A failed URL source cannot suppress cookie restoration. */}
 try{const text=access.readCookies();if(typeof text==='string')cookies=text}catch{/* Cookies may be blocked. */}
 const scope=cookieScope(href);
 const resolution=resolveConfiguration(search,cookies,selected.getSnapshot());
 selected.update(resolution.values);
 const save=(values:Partial<GameConfiguration>)=>{
  if(!scope)return;
  for(const key of configurationKeys)if(Object.hasOwn(values,key)){
   try{access.writeCookie(cookieAssignment(key,values[key]!,scope))}catch{/* Each cookie is independent. */}
  }
 };
 save(resolution.urlValues);
 return {
  getSnapshot:selected.getSnapshot,
  prepare:selected.prepare,
  update(patch){
   const before=selected.getSnapshot(),after=selected.update(patch);
   const changed:Partial<GameConfiguration>={};
   for(const key of configurationKeys)if(before[key]!==after[key])Object.assign(changed,{[key]:after[key]});
   if(!Object.keys(changed).length)return after;
   save(changed);
   try{access.replaceUrl(updateConfigurationUrl(access.readUrl(),changed))}catch{/* Preserve committed selection/cookies. */}
   return after;
  },
 };
}

/** Restore requires explicit history-state access; native setting edits keep the legacy contract. */
export interface BrowserRestoreAccess extends BrowserConfigurationAccess {
 readHistoryState():unknown;
 replaceUrl(url:string,state?:unknown):void;
}
/** Stage browser state and a complete validated target before any write. */
export function prepareConfigurationRestore(access:BrowserRestoreAccess,values:GameConfiguration):()=>void {
 const target=createConfiguration().prepare(values)();
 const beforeUrl=access.readUrl(),scope=cookieScope(beforeUrl);
 if(!scope)throw new TypeError('Restore requires a valid HTTP(S) cookie scope');
 const state=access.readHistoryState(),afterUrl=updateConfigurationUrl(beforeUrl,target);
 const ownedNames=new Set(configurationKeys.map(cookieName));
 const readOwned=()=>{
  const text=access.readCookies();if(typeof text!=='string')throw new TypeError('Cookies unavailable');
  const result=new Map<string,string>();
  for(const part of text.split(';')){const i=part.indexOf('=');if(i<0)continue;const name=part.slice(0,i).trim();if(!ownedNames.has(name))continue;if(result.has(name))throw new Error('Ambiguous configuration cookies');result.set(name,part.slice(i+1))}
  return result;
 };
 const before=readOwned();
 return ()=>{
  const attempted:string[]=[];let urlAttempted=false;
  try {
   for(const key of configurationKeys){const name=cookieName(key);attempted.push(name);access.writeCookie(cookieAssignment(key,target[key],scope));if(readOwned().get(name)!==String(target[key]))throw new Error('Configuration cookie was rejected')}
   urlAttempted=true;access.replaceUrl(afterUrl,state);
   if(access.readUrl()!==afterUrl)throw new Error('Configuration URL was rejected');
  }catch(cause){
   let rollback=true;
   // Attempt every compensation even when another fails. Only owned names are touched.
   for(const name of attempted){try{access.writeCookie(name+'='+(before.get(name)??'')+'; Max-Age='+(before.has(name)?'31536000':'0')+'; Path='+scope.path+'; SameSite=Lax'+(scope.secure?'; Secure':''))}catch{rollback=false}}
   if(urlAttempted)try{access.replaceUrl(beforeUrl,state)}catch{rollback=false}
   try{const current=readOwned();if(attempted.some(name=>current.get(name)!==before.get(name))||access.readUrl()!==beforeUrl)rollback=false}catch{rollback=false}
   throw new Error(rollback?'Restore failed: persistence values were not changed':'Restore failed: persistence rollback could not be verified',{cause});
  }
 };
}
