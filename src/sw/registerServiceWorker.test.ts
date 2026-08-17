import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { registerServiceWorker } from './registerServiceWorker';

describe('registerServiceWorker', () => {
  let originalNavigator: Navigator;

  beforeEach(() => {
    originalNavigator = window.navigator;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('[US-034#2] service worker registration does not block or delay initial game interactivity', () => {
    // The registerServiceWorker function should use a deferred pattern
    // (e.g., window.addEventListener('load', ...)) so that SW registration
    // happens AFTER the page is interactive, not during initial script execution.

    // Mock serviceWorker on navigator
    const mockRegister = vi.fn().mockResolvedValue({
      installing: null,
      waiting: null,
      active: { state: 'activated' },
      addEventListener: vi.fn(),
    });

    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: { register: mockRegister },
      writable: true,
      configurable: true,
    });

    // Call registerServiceWorker — it should NOT call register synchronously
    registerServiceWorker();

    // Registration should NOT have been called yet (deferred to 'load' event)
    expect(mockRegister).not.toHaveBeenCalled();

    // Simulate the load event firing
    window.dispatchEvent(new Event('load'));

    // Now registration should be scheduled (may be in a microtask/timeout)
    // Flush any pending timers
    vi.runAllTimers();

    // After load event + timers, register should have been called
    expect(mockRegister).toHaveBeenCalled();
  });

  it('[US-034#1] handles missing serviceWorker support gracefully', () => {
    // Remove serviceWorker from navigator
    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    // Should not throw
    expect(() => registerServiceWorker()).not.toThrow();
  });
});
