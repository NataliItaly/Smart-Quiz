// Example test to verify Vitest setup.
// Feel free to add your own tests in this folder.

import { describe, it, expect } from 'vitest';

describe('test environment', () => {
  it('vitest works', () => {
    expect(1 + 1).toBe(2);
  });

  it('jsdom environment works', () => {
    const div = document.createElement('div');
    expect(div).toBeInstanceOf(HTMLElement);
  });
});