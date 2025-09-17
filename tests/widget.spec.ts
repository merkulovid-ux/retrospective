import { test, expect } from '@playwright/test';

test.describe('Retrospective Simulator Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
  });
});