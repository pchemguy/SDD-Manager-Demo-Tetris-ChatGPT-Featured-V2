/** Real Electron renderer/resources and native file boundary; no production game setters. */
import {test,expect,_electron,type ElectronApplication,type Page,type TestInfo} from '@playwright/test';
import {readFile,mkdir,chmod} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {spawnSync,execFileSync} from 'node:child_process';
import path from 'node:path';
const stage=JSON.parse(await readFile(process.env.DESKTOP_STAGE!,'utf8'));
const snapshot=()=>({formatVersion:1,results:[{id:'00000000-0000-4000-8000-000000000099',score:999,timestamp:'2026-10-30T01:02:03.004Z'}],settings:{ghostVisibility:'never',hardDropEnabled:false,nextPreviewEnabled:false,hardDropLockPolicy:'immediate',generalLockPolicy:'failed-downward',holdEnabled:false}});
type Desktop={app:ElectronApplication;page:Page;env:Record<string,string>;relaunch:()=>Promise<void>};
async function usingDesktop(info:TestInfo,body:(d:Desktop)=>Promise<void>){
 const profile=info.outputPath('isolated profile');await mkdir(profile,{recursive:true});
 const env=Object.fromEntries(Object.entries({...process.env,APPDATA:profile,XDG_CONFIG_HOME:profile}).filter(([,v])=>v!==undefined)) as Record<string,string>;delete env.ELECTRON_RUN_AS_NODE;
 const d={} as Desktop;
 const launch=async()=>{if(stage.platform==='linux-x64')await chmod(stage.executable,0o755);d.app=await _electron.launch({executablePath:stage.executable,args:stage.args,cwd:stage.cwd,env,timeout:20000});d.page=await d.app.firstWindow({timeout:10000});await expect(d.page.getByRole('img',{name:'Tetris playfield'})).toBeVisible();expect(await d.app.evaluate(({app}:any)=>app.getPath('userData'))).toBe(path.join(profile,'ClassicTetris'))};
 d.env=env;d.relaunch=async()=>{await d.app.close();await launch()};
 try{await launch();await body(d)}finally{if(d.app)await d.app.close()}
}
async function restore(d:Desktop,bytes:Buffer,name='portable.bin'){
 const chooser=d.page.waitForEvent('filechooser');await d.page.getByRole('button',{name:'Restore',exact:true}).click();await(await chooser).setFiles({name,mimeType:'application/octet-stream',buffer:bytes});
}
async function save(d:Desktop,info:TestInfo,format='json',cancel=false){
 const filename='classic-tetris-save.'+format,target=info.outputPath(String(Date.now())+'-'+filename);
 await d.app.evaluate(({session}:any,{target,cancel})=>{const state={done:'',filename:''};(globalThis as any).__tetrisDownload=state;session.defaultSession.once('will-download',(_event:any,item:any)=>{state.filename=item.getFilename();item.once('done',(_e:any,value:string)=>{state.done=value});if(cancel)item.cancel();else item.setSavePath(target)})},{target,cancel});
 await d.page.getByRole('button',{name:'Save',exact:true}).click();await d.page.getByLabel('Save format',{exact:true}).selectOption(format);await d.page.getByRole('button',{name:'Download',exact:true}).click();
 await expect.poll(()=>d.app.evaluate(()=> (globalThis as any).__tetrisDownload.done)).toBe(cancel?'cancelled':'completed');
 expect(await d.app.evaluate(()=> (globalThis as any).__tetrisDownload.filename)).toBe(filename);
 if(cancel){expect(existsSync(target)).toBe(false);return Buffer.alloc(0)}
 return readFile(target);
}

