/** Shared, mount-scoped DOM view. Render snapshots and emit semantic actions only. */
import type { Action, Snapshot } from '../application/session.js';
import type {Kind} from '../core/types.js';
import { cells } from '../core/pieces.js';
let sequence = 0;
export function createGameView(mount: HTMLElement, onAction: (action: Action) => void) {
 const doc = mount.ownerDocument;
 const root = doc.createElement('section');
 const legendId = `game-controls-${++sequence}`;
 const ghostId=legendId+'-ghost';
 root.className = 'game';
 root.innerHTML = `
  <header><p class="eyebrow">THE ORIGINAL CHALLENGE</p><h1>CLASSIC<span>TETRIS</span></h1><p>Find your rhythm. Clear a little space.</p></header>
  <div class="game-layout">
   <div class="board-wrap"><div class="board" role="img" aria-label="Tetris playfield" aria-describedby="${legendId} ${ghostId}" tabindex="0"></div><p class="status" role="status" aria-live="polite" data-testid="status">Ready</p><p class="projection" id="${ghostId}" data-testid="ghost-description">No active piece</p></div>
   <aside aria-label="Game information">
    <div class="stat"><span>SCORE</span><strong data-testid="score">0</strong></div>
    <div class="stat"><span>LEVEL</span><strong data-testid="level">1</strong></div>
    <div class="stat"><span>LINES</span><strong data-testid="lines">0</strong></div>
    <div class="planning"><div data-preview="next"><span>Next</span><strong data-testid="next-type">None</strong><div class="piece-mini" role="img" aria-label="Next piece: none"></div></div><div data-preview="held"><span>Hold</span><strong data-testid="held-type">None</strong><div class="piece-mini" role="img" aria-label="Held piece: none"></div><small data-testid="hold-status">Unavailable</small></div></div>
    <div class="actions"><button data-action="start">Start game</button><button class="secondary" data-pause data-action="pause">Pause</button><button class="secondary" data-action="restart">Restart</button><button class="secondary" data-play data-action="rotate" aria-label="Rotate clockwise">Rotate ↻</button><button class="secondary" data-play data-action="rotateCCW" aria-label="Rotate counterclockwise">Rotate ↺</button><button class="secondary" data-play data-action="hold">Hold piece</button></div>
    <dl class="hint" id="${legendId}"><dt>← →</dt><dd>Move</dd><dt>↑ / X / Space</dt><dd>Rotate clockwise</dd><dt>Z</dt><dd>Rotate counterclockwise</dd><dt>C / Shift</dt><dd>Hold piece</dd><dt>↓</dt><dd>Soft drop</dd><dt>P / Esc</dt><dd>Pause</dd><dt>R</dt><dd>Restart</dd></dl>
   </aside>
  </div><footer>10 × 20 · SEVEN SHAPES · ONE MORE TRY</footer>`;
 mount.append(root);
 const board = root.querySelector<HTMLElement>('.board')!;
 const tiles = Array.from({length: 200}, (_, i) => {
  const tile = doc.createElement('div');
  tile.className = 'cell'; tile.dataset.x = String(i % 10); tile.dataset.y = String(Math.floor(i / 10));
  tile.setAttribute('aria-hidden', 'true'); board.append(tile); return tile;
 });
 const actions = root.querySelector<HTMLElement>('.actions')!;
 const start = root.querySelector<HTMLButtonElement>('[data-action="start"]')!;
 const pause = root.querySelector<HTMLButtonElement>('[data-pause]')!;
 const status = root.querySelector<HTMLElement>('[data-testid="status"]')!;
 const handleClick = (event: MouseEvent) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
  if (!button || button.disabled) return;
  onAction(button.dataset.action as Action); board.focus();
 };
 actions.addEventListener('click', handleClick);
 /** Miniatures reuse geometry, normalized inside a four-cell display box. */
 function makeMini(container:HTMLElement,label:string){
  const tiles=Array.from({length:16},()=>{const tile=doc.createElement('span');tile.className='mini-cell';tile.setAttribute('aria-hidden','true');container.append(tile);return tile});
  return (type:Kind|null)=>{
   const occupied=type?cells({type,rotation:0,x:0,y:0}):[];
   const minX=Math.min(...occupied.map(([x])=>x)),minY=Math.min(...occupied.map(([,y])=>y));
   const width=occupied.length?Math.max(...occupied.map(([x])=>x))-minX+1:0,height=occupied.length?Math.max(...occupied.map(([,y])=>y))-minY+1:0;
   const filled=new Set(occupied.map(([x,y])=>(y-minY+Math.floor((4-height)/2))*4+x-minX+Math.floor((4-width)/2)));
   tiles.forEach((tile,i)=>{tile.dataset.filled=String(filled.has(i))});container.setAttribute('aria-label',`${label} piece: ${type??'none'}`);
  };
 }
 const renderNext=makeMini(root.querySelector<HTMLElement>('[data-preview="next"] .piece-mini')!,'Next');
 const renderHeld=makeMini(root.querySelector<HTMLElement>('[data-preview="held"] .piece-mini')!,'Held');
 function render(snapshot: Snapshot) {
  root.dataset.status = snapshot.status;
  root.querySelector('[data-testid="next-type"]')!.textContent=snapshot.next??'None';renderNext(snapshot.next);
  root.querySelector('[data-testid="held-type"]')!.textContent=snapshot.held??'None';renderHeld(snapshot.held);
  root.querySelector('[data-testid="hold-status"]')!.textContent=snapshot.canHold?'Available':'Unavailable';
  const activeCells = new Map(snapshot.active ? cells(snapshot.active).map(([x,y]) => [y * 10 + x, snapshot.active!.type]) : []);
  const ghostCells=new Set(snapshot.ghost?cells(snapshot.ghost).map(([x,y])=>y*10+x):[]);
  root.querySelector('[data-testid="ghost-description"]')!.textContent=snapshot.ghost?`Ghost ${snapshot.ghost.type} lands on row ${Math.max(...cells(snapshot.ghost).map(([,y])=>y))+1}`:'No active piece';
  tiles.forEach((tile, i) => {
   const active = activeCells.get(i);
   const kind = active ?? snapshot.board[Math.floor(i / 10)][i % 10];
   tile.dataset.ghost=String(ghostCells.has(i)&&!kind);
   tile.dataset.kind = kind ?? ''; tile.dataset.filled = String(!!kind); tile.dataset.active = String(!!active);
  });
  for (const key of ['score','level','lines'] as const) root.querySelector(`[data-testid="${key}"]`)!.textContent = String(snapshot[key]);
  const label = {ready:'Ready',running:'Playing',paused:'Paused','game-over':'Game over'}[snapshot.status];
  if (status.textContent !== label) status.textContent = label;
  root.querySelectorAll<HTMLButtonElement>('[data-play]').forEach(button=>{button.disabled=snapshot.status!=='running'||(button.dataset.action==='hold'&&!snapshot.canHold)});
  start.disabled = snapshot.status !== 'ready';
  pause.disabled = !['running','paused'].includes(snapshot.status);
  pause.textContent = snapshot.status === 'paused' ? 'Resume' : 'Pause';
  pause.dataset.action = snapshot.status === 'paused' ? 'resume' : 'pause';
 }
 return {board,render,destroy: () => { actions.removeEventListener('click',handleClick); root.remove(); }};
}
