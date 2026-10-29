/** Shared DOM presentation. State is read-only; actions return to the owning session. */
import type { Action, Snapshot } from '../application/session.js';
import { cells } from '../core/pieces.js';
export function createGameView(mount:HTMLElement,onAction:(action:Action)=>void) {
 const doc=mount.ownerDocument,root=doc.createElement('section');root.className='game';
 root.innerHTML=`<header><p class="eyebrow">THE ORIGINAL CHALLENGE</p><h1>CLASSIC<span>TETRIS</span></h1><p>Find your rhythm. Clear a little space.</p></header><div class="game-layout"><div class="board-wrap"><div class="board" role="img" aria-label="Tetris playfield" tabindex="0"></div><p class="status" data-testid="status">Ready</p></div><aside><div class="stat"><span>SCORE</span><strong data-testid="score">0</strong></div><div class="stat"><span>LEVEL</span><strong data-testid="level">1</strong></div><div class="stat"><span>LINES</span><strong data-testid="lines">0</strong></div><div class="actions"><button data-action="start">Start game</button></div><p class="hint">← → Move<br>↑ / Space Rotate<br>↓ Soft drop</p></aside></div><footer>10 × 20 · SEVEN SHAPES · ONE MORE TRY</footer>`;
 mount.append(root);
 const board=root.querySelector<HTMLElement>('.board')!;
 const tiles=Array.from({length:200},(_,i)=>{const t=doc.createElement('div');t.className='cell';t.dataset.x=String(i%10);t.dataset.y=String(Math.floor(i/10));t.setAttribute('aria-hidden','true');board.append(t);return t});
 const start=root.querySelector<HTMLButtonElement>('[data-action="start"]')!;
 const handleClick=()=>{onAction('start');board.focus()};start.addEventListener('click',handleClick);
 function render(s:Snapshot) {
  root.dataset.status=s.status;
  const occupied=new Map(s.active?cells(s.active).map(([x,y])=>[y*10+x,s.active!.type]):[]);
  tiles.forEach((t,i)=>{const active=occupied.get(i),kind=active??s.board[Math.floor(i/10)][i%10];t.dataset.kind=kind??'';t.dataset.filled=String(!!kind);t.dataset.active=String(!!active)});
  for(const key of ['score','level','lines'] as const)root.querySelector(`[data-testid="${key}"]`)!.textContent=String(s[key]);
  root.querySelector('[data-testid="status"]')!.textContent=({'ready':'Ready','running':'Playing','paused':'Paused','game-over':'Game over'})[s.status];
  start.disabled=s.status!=='ready';
 }
 return {board,render,destroy:()=>{start.removeEventListener('click',handleClick);root.remove()}};
}
