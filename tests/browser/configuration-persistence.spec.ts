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
async function saved(context:BrowserContext,baseURL:string,values:Record<string,string|boolean>){await context.addCookies(Object.entries(values).map(([key,value])=>({name:'tetris_config_'+key,value:String(value),url:baseURL,sameSite:'Lax' as const})))}
async function cookieValues(context:BrowserContext,baseURL:string){return Object.fromEntries((await context.cookies(baseURL)).filter(c=>c.name.startsWith('tetris_config_')).map(c=>[c.name.slice('tetris_config_'.length),c.value]))}
test.beforeEach(async({page})=>{await page.setViewportSize({width:1000,height:1800});await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));await page.addInitScript(()=>{Math.random=()=>0.999999})});
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
