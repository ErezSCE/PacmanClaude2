import type { Direction } from '../types/index.js';

export class PacMan {
  public row = 0;
  public col = 0;
  public direction: Direction = 'left';
  public queuedDirection: Direction = 'left';

  constructor() {
    throw new Error('not implemented');
  }

  update(_deltaTime: number): void {
    throw new Error('not implemented');
  }

  setDirection(_direction: Direction): void {
    throw new Error('not implemented');
  }

  reset(): void {
    throw new Error('not implemented');
  }
}
