/** Literal score/threshold expectations protect update ordering and speed floor. */
import {test} from 'node:test';import assert from 'node:assert/strict';
import {progress,gravityInterval} from '../../src/core/progression.js';
for(const [n,award] of [[0,0],[1,40],[2,100],[3,300],[4,1200]])test(`clear ${n} scores ${award} times pre-clear level`,()=>assert.deepEqual(progress({score:7,lines:9,level:1},n),{score:7+award,lines:9+n,level:1+Math.floor((9+n)/10)}));
test('pre-clear multiplier applies across a level threshold',()=>assert.deepEqual(progress({score:0,lines:19,level:2},4,3),{score:2403,lines:23,level:3}));
test('soft drop adds without a line clear and input is unchanged',()=>{const p={score:5,lines:0,level:1};assert.deepEqual(progress(p,0,2),{score:7,lines:0,level:1});assert.equal(p.score,5)});
test('gravity has exact first-level rate and 100ms floor',()=>{assert.equal(gravityInterval(1),1000);assert.equal(gravityInterval(2),925);assert.equal(gravityInterval(13),100);assert.equal(gravityInterval(99),100)});
