const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
    headless: true,
  });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3010/#/36', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  console.log('start:', JSON.stringify(await page.evaluate(() => Reveal.getIndices())));
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => Reveal.nextFragment());
    await page.waitForTimeout(600);
    const ind = await page.evaluate(() => Reveal.getIndices());
    const visibles = await page.evaluate(() => {
      const slide = document.querySelector('.slide-takeaways');
      if (!slide) return 'NO TAKEAWAYS SLIDE FOUND';
      return [...slide.querySelectorAll('.takeaway')].map(el => ({
        cls: el.className,
        op: getComputedStyle(el).opacity,
      }));
    });
    console.log(`step ${i+1}:`, JSON.stringify(ind), 'visibles:', JSON.stringify(visibles));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
