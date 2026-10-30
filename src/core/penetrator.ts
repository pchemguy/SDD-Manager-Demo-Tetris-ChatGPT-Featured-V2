/** Guarded passage through settled cells; final landings always use ordinary legality. */
import type {Board,Piece} from './types.js';
import {cells} from './pieces.js';
import {canPlace} from './board.js';
const inBounds=(piece:Piece)=>cells(piece).every(([x,y])=>x>=0&&x<10&&y>=0&&y<20);
/** Search every downward origin, including disconnected pockets beyond occupied barriers. */
export function penetratingLanding(board:Board,piece:Piece):Piece|null {
 if(!inBounds(piece))return null;
 let result:Piece|null=null;
 for(let candidate={...piece};inBounds(candidate);candidate={...candidate,y:candidate.y+1}) {
  if(canPlace(board,candidate))result={...candidate};
 }
 return result;
}
/** Transit is safe only while a non-overlapping landing remains at or below this pose. */
export const canTraverse=(board:Board,piece:Piece):boolean=>penetratingLanding(board,piece)!==null;
