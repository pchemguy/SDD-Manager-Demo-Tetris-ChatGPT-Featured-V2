/** Spatial expectations catch missing kicks, reversed axes, order and shared landing drift. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as boardRules from '../../src/core/board.js';
import {cells,spawn} from '../../src/core/pieces.js';
import type {Board,Piece} from '../../src/core/types.js';
const modulePath='../../src/core/kicks.js';
const imported=await import(modulePath).catch(()=>({tryRotate:undefined}));
const attempt=(b:Board,p:Piece,d:1|-1):Piece|null=>{assert.equal(typeof imported.tryRotate,'function','kick rotation must exist');return imported.tryRotate(b,p,d)};
const land=(b:Board,p:Piece):Piece=>{const fn=(boardRules as unknown as {landing:(b:Board,p:Piece)=>Piece}).landing;assert.equal(typeof fn,'function','canonical landing must exist');return fn(b,p)};
for(const type of ['T','I'] as const)for(const rotation of [0,1,2,3])for(const direction of [1,-1] as const)test(`${type} ${rotation} direction ${direction} rotates legally without shifting open space`,()=>{
 const b=boardRules.createBoard(),p={...spawn(type),rotation,x:4,y:5};const before=JSON.stringify([b,p]);const got=attempt(b,p,direction)!;
 assert.deepEqual(got,{...p,rotation:(rotation+direction+4)%4});assert.equal(cells(got).length,4);assert.equal(JSON.stringify([b,p]),before);
});
test('floor kicks use upward correction and I has its own ordered offsets',()=>{const b=boardRules.createBoard();assert.deepEqual(attempt(b,{type:'T',rotation:0,x:4,y:18},1),{type:'T',rotation:1,x:3,y:17});assert.deepEqual(attempt(b,{type:'I',rotation:0,x:3,y:18},1),{type:'I',rotation:1,x:4,y:16})});
test('both directions kick away from the left wall at the first legal candidate',()=>{const b=boardRules.createBoard();for(const d of [1,-1] as const)assert.deepEqual(attempt(b,{type:'T',rotation:1,x:-1,y:5},d),{type:'T',rotation:d===1?2:0,x:0,y:5})});
test('blocked candidates, ceiling rejection and O preserve settled values',()=>{const b=boardRules.createBoard();const p={type:'T',rotation:0,x:4,y:0} as Piece;for(let y=0;y<20;y++)for(let x=0;x<10;x++)b[y][x]='Z';for(const [x,y] of cells(p))b[y][x]=null;const before=JSON.stringify(b);assert.equal(attempt(b,p,1),null);assert.equal(JSON.stringify(b),before);const o=spawn('O');assert.deepEqual(attempt(boardRules.createBoard(),o,-1),o);assert.throws(()=>attempt(boardRules.createBoard(),p,0 as never),RangeError)});
test('landing stops before a stack and is detached without changing inputs',()=>{const b=boardRules.createBoard();b[15][4]='Z';const p=spawn('O');const before=JSON.stringify([b,p]);const got=land(b,p);assert.equal(got.y,13);assert.deepEqual(land(b,got),got);got.x=0;assert.equal(p.x,4);assert.equal(JSON.stringify([b,p]),before);assert.equal(land(boardRules.createBoard(),spawn('I')).y,18)});

const kickFixtures=[{"type":"T","rotation":0,"x":0,"y":0,"direction":1,"blocks":[[0,0],[1,2]],"expected":[1,-1,2]},{"type":"T","rotation":1,"x":-1,"y":0,"direction":-1,"blocks":[[1,0]],"expected":[0,0,1]},{"type":"T","rotation":1,"x":-1,"y":0,"direction":1,"blocks":[[2,1]],"expected":[2,0,1]},{"type":"T","rotation":2,"x":0,"y":0,"direction":-1,"blocks":[[0,0],[1,0],[1,4]],"expected":[1,-1,2]},{"type":"T","rotation":2,"x":0,"y":0,"direction":1,"blocks":[[0,3],[1,0],[2,0]],"expected":[3,1,2]},{"type":"T","rotation":3,"x":1,"y":0,"direction":-1,"blocks":[[0,1],[3,1]],"expected":[2,0,1]},{"type":"T","rotation":3,"x":1,"y":0,"direction":1,"blocks":[[0,1],[3,1]],"expected":[0,0,1]},{"type":"T","rotation":0,"x":0,"y":0,"direction":-1,"blocks":[[1,2],[2,0]],"expected":[3,1,2]},{"type":"I","rotation":0,"x":0,"y":0,"direction":1,"blocks":[[0,0],[2,0],[3,0]],"expected":[1,-2,1]},{"type":"I","rotation":1,"x":-2,"y":0,"direction":-1,"blocks":[[1,1]],"expected":[0,0,-1]},{"type":"I","rotation":1,"x":-2,"y":0,"direction":1,"blocks":[[1,2]],"expected":[2,0,1]},{"type":"I","rotation":2,"x":0,"y":0,"direction":-1,"blocks":[[0,0],[2,0],[3,0]],"expected":[1,1,2]},{"type":"I","rotation":2,"x":0,"y":0,"direction":1,"blocks":[[0,0],[1,0],[3,0]],"expected":[3,-1,2]},{"type":"I","rotation":3,"x":-1,"y":0,"direction":-1,"blocks":[[1,2]],"expected":[2,0,-2]},{"type":"I","rotation":3,"x":-1,"y":0,"direction":1,"blocks":[[1,1]],"expected":[0,0,2]},{"type":"I","rotation":0,"x":0,"y":0,"direction":-1,"blocks":[[0,0],[1,0],[3,0]],"expected":[3,2,1]}] as const;
for(const f of kickFixtures)test(`spatial kick ${f.type} ${f.rotation} direction ${f.direction}`,()=>{
 const b=boardRules.createBoard();for(const [x,y] of f.blocks)b[y][x]='Z';
 const p:Piece={type:f.type,rotation:f.rotation,x:f.x,y:f.y};assert.ok(boardRules.canPlace(b,p));
 assert.deepEqual(attempt(b,p,f.direction),{...p,rotation:f.expected[0],x:f.expected[1],y:f.expected[2]});
});
