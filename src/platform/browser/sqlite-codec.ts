/** C-11: fixed-query SQLite adaptation of the canonical complete portable snapshot. */
import type {Database,SqlJsStatic,SqlValue} from 'sql.js';
import {validateSnapshot,type FileSnapshot} from '../../application/file-snapshot.js';
import {createConfiguration} from '../../application/configuration.js';
import {configurationKeys} from './configuration-codec.js';
const applicationId=0x54455452;
const rows=(db:Database,sql:string):SqlValue[][]=>db.exec(sql)[0]?.values??[];
const scalar=(db:Database,sql:string):SqlValue|undefined=>rows(db,sql)[0]?.[0];
/** All file values enter through bound parameters after full domain validation. */
export function encodeSqlite(SQL:SqlJsStatic,value:unknown):Uint8Array {
 const data=validateSnapshot(value),db=new SQL.Database();
 try{
  db.run(`PRAGMA application_id=${applicationId}; PRAGMA user_version=1;
   CREATE TABLE high_scores(id TEXT NOT NULL PRIMARY KEY,score INTEGER NOT NULL CHECK(typeof(score)='integer' AND score>=0 AND score<=9007199254740991),timestamp TEXT NOT NULL);
   CREATE TABLE settings(key TEXT NOT NULL PRIMARY KEY,value TEXT NOT NULL);`);
  for(const result of data.results)db.run('INSERT INTO high_scores(id,score,timestamp) VALUES (?,?,?)',[result.id,result.score,result.timestamp]);
  for(const key of configurationKeys)db.run('INSERT INTO settings(key,value) VALUES (?,?)',[key,String(data.settings[key])]);
  return Uint8Array.from(db.export());
 }finally{db.close()}
}
/** Inspect schema before reading data; never execute schema SQL or arbitrary file queries. */
export function decodeSqlite(SQL:SqlJsStatic,bytes:Uint8Array):FileSnapshot {
 if(!(bytes instanceof Uint8Array))throw new TypeError('SQLite bytes required');
 if(bytes.length===0||bytes.length>1048576)throw new RangeError('Choose a nonempty save file of at most 1 MiB');
 if(new TextDecoder().decode(bytes.slice(0,16))!=='SQLite format 3\0')throw new RangeError('Invalid SQLite file signature');
 let db:Database|undefined;
 try{
  db=new SQL.Database(bytes);
  // Integrity checks must not evaluate user-supplied CHECK expressions or schema functions.
  db.run('PRAGMA trusted_schema=OFF; PRAGMA ignore_check_constraints=ON; PRAGMA query_only=ON;');
  if(scalar(db,'PRAGMA application_id')!==applicationId||scalar(db,'PRAGMA user_version')!==1)throw new Error('Unsupported SQLite snapshot metadata');
  const schema=rows(db,'SELECT type,name,tbl_name,sql FROM sqlite_schema');
  const expectedNames=new Set(['high_scores','settings']);
  for(const [type,name,table,sql] of schema){
   if(type==='table'&&expectedNames.has(String(name)))continue;
   if(type==='index'&&sql===null&&expectedNames.has(String(table))&&String(name).startsWith('sqlite_autoindex_'))continue;
   throw new Error('Unexpected SQLite schema object');
  }
  if(schema.filter(r=>r[0]==='table').length!==2)throw new Error('Missing snapshot tables');
  const tableList=rows(db,'PRAGMA table_list');
  for(const [name,columns] of [['high_scores',[['id','TEXT'],['score','INTEGER'],['timestamp','TEXT']]],['settings',[['key','TEXT'],['value','TEXT']]]] as const){
   const info=rows(db,'PRAGMA table_xinfo('+name+')');
   if(info.length!==columns.length||info.some((r,i)=>r[1]!==columns[i][0]||String(r[2]).toUpperCase()!==columns[i][1]||r[3]!==1||r[4]!==null||r[5]!==Number(i===0)||r[6]!==0))throw new Error('Invalid snapshot columns');
   const table=tableList.find(r=>r[0]==='main'&&r[1]===name);
   if(!table||table[2]!=='table'||table[4]!==0)throw new Error('Ordinary rowid tables required');
   if(rows(db,'PRAGMA foreign_key_list('+name+')').length||rows(db,'PRAGMA index_list('+name+')').some(r=>r[3]!=='pk'))throw new Error('Unexpected table dependencies');
  }
  if(scalar(db,'PRAGMA integrity_check')!=='ok')throw new Error('SQLite integrity check failed');
  const resultRows=rows(db,'SELECT id,CAST(score AS TEXT),timestamp,typeof(id),typeof(score),typeof(timestamp) FROM high_scores ORDER BY rowid');
  if(resultRows.length>10)throw new Error('Too many results');
  const results=resultRows.map(r=>{
   if(r[3]!=='text'||r[4]!=='integer'||r[5]!=='text'||typeof r[1]!=='string'||!/^\d+$/.test(r[1]))throw new Error('Invalid result storage classes');
   const score=BigInt(r[1]);if(score>BigInt(Number.MAX_SAFE_INTEGER))throw new Error('Unsafe integer score');
   return {id:r[0],score:Number(score),timestamp:r[2]};
  });
  const settingRows=rows(db,'SELECT key,value,typeof(key),typeof(value) FROM settings');
  if(settingRows.length!==6||settingRows.some(r=>r[2]!=='text'||r[3]!=='text'))throw new Error('Six text settings required');
  const defaults=createConfiguration().getSnapshot();
  const settings=Object.fromEntries(settingRows.map(([key,value])=>{const name=String(key);const boolean=Object.hasOwn(defaults,name)&&typeof defaults[name as keyof typeof defaults]==='boolean';return [name,boolean?(value==='true'?true:value==='false'?false:value):value]}));
  return validateSnapshot({formatVersion:1,results,settings});
 }catch(cause){throw new RangeError('Invalid SQLite snapshot: unsupported structure, version, integrity or data',{cause})}
 finally{db?.close()}
}
