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
 await page.getByRole('checkbox',{name:'Hard drop (next game)',exact:true}).uncheck();await page.getByRole('combobox',{name:'Ghost visibility',exact:true}).selectOption('never');await page.getByRole('checkbox',{name:'Next-piece preview',exact:true}).uncheck();
 await page.getByRole('button',{name:'Start game'}).click();await expect(page.getByRole('button',{name:'Hard drop',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('#frames')).toHaveText('0');await page.getByRole('button',{name:'Mount retained',exact:true}).click();
 await expect(page.getByTestId('status')).toHaveText('Ready');await expect(page.getByRole('checkbox',{name:'Hard drop (next game)',exact:true})).not.toBeChecked();await expect(page.getByRole('combobox',{name:'Ghost visibility',exact:true})).toHaveValue('never');await expect(page.getByRole('checkbox',{name:'Next-piece preview',exact:true})).not.toBeChecked();
 await page.getByRole('button',{name:'Mount fresh',exact:true}).click();await expect(page.getByRole('checkbox',{name:'Hard drop (next game)',exact:true})).toBeChecked();await expect(page.getByRole('combobox',{name:'Ghost visibility',exact:true})).toHaveValue('always');
});
test('@remount earned ability is game-local across retained and fresh contexts',async({page})=>{await page.setViewportSize({width:1000,height:1800});await page.clock.install({time:0});await page.clock.pauseAt(new Date(1000));await page.goto('/tests/fixtures/lifecycle.html');await page.getByRole('button',{name:'Mount trace retained',exact:true}).click();await page.getByRole('checkbox',{name:'Immediate hard-drop lock (next game)',exact:true}).check();await page.getByRole('combobox',{name:'Ghost visibility',exact:true}).selectOption('never');await page.getByRole('button',{name:'Start game'}).click();const {WELL,CAP_TRACE}=await import('../fixtures/penetrator-gameplay.js');for(const [type,rotation,x] of [...WELL,...CAP_TRACE.slice(0,11)]){for(let i=0;i<rotation;i++)await page.keyboard.press('ArrowUp');for(let i=0;i<Math.abs(x-(type==='O'?4:3));i++)await page.keyboard.press(x<(type==='O'?4:3)?'ArrowLeft':'ArrowRight');await page.keyboard.press('Space')}await expect(page.getByTestId('penetrator-bonuses')).toHaveText('⚡⚡');await page.keyboard.press('b');await expect(page.getByTestId('penetrator-mode')).toHaveText('Penetrator active · Bonuses: 1');await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('#frames')).toHaveText('0');await page.getByRole('button',{name:'Mount retained',exact:true}).click();await expect(page.getByTestId('status')).toHaveText('Ready');await expect(page.getByTestId('penetrator-mode')).toHaveText('Penetrator inactive · Bonuses: 0');await expect(page.getByRole('combobox',{name:'Ghost visibility',exact:true})).toHaveValue('never');await expect(page.getByRole('checkbox',{name:'Immediate hard-drop lock (next game)',exact:true})).toBeChecked();await page.getByRole('button',{name:'Mount fresh',exact:true}).click();await expect(page.getByRole('combobox',{name:'Ghost visibility',exact:true})).toHaveValue('always');await expect(page.getByTestId('penetrator-bonuses')).toHaveAttribute('aria-label','Penetrator bonuses: 0');await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('#frames')).toHaveText('0')});

test('@remount persisted context restores once and retains selections across source changes/remount',async({page})=>{
 await page.goto('/tests/fixtures/lifecycle.html?holdEnabled=false&ghostVisibility=never');
 await page.getByRole('button',{name:'Mount persisted',exact:true}).click();
 await expect(page.locator('[data-option="hold"]')).not.toBeChecked();await expect(page.locator('[data-option="ghost"]')).toHaveValue('never');
 await page.getByRole('button',{name:'Start game'}).click();await page.keyboard.press('ArrowDown');await expect(page.getByTestId('score')).toHaveText('1');
 await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('#frames')).toHaveText('0');
 await page.evaluate(()=>{history.replaceState(history.state,'',location.pathname+'?holdEnabled=true&ghostVisibility=always');document.cookie='tetris_config_holdEnabled=true; Path=/tests/fixtures/';document.cookie='tetris_config_ghostVisibility=always; Path=/tests/fixtures/'});
 await page.getByRole('button',{name:'Mount persisted',exact:true}).click();
 await expect(page.getByTestId('status')).toHaveText('Ready');await expect(page.getByTestId('score')).toHaveText('0');await expect(page.locator('[data-option="hold"]')).not.toBeChecked();await expect(page.locator('[data-option="ghost"]')).toHaveValue('never');
 await page.evaluate(()=>history.replaceState(history.state,'',location.pathname+'?holdEnabled=false&ghostVisibility=never'));
 await page.getByRole('button',{name:'Mount fresh',exact:true}).click();await expect(page.locator('[data-option="hold"]')).toBeChecked();await expect(page.locator('[data-option="ghost"]')).toHaveValue('always');
 await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('#frames')).toHaveText('0');
});

test('@ui-view retained configuration remount starts with all panels shown',async({page})=>{
 await page.goto('/tests/fixtures/lifecycle.html');await page.getByRole('button',{name:'Mount retained',exact:true}).click();await page.locator('[data-option="ghost"]').selectOption('never');
 for(const name of ['Leaderboard','Settings','Controls/help'])await page.getByRole('button',{name:'Hide '+name,exact:true}).click();
 await page.getByRole('button',{name:'Unmount',exact:true}).click();await expect(page.locator('#frames')).toHaveText('0');await page.getByRole('button',{name:'Mount retained',exact:true}).click();
 for(const name of ['Leaderboard','Settings','Controls/help'])await expect(page.getByRole('button',{name:'Hide '+name,exact:true})).toHaveAttribute('aria-expanded','true');await expect(page.locator('[data-option="ghost"]')).toHaveValue('never');
});
