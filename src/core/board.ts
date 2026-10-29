/** Pure placement, locking and simultaneous row compaction for a 10x20 board. */
import type { Board, Piece } from './types.js';
import { cells } from './pieces.js';
export const createBoard = (): Board => Array.from({length:20},()=>Array(10).fill(null));
export const canPlace = (board:Board,piece:Piece):boolean => cells(piece).every(([x,y])=>x>=0&&x<10&&y>=0&&y<20&&board[y][x]===null);
/** A rejected move returns null without modifying either input. */
export function move(board:Board,piece:Piece,dx:number,dy:number):Piece|null {
 const next={...piece,x:piece.x+dx,y:piece.y+dy};return canPlace(board,next)?next:null;
}
/** Lock only legal pieces and compact all full rows in one operation. */
export function lock(board:Board,piece:Piece):{board:Board;cleared:number} {
 if(!canPlace(board,piece)) throw new RangeError('Cannot lock an illegal piece');
 const next=board.map(row=>row.slice());
 for(const [x,y] of cells(piece)) next[y][x]=piece.type;
 const remaining=next.filter(row=>row.some(c=>c===null));
 const cleared=20-remaining.length;
 return {board:[...Array.from({length:cleared},()=>Array(10).fill(null)),...remaining],cleared};
}
