/** Lazy local WASM loading: reject unavailable/corrupt assets before starting the SDK. */
import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm-browser.wasm?url';
export async function loadSqlite(){
 try{
  const response=await fetch(wasmUrl,{credentials:'same-origin'});
  if(!response.ok)throw new Error('SQLite asset unavailable');
  const wasmBinary=new Uint8Array(await response.arrayBuffer());
  if(!WebAssembly.validate(wasmBinary))throw new Error('Invalid SQLite runtime asset');
  return await initSqlJs({wasmBinary,locateFile:()=>wasmUrl,printErr:()=>{/* Operation errors are reported through the worker protocol. */}});
 }catch(cause){throw new Error('SQLite runtime could not initialize',{cause})}
}
