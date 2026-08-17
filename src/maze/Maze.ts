import type { Tile } from '../types/index.js';

export class Maze {
  constructor() {
    throw new Error('not implemented');
  }

  getTile(_row: number, _col: number): Tile {
    throw new Error('not implemented');
  }

  isWalkable(_row: number, _col: number): boolean {
    throw new Error('not implemented');
  }

  getRemainingDots(): number {
    throw new Error('not implemented');
  }

  consumeDot(_row: number, _col: number): boolean {
    throw new Error('not implemented');
  }

  reset(): void {
    throw new Error('not implemented');
  }
}
