/** Pure display policy over canonical occupied cells; never changes landing or rules state. */
import type { Piece } from '../core/types.js';
import { cells } from '../core/pieces.js';

export type GhostVisibilityMode = 'always' | 'lower-half';
const MIDLINE_ROW = 10;

/** The lower half begins at row index 10, including a projection crossing the midline. */
export function isGhostVisible(ghost: Piece | null, mode: GhostVisibilityMode): boolean {
 return ghost !== null && (mode === 'always' || Math.max(...cells(ghost).map(([, y]) => y)) >= MIDLINE_ROW);
}
