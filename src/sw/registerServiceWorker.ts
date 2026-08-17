/**
 * Registers the Workbox-generated service worker without blocking
 * initial game interactivity. Registration is deferred until after
 * the window 'load' event fires.
 */
export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  // Defer SW registration so it does not compete with initial
  // page resources — satisfies the non-blocking requirement.
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        // Listen for updates so the user gets the latest assets
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'activated' &&
              navigator.serviceWorker.controller
            ) {
              // New content is available; could notify user
              console.info('Pac-Man: new version available.');
            }
          });
        });
      })
      .catch((error: unknown) => {
        console.warn('Pac-Man: SW registration failed:', error);
      });
  });
}