test('actual offline renderer is isolated and native resize preserves absolute centering',async({},info)=>usingDesktop(info,async d=>{
 if(process.platform==='win32'){expect(stage.kind).toBe('packaged');expect(stage.args).toEqual([]);expect(stage.localProbe).toBe(false);expect(stage.archive.sha256).toMatch(/^[a-f0-9]{64}$/)}
 expect(await d.app.evaluate(()=>process.versions.electron)).toBe('45.2.0');
 expect(await d.page.evaluate(()=>({require:typeof (globalThis as any).require,process:typeof (globalThis as any).process,cells:document.querySelectorAll('.cell').length}))).toEqual({require:'undefined',process:'undefined',cells:200});
 const prefs=await d.app.evaluate(({BrowserWindow}:any)=>{const p=BrowserWindow.getAllWindows()[0].webContents.getLastWebPreferences();return{node:p.nodeIntegration,worker:p.nodeIntegrationInWorker,frame:p.nodeIntegrationInSubFrames,isolation:p.contextIsolation,sandbox:p.sandbox,security:p.webSecurity}});expect(prefs).toEqual({node:false,worker:false,frame:false,isolation:true,sandbox:true,security:true});
 for(const width of [320,1440]){await d.app.evaluate(({BrowserWindow}:any,width)=>BrowserWindow.getAllWindows()[0].setContentSize(width,900),width);await expect.poll(()=>d.page.evaluate(()=>innerWidth)).toBe(width);const board=d.page.getByRole('img',{name:'Tetris playfield'});const b=(await board.boundingBox())!;const viewport=await d.page.evaluate(()=>document.documentElement.clientWidth);expect(Math.abs(b.x+b.width/2-viewport/2)).toBeLessThanOrEqual(1);expect(await d.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await d.page.screenshot({path:info.outputPath('desktop-'+width+'.png'),fullPage:true})}
 await d.page.getByRole('button',{name:'Start game',exact:true}).click();await expect(d.page.getByTestId('status')).toHaveText('Playing');await d.page.getByRole('button',{name:'Pause',exact:true}).click();await expect(d.page.getByTestId('status')).toHaveText('Paused');await d.page.getByRole('button',{name:'Start (resume game)',exact:true}).click();await expect(d.page.getByTestId('status')).toHaveText('Playing');
}));

test('real native JSON and SQLite roundtrip and rejected final field are atomic',async({},info)=>usingDesktop(info,async d=>{
 const value=snapshot();await restore(d,Buffer.from(JSON.stringify(value)));await expect(d.page.getByTestId('file-status')).toContainText('Restored');expect(JSON.parse((await save(d,info)).toString())).toEqual(value);
 const sql=await save(d,info,'sqlite');expect(sql.subarray(0,16).toString()).toBe('SQLite format 3\0');const db=info.outputPath('actual.sqlite'),expected=info.outputPath('expected.json');const {writeFile}=await import('node:fs/promises');await writeFile(db,sql);await writeFile(expected,JSON.stringify(value));execFileSync('python',['tests/fixtures/file_checks.py',db,expected]);
 await restore(d,sql);await expect(d.page.getByTestId('file-status')).toContainText('Restored');expect(JSON.parse((await save(d,info)).toString())).toEqual(value);
 const before={url:d.page.url(),cookies:await d.page.context().cookies()},bad:any=structuredClone(value);bad.settings.holdEnabled='false';await restore(d,Buffer.from(JSON.stringify(bad)));await expect(d.page.getByTestId('file-status')).toContainText('Restore failed');expect(d.page.url()).toBe(before.url);expect(await d.page.context().cookies()).toEqual(before.cookies);await expect(d.page.locator('[data-testid="leaderboard"] tbody tr')).toHaveText('1999');
}));

test('normal close and cold relaunch retain only six selected cookies',async({},info)=>usingDesktop(info,async d=>{
 await restore(d,Buffer.from(JSON.stringify(snapshot())));await expect(d.page.getByTestId('file-status')).toContainText('Restored');for(const panel of ['Leaderboard','Settings','Controls/help'])await d.page.getByRole('button',{name:'Hide '+panel,exact:true}).click();expect(new URL(d.page.url()).searchParams.size).toBe(6);await d.relaunch();expect(new URL(d.page.url()).search).toBe('');await expect(d.page.getByTestId('status')).toHaveText('Ready');await expect(d.page.locator('[data-testid="leaderboard"] tbody tr')).toHaveCount(0);for(const panel of ['Leaderboard','Settings','Controls/help'])await expect(d.page.getByRole('button',{name:'Hide '+panel,exact:true})).toBeVisible();await expect(d.page.locator('[data-option="ghost"]')).toHaveValue('never');await expect(d.page.locator('[data-option="hold"]')).not.toBeChecked();expect((await d.page.context().cookies()).filter(c=>c.name.startsWith('tetris_config_'))).toHaveLength(6);
}));

test('native destination cancellation retains application state and permits retry',async({},info)=>usingDesktop(info,async d=>{
 await restore(d,Buffer.from(JSON.stringify(snapshot())));await expect(d.page.getByTestId('file-status')).toContainText('Restored');const before={url:d.page.url(),cookies:await d.page.context().cookies()};await save(d,info,'json',true);expect(d.page.url()).toBe(before.url);expect(await d.page.context().cookies()).toEqual(before.cookies);expect(JSON.parse((await save(d,info)).toString())).toEqual(snapshot());
}));

test('actual gameplay completion preserves stable metadata through native codecs',async({},info)=>usingDesktop(info,async d=>{
 await d.page.locator('[data-option="immediate"]').check();await d.page.getByRole('button',{name:'Start game',exact:true}).click();await d.page.getByRole('img',{name:'Tetris playfield'}).evaluate(board=>{for(let i=0;i<80&&document.querySelector('[data-testid="status"]')!.textContent!=='Game over';i++)board.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}))});await expect(d.page.getByTestId('status')).toHaveText('Game over');const original=JSON.parse((await save(d,info)).toString());expect(original.results).toHaveLength(1);const result=original.results[0];expect(result.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);expect(Number.isSafeInteger(result.score)&&result.score>=0).toBe(true);expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);const sql=await save(d,info,'sqlite');await restore(d,sql);await expect(d.page.getByTestId('file-status')).toContainText('Restored');expect(JSON.parse((await save(d,info)).toString())).toEqual(original);
}));

