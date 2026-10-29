/** Delivery app remains playable with every external request prohibited. */
import {readFileSync} from 'node:fs';
import {test,expect} from './test-base.js';
const expectedVersion=JSON.parse(readFileSync(new URL('../../package.json',import.meta.url),'utf8')).version;
test('@deployment local assets and embedded package metadata',async({page,baseURL})=>{
 const external:string[]=[];
 const origin=new URL(baseURL!).origin;
 await page.route('**/*',route=>{const url=route.request().url();if(new URL(url).origin!==origin){external.push(url);return route.abort()}return route.continue()});
 await page.goto('./');await page.getByRole('button',{name:'Start game'}).click();await page.keyboard.press('ArrowDown');
 await expect(page.getByTestId('score')).toHaveText('1');await expect(page.locator('[data-active="true"]')).toHaveCount(4);expect(external).toEqual([]);
 if(process.env.TEST_TARGET==='extracted'){
  const response=await page.request.get('BUILD-MANIFEST.json');expect(response.ok()).toBe(true);
  const manifest=await response.json();expect(manifest.version).toBe(expectedVersion);expect(manifest.kind).toBe('static-browser');
  expect(Object.keys(manifest.files)).toContain('docs/INSTALL.md');expect(Object.keys(manifest.files)).toContain('LICENSE');
 }
});
