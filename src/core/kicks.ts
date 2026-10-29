/** Ordered SRS kick candidates in board coordinates (positive y down). */
import type {Board,Piece,Point} from './types.js';
import {rotate} from './pieces.js';
import {canPlace} from './board.js';
const STANDARD:Record<string,Point[]>={"0>1":[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],"1>0":[[0,0],[1,0],[1,1],[0,-2],[1,-2]],"1>2":[[0,0],[1,0],[1,1],[0,-2],[1,-2]],"2>1":[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],"2>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]],"3>2":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"3>0":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"0>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]]};
const I:Record<string,Point[]>={"0>1":[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],"1>0":[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],"1>2":[[0,0],[-1,0],[2,0],[-1,-2],[2,1]],"2>1":[[0,0],[1,0],[-2,0],[1,2],[-2,-1]],"2>3":[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],"3>2":[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],"3>0":[[0,0],[1,0],[-2,0],[1,2],[-2,-1]],"0>3":[[0,0],[-1,0],[2,0],[-1,-2],[2,1]]};
/** First legal rotated candidate, or null; never mutates board/piece. */
export function tryRotate(board:Board,piece:Piece,direction:1|-1):Piece|null {
 if(direction!==1&&direction!==-1)throw new RangeError('Rotation direction must be 1 or -1');
 const rotated=rotate(piece,direction);
 if(piece.type==='O')return {...piece};
 const offsets=(piece.type==='I'?I:STANDARD)[`${piece.rotation}>${rotated.rotation}`];
 for(const [dx,dy] of offsets){const candidate={...rotated,x:piece.x+dx,y:piece.y+dy};if(canPlace(board,candidate))return candidate}
 return null;
}