test('remote content and popups remain denied by the actual Electron host',async({},info)=>usingDesktop(info,async d=>{
 await d.app.evaluate(({BrowserWindow}:any)=>{(globalThis as any).__tetrisNavigation=[];BrowserWindow.getAllWindows()[0].webContents.on('will-navigate',(event:any)=>(globalThis as any).__tetrisNavigation.push({url:event.url,prevented:event.defaultPrevented}))});
 expect(await d.page.evaluate(async()=>{try{await fetch('https://example.invalid/untrusted');return false}catch{return true}})).toBe(true);
 expect(await d.page.evaluate(()=>window.open('https://example.invalid/'))).toBeNull();await d.page.evaluate(()=>{location.href='https://example.invalid/'});
 await expect.poll(()=>d.app.evaluate(()=>(globalThis as any).__tetrisNavigation)).toEqual([{url:'https://example.invalid/',prevented:true}]);
 // Electron cancels navigation before commit; CDP's loading flag remains pending. Inspect the live native frame directly.
 const content=await d.app.evaluate(async({BrowserWindow}:any)=>{const wc=BrowserWindow.getAllWindows()[0].webContents;return{url:wc.getURL(),dom:await wc.executeJavaScript('({url:location.href,cells:document.querySelectorAll(".cell").length,visible:document.querySelector("[role=img]").getBoundingClientRect().height>0})')}});
 expect(content).toEqual({url:'https://classic-tetris.invalid/index.html',dom:{url:'https://classic-tetris.invalid/index.html',cells:200,visible:true}});
 await d.app.evaluate(async({BrowserWindow}:any)=>BrowserWindow.getAllWindows()[0].webContents.executeJavaScript('Array.from(document.querySelectorAll("button")).find(b=>b.textContent==="Start game").click()'));
 expect(await d.app.evaluate(async({BrowserWindow}:any)=>BrowserWindow.getAllWindows()[0].webContents.executeJavaScript('document.querySelector("[data-testid=status]").textContent'))).toBe('Playing');
 expect(await d.app.evaluate(({BrowserWindow}:any)=>BrowserWindow.getAllWindows().length)).toBe(1);
}));

test('@native-singleton second launch focuses the existing paused game without resetting',async({},info)=>usingDesktop(info,async d=>{
 await d.page.getByRole('button',{name:'Start game',exact:true}).click();await d.page.getByRole('button',{name:'Pause',exact:true}).click();const before=await d.page.locator('.board').innerHTML();await d.app.evaluate(({BrowserWindow}:any)=>BrowserWindow.getAllWindows()[0].minimize());const second=spawnSync(stage.executable,stage.args,{cwd:stage.cwd,env:d.env,timeout:15000,stdio:'pipe'});expect(second.status).toBe(0);await expect.poll(()=>d.app.evaluate(({BrowserWindow}:any)=>BrowserWindow.getAllWindows()[0].isMinimized())).toBe(false);await expect(d.page.getByTestId('status')).toHaveText('Paused');expect(await d.page.locator('.board').innerHTML()).toBe(before);expect(await d.app.evaluate(({BrowserWindow}:any)=>BrowserWindow.getAllWindows().length)).toBe(1);
}));

test('hidden Settings retains an actual pending SQLite Restore and its result',async({},info)=>usingDesktop(info,async d=>{
 await restore(d,Buffer.from(JSON.stringify(snapshot())));await expect(d.page.getByTestId('file-status')).toContainText('Restored');const sql=await save(d,info,'sqlite');
 await d.page.evaluate(()=>{const original=File.prototype.arrayBuffer;let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve});File.prototype.arrayBuffer=function(){return gate.then(()=>original.call(this))};(globalThis as any).__tetrisReleaseRead=()=>{File.prototype.arrayBuffer=original;release()}});
 try{await restore(d,sql);await expect(d.page.getByRole('button',{name:'Restore',exact:true})).toBeDisabled();await d.page.getByRole('button',{name:'Hide Settings',exact:true}).click();await expect(d.page.getByRole('button',{name:'Save',exact:true})).not.toBeVisible();await d.page.evaluate(()=>(globalThis as any).__tetrisReleaseRead());await expect(d.page.getByTestId('file-status')).toContainText('Restored');await expect(d.page.getByRole('button',{name:'Show Settings',exact:true})).toBeVisible();await d.page.getByRole('button',{name:'Show Settings',exact:true}).click();expect(JSON.parse((await save(d,info)).toString())).toEqual(snapshot())}finally{await d.page.evaluate(()=>(globalThis as any).__tetrisReleaseRead?.())}

}));

