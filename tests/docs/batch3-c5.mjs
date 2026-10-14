// C07: bookmark added on a post shows in the list opened from the header icon, and can be removed.
import * as L from './lib.mjs';
const { open, out, launch, close, sleep } = L;
await launch();
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  await p.evaluate(() => document.querySelector('.bm-button').click()); await sleep(500);
  await p.goto(L.base + '/?p=27', { waitUntil: 'networkidle0' }); await sleep(1200);
  await p.evaluate(() => document.querySelector('label[for=forBookmark]').click()); await sleep(700);
  out('C07', vp, await p.evaluate(() => ({ open: document.getElementById('forBookmark').checked, badge: document.querySelector('.tBkm').dataset.text, items: [...document.querySelectorAll('.bmC a, #bookmarkList a, .bmL a, .bkmL a')].map((a) => a.textContent.trim().slice(0, 40)), html: document.querySelector('.bmL, .bkmL, #bookmark, .bmH')?.parentElement?.className })));
  await p.screenshot({ path: `/tmp/bm-${vp}.png` });
  await p._ctx.close();
}
await close();
