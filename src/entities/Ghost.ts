import type { GhostName, GhostState } from '../types/index.js';

export class Ghost {
  public name: GhostName;
  public state: GhostState = 'chase';
  public row = 0;
  public col = 0;

  constructor(name: GhostName) {
    this.name = name;
    throw new Error('not implemented');
  }

  update(_deltaTime: number): void {
    throw new Error('not implemented');
  }

  setState(_state: GhostState): void {
    throw new Error('not implemented');
  }

  reset(): void {
    throw new Error('not implemented');
  }
}
