/** Application acceptance fails on runtime errors as well as visible assertions. */
import {test as base,expect} from '@playwright/test';
export const test=base.extend<{runtimeGuard:void}>({runtimeGuard:[async({page},use)=>{
 const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
 await use();await page.close();expect(errors,'No application runtime or console errors').toEqual([]);
},{auto:true}]});
export {expect};
