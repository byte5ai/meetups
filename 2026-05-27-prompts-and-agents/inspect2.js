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
    return {
      inlineStyle: sec.getAttribute('style'),
      childCount: sec.children.length,
      firstChild: sec.children[0]?.className,
      relevantRules: [...document.styleSheets].flatMap(ss => {
        try {
          return [...ss.cssRules].filter(r => r.selectorText && r.selectorText.includes('statement')).map(r => r.selectorText + ': ' + (r.style.display || ''));
        } catch (e) { return []; }
      }),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
