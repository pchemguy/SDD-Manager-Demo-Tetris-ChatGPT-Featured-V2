/** Actual shipped-entry geometry; group centering cannot satisfy viewport centering. */
import {test,expect} from './test-base.js';
import type {Page} from '@playwright/test';
async function geometry(page:Page){
 return page.evaluate(()=>{
  const box=(selector:string)=>{const r=document.querySelector(selector)!.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
  return {board:box('.board'),wrap:box('.board-wrap'),info:box('aside[aria-label="Game information"]'),leaderboard:box('.leaderboard-panel'),settings:box('.settings-disclosure'),help:box('.hint'),width:document.documentElement.clientWidth,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth};
 });
}
test('@ui-basic wide panels keep the playfield centered in the viewport',async({page},info)=>{
 for(const width of [1440,1600,1920]){
  await page.setViewportSize({width,height:1000});await page.goto('./');const g=await geometry(page);
  expect(Math.abs(g.board.x+g.board.width/2-g.width/2)).toBeLessThanOrEqual(1);
  expect(g.leaderboard.right).toBeLessThanOrEqual(g.info.x);expect(g.info.right).toBeLessThanOrEqual(g.board.x);
  expect(g.board.right).toBeLessThanOrEqual(g.settings.x);expect(g.settings.right).toBeLessThanOrEqual(g.help.x);
  expect(g.board.width).toBe(280);expect(g.overflow).toBe(false);await expect(page.locator('.cell')).toHaveCount(200);if(width===1440)await page.screenshot({path:info.outputPath('panels-1440.png'),fullPage:true});
 }
});
test('@ui-basic narrow panels stack with a centered readable board',async({page})=>{
 for(const width of [320,375,768,1000,1439]){
  await page.setViewportSize({width,height:1000});await page.goto('./');const g=await geometry(page);
  expect(Math.abs(g.board.x+g.board.width/2-g.width/2)).toBeLessThanOrEqual(1);expect(g.board.width).toBeGreaterThanOrEqual(240);
  expect(g.wrap.bottom).toBeLessThanOrEqual(g.info.y+1);expect(g.info.bottom).toBeLessThanOrEqual(g.leaderboard.y+1);expect(g.leaderboard.bottom).toBeLessThanOrEqual(g.settings.y+1);expect(g.settings.bottom).toBeLessThanOrEqual(g.help.y+1);expect(g.overflow).toBe(false);
  await expect(page.getByRole('button',{name:'Save',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Restore',exact:true})).toBeVisible();
 }
});
test('@ui-basic crossing the breakpoint preserves board and selected controls',async({page})=>{
 await page.setViewportSize({width:1439,height:1000});await page.goto('./');const option=page.locator('[data-option="ghost"]');await option.selectOption('never');await option.focus();await page.locator('.board').evaluate(node=>node.setAttribute('data-identity','original'));
 for(const width of [1440,1439,1600]){await page.setViewportSize({width,height:1000});await expect(option).toBeFocused();await expect(option).toHaveValue('never');await expect(page.locator('.board')).toHaveAttribute('data-identity','original');const g=await geometry(page);expect(Math.abs(g.board.x+g.board.width/2-g.width/2)).toBeLessThanOrEqual(1)}
});

test('@ui-toggle all eight independent panel states preserve absolute centering',async({page})=>{
 for(const width of [320,1440,1600,1920]){
  await page.setViewportSize({width,height:1000});await page.goto('./');const original=await page.locator('.board').boundingBox();
  const labels=['Leaderboard','Settings','Controls/help'],selectors=['.leaderboard-panel','.settings-disclosure','.help-panel'];
  for(let mask=0;mask<8;mask++){
   for(let i=0;i<3;i++){
    const button=page.getByRole('button',{name:new RegExp('^(Hide|Show) '+labels[i]+'$')});
    const show=(mask&(1<<i))!==0;if((await button.getAttribute('aria-expanded')==='true')!==show)await button.click();
    await expect(button).toHaveText((show?'Hide ':'Show ')+labels[i]);await expect(button).toHaveAttribute('aria-expanded',String(show));
    expect(await button.getAttribute('aria-controls')).toBe(await page.locator(selectors[i]).getAttribute('id'));
    if(show)await expect(page.locator(selectors[i])).toBeVisible();else await expect(page.locator(selectors[i])).toBeHidden();
   }
   const b=await page.locator('.board').boundingBox();expect(b!.x+b!.width/2).toBeCloseTo(original!.x+original!.width/2,0);
   expect(await page.evaluate(()=>Math.abs(document.querySelector('.board')!.getBoundingClientRect().x+document.querySelector('.board')!.getBoundingClientRect().width/2-document.documentElement.clientWidth/2))).toBeLessThanOrEqual(1);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
   await expect(page.locator('.board')).toBeVisible();await expect(page.getByRole('complementary',{name:'Game information'})).toBeVisible();
  }
 }
});
test('@ui-toggle native activation focus and Settings content survive hide show',async({page})=>{
 await page.goto('./');const hide=page.getByRole('button',{name:/^(Hide|Show) Settings$/});await hide.focus();await page.keyboard.press('Space');await expect(hide).toHaveText('Show Settings');await expect(hide).toBeFocused();await expect(page.getByRole('button',{name:'Save',exact:true})).toBeHidden();
 await page.keyboard.press('Enter');await expect(hide).toHaveText('Hide Settings');await expect(hide).toBeFocused();
 await page.getByRole('button',{name:'Save',exact:true}).click();await page.getByLabel('Save format',{exact:true}).selectOption('sqlite');await hide.click();await expect(page.getByLabel('Save format',{exact:true})).toBeHidden();await hide.click();await expect(page.getByLabel('Save format',{exact:true})).toHaveValue('sqlite');
 const ghost=page.locator('[data-option="ghost"]');await ghost.selectOption('never');await ghost.focus();await hide.dispatchEvent('click');await expect(hide).toBeFocused();await expect(ghost).toBeHidden();await hide.click();await expect(ghost).toHaveValue('never');
 for(const name of ['Leaderboard','Settings','Controls/help'])await page.getByRole('button',{name:'Hide '+name,exact:true}).click();
 for(let i=0;i<12;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('.leaderboard-panel,.settings-disclosure,.help-panel'))).toBe(false)}
 await expect(page.getByRole('img',{name:'Tetris playfield'})).toHaveAccessibleDescription(/Move|arrows/i);
});
test('@ui-toggle presentation changes preserve all four statuses and browser effects',async({page,context})=>{
 await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));await page.addInitScript(()=>{Math.random=()=>.999999});await page.goto('./');await page.locator('[data-option="immediate"]').check();
 const state=()=>page.evaluate(()=>({cells:Array.from(document.querySelectorAll('.cell')).map(n=>({...((n as HTMLElement).dataset)})),text:['score','level','lines','next-type','held-type','penetrator-bonuses','penetrator-mode','settings-summary','status'].map(id=>document.querySelector('[data-testid="'+id+'"]')!.textContent),history:document.querySelector('[data-testid="leaderboard"] tbody')!.textContent}));
 for(const status of ['Ready','Playing','Paused','Game over']){
  if(status==='Playing'){await page.getByRole('button',{name:'Start game',exact:true}).click();await page.clock.runFor(16)}
  if(status==='Paused')await page.locator('[data-pause]').click();
  if(status==='Game over'){await page.locator('[data-pause]').click();await page.locator('.board').evaluate(board=>{for(let i=0;i<40&&document.querySelector('[data-testid="status"]')!.textContent!=='Game over';i++)board.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}))})}
  await expect(page.getByTestId('status')).toHaveText(status);const before=await state(),url=page.url(),cookies=await context.cookies();
  for(const name of ['Leaderboard','Settings','Controls/help']){await page.getByRole('button',{name:'Hide '+name,exact:true}).click();await page.getByRole('button',{name:'Show '+name,exact:true}).click()}
  expect(await state()).toEqual(before);expect(page.url()).toBe(url);expect(await context.cookies()).toEqual(cookies);
 }
});
test('@ui-toggle hidden choices survive rendering Restart and responsive resize',async({page})=>{
 await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));await page.setViewportSize({width:1439,height:1000});await page.goto('./');await page.locator('[data-option="ghost"]').selectOption('never');
 for(const name of ['Leaderboard','Settings','Controls/help'])await page.getByRole('button',{name:'Hide '+name,exact:true}).click();
 const hidden=async()=>{for(const name of ['Leaderboard','Settings','Controls/help'])await expect(page.getByRole('button',{name:'Show '+name,exact:true})).toHaveAttribute('aria-expanded','false')};
 await page.getByRole('button',{name:'Start game',exact:true}).click();await page.clock.runFor(16);await hidden();await page.keyboard.press('ArrowDown');await hidden();
 await page.setViewportSize({width:1440,height:1000});await hidden();await page.getByRole('button',{name:'Restart',exact:true}).click();await hidden();await page.locator('[data-pause]').click();await hidden();
 await page.reload();for(const name of ['Leaderboard','Settings','Controls/help'])await expect(page.getByRole('button',{name:'Hide '+name,exact:true})).toHaveAttribute('aria-expanded','true');await expect(page.locator('[data-option="ghost"]')).toHaveValue('never');
});

