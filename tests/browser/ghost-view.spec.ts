/** Source-only view snapshots isolate presentation from live rules and clocks. */
import {test,expect} from './test-base.js';
test('@conditional-view shared predicate controls cells/text, pause and mount isolation',async({page})=>{
 await page.goto('/tests/fixtures/ghost-visibility.html');const a=page.locator('#a'),b=page.locator('#b');const mode=a.getByRole('combobox',{name:'Ghost visibility',exact:true});await expect(a.locator('[data-ghost="true"]')).toHaveCount(4);
 const before=await page.evaluate(()=>(window as any).ghostFixture.snapshot());await mode.selectOption('lower-half');await expect(a.locator('[data-ghost="true"]')).toHaveCount(0);await expect(a.getByTestId('ghost-description')).toHaveText('Ghost hidden above the midline');await expect(b.locator('[data-ghost="true"]')).toHaveCount(4);expect(await page.evaluate(()=>(window as any).ghostFixture.snapshot())).toEqual(before);
 await page.evaluate(()=>(window as any).ghostFixture.render('lower'));await expect(a.locator('[data-ghost="true"]')).toHaveCount(4);await expect(a.getByTestId('ghost-description')).toHaveText('Ghost I lands on row 11');
 await page.evaluate(()=>(window as any).ghostFixture.render('paused'));await expect(mode).toHaveValue('lower-half');await expect(a.locator('[data-ghost="true"]')).toHaveCount(0);await mode.selectOption('always');await expect(a.locator('[data-ghost="true"]')).toHaveCount(4);await expect(a.getByTestId('status')).toHaveText('Paused');
 await b.getByRole('checkbox',{name:'Immediate hard-drop lock (next game)',exact:true}).check();expect(await page.evaluate(()=>(window as any).ghostFixture.callbacks())).toEqual([{immediateHardDropLock:true}]);
 await page.evaluate(()=>(window as any).ghostFixture.render('null'));await expect(a.locator('[data-ghost="true"]')).toHaveCount(0);await expect(a.getByTestId('ghost-description')).toHaveText('No active piece');await expect(mode).toBeEnabled();await page.evaluate(()=>(window as any).ghostFixture.destroy());await expect(page.locator('.game')).toHaveCount(0);
});

test('@configuration-view explicit refresh conceals all six combinations without snapshot changes',async({page})=>{
 await page.goto('/tests/fixtures/ghost-visibility.html');const a=page.locator('#a');
 for(const position of ['upper','lower','paused','null']){
  await page.evaluate(value=>(window as any).ghostFixture.render(value),position);const before=await page.evaluate(()=>(window as any).ghostFixture.snapshot());
  for(const mode of ['never','lower-half','always'])for(const enabled of [false,true]){
   await page.evaluate(({mode,enabled})=>(window as any).ghostFixture.update({ghostVisibility:mode,nextPreviewEnabled:enabled}),{mode,enabled});
   const visible=position!=='null'&&(mode==='always'||mode==='lower-half'&&position==='lower');await expect(a.locator('[data-ghost="true"]')).toHaveCount(visible?4:0);
   await expect(a.getByTestId('ghost-description')).toHaveText(position==='null'?'No active piece':visible?`Ghost I lands on row ${position==='lower'?11:10}`:mode==='never'?'Ghost hidden':'Ghost hidden above the midline');
   await expect(a.getByTestId('next-type')).toHaveText(enabled?'J':'Off');await expect(a.locator('[data-preview="next"] [data-filled="true"]')).toHaveCount(enabled?4:0);expect(await page.evaluate(()=>(window as any).ghostFixture.snapshot())).toEqual(before);
  }
 }
});
