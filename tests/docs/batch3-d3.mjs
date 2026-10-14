import * as L from './lib.mjs';
const { open, out, launch, close } = L;
await launch();
for (const vp of ['desktop', 'mobile']) {
  let p = await open('/?p=999999', vp);
  out('D04', vp, await p.evaluate(() => ({ h3: document.querySelector('.erroC h3')?.innerText.replace(/\s+/g, ' '), p: document.querySelector('.erroC p')?.innerText, btn: document.querySelector('.erroC .button')?.getAttribute('href'), cls: document.body.className.includes('error404'), over: document.documentElement.scrollWidth > innerWidth + 1 })));
  await p.screenshot({ path: `/tmp/d4-${vp}.png` });
  await p._ctx.close();
  p = await open('/?s=Navigation', vp);
  out('D03', vp, await p.evaluate(() => ({ heading: document.querySelector('.mainC h1, .mainC h2, .ldH, .pTtl')?.innerText.replace(/\s+/g, ' '), cards: document.querySelectorAll('.blogP .ntry, .blogP article').length, grid: getComputedStyle(document.querySelector('.blogP .ntry, .blogP article').parentElement).display })));
  await p.screenshot({ path: `/tmp/d3-${vp}.png` });
  await p._ctx.close();
}
await close();
