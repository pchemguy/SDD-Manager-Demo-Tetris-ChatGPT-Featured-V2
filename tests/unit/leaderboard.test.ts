/** L02/L03: independently specified score sequences, errors and detached values. */
import {test} from 'node:test';import assert from 'node:assert/strict';
const module=await import('../../src/application/'+'leaderboard.js').catch(()=>({}));
const rank=(history:unknown,score:unknown):{score:number}[]=>{assert.equal(typeof module.recordResult,'function','C09 recordResult is required');return module.recordResult(history,score)};
const entries=(...scores:number[])=>scores.map(score=>({score}));
for(const [name,before,score,after] of [
 ['empty zero',[],0,[0]],['highest',[40,20],50,[50,40,20]],['middle',[40,20],30,[40,30,20]],['lowest',[40,20],10,[40,20,10]],['tied',[40,20,20,0],20,[40,20,20,20,0]],
 ['overflow best',[10,9,8,7,6,5,4,3,2,1],11,[11,10,9,8,7,6,5,4,3,2]],['overflow low',[10,9,8,7,6,5,4,3,2,1],0,[10,9,8,7,6,5,4,3,2,1]],['overflow tie',[10,9,8,7,6,5,4,3,2,1],1,[10,9,8,7,6,5,4,3,2,1]],['zeros',Array(10).fill(0),0,Array(10).fill(0)]
] as const)test('ranking '+name,()=>assert.deepEqual(rank(entries(...before),score),entries(...after)));
test('ranking leaves frozen inputs intact and returns fully detached entries',()=>{const history=Object.freeze([Object.freeze({score:30}),Object.freeze({score:10})]);const result=rank(history,20);assert.deepEqual(result,entries(30,20,10));result[0].score=99;result.pop();assert.deepEqual(history,entries(30,10));assert.deepEqual(rank(history,20),entries(30,20,10))});
for(const bad of [null,{},'20',true,undefined])test('ranking rejects score type '+String(bad),()=>assert.throws(()=>rank([],bad),TypeError));
for(const bad of [-1,NaN,Infinity,-Infinity,0.5])test('ranking rejects score domain '+bad,()=>assert.throws(()=>rank([],bad),RangeError));
for(const bad of [null,{},[null],[{score:'1'}],[{}],[{score:1,extra:true}]])test('ranking rejects malformed history '+JSON.stringify(bad),()=>assert.throws(()=>rank(bad,1),TypeError));
for(const bad of [entries(-1),entries(NaN),entries(1,2),Array(11).fill({score:0})])test('ranking rejects invalid history '+JSON.stringify(bad),()=>{const before=structuredClone(bad);assert.throws(()=>rank(bad,1),RangeError);assert.deepEqual(bad,before)});
test('ranking rejects sparse history without filling or mutating it',()=>{const history=new Array(2);assert.throws(()=>rank(history,10),TypeError);assert.equal(0 in history,false)});
