/** Source-only harness exercises production lifecycle without shipping debug hooks. */
import {test,expect} from './test-base.js';
test('@remount repeated real mount/unmount has one input owner and no pending frame',async({page})=>{
 await page.goto('/tests/fixtures/lifecycle.html');
 for(let i=0;i<3;i++){
  await page.getByRole('button',{name:'Mount fresh',exact:true}).click();
  await expect(page.locator('.game')).toHaveCount(1);await expect(page.getByRole('combobox',{name:'Ghost visibility',exact:true})).toHaveValue('always');await page.getByRole('combobox',{name:'Ghost visibility',exact:true}).selectOption('lower-half');await expect(page.locator('.cell')).toHaveCount(200);
  await page.getByRole('button',{name:'Start game'}).click();await page.keyboard.press('ArrowDown');await expect(page.getByTestId('score')).toHaveText('1');
  await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('.game')).toHaveCount(0);await expect(page.locator('#frames')).toHaveText('0');
 }
});

test('@remount explicit context retains selected rules with a fresh game',async({page})=>{
 await page.goto('/tests/fixtures/lifecycle.html');await page.getByRole('button',{name:'Mount retained',exact:true}).click();
 await page.getByRole('checkbox',{name:'Hard drop (next game)',exact:true}).uncheck();await page.getByRole('combobox',{name:'Ghost visibility',exact:true}).selectOption('lower-half');
 await page.getByRole('button',{name:'Start game'}).click();await expect(page.getByRole('button',{name:'Hard drop',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('#frames')).toHaveText('0');await page.getByRole('button',{name:'Mount retained',exact:true}).click();
 await expect(page.getByTestId('status')).toHaveText('Ready');await expect(page.getByRole('checkbox',{name:'Hard drop (next game)',exact:true})).not.toBeChecked();await expect(page.getByRole('combobox',{name:'Ghost visibility',exact:true})).toHaveValue('lower-half');
 await page.getByRole('button',{name:'Mount fresh',exact:true}).click();await expect(page.getByRole('checkbox',{name:'Hard drop (next game)',exact:true})).toBeChecked();await expect(page.getByRole('combobox',{name:'Ghost visibility',exact:true})).toHaveValue('always');
});
