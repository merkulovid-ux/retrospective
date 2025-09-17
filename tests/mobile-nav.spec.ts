import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 360, height: 740 } });

  test('should open and close the mobile menu', async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
    
    // Open menu
    await page.locator('#menuToggle').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    expect(await page.getAttribute('body', 'data-menu')).toBe('open');

    // Close menu by clicking the close button
    await page.locator('#mobile-menu .close').click();
    await expect(page.locator('#mobile-menu')).toBeHidden();
    expect(await page.getAttribute('body', 'data-menu')).toBeNull();
  });

  test('should trap focus inside the mobile menu', async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
    await page.locator('#menuToggle').click();

    // Focus trap check
    const closeButton = page.locator('#mobile-menu .close');
    const firstLink = page.locator('.nav-list a').first();
    const lastLink = page.locator('.nav-list a').last();

    await expect(closeButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();

    // Tab through all links
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
    }
    await expect(lastLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused(); // Wraps around
  });

  test('should close the menu with Escape key', async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
    await page.locator('#menuToggle').click();
    
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });

  test('should close the menu when clicking a link', async ({ page }) => {
    await page.goto(`/index.html?t=${new Date().getTime()}`);
    await page.locator('#menuToggle').click();

    await page.locator('.nav-list a[href="#program"]').click();
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await page.waitForURL('**/*#program');
  });
});
