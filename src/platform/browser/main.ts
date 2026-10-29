/** Browser-only input, frame and focus lifecycle. Reusable logic/view have no host globals. */
import { createSession } from '../../application/session.js';
import type { Action } from '../../application/session.js';
import { createGameView } from '../../ui/game-view.js';
import '../../ui/styles.css';
export function mountGame(mount:HTMLElement,random:()=>number=Math.random):()=>void {
 const doc=mount.ownerDocument,win=doc.defaultView!;
 const session=createSession(random,e=>console.error('Session listener failed',e));
 let last:number|null=null,frame=0,disposed=false,pauseTimer:number|null=null;
 const act=(action:Action)=>{const before=session.getSnapshot().status;const after=session.dispatch(action);if(action==='restart'||after.status!==before)last=null};
 const view=createGameView(mount,act);
 const unsubscribe=session.subscribe(view.render);view.render(session.getSnapshot());
 const tick=(time:number)=>{if(disposed)return;if(session.getSnapshot().status==='running'){session.advance(last===null?0:Math.max(0,Math.min(100,time-last)));last=time}else last=null;frame=win.requestAnimationFrame(tick)};
 const key=(e:KeyboardEvent)=>{
  if(e.target!==view.board)return;
  const name=e.key.toLowerCase();
  const map:Record<string,Action>={arrowleft:'left',arrowright:'right',arrowdown:'softDrop',arrowup:'rotate',x:'rotate',z:'rotateCCW',c:'hold',shift:'hold',' ':'rotate',enter:'start',r:'restart'};
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
 return ()=>{if(disposed)return;disposed=true;if(pauseTimer!==null)win.clearTimeout(pauseTimer);win.cancelAnimationFrame(frame);view.board.removeEventListener('keydown',key);mount.removeEventListener('focusout',focusOut);win.removeEventListener('blur',pause);doc.removeEventListener('visibilitychange',hidden);unsubscribe();view.destroy()};
}
const mount=document.querySelector<HTMLElement>('#app');if(mount)mountGame(mount);
