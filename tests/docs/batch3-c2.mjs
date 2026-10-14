// C02-C11 interactive checks on a post, desktop and mobile.
import * as L from './lib.mjs';
const { mods, wp, open, out, launch, close, sleep } = L;
await launch();
const vis = (p, s) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.hidden; }, s);
mods({ wplusui_author_box: true, wplusui_related_title: 'Baca juga', wplusui_related_count: 3 });
wp(`update_user_meta(1,'description','Bio penulis uji.');`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  // C02 TOC
  const tocBtn = await p.evaluate(() => [...document.querySelectorAll('label[for="forTocJs"]')].map((l) => l.className + '|' + l.dataset.text + '|' + (l.getBoundingClientRect().width > 0)));
  await p.evaluate(() => document.querySelector('label[for="forTocJs"]').click()); await sleep(600);
  out('C02', vp, { tocBtn, open: await p.evaluate(() => document.getElementById('forTocJs').checked), items: await p.evaluate(() => [...document.querySelectorAll('.tocIn a')].length), first: await p.evaluate(() => document.querySelector('.tocIn a')?.textContent) });
  await p.evaluate(() => document.querySelector('.fCls[for="forTocJs"]').click());
  // C03 share
  const sh = await p.evaluate(() => ({ quick: [...document.querySelectorAll('.shrB a, .shr a, #share a')].length }));
  await p.evaluate(() => document.querySelector('label.sh').click()); await sleep(600);
  out('C03', vp, { ...sh, checked: await p.evaluate(() => document.getElementById('forShare').checked), links: await p.evaluate(() => [...document.querySelectorAll('.shareD a, .shP a, [id^="share"] a')].slice(0, 12).map((a) => a.getAttribute('aria-label') || a.textContent.trim())) });
  await p.evaluate(() => { const c = document.getElementById('forShare'); c.checked = false; c.dispatchEvent(new Event('change')); });
  out('C04', vp, { n: await p.evaluate(() => document.querySelectorAll('#related .itemRp > *').length), title: await p.evaluate(() => document.querySelector('#related h2').innerText), sameCat: await p.evaluate(() => [...document.querySelectorAll('#related article, #related .ntry')].length) });
  out('C05', vp, await p.evaluate(() => { const b = document.querySelector('.authorBox'); return b && { name: b.querySelector('.authorName')?.textContent, bio: b.querySelector('.authorBio')?.textContent, label: b.querySelector('.authorLabel')?.textContent, w: Math.round(b.getBoundingClientRect().width), cw: document.documentElement.clientWidth }; }));
  // C06 comments
  await p.evaluate(() => document.querySelector('.cmBtn').click()); await sleep(600);
  out('C06', vp, { open: await p.evaluate(() => document.getElementById('forComments').checked), form: await vis(p, '#commentform'), fields: await p.evaluate(() => [...document.querySelectorAll('#commentform input:not([type=hidden]), #commentform textarea')].map((e) => e.name)) });
  // C07 bookmark
  await p.evaluate(() => document.getElementById('forComments').click());
  await p.evaluate(() => document.querySelector('.bm-button').click()); await sleep(500);
  out('C07', vp, { stored: await p.evaluate(() => Object.keys(localStorage).filter((k) => /bm|book/i.test(k)).map((k) => k + '=' + localStorage[k].slice(0, 80))), btnClass: await p.evaluate(() => document.querySelector('.bm-button').className) });
  await p._ctx.close();
}
// C08 views
const before = +wp(`echo (int)get_post_meta(26,'wplusui_views',true);`);
let p = await open('/?p=26', 'desktop'); await p._ctx.close();
const after = +wp(`echo (int)get_post_meta(26,'wplusui_views',true);`);
out('C08', 'desktop', { before, after });
// C09 nextpage
wp(`$id=wp_insert_post(['post_title'=>'Uji halaman','post_status'=>'publish','post_content'=>"Satu\\n<!--nextpage-->\\nDua\\n<!--nextpage-->\\nTiga"]); update_option('wplusui_test_split',$id); echo get_permalink($id);`);
const sid = +wp(`echo get_option('wplusui_test_split');`);
for (const vp of ['desktop', 'mobile']) {
  p = await open('/?p=' + sid, vp);
  out('C09', vp, await p.evaluate(() => ({ pager: document.querySelector('.pgPg, .pPgr, .pPage, [class*=pag]')?.className, links: [...document.querySelectorAll('.post-page-numbers, .pPgr a, .pPgr span')].map((e) => e.textContent.trim()), body: document.getElementById('postBody').innerText.trim() })));
  await p._ctx.close();
}
// C10 in-article
mods({ wplusui_ad_in_article: '<div class="x-ad">IKLAN</div>', wplusui_ad_in_article_after: 2 });
for (const vp of ['desktop', 'mobile']) { p = await open('/?p=26', vp); out('C10', vp, await p.evaluate(() => { const ad = document.querySelector('#postBody .x-ad'); let n = 0, e = ad?.closest('.adB, div'); let prev = ad?.closest('.adB') || ad; let c = 0; for (let s = prev?.previousElementSibling; s; s = s.previousElementSibling) if (s.tagName === 'P') c++; return { found: !!ad, pBefore: c }; })); await p._ctx.close(); }
// C11 sidebar
for (const on of [true, false]) { mods({ wplusui_sidebar_single: on }); for (const vp of ['desktop', 'mobile']) { p = await open('/?p=26', vp); out('C11 sidebar=' + on, vp, await p.evaluate(() => { const s = document.querySelector('#sidebar, .sidebar, aside.sdbr, .mainSidebar'); const m = document.querySelector('.mainW, main, #main'); return { sb: s ? Math.round(s.getBoundingClientRect().width) : null, body: document.body.className.match(/\b(sdb\w*|nosb\w*|mainW\w*)\b/g) }; })); await p._ctx.close(); } }
mods({ wplusui_author_box: null, wplusui_related_title: null, wplusui_related_count: null, wplusui_ad_in_article: null, wplusui_ad_in_article_after: null, wplusui_sidebar_single: null });
wp(`wp_delete_post(${sid},true); delete_option('wplusui_test_split'); delete_user_meta(1,'description');`);
await close();
