/*
 * orphans.js — Findet Layout-Orphans im Deck.
 *
 * Geht jede Slide durch (1..40 + Fragment-States), misst pro
 * relevantem Text-Block die letzte sichtbare Zeile via Range-API.
 * Meldet Blocks, deren letzte Zeile ≤ ORPHAN_THRESHOLD Wörter
 * enthält, obwohl der Block insgesamt mehrzeilig ist.
 *
 * Aufruf:
 *   node ./orphans.js            # nur Slide-Initial-State
 *   node ./orphans.js --fragments  # plus Fragment-Schritte (Slide 5, 33, 37)
 */
const { chromium } = require('playwright-core');

const ORPHAN_THRESHOLD = 1;       // Single-Word-Orphan immer melden, optional 2
const TARGET_SELECTORS = [
  '.slide-title',
  '.lead',
  '.block-lead',
  '.block-title',
  '.slide-source',
  '.b5-bullets li',
  '.compare-card p',
  '.compare-card .verdict',
  '.reason-body',
  '.reason-head',
  '.ap-body',
  '.matrix-col li',
  '.feature-card p',
  '.feature-card h3',
  '.statement-text',
  '.statement-sub',
  '.takeaway',
  '.cover-headline',
  '.cover-lead',
  '.body-text',
  '.tweet-body',
  '.pull-quote',
];
const SLIDES = Array.from({ length: 37 }, (_, i) => i + 1);
const FRAGMENT_SLIDES = process.argv.includes('--fragments')
  ? [
      { n: 5,  steps: 1 },
      { n: 33, steps: 1 },
      { n: 37, steps: 3 },
    ]
  : [];

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
    headless: true,
  });
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const findings = [];

  for (const n of SLIDES) {
    await page.goto(`http://localhost:3010/#/${n - 1}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.evaluate((h) => window.Reveal.slide(h, 0, -1), n - 1);
    await page.waitForTimeout(250);
    await collect(page, n, 0, findings);
  }
  for (const { n, steps } of FRAGMENT_SLIDES) {
    for (let s = 1; s <= steps; s++) {
      await page.goto(`http://localhost:3010/#/${n - 1}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      await page.evaluate((h) => window.Reveal.slide(h, 0, -1), n - 1);
      await page.waitForTimeout(200);
      for (let i = 0; i < s; i++) {
        await page.evaluate(() => window.Reveal.nextFragment());
        await page.waitForTimeout(450);
      }
      await collect(page, n, s, findings);
    }
  }

  await browser.close();

  if (findings.length === 0) {
    console.log('✓ Keine Orphans gefunden.');
    process.exit(0);
  }
  console.log(`⚠ ${findings.length} potenzielle Orphans:\n`);
  for (const f of findings) {
    const tag = f.step ? `Slide ${f.slide} (step ${f.step})` : `Slide ${f.slide}`;
    console.log(`${tag} · ${f.selector}`);
    console.log(`   "${f.text.slice(0, 120)}"`);
    console.log(`   → letzte Zeile (${f.lastLineWords} Wort/e): "${f.lastLine}"\n`);
  }
  process.exit(1);
})().catch(e => { console.error(e); process.exit(2); });

async function collect(page, slideNum, step, findings) {
  const orphans = await page.evaluate(
    ({ selectors, threshold }) => {
      const visible = document.querySelector('section.present');
      if (!visible) return [];
      const results = [];
      for (const sel of selectors) {
        const els = visible.querySelectorAll(sel);
        for (const el of els) {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.5) continue;
          const text = el.innerText.trim();
          if (!text || text.length < 8) continue;

          /* Letzte Zeile per Range: nimm letzten Text-Knoten + Position der
             letzten Zeile via getClientRects(). */
          const lineRects = getLineRects(el);
          if (lineRects.length < 2) continue;   // einzeilig → kein Orphan
          const lastRect = lineRects[lineRects.length - 1];
          const lastLineText = textInRect(el, lastRect).trim();
          const wordCount = lastLineText.split(/\s+/).filter(Boolean).length;
          if (wordCount <= threshold) {
            results.push({
              selector: sel,
              text,
              lastLine: lastLineText,
              lastLineWords: wordCount,
            });
          }
        }
      }
      return results;

      function getLineRects(el) {
        // Sammle alle Zeilen-Boundary-Y-Werte aus den Client-Rects der Text-Nodes
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter(r => r.width > 1 && r.height > 1);
        // Gruppiere nach Y-Position (Linie)
        const lines = [];
        for (const r of rects) {
          const last = lines[lines.length - 1];
          if (last && Math.abs(r.top - last.top) < 4) {
            last.left = Math.min(last.left, r.left);
            last.right = Math.max(last.right, r.right);
            last.bottom = Math.max(last.bottom, r.bottom);
          } else {
            lines.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
          }
        }
        return lines;
      }

      function textInRect(el, rect) {
        const range = document.createRange();
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        let out = '';
        let node;
        while ((node = walker.nextNode())) {
          for (let i = 0; i < node.length; i++) {
            range.setStart(node, i);
            range.setEnd(node, Math.min(i + 1, node.length));
            const r = range.getBoundingClientRect();
            if (r.top >= rect.top - 2 && r.bottom <= rect.bottom + 2 && r.left >= rect.left - 2) {
              out += node.data[i];
            }
          }
        }
        return out;
      }
    },
    { selectors: TARGET_SELECTORS, threshold: ORPHAN_THRESHOLD }
  );
  for (const o of orphans) {
    findings.push({ slide: slideNum, step, ...o });
  }
}
