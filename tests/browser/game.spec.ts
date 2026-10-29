/** Actual application keyboard/frame tests, independent of environment fixtures. */
import {test,expect} from './test-base.js';
test.beforeEach(async({page},info)=>{if(!info.title.includes('real animation')){await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000))}await page.addInitScript(()=>{const values=[6.5/7,5.5/6,4.5/5,2.5/4,1.5/3,0.5/2];let draw=0;Math.random=()=>values[draw++%6]});await page.goto('./')});
test('@basic start, move, soft drop and reach blocked-spawn game over',async({page},info)=>{
 await page.getByRole('button',{name:'Start game'}).click();
 const board=page.getByRole('img',{name:'Tetris playfield'});await expect(board).toBeFocused();
 await expect(page.locator('[data-active="true"]')).toHaveCount(4);
 await page.keyboard.press('ArrowLeft');await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-x','3');
 await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowDown');await expect(page.getByTestId('score')).toHaveText('1');
 for(let i=0;i<20;i++){for(let n=0;n<19;n++)await page.keyboard.press('ArrowDown');await page.clock.runFor(1100)}
 await expect(page.getByTestId('status')).toHaveText('Game over');
 await expect(page.locator('[data-active="true"]')).toHaveCount(0);
 expect(await page.locator('.cell[data-filled="true"]').count()).toBeGreaterThan(0);
 await page.screenshot({path:info.outputPath('basic-game.png'),fullPage:true});
});
test('@basic real animation frames advance gravity',async({page})=>{await page.getByRole('button',{name:'Start game'}).click();await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-y','1',{timeout:2500})});
