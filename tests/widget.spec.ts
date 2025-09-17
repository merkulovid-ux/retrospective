import { test, expect } from '@playwright/test';

test.describe('Retrospective Simulator Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
    await expect(page.locator('#retro-simulator .widget-container')).toHaveAttribute('data-status', 'ready');
  });

  test('should allow choosing a format and completing the classic flow', async ({ page }) => {
    await page.locator('[data-testid="format-classic"]').click();
    await expect(page.locator('#classic-well')).toBeVisible();

    await page.locator('#classic-well').fill('Все было хорошо');
    await page.locator('#classic-well').press('Enter'); // Simulate pressing Enter to trigger next step
    await expect(page.locator('#classic-improve')).toBeVisible();

    await page.locator('#classic-improve').fill('Было много встреч');
    await page.locator('#classic-improve').press('Enter'); // Simulate pressing Enter to trigger next step
    await expect(page.locator('.summary')).toBeVisible();
    await expect(page.locator('#summary-content')).toContainText('Ваш план по улучшению');
  });

  test('should complete the TRIZ flow', async ({ page }) => {
    await page.locator('[data-testid="format-triz"]').click();
    await expect(page.locator('#triz-fail')).toBeVisible();

    await page.locator('#triz-fail').fill('Ничего не делать');
    await page.locator('#triz-fail').press('Enter'); // Simulate pressing Enter to trigger next step
    await expect(page.locator('#triz-doing')).toBeVisible();

    await page.locator('#triz-doing').fill('Прокрастинирую');
    await page.locator('#triz-doing').press('Enter'); // Simulate pressing Enter to trigger next step
    await expect(page.locator('.summary')).toBeVisible();
    await expect(page.locator('#summary-content')).toContainText('перестаньте делать следующее');
  });

  test('should complete the 15% Solutions flow', async ({ page }) => {
    await page.locator('[data-testid="format-15percent"]').click();
    await expect(page.locator('#15percent-action')).toBeVisible();

    await page.locator('#15percent-action').fill('Начну вставать раньше');
    await page.locator('#15percent-action').press('Enter'); // Simulate pressing Enter to trigger next step
    await expect(page.locator('.summary')).toBeVisible();
    await expect(page.locator('#summary-content')).toContainText('Ваше 15% решение');
  });
});