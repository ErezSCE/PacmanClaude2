import type { Direction } from '../types/index.js';

export class InputManager {
  public currentDirection: Direction | null = null;

  constructor() {
    throw new Error('not implemented');
  }

  getDirection(): Direction | null {
    throw new Error('not implemented');
  }

  destroy(): void {
    throw new Error('not implemented');
  }
}
