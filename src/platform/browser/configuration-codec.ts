/** Browser text formats and independent source resolution; no DOM access or effects. */
import {isConfigurationValue,type GameConfiguration} from '../../application/configuration.js';
type Key=keyof GameConfiguration;
/** Stable external field order; values/defaults remain owned by the application domain. */
export const configurationKeys=Object.freeze(['ghostVisibility','hardDropEnabled','nextPreviewEnabled','hardDropLockPolicy','generalLockPolicy','holdEnabled'] as const);
export interface ConfigurationResolution {values:GameConfiguration;urlValues:Partial<GameConfiguration>}
export interface CookieScope {path:string;secure:boolean}
const cookieName=(key:Key)=>'tetris_config_'+key;
function decoded(key:Key,text:string|null|undefined):GameConfiguration[Key]|undefined {
 const value=text==='true'?true:text==='false'?false:text;
 return isConfigurationValue(key,value)?value:undefined;
}
/** First URL/cookie occurrences are authoritative; invalid text falls through per field. */
export function resolveConfiguration(search:string,cookies:string,defaults:GameConfiguration):ConfigurationResolution {
 const query=new URLSearchParams(search),saved=new Map<string,string>();
 for(const pair of cookies.split(';')){
  const equal=pair.indexOf('=');if(equal<0)continue;
  const name=pair.slice(0,equal).trim();if(!saved.has(name))saved.set(name,pair.slice(equal+1));
 }
 const values={} as GameConfiguration,urlValues:Partial<GameConfiguration>={};
 for(const key of configurationKeys){
  const explicit=decoded(key,query.get(key));
  const value=explicit??decoded(key,saved.get(cookieName(key)))??defaults[key];
  Object.assign(values,{[key]:value});
  if(explicit!==undefined)Object.assign(urlValues,{[key]:explicit});
 }
 return {values,urlValues};
}
/** Match literal static directory URLs; unsafe/unsupported scope never broadens to root. */
export function cookieScope(href:string):CookieScope|null {
 try{
  const url=new URL(href);
  if(!['http:','https:'].includes(url.protocol))return null;
  const path=url.pathname.slice(0,url.pathname.lastIndexOf('/')+1);
  return !path.startsWith('/')||/[;\u0000-\u001f\u007f]/.test(path)?null:{path,secure:url.protocol==='https:'};
 }catch{return null}
}
/** Format one selected value; host-only persistence is refreshed for exactly one year. */
export function cookieAssignment<K extends Key>(key:K,value:GameConfiguration[K],scope:CookieScope):string {
 if(!isConfigurationValue(key,value)||!scope.path.startsWith('/')||/[;\u0000-\u001f\u007f]/.test(scope.path))throw new TypeError('Invalid configuration cookie');
 return cookieName(key)+'='+String(value)+'; Max-Age=31536000; Path='+scope.path+'; SameSite=Lax'+(scope.secure?'; Secure':'');
}
/** Preserve other semantic entries/fragment; the caller owns best-effort history replacement. */
export function updateConfigurationUrl(href:string,changedValues:Partial<GameConfiguration>):string {
 const url=new URL(href);
 if(!['http:','https:'].includes(url.protocol))throw new TypeError('Unsupported configuration URL');
 for(const key of configurationKeys)if(Object.hasOwn(changedValues,key)){
  const value=changedValues[key];if(!isConfigurationValue(key,value))throw new TypeError('Invalid configuration URL value');
  url.searchParams.set(key,String(value));
 }
 return url.href;
}
