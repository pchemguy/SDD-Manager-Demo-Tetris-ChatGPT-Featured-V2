/** White metadata must follow the exact occupancy row permutation. */
import {test} from 'node:test';import assert from 'node:assert/strict';
import * as board from '../../src/core/board.js';import type {Board,Piece} from '../../src/core/types.js';
const api=board as unknown as {createAppearance:()=>boolean[][];lockWithAppearance:(b:Board,p:Piece,m:boolean[][],active:boolean)=>{board:Board;cleared:number;penetratorCells:boolean[][]}};
const mask=()=>{assert.equal(typeof api.createAppearance,'function','empty appearance factory');return api.createAppearance()};
for(let count=0;count<=4;count++)test(`appearance shares compaction for ${count} rows`,()=>{
 const b=board.createBoard(),m=mask();for(let y=20-count;y<20;y++){b[y].fill('J');b[y][5]=null;m[y][0]=true}
 b[14][0]='T';m[14][0]=true;const p:Piece={type:'I',rotation:1,x:3,y:16};const before=JSON.stringify([b,m,p]);
 const got=api.lockWithAppearance(b,p,m,true);assert.equal(got.cleared,count);assert.equal(got.board[14+count][0],'T');assert.equal(got.penetratorCells[14+count][0],true);
 assert.equal(got.penetratorCells.flat().filter(Boolean).length,5-count);assert.ok(got.penetratorCells.every((r,y)=>r.every((v,x)=>!v||got.board[y][x]!==null)));assert.equal(JSON.stringify([b,m,p]),before);
 assert.deepEqual(Object.keys(board.lock(b,p)).sort(),['board','cleared']);assert.deepEqual(board.lock(b,p).board,got.board);
 got.penetratorCells[0][0]=true;assert.equal(m[0][0],false);
});
test('ordinary new cells remain colored and illegal appearance lock is atomic',()=>{const b=board.createBoard(),m=mask();const p:Piece={type:'O',rotation:0,x:4,y:18};assert.equal(api.lockWithAppearance(b,p,m,false).penetratorCells.flat().some(Boolean),false);b[18][4]='T';const before=JSON.stringify([b,m]);assert.throws(()=>api.lockWithAppearance(b,p,m,true),RangeError);assert.equal(JSON.stringify([b,m]),before);m[0][0]=true;assert.equal(m[1][0],false)});
