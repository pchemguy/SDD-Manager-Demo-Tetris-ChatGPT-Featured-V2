/** Shared DOM view: selected configuration is explicit, gameplay availability comes from snapshots. */
import type { Action, Snapshot, SessionOptions } from '../application/session.js';
import {createConfiguration, toRuleOptions, type ConfigurationController} from '../application/configuration.js';
import type {Kind} from '../core/types.js';
import { cells } from '../core/pieces.js';
import { isGhostVisible, type GhostVisibilityMode } from './ghost-visibility.js';
export interface FileTransferControls {save(format:'json'|'sqlite'):Promise<void>;restore(file:File):Promise<void>;cancel():void;formats:readonly ('json'|'sqlite')[]}
let sequence = 0;
export function createGameView(mount: HTMLElement, onAction: (action: Action) => void, onOptionsChange: (options:SessionOptions)=>void=()=>{}, configuration:ConfigurationController=createConfiguration(),transfer?:FileTransferControls) {
 const doc = mount.ownerDocument;
 const root = doc.createElement('section');
 const legendId = `game-controls-${++sequence}`;
 const ghostId=legendId+'-ghost',abilityId=legendId+'-ability';
 root.className = 'game';
 root.innerHTML = `
  <header><p class="eyebrow">THE ORIGINAL CHALLENGE</p><h1>CLASSIC<span>TETRIS</span></h1><p>Find your rhythm. Clear a little space.</p></header>
  <div class="game-layout">
   <div class="board-wrap"><p class="visually-hidden" id="${legendId}">Use arrow keys to move or rotate; Space hard drops, Z rotates counterclockwise, C or Shift holds, B activates a bonus, P or Escape pauses, and R restarts.</p><div class="board" role="img" aria-label="Tetris playfield" aria-describedby="${legendId} ${ghostId} ${abilityId}" tabindex="0"></div><p class="status" role="status" aria-live="polite" data-testid="status">Ready</p><p class="projection" id="${ghostId}" data-testid="ghost-description">No active piece</p></div>
   <div class="side-left">
    <section class="leaderboard-panel" id="${legendId}-leaderboard" aria-label="Leaderboard"><h2>Leaderboard</h2><p data-testid="leaderboard-empty">No completed games yet.</p><table data-testid="leaderboard" aria-label="Leaderboard"><thead><tr><th scope="col">Rank</th><th scope="col">Score</th></tr></thead><tbody></tbody></table></section>
   <aside aria-label="Game information">
    <div class="stat"><span>SCORE</span><strong data-testid="score">0</strong></div>
    <div class="stat"><span>LEVEL</span><strong data-testid="level">1</strong></div>
    <div class="stat"><span>LINES</span><strong data-testid="lines">0</strong></div>
    <div class="penetrator-info"><span>Penetrator bonuses</span><strong data-testid="penetrator-bonuses" aria-label="Penetrator bonuses: 0"></strong><p class="ability-status" role="status" aria-live="polite" id="${abilityId}" data-testid="penetrator-mode"></p></div>
    <div class="planning"><div data-preview="next"><span>Next</span><strong data-testid="next-type">None</strong><div class="piece-mini" role="img" aria-label="Next piece: none"></div></div><div data-preview="held"><span>Hold</span><strong data-testid="held-type">None</strong><div class="piece-mini" role="img" aria-label="Held piece: none"></div><small data-testid="hold-status">Unavailable</small></div></div>

    <div class="panel-toggles" role="group" aria-label="Panel visibility"><button type="button" class="secondary" data-panel-toggle="leaderboard" aria-controls="${legendId}-leaderboard" aria-expanded="true">Hide Leaderboard</button><button type="button" class="secondary" data-panel-toggle="settings" aria-controls="${legendId}-settings" aria-expanded="true">Hide Settings</button><button type="button" class="secondary" data-panel-toggle="help" aria-controls="${legendId}-help" aria-expanded="true">Hide Controls/help</button></div>
    <div class="actions"><button data-action="start">Start game</button><button class="secondary" data-pause data-action="pause">Pause</button><small class="resume-hint" hidden>Continue paused game.</small><button class="secondary" data-play data-action="rotate" aria-label="Rotate clockwise">Rotate ↻</button><button class="secondary" data-play data-action="rotateCCW" aria-label="Rotate counterclockwise">Rotate ↺</button><button class="secondary" data-play data-action="hold">Hold piece</button><button class="secondary" data-play data-action="hardDrop">Hard drop</button></div>

   </aside>
   </div>
   <div class="side-right">
  <section class="settings-disclosure" id="${legendId}-settings" aria-label="Settings"><h2>Settings</h2><fieldset class="settings-panel"><legend>Game configuration</legend><p class="settings-help">Display changes apply now. Gameplay changes apply on Start or Restart.</p>
   <label class="settings ghost-setting"><span>Ghost visibility</span><select data-option="ghost"><option value="never">Always hide</option><option value="lower-half">Hide above midline</option><option value="always">Always show</option></select></label>
   <label class="settings"><input type="checkbox" data-option="hard-drop"><span>Hard drop (next game)</span></label>
   <label class="settings"><input type="checkbox" data-option="preview"><span>Next-piece preview</span></label>
   <label class="settings"><input type="checkbox" data-option="immediate"><span>Immediate hard-drop lock (next game)</span></label>
   <label class="settings ghost-setting"><span>General locking policy (next game)</span><select data-option="general"><option value="gravity-interval">Full gravity interval after grounding</option><option value="failed-downward">Failed downward movement</option></select></label>
   <label class="settings"><input type="checkbox" data-option="hold"><span>Hold piece (next game)</span></label>
   <p class="settings-help">Unchecked immediate lock follows the general policy. With failed downward movement, hard drop waits for a blocked downward attempt.</p>
   <p class="settings-summary" data-testid="settings-summary"></p>
   <div class="file-controls"><button type="button" class="secondary" data-file="save">Save</button><button type="button" class="secondary" data-file="restore">Restore</button></div>
   <fieldset class="file-format" hidden><legend>Save file</legend><label>Save format <select data-file-format aria-label="Save format"><option value="json">JSON</option><option value="sqlite" ${transfer?.formats.includes('sqlite')?'':'disabled'}>SQLite</option></select></label><button type="button" data-file="download">Download</button><button type="button" class="secondary" data-file="cancel">Cancel</button></fieldset>
   <input type="file" data-file-input hidden aria-label="Restore file" accept=".json,.sqlite,.db,application/json,application/vnd.sqlite3">
   <p class="file-status" role="status" aria-live="polite" aria-label="File operation" data-testid="file-status"></p>
  </fieldset></section>
    <section class="help-panel" id="${legendId}-help" aria-label="Controls/help"><h2>Controls/help</h2>
    <dl class="hint" id="${legendId}-full"><dt>← →</dt><dd>Move</dd><dt>↑ / X</dt><dd>Rotate clockwise</dd><dt>Space</dt><dd>Hard drop</dd><dt>Z</dt><dd>Rotate counterclockwise</dd><dt>C / Shift</dt><dd>Hold piece</dd><dt>B</dt><dd>Penetrator (1 bonus)</dd><dt>↓</dt><dd>Soft drop</dd><dt>P / Esc</dt><dd>Pause</dd><dt>R</dt><dd>Restart</dd></dl>
    </section>
   </div>
  </div><footer>10 × 20 · SEVEN SHAPES · ONE MORE TRY</footer>`;
 mount.append(root);
 const panelBindings=Array.from(root.querySelectorAll<HTMLButtonElement>('[data-panel-toggle]')).map(button=>{
  const panel=root.querySelector<HTMLElement>('#'+button.getAttribute('aria-controls'))!;
  const label=button.textContent!.slice(5);
  const toggle=()=>{
   if(!panel.hidden&&panel.contains(doc.activeElement))button.focus();
   panel.hidden=!panel.hidden;
   button.textContent=(panel.hidden?'Show ':'Hide ')+label;
   button.setAttribute('aria-expanded',String(!panel.hidden));
  };
  button.addEventListener('click',toggle);
  return {button,toggle};
 });
 const board = root.querySelector<HTMLElement>('.board')!;
 const tiles = Array.from({length: 200}, (_, i) => {
  const tile = doc.createElement('div');
  tile.className = 'cell'; tile.dataset.x = String(i % 10); tile.dataset.y = String(Math.floor(i / 10));
  tile.setAttribute('aria-hidden', 'true'); board.append(tile); return tile;
 });
 const option=root.querySelector<HTMLInputElement>('[data-option="immediate"]')!;
 const preview=root.querySelector<HTMLInputElement>('[data-option="preview"]')!;
 const hardDrop=root.querySelector<HTMLInputElement>('[data-option="hard-drop"]')!;
 const hold=root.querySelector<HTMLInputElement>('[data-option="hold"]')!;
 const general=root.querySelector<HTMLSelectElement>('[data-option="general"]')!;
 const ghostMode=root.querySelector<HTMLSelectElement>('[data-option="ghost"]')!;
 let latestSnapshot:Snapshot|undefined;
 const settings=root.querySelector<HTMLElement>('.settings-panel')!;
 const changeSettings=(event:Event)=>{
  const target=event.target;
  if(target===option){configuration.update({hardDropLockPolicy:option.checked?'immediate':'general'});onOptionsChange({immediateHardDropLock:option.checked})}
  else if(target===hardDrop)configuration.update({hardDropEnabled:hardDrop.checked});
  else if(target===preview)configuration.update({nextPreviewEnabled:preview.checked});
  else if(target===hold)configuration.update({holdEnabled:hold.checked});
  else if(target===general)configuration.update({generalLockPolicy:general.value as 'failed-downward'|'gravity-interval'});
  else if(target===ghostMode)configuration.update({ghostVisibility:ghostMode.value as GhostVisibilityMode});
  refreshConfiguration();
 };
 settings.addEventListener('change',changeSettings);
 const fileInput=root.querySelector<HTMLInputElement>('[data-file-input]')!,formatBox=root.querySelector<HTMLFieldSetElement>('.file-format')!,format=root.querySelector<HTMLSelectElement>('[data-file-format]')!,fileStatus=root.querySelector<HTMLElement>('[data-testid="file-status"]')!;
 const saveButton=root.querySelector<HTMLButtonElement>('[data-file="save"]')!,restoreButton=root.querySelector<HTMLButtonElement>('[data-file="restore"]')!;
 let fileBusy=false,fileSequence=0,destroyed=false;
 const fileState=(message:string,error=false)=>{fileStatus.setAttribute('role',error?'alert':'status');fileStatus.setAttribute('aria-live',error?'assertive':'polite');if(fileStatus.textContent!==message)fileStatus.textContent=message;fileStatus.classList.toggle('error',error)};
 const busy=(value:boolean)=>{fileBusy=value;saveButton.disabled=value||!transfer;restoreButton.disabled=value||!transfer;root.querySelector<HTMLButtonElement>('[data-file="download"]')!.disabled=value};busy(false);
 const perform=async(name:'Save'|'Restore',operation:()=>Promise<void>)=>{
  if(!transfer||fileBusy)return;const id=++fileSequence;busy(true);fileState(name==='Save'?'Preparing file…':'Validating file…');
  try{await operation();if(destroyed||fileSequence!==id)return;formatBox.hidden=true;refreshConfiguration();fileState(name==='Save'?'Saved file.':'Restored results and settings.')}
  catch(error){if(destroyed||fileSequence!==id)return;if(error instanceof DOMException&&error.name==='AbortError'){fileState('');return}const detail=error instanceof Error?error.message:'The operation could not be completed';fileState(detail.startsWith(name+' failed')?detail:name+' failed: '+detail,true)}
  finally{if(!destroyed&&fileSequence===id)busy(false)}
 };
 const fileClick=(event:Event)=>{const button=(event.target as Element).closest<HTMLButtonElement>('button[data-file]');if(!button||!settings.contains(button))return;
  if(button.dataset.file==='save'){formatBox.hidden=false;format.focus()}
  else if(button.dataset.file==='restore'){fileInput.value='';fileInput.click()}
  else if(button.dataset.file==='download')void perform('Save',()=>transfer!.save(format.value as 'json'|'sqlite'));
  else if(button.dataset.file==='cancel'){fileSequence++;transfer?.cancel();busy(false);formatBox.hidden=true;fileState('');saveButton.focus()}
 };
 const fileChanged=()=>{const file=fileInput.files?.[0];if(file)void perform('Restore',()=>transfer!.restore(file));fileInput.value=''};
 settings.addEventListener('click',fileClick);fileInput.addEventListener('change',fileChanged);
 /** Explicitly refresh after external context updates; no session dispatch or broadcast. */
 function refreshConfiguration(){if(latestSnapshot)render(latestSnapshot);else renderControls()}
 function renderControls(){
  const selected=configuration.getSnapshot();
  option.checked=selected.hardDropLockPolicy==='immediate';option.disabled=!selected.hardDropEnabled;
  preview.checked=selected.nextPreviewEnabled;
  hardDrop.checked=selected.hardDropEnabled;hold.checked=selected.holdEnabled;general.value=selected.generalLockPolicy;ghostMode.value=selected.ghostVisibility;
 }
 renderControls();
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
  latestSnapshot = snapshot;
  renderControls();
  const historyBody=root.querySelector<HTMLTableSectionElement>('[data-testid="leaderboard"] tbody')!;
  const rows=snapshot.leaderboard.map((result,index)=>{
   const row=doc.createElement('tr');
   for(const value of [index+1,result.score]){const cell=doc.createElement('td');cell.textContent=String(value);row.append(cell)}
   return row;
  });
  historyBody.replaceChildren(...rows);
  root.querySelector<HTMLElement>('[data-testid="leaderboard-empty"]')!.hidden=rows.length!==0;
  const selected=configuration.getSnapshot();
  const mode=selected.ghostVisibility;
  root.dataset.status = snapshot.status;
  root.querySelector('[data-testid="next-type"]')!.textContent=selected.nextPreviewEnabled?(snapshot.next??'None'):'Off';renderNext(selected.nextPreviewEnabled?snapshot.next:null);
  if(!selected.nextPreviewEnabled)root.querySelector('[data-preview="next"] .piece-mini')!.setAttribute('aria-label','Next piece: off');
  root.querySelector('[data-testid="held-type"]')!.textContent=snapshot.rules.holdEnabled?(snapshot.held??'None'):'Off';renderHeld(snapshot.rules.holdEnabled?snapshot.held:null);
  root.querySelector('[data-testid="hold-status"]')!.textContent=snapshot.penetratorActive?'Unavailable during penetration':!snapshot.rules.holdEnabled?'Off':snapshot.canHold?'Available':'Unavailable';
  const activeCells = new Map(snapshot.active ? cells(snapshot.active).map(([x,y]) => [y * 10 + x, snapshot.active!.type]) : []);
  const showGhost = isGhostVisible(snapshot.ghost, mode);
  const ghostCells=new Set(showGhost&&snapshot.ghost?cells(snapshot.ghost).map(([x,y])=>y*10+x):[]);
  root.querySelector('[data-testid="ghost-description"]')!.textContent=snapshot.ghost?(showGhost?`Ghost ${snapshot.ghost.type} lands on row ${Math.max(...cells(snapshot.ghost).map(([,y])=>y))+1}`:mode==='never'?'Ghost hidden':'Ghost hidden above the midline'):'No active piece';
  tiles.forEach((tile, i) => {
   const active = activeCells.get(i);
   const kind = active ?? snapshot.board[Math.floor(i / 10)][i % 10];
   tile.dataset.ghost=String(ghostCells.has(i)&&!kind);
   tile.dataset.penetrator=String(active?snapshot.penetratorActive:kind?snapshot.penetratorCells[Math.floor(i/10)][i%10]:false);
   tile.dataset.penetratorGhost=String(ghostCells.has(i)&&!kind&&snapshot.penetratorActive);
   tile.dataset.kind = kind ?? ''; tile.dataset.filled = String(!!kind); tile.dataset.active = String(!!active);
  });
  const bonuses=root.querySelector<HTMLElement>('[data-testid="penetrator-bonuses"]')!;
  const symbols='⚡'.repeat(snapshot.penetratorBonuses),countLabel=`Penetrator bonuses: ${snapshot.penetratorBonuses}`;
  if(bonuses.textContent!==symbols)bonuses.textContent=symbols;
  if(bonuses.getAttribute('aria-label')!==countLabel)bonuses.setAttribute('aria-label',countLabel);
  const ability=root.querySelector<HTMLElement>('[data-testid="penetrator-mode"]')!,abilityLabel=`Penetrator ${snapshot.penetratorActive?'active':'inactive'} · Bonuses: ${snapshot.penetratorBonuses}`;
  if(ability.textContent!==abilityLabel)ability.textContent=abilityLabel;
  for (const key of ['score','level','lines'] as const) root.querySelector(`[data-testid="${key}"]`)!.textContent = String(snapshot[key]);
  const label = {ready:'Ready',running:'Playing',paused:'Paused','game-over':'Game over'}[snapshot.status];
  if (status.textContent !== label) status.textContent = label;
  root.querySelectorAll<HTMLButtonElement>('[data-play]').forEach(button=>{button.disabled=snapshot.status!=='running'||(button.dataset.action==='hold'&&!snapshot.canHold)||(button.dataset.action==='hardDrop'&&!snapshot.rules.hardDropEnabled)});
  const describe=(rules:ReturnType<typeof toRuleOptions>)=>`Hard drop ${rules.hardDropEnabled?'On':'Off'} · Hold ${rules.holdEnabled?'On':'Off'} · General lock: ${rules.generalLockPolicy==='gravity-interval'?'full gravity interval':'failed downward movement'} · Hard-drop lock: ${rules.hardDropLockPolicy==='immediate'?'immediate':'general'}`;
  const pending=toRuleOptions(selected);
  const differs=Object.keys(pending).some(key=>pending[key as keyof typeof pending]!==snapshot.rules[key as keyof typeof pending]);
  root.querySelector('[data-testid="settings-summary"]')!.textContent=snapshot.status==='ready'?`Next game: ${describe(pending)}`:`Current game: ${describe(snapshot.rules)}${differs?` | Pending next game: ${describe(pending)}`:' | Next game: same rules'}`;
  start.disabled = false;
  start.textContent = snapshot.status === 'ready' ? 'Start game' : 'Restart';
  start.dataset.action = snapshot.status === 'ready' ? 'start' : 'restart';
  root.querySelector<HTMLElement>('.resume-hint')!.hidden = snapshot.status !== 'paused';
  pause.disabled = !['running','paused'].includes(snapshot.status);
  pause.textContent = snapshot.status === 'paused' ? 'Start' : 'Pause';
  pause.setAttribute('aria-label',snapshot.status === 'paused' ? 'Start (resume game)' : 'Pause');
  pause.dataset.action = snapshot.status === 'paused' ? 'resume' : 'pause';
 }
 return {board,render,refreshConfiguration,destroy: () => { destroyed=true;fileSequence++;panelBindings.forEach(({button,toggle})=>button.removeEventListener('click',toggle));settings.removeEventListener('click',fileClick);fileInput.removeEventListener('change',fileChanged); settings.removeEventListener('change',changeSettings); latestSnapshot=undefined; actions.removeEventListener('click',handleClick); root.remove(); }};
}
