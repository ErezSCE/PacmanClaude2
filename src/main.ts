import { registerServiceWorker } from './sw/registerServiceWorker.js';

/**
 * Application entry point.
 * Bootstraps the game shell and registers the service worker
 * for offline capability.
 */
function main(): void {
  // Register service worker for offline play (non-blocking, deferred to 'load')
  registerServiceWorker();

  // Game shell bootstrap will be wired here by the Game module owner.
  // For now, confirm the entry point is alive.
  const app = document.getElementById('app');
  if (app) {
    app.setAttribute('data-ready', 'true');
  }
}

main();

export default main;
