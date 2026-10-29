/** Browser-only composition and basic keyboard/frame integration. */
import { createSession } from '../../application/session.js';
import type { Action } from '../../application/session.js';
import { createGameView } from '../../ui/game-view.js';
import '../../ui/styles.css';
export function mountGame(mount:HTMLElement,random:()=>number=Math.random):()=>void {
 const session=createSession(random,e=>console.error('Session listener failed',e));
 let last:number|null=null,frame=0;
 const view=createGameView(mount,action=>{last=null;session.dispatch(action)});
 const unsubscribe=session.subscribe(view.render);view.render(session.getSnapshot());
 const tick=(time:number)=>{if(session.getSnapshot().status==='running'){session.advance(last===null?0:Math.max(0,Math.min(100,time-last)));last=time}else last=null;frame=requestAnimationFrame(tick)};
 const key=(e:KeyboardEvent)=>{const map:Record<string,Action>={ArrowLeft:'left',ArrowRight:'right',ArrowDown:'softDrop',ArrowUp:'rotate',' ':'rotate'};const action=map[e.key];if(action){e.preventDefault();if(!(e.repeat&&action==='rotate'))session.dispatch(action)}};
 view.board.addEventListener('keydown',key);frame=requestAnimationFrame(tick);
 return ()=>{cancelAnimationFrame(frame);view.board.removeEventListener('keydown',key);unsubscribe();view.destroy()};
}
const mount=document.querySelector<HTMLElement>('#app');if(mount)mountGame(mount);
