// C07: removing a bookmark from the panel (trash button) updates the list, the badge and storage.
import * as L from './lib.mjs';
const { open, out, launch, close, sleep, base } = L;
await launch();
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  await p.evaluate(() => document.querySelector('.bm-button').click()); await sleep(400);
  await p.goto(base + '/?p=27', { waitUntil: 'networkidle0' }); await sleep(1200);
  await p.evaluate(() => document.querySelector('.bm-button').click()); await sleep(400);
  await p.evaluate(() => document.querySelector('label[for=forBookmark]').click()); await sleep(700);
  const before = await p.evaluate(() => ({ items: [...document.querySelectorAll('#forBookmark ~ * a[href*="?p="]')].map((a) => a.getAttribute('href')), badge: document.querySelector('.tBkm')?.dataset.text }));
  const btn = await p.evaluate(() => { const b = [...document.querySelectorAll('#forBookmark ~ * button')].find((x) => x.querySelector('svg') && x.getBoundingClientRect().height > 0 && !x.classList.contains('bm-button')); if (!b) return null; b.click(); return b.className || b.getAttribute('aria-label'); });
  await sleep(600);
  const after = await p.evaluate(() => ({ items: [...document.querySelectorAll('#forBookmark ~ * a[href*="?p="]')].map((a) => a.getAttribute('href')), badge: document.querySelector('.tBkm')?.dataset.text, stored: Object.keys(JSON.parse(localStorage.WPLUS_UI_STORAGE).state.bookmarks) }));
  out('C07 panel remove', vp, { before, btn, after });
  await p._ctx.close();
}
await close();
