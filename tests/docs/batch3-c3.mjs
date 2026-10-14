// C02 floating TOC button: appears on scroll, opens panel with links, closes; off switch removes it.
import * as L from './lib.mjs';
const { open, launch, close, sleep, mods, out } = L;
await launch();
const info = (p) => p.evaluate(() => {
  const l = [...document.querySelectorAll('label[for=forTocJs]')].filter((e) => !e.closest('#postToc'));
  return { outerLabels: l.map((e) => e.className), tocLhidden: document.getElementById('postToc')?.hidden, checked: document.getElementById('forTocJs')?.checked, links: document.querySelectorAll('#postToc .tocIn a').length, hasShell: !!document.getElementById('postToc') };
});
for (const on of [true, false]) {
  mods({ wplusui_toc_show: on });
  for (const vp of ['desktop', 'mobile']) {
    const p = await open('/?p=26', vp);
    const top = await info(p);
    await p.evaluate(() => scrollTo(0, 900)); await sleep(800);
    const el = await p.evaluateHandle(() => [...document.querySelectorAll('*')].find((e) => getComputedStyle(e).position === 'fixed' && /toc|aToc|tocB/i.test(e.className + e.id) && e.getBoundingClientRect().width > 0 && !e.closest('#postToc')));
    const fixedBtn = await p.evaluate((e) => e && e.tagName + '.' + e.className, el);
    out('C02 toc=' + on, vp, { top, fixedBtn, shell: (await info(p)).hasShell });
    await p._ctx.close();
  }
}
mods({ wplusui_toc_show: null });
await close();
