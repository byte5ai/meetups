const { chromium } = require('playwright-core');
const fs = require('fs');
fs.mkdirSync('/tmp/interactive-shots', { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
    headless: true,
  });
  const ctx = await browser.newContext({ viewport: { width: 1680, height: 640 } });
  const page = await ctx.newPage();

  // --- Stateless animation: walk through all 9 steps ---
  await page.goto('http://localhost:3010/interactive/stateless.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/interactive-shots/stateless-01.png' });
  for (let i = 2; i <= 9; i++) {
    await page.click('#next');
    await page.waitForTimeout(900);
    await page.screenshot({ path: `/tmp/interactive-shots/stateless-${String(i).padStart(2,'0')}.png` });
    console.log(`stateless step ${i} captured`);
  }

  // --- Context Window: simulate two submissions ---
  await page.goto('http://localhost:3010/interactive/context-window.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/interactive-shots/window-01-initial.png' });

  await page.fill('#msg', 'Hallo Claude, kannst Du mir helfen?');
  await page.click('#submit');
  await page.waitForTimeout(900);
  await page.screenshot({ path: '/tmp/interactive-shots/window-02-after-first.png' });

  await page.fill('#msg', 'Erkläre mir kurz, wie ein Embedding-Vektor entsteht und welche Rolle die Dimensionalität spielt.');
  await page.click('#submit');
  await page.waitForTimeout(900);
  await page.screenshot({ path: '/tmp/interactive-shots/window-03-after-second.png' });

  await page.click('#reset');
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/interactive-shots/window-04-after-reset.png' });

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
