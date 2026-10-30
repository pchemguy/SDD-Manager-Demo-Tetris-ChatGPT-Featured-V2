/** Persistence formats use literal domains and independent source/attribute expectations. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createConfiguration,type GameConfiguration} from '../../src/application/configuration.js';
const codecPath='../../src/platform/browser/configuration-codec.js',domainPath='../../src/application/configuration.js';
const codec=await import(codecPath).catch(()=>({})),domain=await import(domainPath);
const defaults=()=>createConfiguration().getSnapshot();
const resolve=(search:string,cookies='')=>{assert.equal(typeof codec.resolveConfiguration,'function','Persistence resolution is required');return codec.resolveConfiguration(search,cookies,defaults())};
const domains:Record<keyof GameConfiguration,readonly unknown[]>={ghostVisibility:['never','lower-half','always'],hardDropEnabled:[false,true],nextPreviewEnabled:[false,true],hardDropLockPolicy:['general','immediate'],generalLockPolicy:['failed-downward','gravity-interval'],holdEnabled:[false,true]};
test('canonical validator agrees with updates for each valid domain and rejects unknown runtime keys',()=>{
 assert.equal(typeof domain.isConfigurationValue,'function');
 for(const [key,values] of Object.entries(domains))for(const value of values){assert.equal(domain.isConfigurationValue(key,value),true);assert.doesNotThrow(()=>createConfiguration().update({[key]:value}))}
 for(const key of ['unknown','__proto__','constructor',Symbol('key')])assert.equal(domain.isConfigurationValue(key,true),false);
 for(const [key] of Object.entries(domains))for(const value of [null,undefined,0,1,{},[],'TRUE','False','',NaN])assert.equal(domain.isConfigurationValue(key,value),false);
});
test('all96 complete selections round-trip URL and canonical cookie text without changing defaults',()=>{
 let count=0;
 for(const ghostVisibility of ['never','lower-half','always'])
 for(const hardDropEnabled of [false,true])for(const nextPreviewEnabled of [false,true])
 for(const hardDropLockPolicy of ['general','immediate'])for(const generalLockPolicy of ['failed-downward','gravity-interval'])
 for(const holdEnabled of [false,true]){
  const value={ghostVisibility,hardDropEnabled,nextPreviewEnabled,hardDropLockPolicy,generalLockPolicy,holdEnabled};
  const search='?'+new URLSearchParams(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,String(v)])));
  assert.deepEqual(resolve(search).values,value);assert.deepEqual(resolve(search).urlValues,value);
  const cookies=Object.entries(value).map(([k,v])=>'tetris_config_'+k+'='+v).join('; ');
  assert.deepEqual(resolve('',cookies),{values:value,urlValues:{}});count++;
 }
 assert.equal(count,96);assert.equal(defaults().ghostVisibility,'always');
});
for(const [key,values] of Object.entries(domains))test(key+': URL > cookie > default, including false/default and invalid-first fallback',()=>{
 const saved=values[0],explicit=values.at(-1),cookie='other=value; tetris_config_'+key+'='+saved;
 assert.equal(resolve('?'+key+'='+explicit,cookie).values[key],explicit);
 assert.equal(resolve('',cookie).values[key],saved);
 for(const invalid of ['', 'TRUE','invalid','%20true','true%20','%E0%A4%A']){
  const result=resolve('?'+key+'='+invalid+'&'+key+'='+explicit,cookie);
  assert.equal(result.values[key],saved);assert.deepEqual(result.urlValues,{});
 }
 assert.equal(resolve('','tetris_config_'+key+'=invalid').values[key],defaults()[key as keyof GameConfiguration]);
 assert.equal(resolve('?'+key+'='+saved+'&'+key+'='+explicit,cookie).values[key],saved);
});
test('mixed source resolution retains independent values and only valid explicit URL fields',()=>{
 assert.deepEqual(resolve('?ghostVisibility=never&holdEnabled=true&hardDropEnabled=INVALID&unused=x',
  'tetris_config_hardDropEnabled=false; tetris_config_nextPreviewEnabled=false; tetris_config_holdEnabled=false; tetris_config_generalLockPolicy=failed-downward'),
 {values:{ghostVisibility:'never',holdEnabled:true,hardDropEnabled:false,nextPreviewEnabled:false,generalLockPolicy:'failed-downward',hardDropLockPolicy:'general'},urlValues:{ghostVisibility:'never',holdEnabled:true}});
 assert.deepEqual(resolve('?%68oldEnabled=%66alse&__proto__=true&ghostVisibility=always').urlValues,{ghostVisibility:'always',holdEnabled:false});
});
test('cookie exact values, first duplicates and delimiter names cannot introduce unknown keys',()=>{
 assert.equal(resolve('', ' tetris_config_holdEnabled=false; tetris_config_holdEnabled=true').values.holdEnabled,false);
 assert.equal(resolve('', 'tetris_config_holdEnabled=invalid; tetris_config_holdEnabled=false').values.holdEnabled,true);
 for(const text of ['"false"','%66alse','false=extra','false ',' false'])assert.equal(resolve('','tetris_config_holdEnabled='+text).values.holdEnabled,true);
 assert.equal(resolve('', 'prefix_tetris_config_holdEnabled=false; tetris_config_holdEnabled_suffix=false; __proto__=false').values.holdEnabled,true);
 assert.equal(Object.keys(resolve('?unknown=true','tetris_config_unknown=false').values).length,6);
});
test('resolution returns detached values/subsets and leaves supplied defaults unchanged',()=>{
 assert.equal(typeof codec.resolveConfiguration,'function');const input=Object.freeze(defaults());
 const first=codec.resolveConfiguration('?holdEnabled=false','',input);first.values.holdEnabled=true;first.urlValues.holdEnabled=true;
 assert.equal(codec.resolveConfiguration('?holdEnabled=false','',input).values.holdEnabled,false);assert.equal(input.holdEnabled,true);
});
test('cookie scope is the literal page directory and cannot broaden unsafe/unsupported paths',()=>{
 assert.equal(typeof codec.cookieScope,'function');
 for(const [href,path,secure] of [['http://game.test/','/',false],['https://game.test/nested/game/','/nested/game/',true],['http://game.test/nested/game/index.html?q=x#h','/nested/game/',false],['https://game.test/a%20b/index.html','/a%20b/',true],['http://game.test/game','/',false]] as const)
 assert.deepEqual(codec.cookieScope(href),{path,secure});
 for(const href of ['file:///game/index.html','about:blank','invalid','https://game.test/nested/;Domain=other/game/'])assert.equal(codec.cookieScope(href),null);
});
test('cookie assignments use exact one-year host-only attributes on HTTP/HTTPS',()=>{
 assert.equal(typeof codec.cookieAssignment,'function');
 assert.equal(codec.cookieAssignment('holdEnabled',false,{path:'/nested/game/',secure:false}),'tetris_config_holdEnabled=false; Max-Age=31536000; Path=/nested/game/; SameSite=Lax');
 assert.equal(codec.cookieAssignment('ghostVisibility','lower-half',{path:'/',secure:true}),'tetris_config_ghostVisibility=lower-half; Max-Age=31536000; Path=/; SameSite=Lax; Secure');
});
test('URL updates change only selected keys, collapse their duplicates and retain other semantic entries/hash',()=>{
 assert.equal(typeof codec.updateConfigurationUrl,'function');
 const before='https://game.test/nested/game/?hardDropEnabled=false&u=hello%20world&u=two&hardDropEnabled=true&holdEnabled=false&holdEnabled=true#landing';
 const after=new URL(codec.updateConfigurationUrl(before,{hardDropEnabled:true,ghostVisibility:'always'}));
 assert.equal(after.origin,'https://game.test');assert.equal(after.pathname,'/nested/game/');assert.equal(after.hash,'#landing');
 assert.deepEqual(after.searchParams.getAll('hardDropEnabled'),['true']);assert.deepEqual(after.searchParams.getAll('holdEnabled'),['false','true']);
 assert.deepEqual(after.searchParams.getAll('u'),['hello world','two']);assert.equal(after.searchParams.get('ghostVisibility'),'always');
 assert.equal(after.searchParams.has('nextPreviewEnabled'),false);assert.equal(after.searchParams.has('generalLockPolicy'),false);
});
