// E01 dropdown without JavaScript + screenshots of the opened menu (demo menu).
import * as L from './lib.mjs';
const { open, out, launch, close, sleep, VP, base } = L;
const b = await launch();
for (const vp of ['desktop', 'mobile']) {
  const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP[vp]);
  await p.setJavaScriptEnabled(false);
  await p.goto(base + '/?page_id=44', { waitUntil: 'networkidle0' });
  // open the drawer / menu with the checkbox label, then use the dropdown label of the first closed item
  await p.evaluate(() => { const l = document.querySelector('label[for=forNavigation]'); l && l.click(); });
  await sleep(500);
  const h = () => p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].filter((l) => l.querySelector(':scope > ul') && !l.querySelector(':scope > input').checked)[0]; const ul = li.querySelector(':scope > ul'); return Math.round(ul.getBoundingClientRect().height); });
  const before = await h();
  await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].filter((l) => l.querySelector(':scope > ul') && !l.querySelector(':scope > input').checked)[0]; li.querySelector(':scope > label').click(); });
  await sleep(600);
  const after = await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => l.querySelector(':scope > input')?.checked && !/Sub Menu|More/.test('')); const ul = li.querySelector(':scope > ul'); return Math.round(ul.getBoundingClientRect().height); });
  out('E01 no-JS', vp, { navOpen: await p.evaluate(() => document.getElementById('forNavigation')?.checked), before, afterSomeOpen: after });
  await p.screenshot({ path: `/tmp/e1open-${vp}.png` });
  await ctx.close();
}
await close();
