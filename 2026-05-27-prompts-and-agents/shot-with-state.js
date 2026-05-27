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
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.Reveal.nextFragment());
    await page.waitForTimeout(700);
    const visibles = await page.evaluate(() => {
      const slide = document.querySelector('.slide-takeaways');
      return [...slide.querySelectorAll('.takeaway')].map(el => ({
        text: el.textContent.trim().slice(0,30),
        cls: el.className.replace('takeaway fragment ', '~'),
        op: getComputedStyle(el).opacity,
      }));
    });
    console.log(`step ${i+1}:`);
    visibles.forEach((v,j) => console.log(`  ${j}: op=${v.op} cls="${v.cls}" — "${v.text}..."`));
    await page.screenshot({ path: `/tmp/deck-shots/v2-step${i+1}.png` });
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
