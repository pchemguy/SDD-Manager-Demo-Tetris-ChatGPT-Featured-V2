/** Used subset of the pinned sql.js API; the runtime remains an external dependency. */
declare module 'sql.js' {
 export type SqlValue=string|number|Uint8Array|null;
 export interface Database {run(sql:string,params?:SqlValue[]):Database;exec(sql:string):{columns:string[];values:SqlValue[][]}[];export():Uint8Array;close():void}
 export interface SqlJsStatic {Database:new(bytes?:Uint8Array)=>Database}
 export default function initSqlJs(options?:{wasmBinary?:Uint8Array;locateFile?:(name:string)=>string;printErr?:(message:string)=>void}):Promise<SqlJsStatic>;
}
