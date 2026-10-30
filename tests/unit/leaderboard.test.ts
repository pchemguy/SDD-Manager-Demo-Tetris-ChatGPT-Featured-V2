/** Literal ranking sequences, metadata preservation, errors and detached values. */
import {test} from 'node:test';import assert from 'node:assert/strict';
import {recordResult,validateResults,type GameResult} from '../../src/application/leaderboard.js';
const entry=(score:number,n:number):GameResult=>({id:`00000000-0000-4000-8000-${n.toString(16).padStart(12,'0')}`,score,timestamp:'2026-10-30T00:00:00.000Z'});
const entries=(...scores:number[])=>scores.map((score,i)=>entry(score,i+1));
for(const [name,before,score,after] of [
 ['empty zero',[],0,[0]],['highest',[40,20],50,[50,40,20]],['middle',[40,20],30,[40,30,20]],['lowest',[40,20],10,[40,20,10]],['tied',[40,20,20,0],20,[40,20,20,20,0]],
 ['overflow best',[10,9,8,7,6,5,4,3,2,1],11,[11,10,9,8,7,6,5,4,3,2]],['overflow low',[10,9,8,7,6,5,4,3,2,1],0,[10,9,8,7,6,5,4,3,2,1]],['overflow tie',[10,9,8,7,6,5,4,3,2,1],1,[10,9,8,7,6,5,4,3,2,1]],['zeros',Array(10).fill(0),0,Array(10).fill(0)]
] as const)test('ranking '+name,()=>{const history=entries(...before);const incoming=entry(score,20),actual=recordResult(history,incoming);assert.deepEqual(actual.map(r=>r.score),after);for(const r of actual)assert.deepEqual(r,r.id===incoming.id?incoming:history.find(h=>h.id===r.id))});
test('ranking leaves frozen inputs intact and returns detached metadata',()=>{const history=Object.freeze(entries(30,10).map(value=>Object.freeze(value)));const result=recordResult(history,entry(20,20));assert.deepEqual(result.map(r=>r.score),[30,20,10]);result[0].timestamp='changed';result.pop();assert.deepEqual(history,entries(30,10))});
for(const bad of [null,{},'20',true,undefined])test('ranking rejects score type '+String(bad),()=>assert.throws(()=>recordResult([],entry(bad as number,1)),TypeError));
for(const bad of [-1,NaN,Infinity,-Infinity,0.5,Number.MAX_SAFE_INTEGER+1])test('ranking rejects score domain '+bad,()=>assert.throws(()=>recordResult([],entry(bad,1)),RangeError));
for(const bad of [null,{},[null],[{score:'1'}],[{}],[{score:1,extra:true}]])test('ranking rejects malformed history '+JSON.stringify(bad),()=>assert.throws(()=>validateResults(bad),TypeError));
for(const bad of [entries(-1),entries(NaN),entries(1,2),Array(11).fill(entry(0,1))])test('ranking rejects invalid history '+JSON.stringify(bad),()=>{const before=structuredClone(bad);assert.throws(()=>validateResults(bad),RangeError);assert.deepEqual(bad,before)});
test('ranking rejects sparse history without mutating it',()=>{const history=new Array(2);assert.throws(()=>validateResults(history),TypeError);assert.equal(0 in history,false)});
for(const id of ['A0000000-0000-4000-8000-000000000001','00000000-0000-1000-8000-000000000001','00000000-0000-4000-7000-000000000001','invalid'])test('reject invalid UUID '+id,()=>assert.throws(()=>recordResult([],{...entry(1,1),id}),RangeError));
