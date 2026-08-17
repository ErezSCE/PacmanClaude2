import type { GameStatus } from '../types/index.js';

export class GameStateMachine {
  public status: GameStatus = 'start';

  constructor() {
    throw new Error('not implemented');
  }

  transition(_to: GameStatus): void {
    throw new Error('not implemented');
  }

  getStatus(): GameStatus {
    throw new Error('not implemented');
  }
}
