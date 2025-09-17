import { test, expect } from '@playwright/test';

test.describe('Retrospective Simulator Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
  });

  test('should allow choosing a format and completing the classic flow', async ({ page }) => {
    await page.locator('[data-testid="format-classic"]').click();
    await expect(page.locator('#classic-step1')).toBeVisible();

    await page.locator('#classic-well').fill('Все было хорошо');
    await page.locator('#classic-step1 .btn').click();
    await expect(page.locator('#classic-step2')).toBeVisible();

    await page.locator('#classic-improve').fill('Было много встреч');
    await page.locator('#classic-step2 .btn').click();
    await expect(page.locator('#summary-step')).toBeVisible();
    await expect(page.locator('#summary-content')).toContainText('Ваш план по улучшению');
  });

  test('should complete the TRIZ flow', async ({ page }) => {
    await page.locator('[data-testid="format-triz"]').click();
    await expect(page.locator('#triz-step1')).toBeVisible();

    await page.locator('#triz-fail').fill('Ничего не делать');
    await page.locator('#triz-step1 .btn').click();
    await expect(page.locator('#triz-step2')).toBeVisible();

    await page.locator('#triz-doing').fill('Прокрастинирую');
    await page.locator('#triz-step2 .btn').click();
    await expect(page.locator('#summary-step')).toBeVisible();
    await expect(page.locator('#summary-content')).toContainText('перестаньте делать следующее');
  });

  test('should complete the 15% Solutions flow', async ({ page }) => {
    await page.locator('[data-testid="format-15percent"]').click();
    await expect(page.locator('#percent15-step1')).toBeVisible();

    await page.locator('#percent15-action').fill('Начну вставать раньше');
    await page.locator('#percent15-step1 .btn').click();
    await expect(page.locator('#summary-step')).toBeVisible();
    await expect(page.locator('#summary-content')).toContainText('Ваше 15% решение');
  });
});