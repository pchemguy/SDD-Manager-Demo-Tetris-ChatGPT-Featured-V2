/** Real selected contexts with narrow browser callback faults and observable write counts. */
import {test} from 'node:test';import assert from 'node:assert/strict';
import {createConfiguration} from '../../src/application/configuration.js';
const path='../../src/platform/browser/configuration-persistence.js';
const module=await import(path).catch(()=>({}));
function harness(href='https://game.test/nested/game/',cookieText=''){
 const calls={urlReads:0,cookieReads:0,cookies:[] as string[],urls:[] as string[]};
 const faults={urlRead:false,cookieRead:false,cookieWrite:false,urlWrite:false,failFirstCookie:false};
 const state={href,cookieText};
 const access={
  readUrl(){calls.urlReads++;if(faults.urlRead)throw Error('URL unavailable');return state.href},
  readCookies(){calls.cookieReads++;if(faults.cookieRead)throw Error('cookies unavailable');return state.cookieText},
  writeCookie(value:string){calls.cookies.push(value);if(faults.cookieWrite||(faults.failFirstCookie&&calls.cookies.length===1))throw Error('cookie denied')},
  replaceUrl(value:string){calls.urls.push(value);if(faults.urlWrite)throw Error('history denied');state.href=value},
 };
 const reset=()=>{calls.urlReads=0;calls.cookieReads=0;calls.cookies.length=0;calls.urls.length=0};
 const make=()=>{assert.equal(typeof module.createBrowserConfiguration,'function','Persisted selected configuration is required');return module.createBrowserConfiguration(access)};
 return {calls,faults,state,reset,make};
}
test('fresh defaults read each source once and never materialize fallback settings',()=>{
 const h=harness();const c=h.make();assert.deepEqual(c.getSnapshot(),createConfiguration().getSnapshot());
 assert.deepEqual(h.calls,{urlReads:1,cookieReads:1,cookies:[],urls:[]});
});
test('initial explicit defaults and false values override cookies and save exactly those six fields',()=>{
 const h=harness('https://game.test/nested/game/?ghostVisibility=always&hardDropEnabled=true&nextPreviewEnabled=true&hardDropLockPolicy=general&generalLockPolicy=gravity-interval&holdEnabled=false',
  'tetris_config_ghostVisibility=never; tetris_config_hardDropEnabled=false; tetris_config_holdEnabled=true');
 const c=h.make();assert.equal(c.getSnapshot().holdEnabled,false);assert.equal(c.getSnapshot().hardDropEnabled,true);assert.equal(c.getSnapshot().ghostVisibility,'always');
 assert.deepEqual(h.calls.cookies.map(x=>x.split(';')[0]),['tetris_config_ghostVisibility=always','tetris_config_hardDropEnabled=true','tetris_config_nextPreviewEnabled=true','tetris_config_hardDropLockPolicy=general','tetris_config_generalLockPolicy=gravity-interval','tetris_config_holdEnabled=false']);
 assert.equal(h.calls.cookies.every(x=>x.endsWith('; Secure')),true);assert.deepEqual(h.calls.urls,[]);
});
test('omitted and invalid URL keys retain saved values without writes/expiry refresh',()=>{
 const h=harness('http://game.test/?holdEnabled=bad&holdEnabled=true&unused=x','tetris_config_holdEnabled=false; tetris_config_nextPreviewEnabled=false; tetris_config_generalLockPolicy=failed-downward');
 const c=h.make();assert.equal(c.getSnapshot().holdEnabled,false);assert.equal(c.getSnapshot().nextPreviewEnabled,false);assert.equal(c.getSnapshot().generalLockPolicy,'failed-downward');
 assert.deepEqual(h.calls.cookies,[]);assert.deepEqual(h.calls.urls,[]);
});
test('actual edit and return to default save one field and use the current URL without filling others',()=>{
 const h=harness();const c=h.make();h.reset();h.state.href='https://game.test/nested/game/?u=one&u=two#now';
 const first=c.update({holdEnabled:false});assert.equal(first.holdEnabled,false);first.holdEnabled=true;assert.equal(c.getSnapshot().holdEnabled,false);
 assert.equal(h.calls.cookies.length,1);assert.match(h.calls.cookies[0],/^tetris_config_holdEnabled=false;/);assert.equal(h.calls.urlReads,1);assert.equal(h.calls.cookieReads,0);
 const url=new URL(h.calls.urls[0]);assert.equal(url.hash,'#now');assert.deepEqual(url.searchParams.getAll('u'),['one','two']);assert.equal(url.searchParams.size,3);
 h.reset();c.update({holdEnabled:true});assert.match(h.calls.cookies[0],/^tetris_config_holdEnabled=true;/);assert.equal(new URL(h.calls.urls[0]).searchParams.get('holdEnabled'),'true');
});
test('empty/equal and rejected mixed patches have no persistence effects or source reads',()=>{
 const h=harness();const c=h.make();h.reset();const before=c.getSnapshot();
 for(const patch of [{},before,{holdEnabled:true}])assert.deepEqual(c.update(patch),before);
 for(const patch of [null,[],{holdEnabled:false,unknown:1},{holdEnabled:false,generalLockPolicy:'invalid'},{[Symbol('key')]:true}])assert.throws(()=>c.update(patch),TypeError);
 const fail=Error('getter');assert.throws(()=>c.update({holdEnabled:false,get nextPreviewEnabled(){throw fail}}),e=>e===fail);
 assert.deepEqual(c.getSnapshot(),before);assert.deepEqual(h.calls,{urlReads:0,cookieReads:0,cookies:[],urls:[]});
});
test('multi-field updates commit atomically then save changed fields and replace the URL once',()=>{
 const h=harness();const c=h.make();h.reset();h.faults.failFirstCookie=true;
 const result=c.update({holdEnabled:false,ghostVisibility:'never',hardDropEnabled:true,generalLockPolicy:'failed-downward'});
 assert.equal(result.holdEnabled,false);assert.equal(result.ghostVisibility,'never');
 assert.deepEqual(h.calls.cookies.map(x=>x.split(';')[0]),['tetris_config_ghostVisibility=never','tetris_config_generalLockPolicy=failed-downward','tetris_config_holdEnabled=false']);
 assert.equal(h.calls.urls.length,1);assert.equal(h.calls.urlReads,1);
 const url=new URL(h.calls.urls[0]);assert.equal(url.searchParams.size,3);assert.equal(url.searchParams.get('ghostVisibility'),'never');
});
test('unreadable cookie source cannot suppress valid URL restoration or explicit cookie save',()=>{
 const h=harness('https://game.test/?holdEnabled=false');h.faults.cookieRead=true;const c=h.make();
 assert.equal(c.getSnapshot().holdEnabled,false);assert.equal(h.calls.cookies.length,1);
});
test('unreadable initial URL keeps cookie fallback and skips unknown-scope cookie writes',()=>{
 const h=harness('https://game.test/?holdEnabled=true','tetris_config_holdEnabled=false');h.faults.urlRead=true;
 const c=h.make();assert.equal(c.getSnapshot().holdEnabled,false);h.reset();h.faults.urlRead=false;c.update({holdEnabled:true});
 assert.deepEqual(h.calls.cookies,[]);assert.equal(h.calls.urls.length,1);
});
test('invalid/unsupported/unsafe initial URL cannot block saved selections or broaden cookie scope',()=>{
 for(const href of ['invalid','file:///game/index.html','https://game.test/;unsafe/game/']){
  const h=harness(href,'tetris_config_holdEnabled=false');const c=h.make();assert.equal(c.getSnapshot().holdEnabled,false);h.reset();c.update({holdEnabled:true});assert.deepEqual(h.calls.cookies,[]);
 }
});
for(const fault of ['cookieWrite','urlRead','urlWrite'] as const)test(fault+' failure leaves valid updates committed and the independent effect attempted',()=>{
 const h=harness();const c=h.make();h.reset();h.faults[fault]=true;
 assert.equal(c.update({holdEnabled:false}).holdEnabled,false);assert.equal(c.getSnapshot().holdEnabled,false);
 assert.equal(h.calls.cookies.length,1);
 assert.equal(h.calls.urls.length,fault==='urlRead'?0:1);
});
test('initial cookie write failure does not suppress other explicit fields or returned restoration',()=>{
 const h=harness('https://game.test/?holdEnabled=false&ghostVisibility=never');h.faults.failFirstCookie=true;
 const c=h.make();assert.equal(c.getSnapshot().holdEnabled,false);assert.equal(c.getSnapshot().ghostVisibility,'never');assert.equal(h.calls.cookies.length,2);
});
test('both persistence writes may fail without rolling back selections or adding retries',()=>{
 const h=harness();const c=h.make();h.reset();h.faults.cookieWrite=h.faults.urlWrite=true;
 assert.equal(c.update({holdEnabled:false}).holdEnabled,false);assert.equal(h.calls.cookies.length,1);assert.equal(h.calls.urls.length,1);
});
test('retained contexts do not reread sources, and new pure contexts remain independent defaults',()=>{
 const h=harness('https://game.test/?holdEnabled=false');const a=h.make();h.reset();h.state.href='https://game.test/';h.state.cookieText='tetris_config_holdEnabled=true';
 assert.equal(a.getSnapshot().holdEnabled,false);assert.equal(a.update({}).holdEnabled,false);assert.deepEqual(h.calls,{urlReads:0,cookieReads:0,cookies:[],urls:[]});
 const snapshot=a.getSnapshot();snapshot.holdEnabled=true;assert.equal(a.getSnapshot().holdEnabled,false);
 assert.equal(h.make().getSnapshot().holdEnabled,true);assert.equal(createConfiguration().getSnapshot().holdEnabled,true);
});
