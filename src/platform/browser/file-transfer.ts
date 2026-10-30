/** C-11 browser resources: manual byte work, bounded transient workers and fenced teardown. */
import {validateSnapshot} from '../../application/file-snapshot.js';
import type {Session} from '../../application/session.js';
import type {ConfigurationController} from '../../application/configuration.js';
import {restoreSnapshot} from './file-persistence.js';
import type {BrowserRestoreAccess} from './configuration-persistence.js';
export type SaveFormat='json'|'sqlite';
export interface WorkerAccess {createWorker():Worker;deadline?:number;readFile?:(file:File)=>Promise<ArrayBuffer>}
const canceled=()=>new DOMException('File operation canceled','AbortError');
/** A controller belongs to one mount; optional worker access is an explicit host capability. */
export function createFileTransfer(win:Window & typeof globalThis,session:Session,configuration:ConfigurationController,access:BrowserRestoreAccess,workerAccess:WorkerAccess={createWorker:()=>new Worker(new URL('./file-worker.ts',import.meta.url),{type:'module'})}) {
 let disposed=false,sequence=0,active:number|null=null,abort:(()=>void)|null=null;
 const urls=new Map<string,number>();
 const begin=()=>{if(disposed)throw canceled();if(active!==null)throw new Error('Another file operation is in progress');active=++sequence;return active};
 const current=(id:number)=>{if(disposed||active!==id)throw canceled()};
 const work=(id:number,message:Record<string,unknown>):Promise<any>=>new Promise((resolve,reject)=>{
  let worker:Worker|undefined,timer:number|undefined,settled=false;
  const finish=(error?:Error,value?:unknown)=>{if(settled)return;settled=true;if(timer!==undefined)win.clearTimeout(timer);worker?.terminate();if(active===id)abort=null;error?reject(error):resolve(value)};
  try{
   current(id);worker=workerAccess.createWorker();abort=()=>finish(canceled());
   timer=win.setTimeout(()=>finish(new Error('File operation timed out')),workerAccess.deadline??15000);
   worker.onerror=event=>{event.preventDefault();finish(new Error('File worker could not run'))};
   worker.onmessageerror=()=>finish(new Error('Invalid file worker response'));
   worker.onmessage=event=>{const response=event.data;if(response?.id!==id)return;if(response.ok!==true){finish(new Error(typeof response.error==='string'?response.error:'Invalid save file'));return}finish(undefined,response)};
   worker.postMessage({id,...message});
  }catch(error){finish(error instanceof Error?error:new Error('File worker could not start'))}
 });
 const end=(id:number)=>{if(active===id){active=null;abort=null}};
 const save=async(format:SaveFormat)=>{
  const id=begin();try{
   const value=validateSnapshot({formatVersion:1,results:session.getSnapshot().leaderboard,settings:configuration.getSnapshot()});
   const response=await work(id,{operation:'encode',format,value});current(id);
   if(!(response.bytes instanceof ArrayBuffer))throw new Error('Invalid encoded save file');
   const url=win.URL.createObjectURL(new Blob([response.bytes],{type:format==='json'?'application/json':'application/vnd.sqlite3'}));
   try{
    const anchor=win.document.createElement('a');anchor.href=url;anchor.download='classic-tetris-save.'+(format==='json'?'json':'sqlite');anchor.hidden=true;win.document.body.append(anchor);try{anchor.click()}finally{anchor.remove()}
    const timer=win.setTimeout(()=>{win.URL.revokeObjectURL(url);urls.delete(url)},1000);urls.set(url,timer);
   }catch(error){win.URL.revokeObjectURL(url);throw error}
  }finally{end(id)}
 };
 const restore=async(file:File)=>{
  const id=begin();try{
   if(file.size===0||file.size>1048576)throw new RangeError('Choose a nonempty save file of at most 1 MiB');
   const bytes=await (workerAccess.readFile?.(file)??file.arrayBuffer());current(id);const response=await work(id,{operation:'decode',bytes});current(id);
   restoreSnapshot(response.value,session,configuration,access);
  }finally{end(id)}
 };
 const cancel=()=>{const reject=abort;active=null;abort=null;sequence++;reject?.()};
 const destroy=()=>{if(disposed)return;disposed=true;cancel();for(const [url,timer] of urls){win.clearTimeout(timer);win.URL.revokeObjectURL(url)}urls.clear()};
 return {save,restore,cancel,destroy,formats:['json','sqlite'] as readonly SaveFormat[]};
}
