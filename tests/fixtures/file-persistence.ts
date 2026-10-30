/** Source-only host worker fault seam; normal file inputs remain the only restore interface. */
import {mountGame} from '../../src/platform/browser/main.js';
import {createSession} from './session.js';
import {createConfiguration} from '../../src/application/configuration.js';
const session=createSession(()=>.999999),configuration=createConfiguration();
let dispose=()=>{},created=0,terminated=0,last:any,pendingRead:{file:File;resolve:(bytes:ArrayBuffer)=>void}|null=null;
function mount(mode:string){dispose();dispose=mountGame(document.querySelector<HTMLElement>('#harness')!,()=>.999999,configuration,session,mode==='normal'?undefined:{readFile:file=>mode==='reading'?new Promise(resolve=>{pendingRead={file,resolve}}):file.arrayBuffer(),deadline:mode==='timeout'?30:15000,createWorker:()=>{
 created++;if(mode==='fail')throw new Error('Fixture worker unavailable');
 const worker:any={onmessage:null,onerror:null,onmessageerror:null,request:null,postMessage(message:unknown){this.request=message},terminate(){terminated++}};last=worker;return worker as Worker;
}})}
for(const name of ['normal','reading','slow','fail','timeout'])document.querySelector<HTMLButtonElement>('#'+name)!.onclick=()=>mount(name);
document.querySelector<HTMLButtonElement>('#unmount')!.onclick=()=>dispose();
document.querySelector<HTMLButtonElement>('#late')!.onclick=()=>{if(pendingRead){const read=pendingRead;pendingRead=null;void read.file.arrayBuffer().then(read.resolve)}if(last?.request){let value:unknown;if(last.request.bytes)value=JSON.parse(new TextDecoder().decode(last.request.bytes));last.onmessage?.({data:{id:last.request.id,ok:true,value,bytes:new TextEncoder().encode('{}').buffer}})}};
document.querySelector<HTMLButtonElement>('#inspect')!.onclick=()=>{document.querySelector('#resources')!.textContent=JSON.stringify({created,terminated,pendingRead:pendingRead!==null,results:session.getSnapshot().leaderboard,settings:configuration.getSnapshot(),cookies:document.cookie,url:location.href})};
