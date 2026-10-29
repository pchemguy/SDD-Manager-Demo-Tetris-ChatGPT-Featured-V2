/** Browser-independent game value types. Coordinates are occupied-cell positions. */
export type Kind = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type Cell = Kind | null;
export type Board = Cell[][];
export type Point = [number, number];
export interface Piece { type: Kind; rotation: number; x: number; y: number }
