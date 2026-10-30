'use strict';
/** Pure desktop request policy. It grants routes, never arbitrary file paths. */
const APP_ORIGIN='https://classic-tetris.invalid';
const contentPolicy="default-src 'none'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'";
const mimeTypes={'.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.wasm':'application/wasm','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff':'font/woff','.woff2':'font/woff2','.ico':'image/x-icon'};
function resolveAsset(href,method,approved){
 if(typeof href!=='string'||!['GET','HEAD'].includes(method)||/[\u0000-\u0020\u007f]/.test(href))return null;
 const rawPath=href.split(/[?#]/,1)[0];
 if(/[\\%]/.test(rawPath)||/\/\.{1,2}(?:\/|$)/.test(rawPath))return null;
 try{
  const url=new URL(href);if(url.origin!==APP_ORIGIN||url.username||url.password)return null;
  const name=url.pathname.slice(1);if(!approved.has(name))return null;
  let mime=name==='index.html'?'text/html; charset=utf-8':null;
  if(!mime&&/^(?:assets|schemas)\/[A-Za-z0-9_./-]+$/.test(name)){
   const extension=name.slice(name.lastIndexOf('.'));mime=mimeTypes[extension]??null;
   if(name.startsWith('schemas/')&&name!=='schemas/game-save.schema.json')mime=null;
  }
  return mime?{relativePath:name,mime,head:method==='HEAD'}:null;
 }catch{return null}
}
module.exports={APP_ORIGIN,contentPolicy,resolveAsset};
