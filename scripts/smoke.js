// scripts/smoke.js
// Usage: node scripts/smoke.js [baseUrl]
// Default baseUrl: http://127.0.0.1:8080/index.html

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const base = process.argv[2] || 'http://127.0.0.1:8080/index.html';
  const outDir = path.join(process.cwd(), 'screenshots-ci');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  async function shot(url, size, theme, name){
    await page.setViewportSize(size);
    // toggle theme
    await page.goto(url, { waitUntil: 'load' });
    if (theme === 'dark') {
      await page.evaluate(() => document.documentElement.setAttribute('data-theme','dark'));
    } else {
      await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));
    }
    await page.waitForTimeout(200); // allow fonts/layout settle
    await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
  }

  const targets = [
    { url: base, name: 'index' },
    { url: base.replace('index.html','privacy.html'), name: 'privacy' },
    { url: base.replace('index.html','offer.html'), name: 'offer' },
  ];
  const sizes = [
    { w: 360, h: 740, tag: '360x740' },
    { w: 1280, h: 800, tag: '1280x800' },
  ];
  for (const t of targets){
    for (const s of sizes){
      await shot(t.url, { width: s.w, height: s.h }, 'light', `${t.name}-light-${s.tag}`);
      await shot(t.url, { width: s.w, height: s.h }, 'dark', `${t.name}-dark-${s.tag}`);
    }
  }

  await browser.close();
  console.log('Smoke screenshots saved to', outDir);
})();
