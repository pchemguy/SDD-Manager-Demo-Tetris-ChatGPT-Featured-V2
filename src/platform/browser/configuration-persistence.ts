/** Best-effort browser persistence around one pure selected-configuration authority. */
import {createConfiguration,type ConfigurationController,type GameConfiguration} from '../../application/configuration.js';
import {configurationKeys,cookieScope,cookieAssignment,resolveConfiguration,updateConfigurationUrl} from './configuration-codec.js';
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
