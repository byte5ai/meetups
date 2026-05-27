const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const slidesArg = process.argv[2] || '1';
  const slides = slidesArg.split(',');
  const outDir = process.argv[3] || '/tmp/deck-shots';
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
    headless: true,
  });
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const item of slides) {
    /* "5" → slide 5, initial state.  "5:1" → slide 5, advance 1 fragment.
       Reveal-URL ist 0-indexed (#/0 = Slide 1). */
    const [nStr, stepStr] = String(item).split(':');
    const n = parseInt(nStr, 10);
    const steps = stepStr ? parseInt(stepStr, 10) : 0;
    const url = `http://localhost:3010/#/${n - 1}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    /* Explizit auf Fragment-Index -1 zurücksetzen — sonst übernimmt
       Reveal beim wiederholten goto in derselben Page ggf. den Fragment-
       Stand aus dem vorigen Iterations-Schritt (Hash-Persistenz). */
    await page.evaluate((h) => window.Reveal.slide(h, 0, -1), n - 1);
    await page.waitForTimeout(300);
    /* Reveal-API direkt nutzen — robuster als Keyboard-Events. */
    for (let i = 0; i < steps; i++) {
      await page.evaluate(() => window.Reveal.nextFragment());
      await page.waitForTimeout(800);
    }
    const idx = await page.evaluate(() => window.Reveal.getIndices());
    const suffix = steps ? `-step${steps}` : '';
    const out = path.join(outDir, `slide-${String(n).padStart(2,'0')}${suffix}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`${out}  [reveal-state: h=${idx.h} v=${idx.v} f=${idx.f}]`);
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
