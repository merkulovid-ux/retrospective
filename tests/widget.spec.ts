import { test, expect } from '@playwright/test';

test.describe('Retrospective Simulator Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
  });

  test('should display all static retro forms', async ({ page }) => {
    // Check for Classic flow elements
    await expect(page.locator('#classic-well')).toBeVisible();
    await expect(page.locator('#classic-improve')).toBeVisible();

    // Check for TRIZ flow elements
    await expect(page.locator('#triz-fail')).toBeVisible();
    await expect(page.locator('#triz-doing')).toBeVisible();

    // Check for 15% Solutions flow elements
    await expect(page.locator('#15percent-action')).toBeVisible();
  });
});