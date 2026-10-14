// H01-H03: each slot on each page type (desktop/mobile), placeholders, head/footer code; dev settings restored at the end.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close } = L;
await launch();
const keys = ['under_header', 'above_pinned', 'above_posts', 'below_posts', 'sidebar_sticky'];
const all = [...keys.map((k) => 'wplusui_ad_' + k), 'wplusui_ad_in_article', 'wplusui_ad_in_article_after', 'wplusui_ad_placeholders', 'wplusui_adsense_id', 'wplusui_head_code', 'wplusui_footer_code'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(all)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const clear = Object.fromEntries(all.map((k) => [k, null]));
const pages = { home: '/', single: '/?p=26', archive: '/?cat=2', page: '/?page_id=44', search: '/?s=Navigation', notfound: '/?p=999999' };
const seen = () => ({ vis: [...document.querySelectorAll('.x-ad')].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden'; }).map((e) => e.dataset.k), inDom: [...document.querySelectorAll('.x-ad')].map((e) => e.dataset.k) });
mods(clear);
mods(Object.fromEntries(keys.map((k) => ['wplusui_ad_' + k, `<div class="x-ad" data-k="${k}">AD ${k}</div>`])));
for (const [name, url] of Object.entries(pages)) for (const vp of ['desktop', 'mobile']) { const p = await open(url, vp); out('H01 ' + name, vp, await p.evaluate(seen)); await p._ctx.close(); }
// placeholders: all slots empty
mods(clear); mods({ wplusui_ad_placeholders: true });
for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp); out('H02 on', vp, await p.evaluate(() => [...document.querySelectorAll('.adB')].filter((e) => e.getBoundingClientRect().height > 0).map((e) => e.dataset.text)));  await p._ctx.close(); }
mods(clear);
{ const p = await open('/', 'desktop'); out('H02 off', 'desktop', await p.evaluate(() => document.querySelectorAll('.adB').length)); await p._ctx.close(); }
// H03 head/footer code
mods({ wplusui_head_code: '<meta name="x-head" content="1">', wplusui_footer_code: '<div id="x-foot">F</div><script>window.xFoot=1</script>' });
for (const vp of ['desktop', 'mobile']) { const p = await open('/?p=26', vp); out('H03', vp, await p.evaluate(() => ({ head: !!document.head.querySelector('meta[name=x-head]'), foot: !!document.getElementById('x-foot'), js: window.xFoot === 1, footLast: document.getElementById('x-foot')?.compareDocumentPosition(document.querySelector('script[src*="script"]')) }))); await p._ctx.close(); }
// restore
mods(clear); mods(Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== null)));
await close();
