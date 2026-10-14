// B01: Next / Previous / dot controls of the carousel, wrap-around, and that pointer clicks reach them.
import * as L from './lib.mjs';
const { open, out, launch, close, sleep } = L;
await launch();
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/', vp, { wait: 2000 });
  { const bx = await (await p.$('.sldW')).boundingBox(); await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); } // hovering pauses the automatic advance
  const idx = () => p.evaluate(() => [...document.querySelectorAll('.sldW > input')].findIndex((i) => i.checked));
  const click = (grp, i) => p.evaluate((g, i) => { const cur = [...document.querySelectorAll('.sldW > input')].findIndex((x) => x.checked); const labels = [...document.querySelectorAll('.sldW .' + g + ' label')]; (g === 'sldD' ? labels[i] : labels[cur]).click(); }, grp, i);
  const seq = [await idx()];
  await click('sldN'); await sleep(300); seq.push(await idx());
  await click('sldN'); await sleep(300); seq.push(await idx());
  await click('sldP'); await sleep(300); seq.push(await idx());
  await click('sldD', 4); await sleep(300); seq.push(await idx());
  await click('sldN'); await sleep(300); seq.push(await idx()); // wrap 4 -> 0
  await click('sldP'); await sleep(300); seq.push(await idx()); // wrap 0 -> 4
  out('B01 controls', vp, { sequence: seq, expected: [0, 1, 2, 1, 4, 0, 4] });
  // real pointer: hover the slider then click the visible Next area
  const box = await (await p.$('.sldW')).boundingBox();
  await p.evaluate(() => scrollTo(0, 0)); await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await sleep(400);
  const nx = await p.evaluate(() => { const l = [...document.querySelectorAll('.sldW .sldN label')].find((x) => x.getBoundingClientRect().width > 0 && getComputedStyle(x).display !== 'none'); const r = l?.getBoundingClientRect(); return r ? [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2), Math.round(r.width), Math.round(r.height)] : null; });
  const before = await idx();
  if (nx) { await p.mouse.click(nx[0], nx[1]); await sleep(500); }
  out('B01 pointer', vp, { nextBox: nx, before, after: await idx() });
  await p._ctx.close();
}
await close();
