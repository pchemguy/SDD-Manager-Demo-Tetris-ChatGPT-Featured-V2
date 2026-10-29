/** Pure six-draw Fisher–Yates bag. Persistent sequence/cursor belongs to the session. */
import {KINDS} from './pieces.js';
import type {Kind} from './types.js';
export function shuffleBag(random:()=>number):Kind[] {
 const bag=[...KINDS];
 for(let i=6;i>0;i--){const r=random();if(!Number.isFinite(r)||r<0||r>=1)throw new RangeError('Random value must be in [0,1)');const j=Math.floor(r*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}
 return bag;
}
