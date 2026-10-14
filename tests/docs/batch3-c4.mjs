// C10 (top-level paragraphs), C07 bookmark list, C11 sidebar, C01 tags, C08 bot/logged-in, C04 same category.
import * as L from './lib.mjs';
import { execFileSync } from 'child_process';
const { mods, wp, open, out, launch, close, sleep } = L;
await launch();
mods({ wplusui_ad_in_article: '<div class="x-ad">IKLAN</div>', wplusui_ad_in_article_after: 2 });
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  out('C10', vp, await p.evaluate(() => { const ad = document.querySelector('#postBody > .adB'); if (!ad) return { inTopLevel: false, anywhere: !!document.querySelector('.x-ad') }; let c = 0; for (let s = ad.previousElementSibling; s; s = s.previousElementSibling) if (s.tagName === 'P') c++; return { inTopLevel: true, topParagraphsBefore: c }; }));
  await p._ctx.close();
}
// nested content and too few paragraphs
const id = +wp(`echo wp_insert_post(['post_title'=>'Uji iklan','post_status'=>'publish','post_category'=>[2],'post_content'=>"<div><p>a</p><p>b</p></div><p>satu</p><blockquote><p>q</p></blockquote><p>dua</p><p>tiga</p>"]);`);
for (const n of [2, 9]) {
  mods({ wplusui_ad_in_article_after: n });
  const p = await open('/?p=' + id, 'desktop');
  out('C10 after=' + n, 'desktop', await p.evaluate(() => [...document.getElementById('postBody').children].map((e) => e.tagName + (e.classList.contains('adB') ? '(AD)' : ''))));
  await p._ctx.close();
}
mods({ wplusui_ad_in_article: null, wplusui_ad_in_article_after: null });
// C01 tags + excerpt with HTML
wp(`wp_set_post_tags(${id},['alfa','featured','beta']); wp_update_post(['ID'=>${id},'post_excerpt'=>'Ringkas <b>tebal</b> <script>x</script>teks']);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + id, vp);
  out('C01 tags', vp, await p.evaluate(() => ({ tags: [...document.querySelectorAll('.pTgs a')].map((a) => a.textContent), desc: document.querySelector('.pDesc')?.innerHTML, over: document.documentElement.scrollWidth > innerWidth })));
  await p._ctx.close();
}
// C04 related are in same category
out('C04', 'php', JSON.parse(wp(`$cats=wp_get_post_categories(26);$q=wplusui_get_related_posts(26,6);$r=[];foreach($q->posts as $x){$r[]=[$x->ID,count(array_intersect($cats,wp_get_post_categories($x->ID)))>0,$x->ID==26];}echo json_encode($r);`)));
// C07 bookmark: add on post, then list opens from header icon
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  await p.evaluate(() => document.querySelector('.bm-button').click()); await sleep(500);
  const st = await p.evaluate(() => localStorage.WPLUS_UI_STORAGE?.slice(0, 200));
  const p2 = await p.browserContext().newPage(); await p2.setViewport(L.VP[vp]); await p2.setUserAgent(await p.evaluate(() => navigator.userAgent));
  await p2.goto(L.base + '/', { waitUntil: 'networkidle0' }); await sleep(1200);
  const btn = await p2.evaluate(() => { const b = document.querySelector('label[for=forBookmark], .bmL, [for*=ookmark], .hBm'); return b && b.outerHTML.slice(0, 100); });
  out('C07', vp, { st, btn, bmCount: await p2.evaluate(() => document.querySelectorAll('.bmItm, .bm-item, #bookmarks li, .bmL li').length) });
  await p._ctx.close();
}
// C08 bot and logged-in user are not counted
const views = () => +wp(`echo (int)get_post_meta(27,'wplusui_views',true);`);
const v0 = views();
execFileSync('curl', ['-s', '-o', '/dev/null', '-A', 'Googlebot/2.1', L.base + '/?p=27']);
const v1 = views();
execFileSync('curl', ['-s', '-o', '/dev/null', '-A', 'Mozilla/5.0 Chrome/124', L.base + '/?p=27']);
const v2 = views();
out('C08', 'curl', { bot: v1 - v0, human: v2 - v1 });
// C11
for (const on of [true, false]) {
  mods({ wplusui_sidebar_single: on });
  for (const vp of ['desktop', 'mobile']) {
    const p = await open('/?p=26', vp);
    out('C11 on=' + on, vp, await p.evaluate(() => { const s = document.querySelector('aside.sideB'); const r = s?.getBoundingClientRect(); return { cls: document.body.className.match(/\b(hsSb|noSb|\w*Sb)\b/g), sb: s ? [Math.round(r.width), getComputedStyle(s).display] : null, mainW: Math.round(document.querySelector('.blogP')?.getBoundingClientRect().width) }; }));
    await p._ctx.close();
  }
}
mods({ wplusui_sidebar_single: null });
wp(`wp_delete_post(${id},true);`);
await close();
