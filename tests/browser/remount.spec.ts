/** Source-only harness exercises production lifecycle without shipping debug hooks. */
import {test,expect} from './test-base.js';
test('@remount repeated real mount/unmount has one input owner and no pending frame',async({page})=>{
 await page.goto('/tests/fixtures/lifecycle.html');
 for(let i=0;i<3;i++){
  await page.getByRole('button',{name:'Mount fresh',exact:true}).click();
  await expect(page.locator('.game')).toHaveCount(1);await expect(page.locator('.cell')).toHaveCount(200);
  await page.getByRole('button',{name:'Start game'}).click();await page.keyboard.press('ArrowDown');await expect(page.getByTestId('score')).toHaveText('1');
  await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('.game')).toHaveCount(0);await expect(page.locator('#frames')).toHaveText('0');
 }
});
