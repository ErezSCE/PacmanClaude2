import type { HighScoreEntry } from '../types/index.js';

export class HighScoreStore {
  private _storageKey = 'pacman_high_scores';

  getScores(): HighScoreEntry[] {
    void this._storageKey;
    throw new Error('not implemented');
  }

  insert(_entry: HighScoreEntry): void {
    throw new Error('not implemented');
  }

  qualifiesForList(_score: number): boolean {
    throw new Error('not implemented');
  }
}