test('@ui-life exactly two lifecycle buttons follow all status actions',async({page})=>{
 await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));await page.addInitScript(()=>{Math.random=()=>.999999});await page.goto('./');
 expect(await page.locator('.actions button[data-action="start"],.actions button[data-action="restart"],.actions button[data-pause]').count()).toBe(2);
 await expect(page.getByRole('button',{name:'Restart',exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeDisabled();
 const toggleBottom=await page.getByRole('group',{name:'Panel visibility'}).evaluate(n=>n.getBoundingClientRect().bottom),startTop=await page.getByRole('button',{name:'Start game',exact:true}).evaluate(n=>n.getBoundingClientRect().top);expect(toggleBottom).toBeLessThanOrEqual(startTop);
 await page.getByRole('button',{name:'Start game',exact:true}).click();await page.clock.runFor(16);await expect(page.getByRole('button',{name:'Restart',exact:true})).toBeEnabled();await expect(page.getByRole('button',{name:'Start game',exact:true})).toHaveCount(0);
 await page.keyboard.press('ArrowDown');await page.getByRole('button',{name:'Pause',exact:true}).click();await expect(page.getByTestId('status')).toHaveText('Paused');await expect(page.locator('[data-pause]')).toHaveText('Start');await expect(page.getByText('Continue paused game.',{exact:true})).toBeVisible();
 const before=await page.locator('.cell').evaluateAll(nodes=>nodes.map(n=>n.outerHTML)),next=await page.getByTestId('next-type').textContent();await page.locator('[data-option="hard-drop"]').uncheck();await page.getByRole('button',{name:'Start (resume game)',exact:true}).click();await expect(page.getByTestId('status')).toHaveText('Playing');expect(await page.locator('.cell').evaluateAll(nodes=>nodes.map(n=>n.outerHTML))).toEqual(before);await expect(page.getByTestId('next-type')).toHaveText(next!);await expect(page.getByTestId('score')).toHaveText('1');await expect(page.getByRole('button',{name:'Hard drop',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Restart',exact:true}).click();await expect(page.getByTestId('score')).toHaveText('0');await expect(page.getByRole('button',{name:'Hard drop',exact:true})).toBeDisabled();await expect(page.getByRole('img',{name:'Tetris playfield'})).toBeFocused();
 const restarted=await page.locator('.cell').evaluateAll(nodes=>nodes.map(n=>n.outerHTML));await page.keyboard.press('Enter');expect(await page.locator('.cell').evaluateAll(nodes=>nodes.map(n=>n.outerHTML))).toEqual(restarted);
});
test('@ui-life game over Restart retains completed results and selected rules',async({page})=>{
 await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));await page.addInitScript(()=>{Math.random=()=>.999999});await page.goto('./');await page.locator('[data-option="immediate"]').check();await page.getByRole('button',{name:'Start game',exact:true}).click();
 await page.locator('.board').evaluate(board=>{for(let i=0;i<40&&document.querySelector('[data-testid="status"]')!.textContent!=='Game over';i++)board.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}))});await expect(page.getByTestId('status')).toHaveText('Game over');const rows=await page.locator('[data-testid="leaderboard"] tbody').textContent();await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'Restart',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Hide Leaderboard',exact:true}).click();await page.getByRole('button',{name:'Restart',exact:true}).click();await expect(page.getByTestId('status')).toHaveText('Playing');await expect(page.getByRole('button',{name:'Show Leaderboard',exact:true})).toBeVisible();expect(await page.locator('[data-testid="leaderboard"] tbody').textContent()).toBe(rows);await expect(page.locator('[data-option="immediate"]')).toBeChecked();
});
