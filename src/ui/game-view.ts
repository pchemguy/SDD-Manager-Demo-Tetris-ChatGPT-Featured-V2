/** Shared, mount-scoped DOM view. Render snapshots and emit semantic actions only. */
import type { Action, Snapshot } from '../application/session.js';
import { cells } from '../core/pieces.js';
let sequence = 0;
export function createGameView(mount: HTMLElement, onAction: (action: Action) => void) {
 const doc = mount.ownerDocument;
 const root = doc.createElement('section');
 const legendId = `game-controls-${++sequence}`;
 root.className = 'game';
 root.innerHTML = `
  <header><p class="eyebrow">THE ORIGINAL CHALLENGE</p><h1>CLASSIC<span>TETRIS</span></h1><p>Find your rhythm. Clear a little space.</p></header>
  <div class="game-layout">
   <div class="board-wrap"><div class="board" role="img" aria-label="Tetris playfield" aria-describedby="${legendId}" tabindex="0"></div><p class="status" role="status" aria-live="polite" data-testid="status">Ready</p></div>
   <aside aria-label="Game information">
    <div class="stat"><span>SCORE</span><strong data-testid="score">0</strong></div>
    <div class="stat"><span>LEVEL</span><strong data-testid="level">1</strong></div>
    <div class="stat"><span>LINES</span><strong data-testid="lines">0</strong></div>
    <div class="actions"><button data-action="start">Start game</button><button class="secondary" data-pause data-action="pause">Pause</button><button class="secondary" data-action="restart">Restart</button><button class="secondary" data-play data-action="rotate">Rotate clockwise</button><button class="secondary" data-play data-action="rotateCCW">Rotate counterclockwise</button></div>
    <dl class="hint" id="${legendId}"><dt>← →</dt><dd>Move</dd><dt>↑ / X / Space</dt><dd>Rotate clockwise</dd><dt>Z</dt><dd>Rotate counterclockwise</dd><dt>↓</dt><dd>Soft drop</dd><dt>P / Esc</dt><dd>Pause</dd><dt>R</dt><dd>Restart</dd></dl>
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
 function render(snapshot: Snapshot) {
  root.dataset.status = snapshot.status;
  const activeCells = new Map(snapshot.active ? cells(snapshot.active).map(([x,y]) => [y * 10 + x, snapshot.active!.type]) : []);
  tiles.forEach((tile, i) => {
   const active = activeCells.get(i);
   const kind = active ?? snapshot.board[Math.floor(i / 10)][i % 10];
   tile.dataset.kind = kind ?? ''; tile.dataset.filled = String(!!kind); tile.dataset.active = String(!!active);
  });
  for (const key of ['score','level','lines'] as const) root.querySelector(`[data-testid="${key}"]`)!.textContent = String(snapshot[key]);
  const label = {ready:'Ready',running:'Playing',paused:'Paused','game-over':'Game over'}[snapshot.status];
  if (status.textContent !== label) status.textContent = label;
  root.querySelectorAll<HTMLButtonElement>('[data-play]').forEach(button=>{button.disabled=snapshot.status!=='running'});
  start.disabled = snapshot.status !== 'ready';
  pause.disabled = !['running','paused'].includes(snapshot.status);
  pause.textContent = snapshot.status === 'paused' ? 'Resume' : 'Pause';
  pause.dataset.action = snapshot.status === 'paused' ? 'resume' : 'pause';
 }
 return {board,render,destroy: () => { actions.removeEventListener('click',handleClick); root.remove(); }};
}
