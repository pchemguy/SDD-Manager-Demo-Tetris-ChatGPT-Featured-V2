/** Actual application keyboard/frame tests, independent of environment fixtures. */
import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.addInitScript(()=>{Math.random=()=>0.5});await page.goto('/')});
test('@basic start, move, soft drop and reach blocked-spawn game over',async({page},info)=>{
 await page.getByRole('button',{name:'Start game'}).click();
 const board=page.getByRole('img',{name:'Tetris playfield'});await expect(board).toBeFocused();
 await expect(page.locator('[data-active="true"]')).toHaveCount(4);
 await page.keyboard.press('ArrowLeft');await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-x','3');
 await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowDown');await expect(page.getByTestId('score')).toHaveText('1');
 for(let i=0;i<210;i++)await page.keyboard.press('ArrowDown');
 await expect(page.getByTestId('status')).toHaveText('Game over');
 await expect(page.locator('[data-active="true"]')).toHaveCount(0);
 await expect(page.locator('[data-filled="true"]')).toHaveCount(40);
 await page.screenshot({path:info.outputPath('basic-game.png'),fullPage:true});
});
test('@basic real animation frames advance gravity',async({page})=>{await page.getByRole('button',{name:'Start game'}).click();await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-y','1',{timeout:2500})});
