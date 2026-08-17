export const SCORING = {
  DOT: 10,
  PELLET: 50,
  GHOST_BASE: 200,
  EXTRA_LIFE_THRESHOLD: 10000,
} as const;

export const FRUIT_TABLE: Record<number, { name: string; points: number }> = {
  1: { name: 'cherry', points: 100 },
  2: { name: 'strawberry', points: 300 },
  3: { name: 'orange', points: 500 },
  4: { name: 'orange', points: 500 },
  5: { name: 'apple', points: 700 },
  6: { name: 'apple', points: 700 },
  7: { name: 'melon', points: 1000 },
  8: { name: 'melon', points: 1000 },
  9: { name: 'galaxian', points: 2000 },
  10: { name: 'galaxian', points: 2000 },
  11: { name: 'bell', points: 3000 },
  12: { name: 'bell', points: 3000 },
  13: { name: 'key', points: 5000 },
};

export const MAX_LEVEL = 20;

export interface DifficultyConfig {
  ghostSpeed: number;
  pacmanSpeed: number;
  frightenedDuration: number;
  chaseScatterRatio: number[];
}

export function getDifficultyForLevel(level: number): DifficultyConfig {
  const effectiveLevel = Math.min(level, MAX_LEVEL);
  const speedBase = 0.75 + effectiveLevel * 0.01;
  return {
    ghostSpeed: Math.min(speedBase, 0.95),
    pacmanSpeed: Math.min(0.8 + effectiveLevel * 0.01, 1.0),
    frightenedDuration: Math.max(6 - effectiveLevel * 0.25, 1),
    chaseScatterRatio: effectiveLevel <= 4 ? [7, 20, 7, 20, 5, 20, 5] : [7, 20, 7, 20, 5, 1033, 1],
  };
}
