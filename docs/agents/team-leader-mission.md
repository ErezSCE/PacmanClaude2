# Team Leader Mission Report

**Agent**: team-leader  
**Generated**: 2026-08-17T17:05:50.845Z

---

## Assignments (16)

### ASSIGN-001 -> principal-frontend [principal]
- Priority: critical | Complexity: moderate
- Scaffold the Vite + TypeScript project per repo contract: root package.json with scripts (dev/build/test/test:e2e/preview), tsconfig, index.html, src/ and tests/e2e skeleton. Configure ESLint+Prettier shared config. Set up GitHub Actions CI (npm ci, vitest run, playwright test, vite build). Configure vite-plugin-pwa (Workbox) for asset precaching and implement src/sw/registerServiceWorker.ts (MOD-SW) registering the SW without blocking initial interactivity. Add bundle-size budget enforcement/report (<2MB) and image/audio compression tooling. CRITICALLY: create interface stub files at every module path declared in the repo contract (Maze.ts, Collision.ts, PacMan.ts, ghostAI.ts, Ghost.ts, LevelManager.ts, ScoreManager.ts, HighScoreStore.ts, InputManager.ts, Renderer.ts, AudioManager.ts, UIOverlay.ts, GameStateMachine.ts, Game.ts, main.ts) exporting declared symbols with `throw new Error('not implemented')` bodies so parallel branches compile and merge cleanly. Do NOT modify frozen files (src/types/index.ts, src/config/constants.ts, src/maze/mazeLayout.ts, index.html).
### ASSIGN-002 -> senior-frontend [senior]
- Priority: critical | Complexity: complex
- Implement src/maze/Maze.ts (MOD-MAZE): runtime tile grid built from frozen MAZE_LAYOUT, tracks remaining dots/pellets, tunnel openings (TUNNEL_ROWS), ghost house bounds (GHOST_HOUSE_BOUNDS), and exposes level-complete detection (remaining dots === 0). Implement src/physics/Collision.ts (MOD-COLLISION): tilesOverlap, checkPacManGhostCollision, checkPacManDotCollision, and tunnel wrap-around logic (entity exits opposite side same row). Write Vitest unit tests for Maze dot tracking/tunnel logic and Collision functions, colocated as *.test.ts. Import types only from frozen src/types/index.ts and src/config/constants.ts; do not modify frozen files.
### ASSIGN-003 -> principal-frontend [principal]
- Priority: critical | Complexity: very-complex
- Implement src/render/Renderer.ts (MOD-RENDERER), the sole owner of all canvas drawing: maze walls/corridors/dots/pellets, tunnel openings and ghost house box, responsive canvas scaling (375px-2560px, resize handling within one frame), Pac-Man chomp animation/facing render, ghost rendering in normal/frightened/eaten states with flashing warning in final 2s of Frightened, bonus fruit rendering and collection visual removal, and the colorblind-friendly palette toggle applied consistently every frame. Import Maze (MOD-MAZE), PacMan (MOD-PACMAN), Ghost (MOD-GHOST) read-only state; do not modify those files. This assignment owns src/render/Renderer.ts exclusively.
### ASSIGN-004 -> senior-frontend [senior]
- Priority: high | Complexity: moderate
- Implement src/input/InputManager.ts (MOD-INPUT): normalize keyboard (Arrow/WASD), touch swipe gestures, and on-screen directional buttons (build the DOM button controls) into a single directional-intent stream; also handle pause and mute key bindings. Ensure touch/swipe and keyboard produce identical downstream events (no divergent behavior). Owns src/input/InputManager.ts and any small DOM button markup it needs to inject.
### ASSIGN-005 -> senior-frontend [senior]
- Priority: high | Complexity: moderate
- Implement src/entities/PacMan.ts (MOD-PACMAN): tracks position, facing direction, queued direction (applies queued direction change only when target tile isn't a wall, using Maze/Collision), chomp animation frame counter, and moves continuously until blocked. Wire dot-eating: on movement, call checkPacManDotCollision against Maze, remove dot, decrement remaining-dot counter, and integrate with ScoreManager (imported interface) to add SCORING dot value. Owns src/entities/PacMan.ts.
### ASSIGN-006 -> principal-frontend [principal]
- Priority: high | Complexity: complex
- Implement src/entities/ghostAI.ts (MOD-GHOST-AI): chooseDirectTarget (Pac-Man's current tile), chooseAmbushTarget (fixed offset ahead of Pac-Man's facing direction), chooseFlankTarget (formula dependent on Blinky's position), chooseWildcardTarget (alternates chase-target vs random/scatter target based on distance threshold). Write thorough Vitest unit tests for all four functions per AC0-AC3. Owns src/entities/ghostAI.ts exclusively; pure functions only, no rendering.
### ASSIGN-007 -> senior-frontend [senior]
- Priority: critical | Complexity: very-complex
- Implement src/entities/Ghost.ts (MOD-GHOST): four ghost instances each using ghostAI targeting functions, with a shared Chase/Scatter/Frightened/Eaten state machine. Integrate Chase/Scatter timers from getDifficultyForLevel. Implement staggered ghost-house release sequencing at level start and after death/life reset. On power-pellet collision, set all non-eaten ghosts Frightened (reverse direction, reduce speed). On Pac-Man/ghost collision (non-frightened) trigger death handling (lives loss via ScoreManager interface, dot state preserved). Implement Eaten state: eyes-only movement to ghost house, then regenerate and re-enter release sequence. Owns src/entities/Ghost.ts exclusively.
### ASSIGN-008 -> senior-frontend [senior]
- Priority: high | Complexity: moderate
- Implement src/score/ScoreManager.ts (MOD-SCORE): current score, lives (start 3), extra-life threshold (10,000 pts, awarded exactly once per session), escalating ghost-eat combo (200/400/800/1600 resetting after Frightened period ends or new pellet eaten) per SCORING config. Implement the shared cross-component CustomEvent bus (native EventTarget) used to emit score/lives/extra-life/combo events consumed by UIOverlay and AudioManager. Write Vitest unit tests for scoring, combo, and extra-life logic. Owns src/score/ScoreManager.ts.
### ASSIGN-009 -> senior-frontend [senior]
- Priority: high | Complexity: complex
- Implement src/ui/UIOverlay.ts (MOD-UI): accessible DOM overlay (not canvas) for Start screen (title + high score, Enter/Space/click to Countdown), Countdown screen (3-2-1-GO ~1s/step), Pause overlay ('Paused' message, listens to freeze state from GameStateMachine), Game Over screen (final score, 3-letter initials entry when qualifying via HighScoreStore interface, restart control), HUD (score/high score/lives updating within one frame of ScoreManager events), and full keyboard navigation (logical Tab order, visible focus outlines, Enter/Space activation on all controls). Subscribe to the ScoreManager event bus. Owns src/ui/UIOverlay.ts.
### ASSIGN-010 -> senior-frontend [senior]
- Priority: medium | Complexity: simple
- Implement src/score/HighScoreStore.ts (MOD-HIGHSCORE): persist top-10 high score list (initials + score) via localStorage, exposing read/insert/qualifies-for-list checks; inserts sorted descending by score and truncated to 10 entries; list survives reload. Write Vitest unit tests for persistence logic including edge cases (empty store, exactly 10 entries, tie scores). Owns src/score/HighScoreStore.ts.
### ASSIGN-011 -> senior-frontend [senior]
- Priority: medium | Complexity: complex
- Implement src/audio/AudioManager.ts (MOD-AUDIO) using Web Audio API: SFX playback for dot, pellet, ghost-eat, death, fruit, extra-life, and startup jingle, supporting overlapping playback without cutoff (rapid dot-eating). Looping background siren whose pitch/tempo (playbackRate/gain) scales continuously with remaining dots via a defined mapping function; loops during Playing state and stops/pauses otherwise. Global mute toggle silencing all SFX/siren immediately. Subscribe to ScoreManager's extra-life event to trigger the audio cue. Owns src/audio/AudioManager.ts.
### ASSIGN-012 -> senior-frontend [senior]
- Priority: high | Complexity: moderate
- Implement src/game/LevelManager.ts (MOD-LEVEL): level number tracking, difficulty curve (ghost speed, frightened duration, chase/scatter ratios) via getDifficultyForLevel capped at MAX_LEVEL (20) then repeating, bonus fruit spawn triggers at 70/170 dots eaten (fruit type/value from FRUIT_TABLE), fruit despawn timer, and level transition/advance logic (increment level, reset entities, preserve/rebuild maze). Write Vitest unit tests for difficulty curve monotonicity, MAX_LEVEL clamping, and fruit table lookups. Owns src/game/LevelManager.ts.
### ASSIGN-013 -> senior-frontend [senior]
- Priority: critical | Complexity: complex
- Implement src/game/GameStateMachine.ts (MOD-GAME-STATE): owns top-level screen flow (Start, Countdown, Playing, Paused, LevelComplete, GameOver), drives which subsystems update/render each frame, and implements pause/resume freeze logic that stops all entity updates without position/timer jumps on resume. Write Vitest unit tests covering every screen transition. Owns src/game/GameStateMachine.ts. Read (do not modify) Maze/PacMan/Ghost/LevelManager/ScoreManager/UIOverlay interfaces.
### ASSIGN-014 -> principal-frontend [principal]
- Priority: critical | Complexity: complex
- Implement src/game/Game.ts (MOD-GAME): the composition root class holding references to Maze, PacMan, Ghost[], Collision, LevelManager, ScoreManager, InputManager, Renderer, AudioManager, UIOverlay, and GameStateMachine. Implement a fixed-timestep/delta-clamped update loop (accumulator pattern) suitable for requestAnimationFrame driving, dispatching update()/render() to all subsystems each tick in correct order (input -> state machine -> entities -> collision -> score/level -> render -> audio -> ui). Owns src/game/Game.ts.
### ASSIGN-015 -> principal-frontend [principal]
- Priority: critical | Complexity: complex
- Implement src/main.ts (MOD-MAIN), the Game Shell bootstrap and application entry point: wire up the canvas element, instantiate and inject all managers (InputManager, AudioManager, ScoreManager, HighScoreStore, Renderer, UIOverlay, LevelManager) into a single Game instance (MOD-GAME), register the Service Worker (registerServiceWorker) without blocking interactivity, and start the requestAnimationFrame loop. Import and integrate EVERY module: Maze, PacMan, Ghost/ghostAI, Collision, LevelManager, ScoreManager, HighScoreStore, InputManager, Renderer, AudioManager, UIOverlay, GameStateMachine, Game, registerServiceWorker. Verify loading shows Start screen and gameplay is fully interactive end-to-end with no manual wiring steps, and no console errors across a full Start->LevelComplete->GameOver session. This is the final integration checkpoint — depends on all prior subsystem work.
### ASSIGN-016 -> senior-frontend [senior]
- Priority: high | Complexity: complex
- Write Playwright e2e specs in tests/e2e/*.spec.ts: keyboard movement/maze navigation, touch swipe controls, full game flow (Start -> Countdown -> Playing -> LevelComplete -> GameOver) with no console errors, offline play after service worker precache (reload offline and confirm playable), and an axe-core accessibility audit for keyboard navigation and colorblind mode. Run against the fully wired app from ASSIGN-015.
