import { test, expect } from '@playwright/test';

test.describe('Offline Play', () => {
  test('[US-034#1] game loads and is playable after going offline', async ({ page, context }) => {
    // First load — service worker should install and precache assets
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify the game canvas is present and rendered
    const canvas = page.locator('#game-canvas');
    await expect(canvas).toBeVisible();

    // Wait for service worker to be registered and activated
    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const reg = await navigator.serviceWorker.getRegistration('/');
      if (!reg) return false;
      // Wait for activation
      const sw = reg.active || reg.waiting || reg.installing;
      if (!sw) return false;
      if (sw.state === 'activated') return true;
      return new Promise<boolean>((resolve) => {
        sw.addEventListener('statechange', () => {
          if (sw.state === 'activated') resolve(true);
        });
        setTimeout(() => resolve(sw.state === 'activated'), 5000);
      });
    });

    expect(swRegistered).toBe(true);

    // Go offline
    await context.setOffline(true);

    // Reload the page while offline
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify the game still loads — canvas should be visible
    const canvasOffline = page.locator('#game-canvas');
    await expect(canvasOffline).toBeVisible();

    // Restore online state
    await context.setOffline(false);
  });
});
