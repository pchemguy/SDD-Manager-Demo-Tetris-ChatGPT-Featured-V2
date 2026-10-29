/** Accepted shuffle examples and invalid-input boundaries independent of session placement. */
import {test} from 'node:test';import assert from 'node:assert/strict';
const path='../../src/core/bag.js';const module=await import(path).catch(()=>({shuffleBag:undefined}));
const shuffle=(r:()=>number):string[]=>{assert.equal(typeof module.shuffleBag,'function');return module.shuffleBag(r)};
test('six high-end draws preserve canonical bag order',()=>{let calls=0;assert.deepEqual(shuffle(()=>{calls++;return 0.999999}),['I','J','L','O','S','T','Z']);assert.equal(calls,6)});
test('six zero draws produce the independently calculated permutation',()=>{assert.deepEqual(shuffle(()=>0),['J','L','O','S','T','Z','I'])});
for(let badAt=0;badAt<6;badAt++)test(`bad callback at shuffle step ${badAt} rejects`,()=>{let calls=0;assert.throws(()=>shuffle(()=>calls++===badAt?1:0.5),RangeError)});
test('nonfinite and throwing sources are rejected without a partial bag',()=>{for(const bad of [-1,NaN,Infinity])assert.throws(()=>shuffle(()=>bad),RangeError);assert.throws(()=>shuffle(()=>{throw new Error('rng')}),/rng/)});
