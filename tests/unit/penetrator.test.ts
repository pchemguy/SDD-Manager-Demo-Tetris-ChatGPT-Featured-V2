/** Independent pockets and bounds catch first-obstacle and padding mistakes. */
import {test} from 'node:test';import assert from 'node:assert/strict';
import {createBoard,landing} from '../../src/core/board.js';
import {tryRotate} from '../../src/core/kicks.js';import type {Board,Piece,Kind} from '../../src/core/types.js';
const path='../../src/core/penetrator.js';const api=await import(path).catch(()=>({}));
const deepest=(b:Board,p:Piece):Piece|null=>{assert.equal(typeof api.penetratingLanding,'function','penetrating landing exists');return api.penetratingLanding(b,p)};
const traversable=(b:Board,p:Piece):boolean=>{assert.equal(typeof api.canTraverse,'function');return api.canTraverse(b,p)};
test('search skips disconnected obstacles, accepts overlapping transit and detaches',()=>{
 const b=createBoard(),p:Piece={type:'O',rotation:0,x:4,y:0};b[10][4]='Z';b[19][4]='J';const before=JSON.stringify([b,p]);
 assert.equal(landing(b,p).y,8);assert.deepEqual(deepest(b,p),{...p,y:17});assert.deepEqual(deepest(b,{...p,y:9}),{...p,y:17});assert.equal(traversable(b,{...p,y:10}),true);assert.equal(deepest(b,{...p,y:18}),null);
 const detached=deepest(b,p)!;detached.x=0;assert.equal(JSON.stringify([b,p]),before);
 for(let y=0;y<20;y++)b[y][4]='Z';assert.equal(traversable(b,p),false);
});
const maxima:Record<Kind,number[]>={I:[1,3,2,3],O:[1,1,1,1],J:[1,2,2,2],L:[1,2,2,2],S:[1,2,2,2],T:[1,2,2,2],Z:[1,2,2,2]};
for(const type of Object.keys(maxima) as Kind[])for(let rotation=0;rotation<4;rotation++)test(`deepest floor ${type}/${rotation}`,()=>{
 const b=createBoard(),p={type,rotation,x:3,y:0};assert.deepEqual(deepest(b,p),{...p,y:19-maxima[type][rotation]});assert.equal(deepest(b,{...p,x:10}),null);assert.equal(deepest(b,{...p,y:20}),null);
});
test('empty padding may be outside board but occupied cells may not',()=>{const b=createBoard(),p:Piece={type:'I',rotation:0,x:0,y:-1};assert.equal(deepest(b,p)?.y,18);assert.equal(deepest(b,{...p,y:-2}),null);assert.equal(deepest(b,{...p,x:-1}),null)});
const attempt=tryRotate as (b:Board,p:Piece,d:1|-1,predicate?:(b:Board,p:Piece)=>boolean)=>Piece|null;
for(const type of ['T','I'] as const)for(const direction of [1,-1] as const)test(`optional ${type} ${direction} predicate sees ordered kicks`,()=>{
 const b=createBoard(),p:Piece={type,rotation:0,x:3,y:3},seen:Piece[]=[];
 const offsets=type==='T'?(direction===1?[[0,0],[-1,0],[-1,-1]]:[[0,0],[1,0],[1,-1]]):(direction===1?[[0,0],[-2,0],[1,0]]:[[0,0],[-1,0],[2,0]]);
 const got=attempt(b,p,direction,(board,c)=>{assert.equal(board,b);seen.push(c);return seen.length===3});
 assert.deepEqual(seen,offsets.map(([x,y])=>({...p,rotation:direction===1?1:3,x:3+x,y:3+y})));assert.deepEqual(got,seen[2]);
 assert.equal(attempt(b,p,direction,()=>false),null);
});
test('penetrating rotation can pass occupied cells while defaults remain blocked',()=>{
 const b=createBoard(),p:Piece={type:'T',rotation:0,x:3,y:3};for(let y=1;y<9;y++)b[y].fill('Z');
 assert.equal(tryRotate(b,p,1),null);assert.deepEqual(attempt(b,p,1,traversable),{...p,rotation:1});
 assert.throws(()=>attempt(b,p,0 as never,traversable),RangeError);assert.deepEqual(attempt(b,{...p,type:'O'},1,()=>false),{...p,type:'O'});
});
