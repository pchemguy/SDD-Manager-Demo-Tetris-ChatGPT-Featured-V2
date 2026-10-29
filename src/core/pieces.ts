/** Canonical seven-piece geometry. Rotation changes local cells, never the origin. */
import type { Kind, Piece, Point } from './types.js';
export const KINDS: Kind[] = ['I','J','L','O','S','T','Z'];
const DEFINITIONS: Record<Kind, { size:number; points:Point[] }> = {
 I:{size:4,points:[[0,1],[1,1],[2,1],[3,1]]},
 J:{size:3,points:[[0,0],[0,1],[1,1],[2,1]]},
 L:{size:3,points:[[2,0],[0,1],[1,1],[2,1]]},
 O:{size:2,points:[[0,0],[1,0],[0,1],[1,1]]},
 S:{size:3,points:[[1,0],[2,0],[0,1],[1,1]]},
 T:{size:3,points:[[1,0],[0,1],[1,1],[2,1]]},
 Z:{size:3,points:[[0,0],[1,0],[1,1],[2,1]]},
};
/** Spawn orientation zero centered by its padded matrix. */
export const spawn = (type:Kind): Piece => ({type,rotation:0,x:Math.floor((10-DEFINITIONS[type].size)/2),y:0});
/** Return detached absolute occupied cells, ignoring empty matrix padding. */
export function cells(piece:Piece): Point[] {
 const {size,points}=DEFINITIONS[piece.type];
 return points.map(([x,y])=>{
  if(piece.type!=='O') for(let i=0;i<piece.rotation;i++) [x,y]=[size-1-y,x];
  return [x+piece.x,y+piece.y];
 });
}
export const rotate = (p:Piece): Piece => p.type==='O'?{...p}:{...p,rotation:(p.rotation+1)%4};
