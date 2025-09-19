import { test, expect } from '@playwright/test';

test.describe('Retrospective Simulator Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
    // More robust wait for the initial state
    await page.locator('[data-testid="format-classic"]').waitFor({ state: 'visible', timeout: 5000 });
  });

  test('should allow choosing a format and completing the classic flow', async ({ page }) => {
    await page.locator('[data-testid="format-classic"]').click();
    
    const wellInput = page.locator('#classic-well');
    await wellInput.waitFor({ state: 'visible' });
    await wellInput.fill('Все было хорошо');
    await page.locator('button[data-action="next"]').click();

    const improveInput = page.locator('#classic-improve');
    await improveInput.waitFor({ state: 'visible' });
    await improveInput.fill('Было много встреч');
    await page.locator('button[data-action="next"]').click();

    const summary = page.locator('.summary');
    await summary.waitFor({ state: 'visible' });
    await expect(summary).toContainText('Ваш план по улучшению');
  });

  test('should complete the TRIZ flow', async ({ page }) => {
    await page.locator('[data-testid="format-triz"]').click();

    const failInput = page.locator('#triz-fail');
    await failInput.waitFor({ state: 'visible' });
    await failInput.fill('Ничего не делать');
    await page.locator('button[data-action="next"]').click();

    const doingInput = page.locator('#triz-doing');
    await doingInput.waitFor({ state: 'visible' });
    await doingInput.fill('Прокрастинирую');
    await page.locator('button[data-action="next"]').click();

    const summary = page.locator('.summary');
    await summary.waitFor({ state: 'visible' });
    await expect(summary).toContainText('перестаньте делать следующее');
  });

  test('should complete the 15% Solutions flow', async ({ page }) => {
    await page.locator('[data-testid="format-15percent"]').click();

    const actionInput = page.locator('#15percent-action');
    await actionInput.waitFor({ state: 'visible' });
    await actionInput.fill('Начну вставать раньше');
    await page.locator('button[data-action="next"]').click();

    const summary = page.locator('.summary');
    await summary.waitFor({ state: 'visible' });
    await expect(summary).toContainText('Ваше 15% решение');
  });
});
