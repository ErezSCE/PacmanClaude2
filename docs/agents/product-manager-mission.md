# Product Manager Mission Report

**Agent**: product-manager  
**Generated**: 2026-08-17T17:00:28.142Z

---

## User Stories (35)

### US-001: As a player, I want to see the maze rendered with walls, corridors, dots, and power pellets
- So that: I can navigate a recognizable Pac-Man level
- AC: Maze renders on canvas matching MAZE_LAYOUT tile grid within 1 frame of game start; All dots and 4 power pellets are visible at their configured positions; Walls are rendered distinctly from corridors and are impassable in subsequent movement tests
### US-002: As a player, I want the maze to include tunnel openings on left and right and a visible ghost house
- So that: the map behaves like classic Pac-Man
- AC: Left and right tunnel rows render as open corridors matching TUNNEL_ROWS; Ghost house bounding box is rendered visually distinct from corridors; An entity entering the left tunnel opening exits from the right opening on the same row (and vice versa)
### US-003: As a player, I want the maze/canvas to scale responsively between 375px and 2560px viewport widths
- So that: I can play comfortably on any device
- AC: At 375px width, maze fills viewport without horizontal scroll and remains legible; At 2560px width, maze scales up and maintains aspect ratio without distortion; Resizing the browser window updates canvas size within one frame without breaking game state
### US-004: As a player, I want to move Pac-Man using keyboard (Arrow/WASD) input
- So that: I can navigate the maze
- AC: Pressing Arrow keys or WASD changes Pac-Man's queued direction; Pac-Man moves continuously in the last valid direction until blocked by a wall; Direction changes only apply when the target tile is not a wall, otherwise the change stays queued
### US-005: As a mobile player, I want to control Pac-Man via swipe gestures or on-screen buttons
- So that: I can play on touch devices
- AC: A swipe gesture in the up/down/left/right direction sets Pac-Man's queued direction correspondingly; On-screen directional buttons are present, tappable, and set the queued direction; Touch/swipe input maps to the same directional-intent stream as keyboard input with no divergent behavior
### US-006: As a player, I want to see Pac-Man's chomp animation and facing direction update as he moves
- So that: the game feels visually authentic
- AC: Pac-Man's chomp animation frame cycles while moving and idles when stationary; Pac-Man's rendered orientation matches his current facing direction (up/down/left/right)
### US-007: As a player, I want Pac-Man to eat dots as he passes over them
- So that: I earn points and clear the level
- AC: Moving Pac-Man onto a tile containing a dot removes the dot and increases score by the SCORING dot value; The maze's remaining-dot counter decrements on each dot eaten and reaches zero when all dots/pellets are consumed
### US-008: As a player, I want each ghost to exhibit a distinct AI targeting personality (direct chase, ambush-ahead, flank, wildcard)
- So that: the game presents varied challenge
- AC: chooseDirectTarget returns Pac-Man's current tile, verified via unit test; chooseAmbushTarget returns a fixed offset ahead of Pac-Man's facing direction, verified via unit test; chooseFlankTarget's result depends on Blinky's position per the flank formula, verified via unit test; chooseWildcardTarget alternates between chase-target and random/scatter target based on distance threshold, verified via unit test
### US-009: As a player, I want ghosts to alternate between Chase and Scatter modes on a timer
- So that: gameplay has rhythm and lets me plan
- AC: Ghost state machine transitions from Scatter to Chase and back based on level-driven timer values from getDifficultyForLevel; Unit tests confirm ghosts choose scatter-corner targets during Scatter and personality targets during Chase
### US-010: As a player, I want ghosts to leave the ghost house one at a time with staggered delays at level start and after death
- So that: the opening sequence matches classic Pac-Man pacing
- AC: At level start, only one ghost is released immediately; remaining ghosts release after their configured delay elapses; After Pac-Man dies and a life resets, ghosts re-enter the ghost house and repeat the staggered release sequence
### US-011: As a player, I want eating a power pellet to make all ghosts frightened (vulnerable)
- So that: I can turn the tables and eat them for points
- AC: Eating a power pellet sets all non-eaten ghosts' state to Frightened, reverses their current direction, and reduces their speed; Frightened ghosts render in a distinct uniform color different from their normal color
### US-012: As a player, I want frightened ghosts to flash as a warning before returning to normal
- So that: I know my window to eat them is closing
- AC: In the final 2 seconds of the Frightened duration, ghost rendering toggles between frightened and warning colors; After the Frightened duration expires, ghost state returns to Chase/Scatter and stops flashing
### US-013: As a player, I want to eat frightened ghosts for escalating points
- So that: I'm rewarded for chaining ghost captures
- AC: Eating the 1st/2nd/3rd/4th ghost during a single power pellet awards 200/400/800/1600 points respectively per SCORING config; The combo counter resets to zero after the current Frightened period ends or a new power pellet is eaten
### US-014: As a player, I want eaten ghosts to become eyes that return to the ghost house and regenerate
- So that: they rejoin play as normal threats
- AC: After being eaten, a ghost enters an Eaten state, renders as eyes-only, and moves directly toward the ghost house; On reaching the ghost house, the ghost's state resets to Chase/Scatter and it exits again per release sequencing
### US-015: As a player, I want to see my current score and the all-time high score displayed during gameplay
- So that: I can track my progress
- AC: HUD displays current score, updating within one frame of any scoring event; HUD displays the all-time high score sourced from HighScoreStore, updating if a new high score is achieved during play
### US-016: As a player, I want to start with 3 lives and lose one when caught by a non-frightened ghost
- So that: the game has stakes
- AC: Game starts with lives = 3, visibly shown in the HUD; Collision between Pac-Man and a non-frightened ghost decrements lives by 1 and triggers death handling, preserving remaining dots after reset; When lives reach 0, the game transitions to the Game Over state
### US-017: As a player, I want to earn an extra life when I reach 10,000 points
- So that: I'm rewarded for skilled play
- AC: Crossing the 10,000-point threshold increments lives by 1 and emits the extra-life audio cue event; The extra life is awarded exactly once per game session
### US-018: As a player, I want bonus fruit to appear near the maze center after eating ~70 and ~170 dots
- So that: I have extra scoring opportunities
- AC: After the dot-eaten count reaches 70 for the current level, a fruit item appears at the configured center location; After the dot-eaten count reaches 170, a second fruit item appears if not already collected/expired; Fruit type and point value match the current level's entry in FRUIT_TABLE
### US-019: As a player, I want uncollected fruit to disappear after a timeout
- So that: fruit doesn't linger indefinitely
- AC: Fruit auto-despawns after its configured on-screen duration if not eaten by Pac-Man; Collecting fruit before despawn awards points per FRUIT_TABLE and removes it from the maze immediately
### US-020: As a player, I want the game to detect level completion when all dots and pellets are eaten
- So that: I can progress
- AC: When Maze reports zero remaining dots/pellets, the Game State Machine transitions to LevelComplete; The LevelComplete screen displays briefly before the next level begins with an incremented level number
### US-021: As a player, I want difficulty (ghost speed, frightened duration, chase/scatter ratio) to increase with level number up to level 20
- So that: the game gets progressively challenging then stabilizes
- AC: getDifficultyForLevel(n) values are used to configure ghosts/level manager for levels 1 through 20, verified via unit test showing monotonic difficulty increase; For level numbers greater than MAX_LEVEL, difficulty parameters equal those of the max level, verified via unit test
### US-022: As a player, I want a Start screen showing the game title and high score with a way to begin
- So that: I know how to start playing
- AC: Start screen displays the game title text and the current top high score; Activating the Start action (Enter/Space or click) transitions the game to the Countdown state
### US-023: As a player, I want a 3-2-1-GO countdown before gameplay begins
- So that: I have time to prepare
- AC: Countdown screen displays '3', '2', '1', 'GO!' sequentially with approximately 1 second per step; After the countdown completes, the Game State Machine transitions to Playing and gameplay input becomes active
### US-024: As a player, I want to pause and resume the game
- So that: I can take a break without losing progress
- AC: Pressing the pause control while Playing freezes all entity updates and displays a 'Paused' message; Resuming continues gameplay from the exact frozen state with no position/timer jumps
### US-025: As a player, I want a Game Over screen with my final score and an option to enter initials for a high score
- So that: I can be recognized and play again
- AC: When lives reach 0, the Game Over screen displays the final score; If the final score qualifies for the top-10 list, a 3-letter initials entry UI is shown and submitting persists the entry; A restart control returns the game to the Start screen with a freshly reset game state
### US-026: As a player, I want sound effects for dots, pellets, ghost-eating, death, fruit, and extra life
- So that: gameplay feels responsive and rewarding
- AC: Each specified game event triggers its corresponding distinct SFX playback via AudioManager; Rapid repeated dot-eating triggers overlapping SFX playback without audio cutoff or errors
### US-027: As a player, I want a looping background siren whose pitch/tempo scales with remaining dots
- So that: tension builds as the level nears completion
- AC: The siren loops continuously during Playing state and stops/pauses when not Playing; As remaining dots decrease, the siren's playbackRate/pitch increases per a defined mapping function, verified via unit test
### US-028: As a player, I want a mute toggle for all game audio
- So that: I can play silently when needed
- AC: Activating the mute toggle silences all SFX and the background siren immediately; The mute state is reflected visually in the UI toggle control and persists across screen transitions within the session
### US-029: As a player, I want the game to keep a top-10 high score list saved across sessions
- So that: I can track my best results over time
- AC: After a qualifying Game Over score with initials entered, the entry is inserted into the top-10 list sorted descending by score and truncated to 10 entries; Reloading the browser shows the previously saved high score list read from localStorage
### US-030: As a keyboard-only player, I want to navigate and activate all menus and screens using only the keyboard
- So that: I can play without a mouse
- AC: All interactive UI Overlay controls are reachable via Tab/Shift+Tab in a logical order; Every focusable control shows a visible focus outline, and Enter/Space activates the focused control
### US-031: As a colorblind player, I want to toggle a colorblind-friendly ghost color palette
- So that: I can distinguish ghosts easily
- AC: Activating the colorblind toggle switches all ghost rendering colors to the alternate palette immediately, including Frightened/Eaten states; The colorblind toggle state persists for the session and is applied consistently by the Renderer on every frame
### US-032: As a player, I want the game to load quickly with total assets under 2MB
- So that: I can start playing without long wait times
- AC: The production build's total asset payload (JS, sprites, audio) is verified under 2MB via a build-size report; Initial load-to-interactive time is measured and documented as reasonable on a throttled connection
### US-033: As a player, I want the game to run smoothly at 60 FPS
- So that: controls feel responsive and animations are smooth
- AC: The render/update loop uses a fixed-timestep or delta-clamped strategy verified via unit test of the loop's timing logic; Performance profiling shows sustained ~60 FPS during typical gameplay on a target reference browser
### US-034: As a player, I want the game to work offline after my first visit
- So that: I can play without needing an internet connection
- AC: After first load, the Service Worker precaches all game assets, verified by a Playwright test that reloads the page offline and confirms the game still loads and is playable; Service worker registration does not block or delay initial game interactivity
### US-035: As a player, I want all game subsystems (maze, Pac-Man, ghosts, collision, scoring, levels, audio, input, rendering, UI overlay) wired together in the Game Shell's main loop
- So that: I can play a complete, interactive game end to end
- AC: Loading the app shows the Start screen and, after starting, gameplay is fully interactive (movement, collisions, scoring, audio, ghosts) with no manual wiring steps required; The requestAnimationFrame loop in Game Shell calls update() and render() each frame for all subsystems in the correct order; Playing a full session from Start through a level completion and eventually Game Over completes without errors in the browser console

