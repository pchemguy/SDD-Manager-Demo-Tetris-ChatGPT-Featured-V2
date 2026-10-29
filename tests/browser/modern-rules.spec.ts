/** Actual assembled modern-rule controls, using virtual time only for deterministic frame progression. */
import {test,expect} from './test-base.js';
test.beforeEach(async({page})=>{await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));await page.addInitScript(()=>{Math.random=()=>0.999999});await page.goto('./');await page.getByRole('button',{name:'Start game'}).click();await page.clock.runFor(16)});
test('@modern rotation keys and native buttons use both directions without repeat',async({page})=>{
 const positions=()=>page.locator('[data-active="true"]').evaluateAll(ns=>ns.map(n=>[n.getAttribute('data-x'),n.getAttribute('data-y')]));
 const initial=await positions();await page.keyboard.press('z');expect(await positions()).not.toEqual(initial);await page.keyboard.press('x');expect(await positions()).toEqual(initial);
 await page.getByRole('button',{name:'Rotate counterclockwise',exact:true}).click();expect(await positions()).not.toEqual(initial);await page.getByRole('button',{name:'Rotate clockwise',exact:true}).click();expect(await positions()).toEqual(initial);
 await page.getByRole('img',{name:'Tetris playfield'}).dispatchEvent('keydown',{key:'z',repeat:true});expect(await positions()).toEqual(initial);
});
test('@modern grounded movement preserves the landing countdown in the app',async({page})=>{
 for(let i=0;i<18;i++)await page.keyboard.press('ArrowDown');await expect(page.locator('[data-filled="true"][data-active="false"]')).toHaveCount(0);
 await page.clock.runFor(500);await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowDown');await page.clock.runFor(400);await expect(page.locator('[data-filled="true"][data-active="false"]')).toHaveCount(0);
 await page.clock.runFor(200);await expect(page.locator('[data-filled="true"][data-active="false"]')).toHaveCount(4);
});
for(const [key,column] of [['ArrowUp','6'],['z','3']] as const)test(`@modern ${key} floor kick preserves the grounded deadline`,async({page})=>{
 for(let i=0;i<18;i++)await page.keyboard.press('ArrowDown');await page.clock.runFor(500);await page.keyboard.press(key);
 const active=page.locator('[data-active="true"]');await expect(active).toHaveCount(4);await expect(active.first()).toHaveAttribute('data-y','16');await expect(active.first()).toHaveAttribute('data-x',column);
 await page.clock.runFor(400);await expect(page.locator('[data-filled="true"][data-active="false"]')).toHaveCount(0);await page.clock.runFor(200);await expect(page.locator('[data-filled="true"][data-active="false"]')).toHaveCount(4);
});
test('@modern preview exposes only the next bag type and follows consumption',async({page})=>{
 await expect(page.getByTestId('next-type')).toHaveText('J');await expect(page.locator('[data-preview="next"]')).toHaveCount(1);
 for(let i=0;i<18;i++)await page.keyboard.press('ArrowDown');await page.clock.runFor(1100);
 await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-kind','J');await expect(page.getByTestId('next-type')).toHaveText('L');
});
test('@modern hold keys and button exchange once per lock without consuming swap preview',async({page})=>{
 await page.getByRole('img',{name:'Tetris playfield'}).dispatchEvent('keydown',{key:'c',repeat:true});await expect(page.getByTestId('held-type')).toHaveText('None');
 await page.keyboard.press('c');await expect(page.getByTestId('held-type')).toHaveText('I');await expect(page.getByTestId('next-type')).toHaveText('L');await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-kind','J');await expect(page.getByRole('button',{name:'Hold piece',exact:true})).toBeDisabled();
 await page.keyboard.press('Shift');await expect(page.getByTestId('held-type')).toHaveText('I');
 for(let i=0;i<18;i++)await page.keyboard.press('ArrowDown');await page.clock.runFor(1100);await expect(page.getByRole('button',{name:'Hold piece',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Hold piece',exact:true}).click();await expect(page.getByTestId('held-type')).toHaveText('L');await expect(page.getByTestId('next-type')).toHaveText('O');await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-kind','I');await expect(page.getByRole('img',{name:'Tetris playfield'})).toBeFocused();
});
test('@modern ghost outlines landing cells and yields to the grounded active piece',async({page},info)=>{
 await expect(page.locator('[data-ghost="true"]')).toHaveCount(4);await expect(page.locator('[data-ghost="true"]').first()).toHaveAttribute('data-y','19');await expect(page.getByTestId('ghost-description')).toContainText('I');
 for(const width of [320,1000]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath(`planning-${width}.png`),fullPage:true})}
 await page.keyboard.press('c');await expect(page.getByTestId('ghost-description')).toContainText('J');for(let i=0;i<18;i++)await page.keyboard.press('ArrowDown');await expect(page.locator('[data-ghost="true"]')).toHaveCount(0);await expect(page.locator('[data-active="true"]')).toHaveCount(4);await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(0);
});
test('@modern Space and native hard drop use default delay and suppress repeat',async({page})=>{
 await page.keyboard.press('Space');await expect(page.getByTestId('score')).toHaveText('36');await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-y','19');await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(0);
 await page.getByRole('img',{name:'Tetris playfield'}).dispatchEvent('keydown',{key:' ',repeat:true});await page.getByRole('button',{name:'Hard drop',exact:true}).click();await expect(page.getByTestId('score')).toHaveText('36');await page.clock.runFor(900);await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(0);await page.clock.runFor(200);await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(4);
});
test('@modern option applies on restart only, native immediate drop dispatches once, reload resets',async({page})=>{
 const option=page.getByRole('checkbox',{name:'Immediate hard-drop lock (next game)',exact:true});await expect(option).not.toBeChecked();await option.check();await page.getByRole('img',{name:'Tetris playfield'}).focus();await page.keyboard.press('Space');await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(0);await page.clock.runFor(1100);await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(4);
 await page.getByRole('button',{name:'Restart',exact:true}).click();await page.getByRole('button',{name:'Hard drop',exact:true}).click();await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(4);await expect(page.getByTestId('score')).toHaveText('36');await expect(page.getByRole('img',{name:'Tetris playfield'})).toBeFocused();await page.getByRole('img',{name:'Tetris playfield'}).dispatchEvent('keydown',{key:' ',repeat:true});await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(4);
 await option.uncheck();await page.getByRole('img',{name:'Tetris playfield'}).focus();await page.keyboard.press('Space');await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(8);await page.keyboard.press('r');await page.keyboard.press('Space');await expect(page.locator('.cell[data-filled="true"][data-active="false"]')).toHaveCount(0);await page.reload();await expect(option).not.toBeChecked();await expect(page.getByTestId('status')).toHaveText('Ready');
});
test('@modern native checkbox Space stays in configuration and does not dispatch board actions',async({page},info)=>{
 const option=page.getByRole('checkbox',{name:'Immediate hard-drop lock (next game)',exact:true});await option.focus();await page.keyboard.press('Space');await expect(option).toBeChecked();await expect(page.getByTestId('score')).toHaveText('0');await expect(page.getByTestId('held-type')).toHaveText('None');await expect(page.getByTestId('status')).toHaveText('Playing');await expect(page.locator('[data-active="true"]').first()).toHaveAttribute('data-y','1');
 for(const width of [320,1000]){await page.setViewportSize({width,height:900});await option.focus();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath(`options-${width}.png`),fullPage:true})}
 await page.reload();await expect(option).not.toBeChecked();await expect(page.getByTestId('status')).toHaveText('Ready');
});
