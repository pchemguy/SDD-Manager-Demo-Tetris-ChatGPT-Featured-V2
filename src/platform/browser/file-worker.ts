/** Isolated portable-byte codec: no session, document, cookies, history or persistent storage. */
import {decodeJson,encodeJson} from '../../application/file-snapshot.js';
type Request={id:number;operation:'decode'|'encode';format?:'json'|'sqlite';value?:unknown;bytes?:ArrayBuffer};
const scope=globalThis as unknown as {onmessage:((event:MessageEvent<Request>)=>void)|null;postMessage:(value:unknown,transfer?:Transferable[])=>void};
scope.onmessage=event=>{
 const message=event.data;
 try{
  if(message.operation==='encode'){
   if(message.format!=='json')throw new Error('SQLite support is not available');
   const bytes=new TextEncoder().encode(encodeJson(message.value)).buffer;
   scope.postMessage({id:message.id,ok:true,bytes},[bytes]);
  }else if(message.operation==='decode'){
   if(!(message.bytes instanceof ArrayBuffer)||message.bytes.byteLength===0||message.bytes.byteLength>1048576)throw new RangeError('Choose a nonempty save file of at most 1 MiB');
   const bytes=new Uint8Array(message.bytes);
   if(bytes[0]===239&&bytes[1]===187&&bytes[2]===191)throw new Error('JSON must be UTF-8 without a byte-order mark');
   const value=decodeJson(new TextDecoder('utf-8',{fatal:true}).decode(bytes));scope.postMessage({id:message.id,ok:true,value});
  }else throw new Error('Unsupported file operation');
 }catch(error){scope.postMessage({id:message.id,ok:false,error:error instanceof SyntaxError?'Invalid JSON syntax':error instanceof Error?error.message.slice(0,200):'Invalid save file'})}
};
