/** F01: literal complete records and genuine completion transactions. */
import {test} from 'node:test';import assert from 'node:assert/strict';
import {recordResult} from '../../src/application/leaderboard.js';
import {createSession} from '../../src/application/session.js';
const rank=recordResult as (history:any,result:any)=>any[];
const create=createSession as (...args:any[])=>ReturnType<typeof createSession>;
const record=(n=1,score=0,timestamp='2026-10-30T00:00:00.000Z')=>({id:`00000000-0000-4000-8000-${n.toString(16).padStart(12,'0')}`,score,timestamp});
test('complete metadata survives stable ranking and detached copies',()=>{const first=record(1,20),second=record(2,20);const result=rank([first],second);assert.deepEqual(result,[first,second]);result[0].timestamp='changed';assert.equal(first.timestamp,'2026-10-30T00:00:00.000Z')});
for(const timestamp of ['2026-02-30T00:00:00.000Z','2026-01-01T00:00:00Z','2026-01-01T00:00:00.000+00:00','2026-01-01T00:00:60.000Z','invalid'])test('reject invalid canonical time '+timestamp,()=>assert.throws(()=>rank([],record(1,0,timestamp)),RangeError));
for(const timestamp of ['0000-01-01T00:00:00.000Z','2000-02-29T23:59:59.999Z','9999-12-31T23:59:59.999Z'])test('accept canonical calendar edge '+timestamp,()=>assert.deepEqual(rank([],record(1,0,timestamp)),[record(1,0,timestamp)]));
test('duplicate IDs reject rather than replacing a result',()=>assert.throws(()=>rank([record()],record(1,20)),RangeError));
test('unsafe integer scores reject',()=>assert.throws(()=>rank([],record(1,Number.MAX_SAFE_INTEGER+1)),RangeError));
test('real game over obtains ID and UTC time once, not on exports or restart',()=>{let ids=0,times=0;const s=create(()=>.999999,undefined,{newId:()=>record(++ids).id,completedAt:()=>{times++;return record().timestamp}});s.dispatch('start');for(let i=0;i<40&&s.getSnapshot().status==='running';i++)s.advance(100000);assert.equal(s.getSnapshot().status,'game-over');assert.deepEqual(s.getSnapshot().leaderboard,[record()]);assert.equal(ids,1);assert.equal(times,1);s.getSnapshot();s.advance(1000);s.dispatch('restart');assert.equal(ids,1);assert.equal(times,1);const value=s.getSnapshot();(value.leaderboard[0] as any).timestamp='mutated';assert.deepEqual(s.getSnapshot().leaderboard,[record()])});
test('metadata source failure rolls back the whole ending action',()=>{const s=create(()=>.999999,undefined,{newId:()=>{throw Error('id unavailable')},completedAt:()=>record().timestamp});s.dispatch('start');let caught=false;for(let i=0;i<40;i++){const before=s.getSnapshot();let events=0;const off=s.subscribe(()=>events++);try{s.advance(100000)}catch(e){assert.match(String(e),/id unavailable/);assert.deepEqual(s.getSnapshot(),before);assert.equal(events,0);caught=true;off();break}off()}assert.equal(caught,true)});
for(const mode of ['invalid-id','invalid-time','duplicate-id'] as const)test('invalid completion metadata rolls back: '+mode,()=>{
 let completions=0;const s=create(()=>.999999,undefined,{newId:()=>{completions++;return mode==='invalid-id'?'bad':record().id},completedAt:()=>mode==='invalid-time'?'2026-02-30T00:00:00.000Z':record().timestamp});
 if(mode==='duplicate-id'){s.dispatch('start');while(s.getSnapshot().status==='running')s.advance(100000)}s.dispatch('restart');let failed=false;
 for(let i=0;i<40;i++){const before=s.getSnapshot();try{s.advance(100000)}catch(e){assert.ok(e instanceof RangeError);assert.deepEqual(s.getSnapshot(),before);failed=true;break}}assert.equal(failed,true);assert.equal(completions,mode==='duplicate-id'?2:1);
});
for(const suffix of ['\n','\r','\r\n','\u2028','\u2029'])test('canonical UUID rejects a trailing line terminator '+JSON.stringify(suffix),()=>assert.throws(()=>rank([],{...record(),id:record().id+suffix}),RangeError));
