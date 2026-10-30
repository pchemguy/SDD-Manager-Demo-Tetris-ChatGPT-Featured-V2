/** Browser-only input, frame and focus lifecycle. Reusable logic/view have no host globals. */
import { createSession } from '../../application/session.js';
import type { Action, Session } from '../../application/session.js';
import {createConfiguration,toRuleOptions,type ConfigurationController} from '../../application/configuration.js';
import {createFileTransfer,type WorkerAccess} from './file-transfer.js';
import {createBrowserConfiguration} from './configuration-persistence.js';
import { createGameView } from '../../ui/game-view.js';
import '../../ui/styles.css';
/** Real completion sources are supplied only by the browser host, never by ranking. */
function createBrowserSession(mount:HTMLElement,random:()=>number):Session {
 return createSession(random,e=>console.error('Session listener failed',e),{
  newId:()=>{const bytes=new Uint8Array(16);mount.ownerDocument.defaultView!.crypto.getRandomValues(bytes);bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;const hex=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`},
  completedAt:()=>new Date().toISOString(),
 });
}
/** Reuse explicit configuration/controller across sequential remounts; defaults are independent.
 * An injected controller owns its RNG/reporter; the random argument initializes only default controllers. */
export function mountGame(mount:HTMLElement,random:()=>number=Math.random,configuration:ConfigurationController=createConfiguration(),session:Session=createBrowserSession(mount,random),workerAccess?:WorkerAccess):()=>void {
 const doc=mount.ownerDocument,win=doc.defaultView!;
 let last:number|null=null,frame=0,disposed=false,pauseTimer:number|null=null;
 const act=(action:Action)=>{const before=session.getSnapshot().status;const after=session.dispatch(action,action==='start'||action==='restart'?toRuleOptions(configuration.getSnapshot()):undefined);if(action==='restart'||after.status!==before)last=null};
 const transfer=createFileTransfer(win,session,configuration,{readUrl:()=>win.location.href,readCookies:()=>doc.cookie,readHistoryState:()=>win.history.state,writeCookie:value=>{doc.cookie=value},replaceUrl:(url,state)=>win.history.replaceState(state,'',url)},workerAccess);
 const view=createGameView(mount,act,undefined,configuration,transfer);
 const unsubscribe=session.subscribe(view.render);view.render(session.getSnapshot());
 const tick=(time:number)=>{if(disposed)return;if(session.getSnapshot().status==='running'){session.advance(last===null?0:Math.max(0,Math.min(100,time-last)));last=time}else last=null;frame=win.requestAnimationFrame(tick)};
 const key=(e:KeyboardEvent)=>{
  if(e.target!==view.board)return;
  const name=e.key.toLowerCase();
  const map:Record<string,Action>={arrowleft:'left',arrowright:'right',arrowdown:'softDrop',arrowup:'rotate',x:'rotate',z:'rotateCCW',c:'hold',b:'activatePenetrator',shift:'hold',' ':'hardDrop',enter:'start',r:'restart'};
  let action=map[name];
  if(name==='p'||name==='escape')action=session.getSnapshot().status==='paused'?'resume':'pause';
  if(!action)return;e.preventDefault();
  if(e.repeat&&!['left','right','softDrop'].includes(action))return;
  act(action);
 };
 const pause=()=>{last=null;if(disposed||pauseTimer!==null)return;pauseTimer=win.setTimeout(()=>{pauseTimer=null;if(!disposed)session.dispatch('pause')},0)};
 const hidden=()=>{if(doc.hidden)pause()};
 // Wait until focus transfers finish; disabling a clicked control can transiently focus body.
 const focusOut=(event:FocusEvent)=>{if(event.relatedTarget&&mount.contains(event.relatedTarget as Node))return;queueMicrotask(()=>{if(!mount.contains(doc.activeElement))pause()})};
 view.board.addEventListener('keydown',key);mount.addEventListener('focusout',focusOut);
 win.addEventListener('blur',pause);doc.addEventListener('visibilitychange',hidden);
 frame=win.requestAnimationFrame(tick);
 return ()=>{if(disposed)return;disposed=true;if(pauseTimer!==null)win.clearTimeout(pauseTimer);win.cancelAnimationFrame(frame);view.board.removeEventListener('keydown',key);mount.removeEventListener('focusout',focusOut);win.removeEventListener('blur',pause);doc.removeEventListener('visibilitychange',hidden);unsubscribe();view.destroy();transfer.destroy()};
}
const mount=document.querySelector<HTMLElement>('#app');
if(mount){
 const doc=mount.ownerDocument,win=doc.defaultView!;
 const configuration=createBrowserConfiguration({
  readUrl:()=>win.location.href,
  readCookies:()=>doc.cookie,
  writeCookie:assignment=>{doc.cookie=assignment},
  replaceUrl:url=>{win.history.replaceState(win.history.state,'',url)},
 });
 mountGame(mount,Math.random,configuration);
}
