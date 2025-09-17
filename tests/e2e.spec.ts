import { test, expect } from "@playwright/test";

const home = process.env.E2E_PATH || "/index.html";

test.describe("Landing basics", () => {
  test("has main content and sections", async ({ page }) => {
    await page.goto(`${home}?t=${new Date().getTime()}`);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("section").first()).toBeVisible();
  });

  test("anchor nav updates hash (if nav exists)", async ({ page }) => {
    await page.goto(`${home}?t=${new Date().getTime()}`);
    const anchors = page.locator("nav a[href^='#']");
    const count = await anchors.count();
    test.skip(count === 0, "No anchor nav on page");
    const first = anchors.first();
    const href = await first.getAttribute("href");
    await first.click();
    await page.waitForTimeout(100);
    expect(page.url()).toContain(href!);
  });
});

// Form validation (if a form with email exists)
test("lead form has required email when present", async ({ page }) => {
  await page.goto(`${home}?t=${new Date().getTime()}`);
  const email = page.locator("input[type='email']");
  if (await email.count() === 0) test.skip(true, "No email input present");
  await expect(email).toHaveAttribute("required", /.+/);
});
