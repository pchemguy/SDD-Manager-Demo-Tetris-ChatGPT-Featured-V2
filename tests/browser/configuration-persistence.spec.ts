/** Actual page entry, native settings and browser cookies/history across shipped targets. */
import {test,expect} from './test-base.js';
import type {Page,BrowserContext} from '@playwright/test';
const fields={ghostVisibility:'ghost',hardDropEnabled:'hard-drop',nextPreviewEnabled:'preview',hardDropLockPolicy:'immediate',generalLockPolicy:'general',holdEnabled:'hold'} as const;
const defaults={ghostVisibility:'always',hardDropEnabled:true,nextPreviewEnabled:true,hardDropLockPolicy:'general',generalLockPolicy:'gravity-interval',holdEnabled:true};
async function controls(page:Page,values:Record<string,string|boolean>){
 for(const [key,value] of Object.entries(values)){
  const control=page.locator('[data-option="'+fields[key as keyof typeof fields]+'"]');
  if(key==='hardDropLockPolicy'){if(value==='immediate')await expect(control).toBeChecked();else await expect(control).not.toBeChecked()}
  else if(typeof value==='boolean'){if(value)await expect(control).toBeChecked();else await expect(control).not.toBeChecked()}
  else await expect(control).toHaveValue(value);
 }
}
async function saved(context:BrowserContext,baseURL:string,values:Record<string,string|boolean>){const url=new URL(baseURL);await context.addCookies(Object.entries(values).map(([key,value])=>({name:'tetris_config_'+key,value:String(value),domain:url.hostname,path:url.pathname,secure:url.protocol==='https:',sameSite:'Lax' as const})))}
async function cookieValues(context:BrowserContext,baseURL:string){return Object.fromEntries((await context.cookies(baseURL)).filter(c=>c.name.startsWith('tetris_config_')).map(c=>[c.name.slice('tetris_config_'.length),c.value]))}
test.beforeEach(async({page},info)=>{await page.setViewportSize({width:1000,height:1800});await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));if(!info.title.includes('earned penetrator inventory'))await page.addInitScript(()=>{Math.random=()=>0.999999})});
test('@persistence all six URL selections restore before play and save explicit defaults',async({page,context,baseURL})=>{
 await saved(context,baseURL!,{ghostVisibility:'never',hardDropEnabled:false,nextPreviewEnabled:false,hardDropLockPolicy:'immediate',generalLockPolicy:'failed-downward',holdEnabled:false});
 const query=new URLSearchParams(Object.fromEntries(Object.entries(defaults).map(([k,v])=>[k,String(v)]))).toString();
 await page.goto('./?'+query);await controls(page,defaults);await expect(page.getByTestId('status')).toHaveText('Ready');
 expect(await cookieValues(context,baseURL!)).toEqual(Object.fromEntries(Object.entries(defaults).map(([k,v])=>[k,String(v)])));
 expect(new URL(page.url()).search).toBe('?'+query);
 await page.goto('./?ghostVisibility=lower-half&hardDropEnabled=false&nextPreviewEnabled=false&hardDropLockPolicy=immediate&generalLockPolicy=failed-downward&holdEnabled=false');
 await controls(page,{ghostVisibility:'lower-half',hardDropEnabled:false,nextPreviewEnabled:false,hardDropLockPolicy:'immediate',generalLockPolicy:'failed-downward',holdEnabled:false});
 await expect(page.locator('[data-option="immediate"]')).toBeDisabled();
});
test('@persistence omitted and invalid-first URL fields retain independent cookies and defaults',async({page,context,baseURL})=>{
 await saved(context,baseURL!,{ghostVisibility:'lower-half',hardDropEnabled:false,holdEnabled:false,hardDropLockPolicy:'immediate'});
 const before=await context.cookies(baseURL!);
 await page.goto('./?ghostVisibility=never&hardDropEnabled=INVALID&hardDropEnabled=true&holdEnabled=&unused=x#keep');
 await controls(page,{ghostVisibility:'never',hardDropEnabled:false,holdEnabled:false,hardDropLockPolicy:'immediate',nextPreviewEnabled:true,generalLockPolicy:'gravity-interval'});
 const values=await cookieValues(context,baseURL!);expect(values).toEqual({ghostVisibility:'never',hardDropEnabled:'false',holdEnabled:'false',hardDropLockPolicy:'immediate'});
 for(const cookie of before.filter(c=>c.name!=='tetris_config_ghostVisibility'))expect((await context.cookies(baseURL!)).find(c=>c.name===cookie.name)).toEqual(cookie);
 expect(new URL(page.url()).searchParams.has('nextPreviewEnabled')).toBe(false);expect(new URL(page.url()).hash).toBe('#keep');
});
test('@persistence native edits save all fields and replace history without navigating',async({page,context,baseURL})=>{
 await page.goto('./?u=hello%20world&u=two&holdEnabled=true&holdEnabled=false#fragment');
 await page.evaluate(()=>history.replaceState({anchor:{id:7}},''));
 const length=await page.evaluate(()=>history.length);let navigations=0;page.on('request',request=>{if(request.isNavigationRequest())navigations++});
 await page.locator('[data-option="ghost"]').selectOption('never');
 await page.locator('[data-option="preview"]').uncheck();
 await page.locator('[data-option="immediate"]').check();
 await page.locator('[data-option="general"]').selectOption('failed-downward');
 await page.locator('[data-option="hard-drop"]').uncheck();
 await page.locator('[data-option="hold"]').uncheck();
 const expected={ghostVisibility:'never',hardDropEnabled:'false',nextPreviewEnabled:'false',hardDropLockPolicy:'immediate',generalLockPolicy:'failed-downward',holdEnabled:'false'};
 expect(await cookieValues(context,baseURL!)).toEqual(expected);
 const url=new URL(page.url());for(const [key,value] of Object.entries(expected))expect(url.searchParams.getAll(key)).toEqual([value]);
 expect(url.searchParams.getAll('u')).toEqual(['hello world','two']);expect(url.hash).toBe('#fragment');
 expect(await page.evaluate(()=>history.state)).toEqual({anchor:{id:7}});expect(await page.evaluate(()=>history.length)).toBe(length);expect(navigations).toBe(0);
 await expect(page.getByTestId('status')).toHaveText('Ready');await expect(page.locator('[data-option="hold"]')).toBeFocused();
 await page.reload();await controls(page,{ghostVisibility:'never',hardDropEnabled:false,nextPreviewEnabled:false,hardDropLockPolicy:'immediate',generalLockPolicy:'failed-downward',holdEnabled:false});
 await expect(page.getByTestId('status')).toHaveText('Ready');
});
test('@persistence native return to each default remains explicit in cookies and URL',async({page,context,baseURL})=>{
 await page.goto('./?ghostVisibility=never&hardDropEnabled=false&nextPreviewEnabled=false&hardDropLockPolicy=immediate&generalLockPolicy=failed-downward&holdEnabled=false');
 await page.locator('[data-option="hard-drop"]').check();
 await page.locator('[data-option="ghost"]').selectOption('always');
 await page.locator('[data-option="preview"]').check();
 await page.locator('[data-option="immediate"]').uncheck();
 await page.locator('[data-option="general"]').selectOption('gravity-interval');
 await page.locator('[data-option="hold"]').check();
 await controls(page,defaults);
 expect(await cookieValues(context,baseURL!)).toEqual(Object.fromEntries(Object.entries(defaults).map(([k,v])=>[k,String(v)])));
 for(const [key,value] of Object.entries(defaults))expect(new URL(page.url()).searchParams.get(key)).toBe(String(value));
});
test('@persistence cookies restore when URL keys are omitted and pending rules apply only on Restart',async({page,context,baseURL})=>{
 await saved(context,baseURL!,{ghostVisibility:'never',nextPreviewEnabled:false,hardDropLockPolicy:'immediate'});
 await page.goto('./');await controls(page,{ghostVisibility:'never',nextPreviewEnabled:false,hardDropLockPolicy:'immediate'});
 expect(new URL(page.url()).search).toBe('');
 await page.getByRole('button',{name:'Start game'}).click();
 await expect(page.getByTestId('next-type')).toHaveText('Off');await expect(page.locator('[data-ghost="true"]')).toHaveCount(0);
 await page.locator('[data-option="hard-drop"]').uncheck();await page.locator('[data-option="hold"]').uncheck();await page.locator('[data-option="general"]').selectOption('failed-downward');
 await expect(page.getByTestId('settings-summary')).toContainText('Pending');await expect(page.getByRole('button',{name:'Hard drop',exact:true})).toBeEnabled();
 await expect(page.getByRole('button',{name:'Hold piece',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Restart',exact:true}).click();
 await expect(page.getByRole('button',{name:'Hard drop',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'Hold piece',exact:true})).toBeDisabled();
 await expect(page.locator('[data-option="immediate"]')).toBeChecked();await expect(page.locator('[data-option="immediate"]')).toBeDisabled();
 await page.goto('./');await controls(page,{ghostVisibility:'never',nextPreviewEnabled:false,hardDropEnabled:false,holdEnabled:false,generalLockPolicy:'failed-downward',hardDropLockPolicy:'immediate'});await expect(page.getByTestId('status')).toHaveText('Ready');
});

test('@persistence-lifetime cookie attributes expiry host and directory scope are actual browser behavior',async({page,context,baseURL})=>{
 await context.addCookies([{name:'unrelated',value:'keep',url:baseURL!},{name:'tetris_config_hardDropEnabled',value:'false',url:baseURL!,expires:Math.floor(Date.now()/1000)-10}]);
 const before=(await context.cookies(baseURL!)).find(c=>c.name==='unrelated');
 await page.goto('./?holdEnabled=false');
 await controls(page,{holdEnabled:false,hardDropEnabled:true});
 const cookies=await context.cookies(baseURL!),cookie=cookies.find(c=>c.name==='tetris_config_holdEnabled')!;
 expect(cookie.value).toBe('false');expect(cookie.path).toBe(new URL(baseURL!).pathname);expect(cookie.sameSite).toBe('Lax');expect(cookie.httpOnly).toBe(false);expect(cookie.secure).toBe(false);
 expect(Math.abs(cookie.expires-(Date.now()/1000+31536000))).toBeLessThan(30);
 expect(cookies.find(c=>c.name==='unrelated')).toEqual(before);expect(cookies.some(c=>c.name==='tetris_config_hardDropEnabled')).toBe(false);
 const otherHost=new URL(baseURL!);otherHost.hostname='localhost';
 expect((await context.cookies(otherHost.href)).some(c=>c.name==='tetris_config_holdEnabled')).toBe(false);
 if(cookie.path!=='/'){
  const sibling=new URL('../other/',baseURL!).href;
  expect((await context.cookies(sibling)).some(c=>c.name==='tetris_config_holdEnabled')).toBe(false);
 }
});
for(const fault of ['cookie','history','both'])test('@persistence-lifetime blocked '+fault+' effects retain play and the independent persistence source',async({page,context,baseURL})=>{
 await page.addInitScript(mode=>{
  if(mode==='cookie'||mode==='both')Object.defineProperty(document,'cookie',{configurable:true,get(){throw Error('Cookie reads denied')},set(){throw Error('Cookie writes denied')}});
  if(mode==='history'||mode==='both')history.replaceState=()=>{throw Error('History denied')};
 },fault);
 await page.goto('./?ghostVisibility=lower-half&holdEnabled=false');
 await controls(page,{ghostVisibility:'lower-half',holdEnabled:false});
 await page.getByRole('button',{name:'Start game'}).click();
 await expect(page.getByRole('button',{name:'Hold piece',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 await page.locator('[data-option="ghost"]').selectOption('never');
 await page.locator('[data-option="preview"]').uncheck();
 await expect(page.getByTestId('status')).toHaveText('Paused');await expect(page.locator('[data-ghost="true"]')).toHaveCount(0);await expect(page.getByTestId('next-type')).toHaveText('Off');
 expect(new URL(page.url()).searchParams.get('ghostVisibility')).toBe(fault==='cookie'?'never':'lower-half');
 const cookies=await cookieValues(context,baseURL!);
 if(fault==='history')expect(cookies).toEqual({ghostVisibility:'never',holdEnabled:'false',nextPreviewEnabled:'false'});else expect(cookies).toEqual({});
 await page.getByRole('button',{name:'Resume',exact:true}).click();await page.keyboard.press('ArrowDown');await expect(page.getByTestId('score')).toHaveText('1');
});
test('@persistence-lifetime other pages stay unchanged until reload and their explicit URLs still win',async({page,context,baseURL})=>{
 await page.goto('./');const other=await context.newPage(),errors:string[]=[];
 other.on('pageerror',e=>errors.push(e.message));other.on('console',e=>{if(e.type()==='error')errors.push(e.text())});
 try{
  await other.goto(baseURL!);
  await page.locator('[data-option="ghost"]').selectOption('never');
  await page.locator('[data-option="hold"]').uncheck();
  await controls(other,{ghostVisibility:'always',holdEnabled:true});
  await other.reload();await controls(other,{ghostVisibility:'never',holdEnabled:false});expect(new URL(other.url()).search).toBe('');
  await other.locator('[data-option="ghost"]').selectOption('always');await controls(page,{ghostVisibility:'never'});
  await page.reload();await controls(page,{ghostVisibility:'never',holdEnabled:false});
  expect((await cookieValues(context,baseURL!)).ghostVisibility).toBe('never');
 }finally{await other.close()}
 expect(errors).toEqual([]);
});
test('@persistence-lifetime reopened browser context restores six saved values into a fresh Ready game',async({page,context,browser,baseURL})=>{
 await page.goto('./?ghostVisibility=never&hardDropEnabled=false&nextPreviewEnabled=false&hardDropLockPolicy=immediate&generalLockPolicy=failed-downward&holdEnabled=false');
 await page.getByRole('button',{name:'Start game'}).click();await page.keyboard.press('ArrowDown');await expect(page.getByTestId('score')).toHaveText('1');
 const state=await context.storageState(),reopened=await browser.newContext({storageState:state,viewport:{width:1000,height:1800}}),other=await reopened.newPage(),errors:string[]=[];
 other.on('pageerror',e=>errors.push(e.message));other.on('console',e=>{if(e.type()==='error')errors.push(e.text())});
 try{
  await other.goto(baseURL!);await controls(other,{ghostVisibility:'never',hardDropEnabled:false,nextPreviewEnabled:false,hardDropLockPolicy:'immediate',generalLockPolicy:'failed-downward',holdEnabled:false});
  await expect(other.getByTestId('status')).toHaveText('Ready');await expect(other.getByTestId('score')).toHaveText('0');await expect(other.getByTestId('penetrator-bonuses')).toHaveAttribute('aria-label','Penetrator bonuses: 0');await expect(other.locator('[data-active="true"]')).toHaveCount(0);expect(new URL(other.url()).search).toBe('');
 }finally{await reopened.close()}
 expect(errors).toEqual([]);
});
test('@persistence-lifetime paused live display edits save without changing the active rules or piece',async({page,context,baseURL},info)=>{
 await page.goto('./');await page.getByRole('button',{name:'Start game'}).click();await page.getByRole('button',{name:'Pause',exact:true}).click();
 const before=await page.locator('[data-active="true"]').evaluateAll(ns=>ns.map(n=>[n.getAttribute('data-x'),n.getAttribute('data-y')]));
 await page.locator('[data-option="ghost"]').selectOption('never');await page.locator('[data-option="preview"]').uncheck();await page.locator('[data-option="hard-drop"]').uncheck();
 await expect(page.getByTestId('status')).toHaveText('Paused');await expect(page.getByTestId('settings-summary')).toContainText('Pending');
 expect(await page.locator('[data-active="true"]').evaluateAll(ns=>ns.map(n=>[n.getAttribute('data-x'),n.getAttribute('data-y')]))).toEqual(before);
 expect(await cookieValues(context,baseURL!)).toEqual({ghostVisibility:'never',nextPreviewEnabled:'false',hardDropEnabled:'false'});
 for(const width of [320,1000]){await page.setViewportSize({width,height:1800});await page.locator('[data-option="ghost"]').focus();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath('persisted-paused-'+width+'.png'),fullPage:true})}
});
test('@persistence-lifetime earned penetrator inventory and score reset on reload while selections restore',async({page})=>{
 const {WELL,BAGS,traceRandom}=await import('../fixtures/penetrator-gameplay.js'),random=traceRandom();
 await page.addInitScript(values=>{let index=0;Math.random=()=>values[index++]??0.999999},Array.from({length:BAGS.length*6},random));
 await page.goto('./?hardDropLockPolicy=immediate&ghostVisibility=never');
 await page.getByRole('button',{name:'Start game'}).click();
 for(const [type,rotation,x] of WELL){
  await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-kind',type);
  for(let n=0;n<rotation;n++)await page.keyboard.press('ArrowUp');
  for(let n=0;n<Math.abs(x-(type==='O'?4:3));n++)await page.keyboard.press(x<(type==='O'?4:3)?'ArrowLeft':'ArrowRight');
  await page.keyboard.press('Space');
 }
 await expect(page.getByTestId('lines')).toHaveText('4');await expect(page.getByTestId('penetrator-bonuses')).toHaveAttribute('aria-label','Penetrator bonuses: 1');
 await page.reload();await controls(page,{ghostVisibility:'never',hardDropLockPolicy:'immediate'});
 await expect(page.getByTestId('status')).toHaveText('Ready');await expect(page.getByTestId('score')).toHaveText('0');await expect(page.getByTestId('lines')).toHaveText('0');await expect(page.getByTestId('penetrator-bonuses')).toHaveAttribute('aria-label','Penetrator bonuses: 0');await expect(page.locator('[data-penetrator="true"]')).toHaveCount(0);
});