## Tasks (63)

- **TASK-001** [infra/Vite, TypeScript] Initialize Vite + TypeScript project scaffold
- **TASK-002** [infra/ESLint, Prettier] Configure linting/formatting and shared TS config
- **TASK-003** [infra/GitHub Actions] Set up GitHub Actions CI pipeline
- **TASK-004** [infra/vite-plugin-pwa, Workbox] Configure vite-plugin-pwa for asset precaching
- **TASK-005** [frontend/TypeScript] Implement Maze runtime model
- **TASK-006** [frontend/HTML5 Canvas 2D] Render maze walls, corridors, dots, and pellets
- **TASK-007** [frontend/HTML5 Canvas 2D] Render tunnel openings and ghost house
- **TASK-008** [frontend/TypeScript] Implement tunnel wrap-around collision logic
- **TASK-009** [frontend/HTML5 Canvas 2D, CSS] Implement responsive canvas scaling
- **TASK-010** [frontend/TypeScript, DOM Events] Implement keyboard input handling
- **TASK-011** [frontend/TypeScript, Touch Events] Implement touch swipe input handling
- **TASK-012** [frontend/HTML/DOM, TypeScript] Build on-screen directional button controls
- **TASK-013** [frontend/TypeScript] Implement Pac-Man movement and direction queueing
- **TASK-014** [frontend/HTML5 Canvas 2D] Implement Pac-Man chomp animation and facing rendering
- **TASK-015** [frontend/TypeScript] Implement Pac-Man/dot collision and scoring integration
- **TASK-016** [frontend/TypeScript] Implement ghost AI targeting functions
- **TASK-017** [frontend/TypeScript] Implement Ghost entity with Chase/Scatter/Frightened/Eaten state machine
- **TASK-018** [frontend/TypeScript] Implement ghost house release sequencing
- **TASK-019** [frontend/TypeScript] Integrate Chase/Scatter timers with difficulty curve
- **TASK-020** [frontend/TypeScript] Implement power pellet collision triggering Frightened state
- **TASK-021** [frontend/HTML5 Canvas 2D] Implement Frightened flashing warning render logic
- **TASK-022** [frontend/TypeScript] Implement escalating ghost-eat combo scoring
- **TASK-023** [frontend/TypeScript] Implement eaten-ghost eyes return and regeneration
- **TASK-024** [frontend/TypeScript, EventTarget/CustomEvent] Implement ScoreManager score/lives/extra-life tracking
- **TASK-025** [frontend/HTML/DOM, TypeScript] Render HUD for score, high score, and lives
- **TASK-026** [frontend/TypeScript] Implement Pac-Man/ghost death collision handling
- **TASK-027** [frontend/Web Audio API, EventTarget] Wire extra-life event to audio cue
- **TASK-028** [frontend/TypeScript] Implement bonus fruit spawn trigger logic
- **TASK-029** [frontend/HTML5 Canvas 2D, TypeScript] Render bonus fruit and handle collection
- **TASK-030** [frontend/TypeScript] Implement fruit despawn timer
- **TASK-031** [frontend/TypeScript] Implement level completion detection
- **TASK-032** [frontend/TypeScript] Implement LevelManager difficulty curve
- **TASK-033** [frontend/TypeScript] Implement level transition/advance logic
- **TASK-034** [frontend/TypeScript] Implement GameStateMachine screen flow
- **TASK-035** [frontend/HTML/DOM, TypeScript] Build Start screen UI
- **TASK-036** [frontend/HTML/DOM, TypeScript] Build Countdown screen and timer
- **TASK-037** [frontend/TypeScript, HTML/DOM] Implement Pause overlay and freeze logic
- **TASK-038** [frontend/HTML/DOM, TypeScript] Build Game Over screen with initials entry
- **TASK-039** [frontend/Web Audio API] Implement AudioManager SFX playback
- **TASK-040** [frontend/Web Audio API] Implement looping background siren with dot-driven pitch scaling
- **TASK-041** [frontend/Web Audio API, HTML/DOM] Implement global mute toggle
- **TASK-042** [frontend/Web Storage API (localStorage)] Implement HighScoreStore persistence logic
- **TASK-043** [frontend/HTML/DOM, TypeScript] Display high score list on Start and Game Over screens
- **TASK-044** [frontend/HTML/DOM, CSS] Implement full keyboard navigation and focus outlines
- **TASK-045** [frontend/HTML5 Canvas 2D, HTML/DOM] Implement colorblind palette toggle
- **TASK-046** [infra/Vite, image/audio compression tooling] Optimize assets and enforce bundle size budget
- **TASK-047** [frontend/TypeScript, requestAnimationFrame] Implement fixed-timestep/delta-clamped game loop
- **TASK-048** [infra/Workbox, Service Worker API] Register service worker for offline play
- **TASK-049** [frontend/TypeScript] Implement Game Shell bootstrap wiring
- **TASK-050** [frontend/Native EventTarget/CustomEvent] Implement cross-component CustomEvent bus
- **TASK-051** [frontend/HTML5 Canvas 2D] Render ghosts in normal/frightened/eaten states with palette support
- **TASK-052** [testing/Vitest] Unit test ghost AI targeting functions
- **TASK-053** [testing/Vitest] Unit test Collision functions
- **TASK-054** [testing/Vitest] Unit test ScoreManager scoring, combo, and extra-life logic
- **TASK-055** [testing/Vitest] Unit test LevelManager difficulty curve and fruit table
- **TASK-056** [testing/Vitest] Unit test HighScoreStore persistence logic
- **TASK-057** [testing/Vitest] Unit test Maze model dot tracking and tunnel logic
- **TASK-058** [testing/Vitest] Unit test GameStateMachine screen transitions
- **TASK-059** [testing/Playwright] E2E test keyboard movement and maze navigation
- **TASK-060** [testing/Playwright] E2E test touch swipe controls
- **TASK-061** [testing/Playwright] E2E test full game flow end-to-end
- **TASK-062** [testing/Playwright] E2E test offline play after service worker precache
- **TASK-063** [testing/Playwright, axe-core] Accessibility audit test for keyboard nav and colorblind mode
