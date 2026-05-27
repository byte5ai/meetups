const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
    headless: true,
  });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3010/#/21', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const sec = document.querySelector('section.slide-statement--with-tweet');
    const cs = getComputedStyle(sec);
    const r = sec.getBoundingClientRect();
    return {
      classes: sec.className,
      justifyContent: cs.justifyContent,
      alignItems: cs.alignItems,
      display: cs.display,
      flexDirection: cs.flexDirection,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      width: r.width,
      height: r.height,
      gap: cs.gap,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
