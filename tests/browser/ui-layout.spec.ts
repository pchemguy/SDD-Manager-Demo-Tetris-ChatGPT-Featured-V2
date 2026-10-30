/** Actual shipped-entry geometry; group centering cannot satisfy viewport centering. */
import {test,expect} from './test-base.js';
import type {Page} from '@playwright/test';
async function geometry(page:Page){
 return page.evaluate(()=>{
  const box=(selector:string)=>{const r=document.querySelector(selector)!.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
  return {board:box('.board'),wrap:box('.board-wrap'),info:box('aside[aria-label="Game information"]'),leaderboard:box('.leaderboard-panel'),settings:box('.settings-disclosure'),help:box('.hint'),width:document.documentElement.clientWidth,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth};
 });
}
test('@ui-basic wide panels keep the playfield centered in the viewport',async({page})=>{
 for(const width of [1440,1600,1920]){
  await page.setViewportSize({width,height:1000});await page.goto('./');const g=await geometry(page);
  expect(Math.abs(g.board.x+g.board.width/2-g.width/2)).toBeLessThanOrEqual(1);
  expect(g.leaderboard.right).toBeLessThanOrEqual(g.info.x);expect(g.info.right).toBeLessThanOrEqual(g.board.x);
  expect(g.board.right).toBeLessThanOrEqual(g.settings.x);expect(g.settings.right).toBeLessThanOrEqual(g.help.x);
  expect(g.board.width).toBe(280);expect(g.overflow).toBe(false);await expect(page.locator('.cell')).toHaveCount(200);
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
