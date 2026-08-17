export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Tile {
  row: number;
  col: number;
  type: 'wall' | 'corridor' | 'dot' | 'pellet' | 'empty' | 'ghost-house' | 'tunnel';
}

export type GhostName = 'blinky' | 'pinky' | 'inky' | 'clyde';

export type GhostState = 'chase' | 'scatter' | 'frightened' | 'eaten';

export type GameStatus =
  | 'start'
  | 'countdown'
  | 'playing'
  | 'paused'
  | 'levelComplete'
  | 'gameOver';

export interface HighScoreEntry {
  initials: string;
  score: number;
}
