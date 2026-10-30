/** Pure placement, locking and simultaneous row compaction for a 10x20 board. */
import type { Board, Piece, Appearance } from './types.js';
import { cells } from './pieces.js';
export const createBoard = (): Board => Array.from({length:20},()=>Array(10).fill(null));
export const canPlace = (board:Board,piece:Piece):boolean => cells(piece).every(([x,y])=>x>=0&&x<10&&y>=0&&y<20&&board[y][x]===null);
/** A rejected move returns null without modifying either input. */
export function move(board:Board,piece:Piece,dx:number,dy:number):Piece|null {
 const next={...piece,x:piece.x+dx,y:piece.y+dy};return canPlace(board,next)?next:null;
}
/** Independent appearance rows, paired with occupancy by the lock transaction. */
export const createAppearance=():Appearance=>Array.from({length:20},()=>Array(10).fill(false));
/** Lock legal cells and compact occupancy/appearance using the same retained row indices. */
export function lockWithAppearance(board:Board,piece:Piece,penetratorCells:Appearance,penetratorActive:boolean):{board:Board;cleared:number;penetratorCells:Appearance} {
 if(!canPlace(board,piece))throw new RangeError('Cannot lock an illegal piece');
 const next=board.map(row=>row.slice()),appearance=penetratorCells.map(row=>row.slice());
 for(const [x,y] of cells(piece)){next[y][x]=piece.type;appearance[y][x]=penetratorActive}
 const retained=next.flatMap((row,y)=>row.some(c=>c===null)?[y]:[]),cleared=20-retained.length;
 return {board:[...Array.from({length:cleared},()=>Array(10).fill(null)),...retained.map(y=>next[y])],
  penetratorCells:[...Array.from({length:cleared},()=>Array(10).fill(false)),...retained.map(y=>appearance[y])],cleared};
}
/** Legacy result shape is unchanged; row clearing has one authority. */
export function lock(board:Board,piece:Piece):{board:Board;cleared:number} {
 const {board:next,cleared}=lockWithAppearance(board,piece,createAppearance(),false);return {board:next,cleared};
}

/** Lowest straight-down legal placement; shared by ghost and hard drop. Inputs are unchanged. */
export function landing(board:Board,piece:Piece):Piece {
 let next={...piece},below:Piece|null;
 while((below=move(board,next,0,1)))next=below;
 return next;
}
