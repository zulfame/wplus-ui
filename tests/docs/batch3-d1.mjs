// D01 page, D03 search, D04 404, D05 contact page without the plugin.
import * as L from './lib.mjs';
const { mods, wp, open, out, launch, close } = L;
await launch();
for (const vp of ['desktop', 'mobile']) {
  let p = await open('/?page_id=44', vp);
  out('D01', vp, await p.evaluate(() => ({ crumb: document.querySelector('.brdCmb')?.innerText.replace(/\s+/g, ' '), h1: document.querySelector('h1')?.innerText, byline: !!document.querySelector('.pInf'), comments: !!document.querySelector('.pCmnts'), related: !!document.getElementById('related'), sidebar: !!document.querySelector('aside.sideB'), toc: !!document.getElementById('postToc'), bodyLen: document.getElementById('postBody').innerText.length, over: document.documentElement.scrollWidth > innerWidth + 1 })));
  await p._ctx.close();
  p = await open('/?s=Navigation', vp);
  out('D03', vp, await p.evaluate(() => ({ title: document.querySelector('.ldH, h1, .title')?.innerText, posts: document.querySelectorAll('.ntry, article').length, sidebar: !!document.querySelector('aside.sideB'), over: document.documentElement.scrollWidth > innerWidth + 1 })));
  await p._ctx.close();
  p = await open('/?s=zzzxxyy', vp);
  out('D03 empty', vp, await p.evaluate(() => document.querySelector('main, .mainC')?.innerText.replace(/\s+/g, ' ').slice(0, 200)));
  await p._ctx.close();
  p = await open('/tidak-ada-halaman-ini/', vp);
  out('D04', vp, await p.evaluate(() => ({ h3: document.querySelector('.erroC h3')?.innerText.replace(/\s+/g, ' '), btn: document.querySelector('.erroC .button')?.href, title: document.title, over: document.documentElement.scrollWidth > innerWidth + 1 })));
  await p.screenshot({ path: `/tmp/d4-${vp}.png` });
  await p._ctx.close();
  p = await open('/?page_id=155', vp);
  out('D05 no-CF7 visitor', vp, await p.evaluate(() => ({ body: document.getElementById('postBody').innerText.replace(/\s+/g, ' ') })));
  await p._ctx.close();
}
mods({ wplusui_sidebar_search: false });
let p = await open('/?s=Navigation', 'desktop'); out('D03 sidebar off', 'desktop', await p.evaluate(() => !!document.querySelector('aside.sideB'))); await p._ctx.close();
mods({ wplusui_sidebar_search: true });
p = await open('/?s=Navigation', 'desktop'); out('D03 sidebar on', 'desktop', await p.evaluate(() => !!document.querySelector('aside.sideB'))); await p._ctx.close();
mods({ wplusui_sidebar_search: null });
out('D04 http', 'fetch', (await fetch(L.base + '/tidak-ada-halaman-ini/')).status);
await close();
