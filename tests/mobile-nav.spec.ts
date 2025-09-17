import { test, expect } from "@playwright/test";

const path = process.env.E2E_PATH || "/index.html";

test.describe("Mobile navigation (sheet)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12-ish
    await page.goto(path);
  });

  test("hidden by default; toggle shows sheet", async ({ page }) => {
    const toggle = page.locator("#menuToggle");
    await expect(toggle).toBeVisible();
    const body = page.locator('body');
    const sheet = page.locator('#mobile-menu');
    await expect(sheet).toHaveAttribute('aria-hidden', 'true');

    await toggle.click();
    await expect(body).toHaveAttribute('data-menu', 'open');
    await expect(sheet).toHaveAttribute('aria-hidden', 'false');
  });

  test("ESC closes", async ({ page }) => {
    await page.locator('#menuToggle').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('body')).not.toHaveAttribute('data-menu', 'open');
    await expect(page.locator('#menuToggle')).toHaveAttribute('aria-expanded', 'false');
  });

  test("clicking a nav link closes", async ({ page }) => {
    await page.locator('#menuToggle').click();
    const firstLink = page.locator('#mobile-menu .nav-list a').first();
    await firstLink.click();
    await expect(page.locator('body')).not.toHaveAttribute('data-menu', 'open');
  });

  test("Back button closes menu", async ({ page }) => {
    await page.locator('#menuToggle').click();
    // emulating user pressing browser Back
    await page.goBack();
    await expect(page.locator('body')).not.toHaveAttribute('data-menu', 'open');
    await expect(page.locator('#menuToggle')).toHaveAttribute('aria-expanded', 'false');
  });
});
