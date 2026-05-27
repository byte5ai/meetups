const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

(async () => {
  const SLIDES_DIR = '/tmp/deck-shots';
  const OUT = '/tmp/deck-mosaic.png';
  const COLS = 5;
  const THUMB_W = 384;
  const THUMB_H = Math.round(THUMB_W * 1080 / 1920);

  const slides = [];
  for (let i = 1; i <= 37; i++) {
    const p = path.join(SLIDES_DIR, `slide-${String(i).padStart(2,'0')}.png`);
    if (fs.existsSync(p)) {
      const b64 = fs.readFileSync(p).toString('base64');
      slides.push({ num: i, src: `data:image/png;base64,${b64}` });
    }
  }
  const ROWS = Math.ceil(slides.length / COLS);
  const html = `<!doctype html><html><head><style>
    body { margin: 0; background: #0A1420; font-family: sans-serif; padding: 24px; }
    .grid { display: grid; grid-template-columns: repeat(${COLS}, ${THUMB_W}px); gap: 16px; }
    .cell { position: relative; background: #15212B; border-radius: 8px; overflow: hidden; }
    .cell img { display: block; width: ${THUMB_W}px; height: ${THUMB_H}px; }
    .lbl {
      position: absolute; top: 6px; left: 8px;
      color: #fff; font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 14px; font-weight: 700;
      background: rgba(0,0,0,0.4); padding: 2px 8px; border-radius: 4px;
    }
  </style></head><body><div class="grid">
    ${slides.map(s => `<div class="cell"><img src="${s.src}"><span class="lbl">${String(s.num).padStart(2,'0')}</span></div>`).join('')}
  </div></body></html>`;

  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
    headless: true,
  });
  const width = 24 + COLS * THUMB_W + (COLS - 1) * 16 + 24;
  const height = 24 + ROWS * THUMB_H + (ROWS - 1) * 16 + 24;
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: OUT, fullPage: true });
  await browser.close();
  console.log(`Mosaic written: ${OUT} (${width}x${height})`);
})().catch(e => { console.error(e); process.exit(1); });
