'use strict';
/** Desktop-only composition. The renderer remains the unchanged static browser build. */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {APP_ORIGIN,contentPolicy,resolveAsset}=require('./asset-policy.cjs');
const entry=APP_ORIGIN+'/index.html';
function bundledFiles(root){
 const manifestPath=path.join(root,'BUILD-MANIFEST.json');
 if(fs.lstatSync(root).isSymbolicLink()||fs.lstatSync(manifestPath).isSymbolicLink())throw new Error('Bundled renderer cannot contain symbolic links');
 const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
 if(manifest.kind!=='static-browser'||!/^\d+\.\d+\.\d+$/.test(manifest.version)||!manifest.files||typeof manifest.files!=='object'||Array.isArray(manifest.files))throw new Error('Invalid bundled renderer manifest');
 const names=new Set(Object.keys(manifest.files));
 for(const required of ['index.html','schemas/game-save.schema.json'])if(!names.has(required))throw new Error('Required bundled content is missing');
 if(![...names].some(n=>/^assets\/file-worker-[A-Za-z0-9_-]+\.js$/.test(n))||![...names].some(n=>/^assets\/sql-wasm-browser-[A-Za-z0-9_-]+\.wasm$/.test(n)))throw new Error('Bundled file worker or SQLite runtime is missing');
 const read=(name)=>{
  if(!names.has(name)||!/^[A-Za-z0-9_./-]+$/.test(name)||name.startsWith('/')||name.split('/').some(p=>!p||p==='.'||p==='..')||!/^[a-f0-9]{64}$/.test(manifest.files[name]))throw new Error('Invalid bundled member');
  let filename=root;
  for(const part of name.split('/')){filename=path.join(filename,part);if(fs.lstatSync(filename).isSymbolicLink())throw new Error('Bundled content cannot contain symbolic links')}
  if(!fs.statSync(filename).isFile())throw new Error('Bundled content is not a file');
  const bytes=fs.readFileSync(filename);
  if(crypto.createHash('sha256').update(bytes).digest('hex')!==manifest.files[name])throw new Error('Bundled content integrity check failed: '+name);
  return bytes;
 };
 // Reject a broken distribution before creating a playable window.
 for(const name of names)read(name);
 return {names,read};
}
/** Explicit native collaborators keep policy/lifecycle testable without exposing a renderer bridge. */
async function startDesktop(electron,rendererRoot=path.join(__dirname,'renderer')){
 const {app,BrowserWindow,session,Menu,dialog}=electron;
 let window;
 try{
 app.setName('Classic Tetris');
 const profile=path.join(app.getPath('appData'),'ClassicTetris'),sessionPath=path.join(profile,'Session');
 fs.mkdirSync(sessionPath,{recursive:true});
 app.setPath('userData',profile);app.setPath('sessionData',sessionPath);
 if(!app.requestSingleInstanceLock()){app.quit();return}
 app.on('second-instance',()=>{if(window&&!window.isDestroyed()){if(window.isMinimized())window.restore();window.show();window.focus()}});
 app.on('window-all-closed',()=>app.quit());
  await app.whenReady();
  const bundle=bundledFiles(rendererRoot),ses=session.defaultSession;
  ses.setPermissionRequestHandler((_webContents,_permission,callback)=>callback(false));
  ses.setPermissionCheckHandler(()=>false);
  const local=(href)=>{try{const u=new URL(href);return u.origin===APP_ORIGIN&&!u.username&&!u.password}catch{return false}};
  ses.webRequest.onBeforeRequest((details,callback)=>callback({cancel:!local(details.url)}));
  await ses.protocol.handle('https',request=>{
   const resolved=resolveAsset(request.url,request.method,bundle.names);
   if(!resolved)return new Response('Local resource not found',{status:404,headers:{'content-type':'text/plain; charset=utf-8'}});
   try{
    const bytes=bundle.read(resolved.relativePath);
    return new Response(resolved.head?null:bytes,{headers:{'content-type':resolved.mime,'content-security-policy':contentPolicy,'x-content-type-options':'nosniff','cache-control':'no-store'}});
   }catch{return new Response('Bundled resource unavailable',{status:404,headers:{'content-type':'text/plain; charset=utf-8'}})}
  });
  Menu.setApplicationMenu(null);
  const area=electron.screen?.getPrimaryDisplay()?.workAreaSize??{width:1632,height:1008};
  window=new BrowserWindow({title:'Classic Tetris',useContentSize:true,width:Math.max(320,Math.min(1600,area.width-32)),height:Math.max(300,Math.min(960,area.height-48)),minWidth:320,minHeight:300,backgroundColor:'#111827',webPreferences:{nodeIntegration:false,nodeIntegrationInWorker:false,nodeIntegrationInSubFrames:false,contextIsolation:true,sandbox:true,webSecurity:true,webviewTag:false,devTools:false,spellcheck:false,navigateOnDragDrop:false}});
  window.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  window.webContents.on('will-attach-webview',event=>event.preventDefault());
  window.webContents.on('will-navigate',(event,url)=>{try{const u=new URL(url);if(!local(url)||u.pathname!=='/index.html')event.preventDefault()}catch{event.preventDefault()}});
  await window.loadURL(entry);
 }catch(error){
  dialog.showErrorBox('Classic Tetris could not start','Required bundled application content could not be loaded. Extract the complete package again.\n'+(error instanceof Error?error.message:'Unknown startup failure'));
  app.exit(1);
 }
}
module.exports={startDesktop};
// Electron's bootstrap owns require.main; its app entry must start explicitly.
if(process.versions.electron||require.main===module)void startDesktop(require('electron'));
