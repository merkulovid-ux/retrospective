import { test, expect } from "@playwright/test";

const path = process.env.E2E_PATH || "/index.html";

test.describe("Sticky CTA behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto(`${path}?t=${new Date().getTime()}`);
  });

  test("appears after scroll and 1s delay", async ({ page }) => {
    const sticky = page.locator('.sticky');
    await expect(sticky).toHaveAttribute('aria-hidden', 'true');
    // scroll beyond threshold
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(1200);
    await expect(sticky).toHaveAttribute('aria-hidden', 'false');
  });

  test("hides when lead CTA is visible", async ({ page }) => {
    const sticky = page.locator('.sticky');
    // show first
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(1200);
    await expect(sticky).toHaveAttribute('aria-hidden', 'false');
    // now scroll to lead section (where left CTA is visible)
    await page.locator('#lead').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(sticky).toHaveAttribute('aria-hidden', 'true');
  });
});