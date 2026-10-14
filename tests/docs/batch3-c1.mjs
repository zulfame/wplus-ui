// C01-C05, C11, C09: post page facts at desktop and mobile.
import * as L from './lib.mjs';
const { mods, wp, open, out, launch, close } = L;
await launch();
const facts = () => {
  const q = (s) => document.querySelector(s);
  const vis = (s) => { const e = q(s); if (!e) return null; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  return {
    crumb: q('.brdCmb')?.innerText.replace(/\s+/g, ' '),
    h1: q('h1')?.innerText,
    desc: q('.pDesc')?.innerText,
    avatar: vis('.pAt img'), author: q('.pAt .nm')?.dataset.text,
    pub: q('.pDt.p time')?.dataset.time, upd: q('.pDt.u time')?.dataset.time,
    read: q('#postReadTime')?.dataset.minutes, readShown: getComputedStyle(q('#postReadTime'), '::after').content || getComputedStyle(q('#postReadTime'), '::before').content,
    tags: [...document.querySelectorAll('.pTgs a')].map((a) => a.textContent),
    tocBtn: !!q('[for="forToc"], .tocBtn, [data-toc]'),
    shareBtn: vis('label.sh'), related: document.querySelectorAll('#related .itemRp > *').length, relTitle: q('#related h2')?.innerText,
    author_box: !!q('.authBox, .aBox, .pAuthor'), sidebar: vis('#sidebar, .sidebar, aside'),
    bm: vis('.bm-button'), cmBtn: vis('.cmBtn'), overflowX: document.documentElement.scrollWidth > innerWidth + 1,
  };
};
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  out('C01', vp, await p.evaluate(facts));
  await p._ctx.close();
}
await close();