test('@native-focus native external focus pauses and returning focus does not resume',async({},info)=>usingDesktop(info,async d=>{
 await d.page.getByRole('button',{name:'Start game',exact:true}).click();await expect(d.page.getByTestId('status')).toHaveText('Playing');
 await d.app.evaluate(({BrowserWindow}:any)=>{const main=BrowserWindow.getAllWindows()[0];(globalThis as any).__tetrisFocusEvents=[];for(const event of ['focus','blur'])main.on(event,()=>(globalThis as any).__tetrisFocusEvents.push('main-'+event));main.show();main.focus()});
 console.log('NATIVE FOCUS BEFORE',await d.app.evaluate(async({BrowserWindow}:any)=>{const w=BrowserWindow.getAllWindows()[0];return{native:w.isFocused(),web:w.webContents.isFocused(),dom:await w.webContents.executeJavaScript('document.hasFocus()'),events:(globalThis as any).__tetrisFocusEvents}}));
 await d.app.evaluate(async({BrowserWindow}:any)=>{const other=new BrowserWindow({width:320,height:300,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});(globalThis as any).__tetrisFocusWindow=other;await other.loadURL('about:blank');other.show();other.focus()});
 console.log('NATIVE FOCUS AFTER',await d.app.evaluate(async({BrowserWindow}:any)=>{const w=BrowserWindow.getAllWindows()[0];return{main:w.isFocused(),other:(globalThis as any).__tetrisFocusWindow.isFocused(),web:w.webContents.isFocused(),dom:await w.webContents.executeJavaScript('document.hasFocus()'),events:(globalThis as any).__tetrisFocusEvents}}));
 try{await expect(d.page.getByTestId('status')).toHaveText('Paused')}finally{await d.app.evaluate(({BrowserWindow}:any)=>{(globalThis as any).__tetrisFocusWindow?.close();BrowserWindow.getAllWindows()[0]?.focus()})}
 await expect(d.page.getByTestId('status')).toHaveText('Paused');await d.page.getByRole('button',{name:'Start (resume game)',exact:true}).click();await expect(d.page.getByTestId('status')).toHaveText('Playing');
}));

test('maximum-score history and a real restore error stay usable across every panel state',async({},info)=>usingDesktop(info,async d=>{
 const value=snapshot();value.results=Array.from({length:10},(_,i)=>({id:'00000000-0000-4000-8000-'+String(i+1).padStart(12,'0'),score:Number.MAX_SAFE_INTEGER-i,timestamp:value.results[0].timestamp}));
 await restore(d,Buffer.from(JSON.stringify(value)));await expect(d.page.getByTestId('file-status')).toContainText('Restored');await expect(d.page.locator('[data-testid="leaderboard"] tbody tr')).toHaveCount(10);
 const before={url:d.page.url(),cookies:await d.page.context().cookies()};const bad:any=structuredClone(value);bad.settings.holdEnabled='false';await restore(d,Buffer.from(JSON.stringify(bad)));await expect(d.page.getByTestId('file-status')).toContainText('Restore failed');expect(d.page.url()).toBe(before.url);expect(await d.page.context().cookies()).toEqual(before.cookies);
 for(const width of [320,1440]){
  await d.app.evaluate(({BrowserWindow}:any,width)=>BrowserWindow.getAllWindows()[0].setContentSize(width,900),width);await expect.poll(()=>d.page.evaluate(()=>innerWidth)).toBe(width);
  for(let mask=0;mask<8;mask++){
   for(const [i,panel] of ['Leaderboard','Settings','Controls/help'].entries()){const toggle=d.page.getByRole('button',{name:new RegExp('^(Show|Hide) '+panel+'$')});if((await toggle.innerText()).startsWith('Hide')!==Boolean(mask&(1<<i)))await toggle.click()}
   const board=d.page.getByRole('img',{name:'Tetris playfield'});await expect(board).toBeVisible();const b=(await board.boundingBox())!,viewport=await d.page.evaluate(()=>document.documentElement.clientWidth);expect(Math.abs(b.x+b.width/2-viewport/2)).toBeLessThanOrEqual(1);expect(await d.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await expect(d.page.getByTestId('file-status')).toContainText('Restore failed');await d.page.screenshot({path:info.outputPath('desktop-stress-'+width+'.png'),fullPage:true});
 }
 expect(JSON.parse((await save(d,info)).toString())).toEqual(value);
}));
