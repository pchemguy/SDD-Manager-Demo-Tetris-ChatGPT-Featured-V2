/** Independent occupied-edge examples protect the display policy from matrix padding. */
import {test} from 'node:test';import assert from 'node:assert/strict';
import type {Piece,Kind} from '../../src/core/types.js';
const path='../../src/ui/ghost-visibility.js';const module=await import(path).catch(()=>({isGhostVisible:undefined}));
const visible=(ghost:Piece|null,mode:'always'|'lower-half')=>{assert.equal(typeof module.isGhostVisible,'function');return module.isGhostVisible(ghost,mode)};
const bottoms:Record<Kind,number[]>={I:[1,3,2,3],J:[1,2,2,2],L:[1,2,2,2],O:[1,1,1,1],S:[1,2,2,2],T:[1,2,2,2],Z:[1,2,2,2]};
for(const type of Object.keys(bottoms) as Kind[])for(let rotation=0;rotation<4;rotation++)test(`${type}/${rotation} hides at occupied row10 and shows at row11`,()=>{
 const upper:Piece={type,rotation,x:3,y:9-bottoms[type][rotation]},lower={...upper,y:upper.y+1};const before=structuredClone([upper,lower]);
 assert.equal(visible(upper,'lower-half'),false);assert.equal(visible(lower,'lower-half'),true);assert.equal(visible(upper,'always'),true);assert.equal(visible(lower,'always'),true);assert.deepEqual([upper,lower],before);
});
test('null is hidden in either mode and straddling vertical I is visible',()=>{assert.equal(visible(null,'always'),false);assert.equal(visible(null,'lower-half'),false);assert.equal(visible({type:'I',rotation:1,x:3,y:7},'lower-half'),true)});
