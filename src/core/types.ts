/** Browser-independent game value types. Coordinates are occupied-cell positions. */
export type Kind = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type Cell = Kind | null;
export type Board = Cell[][];
/** True only for occupied cells locked by a penetrator. */
export type Appearance = boolean[][];
export type Point = [number, number];
export interface Piece { type: Kind; rotation: number; x: number; y: number }
