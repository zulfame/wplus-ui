// AUDIT group C (gaps found when re-checking batch 3): share links/popup/copy/settings, related off, author box default, bookmark remove, view counting rules, split post page 2.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close, sleep, base, VP } = L;
const b = await launch();
const keys = ['wplusui_share_enabled', 'wplusui_share_quick_1', 'wplusui_share_quick_2', 'wplusui_share_quick_3', ...['facebook', 'whatsapp', 'x', 'telegram', 'pinterest', 'linkedin', 'line', 'email'].map((k) => 'wplusui_share_popup_' + k), 'wplusui_related_show', 'wplusui_author_box'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const clear = Object.fromEntries(keys.map((k) => [k, null]));
mods(clear);
const permalink = 'http://127.0.0.1:8091/?p=26';
const share = () => ({ quick: [...document.querySelectorAll('#share .pShc > a')].map((a) => a.getAttribute('aria-label') + ' ' + a.href), popup: [...document.querySelectorAll('#share .shL a')].map((a) => a.getAttribute('aria-label') + ' ' + a.href.slice(0, 80)), copy: document.getElementById('shareLinkInput')?.value, infoIcon: !!document.querySelector('label.sh'), shareBlock: !!document.getElementById('share') });
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  const r = await p.evaluate(share);
  out('C03 defaults', vp, { quick: r.quick.map((x) => x.split(' ')[0] + ' ' + (x.split(' ').pop().includes(encodeURIComponent(permalink)) ? 'url-ok' : 'url-BAD')), popupCount: r.popup.length, popupLabels: r.popup.map((x) => x.split(' ')[0]).join(','), copy: r.copy });
  out('C03 twitter text', vp, r.quick.find((x) => /Twitter/.test(x)).includes('text=') && decodeURIComponent(r.quick.find((x) => /Twitter/.test(x))).includes('UI Components and Typography'));
  // popup open/close
  await p.evaluate(() => document.querySelector('#share label[for=forShare]').click()); await sleep(600);
  const open1 = await p.evaluate(() => ({ checked: document.getElementById('forShare').checked, pop: document.querySelector('.shBr').getBoundingClientRect().height > 0, preview: document.querySelector('.shPt')?.dataset.text }));
  await p.evaluate(() => document.querySelector('.shH label.c').click()); await sleep(500);
  const closed = await p.evaluate(() => document.getElementById('forShare').checked);
  await p.evaluate(() => document.querySelector('#share label[for=forShare]').click()); await sleep(400);
  await p.evaluate(() => document.querySelector('label.fCls[for=forShare]').click()); await sleep(400);
  out('C03 popup', vp, { open1, closedByX: !closed, closedByOutside: await p.evaluate(() => !document.getElementById('forShare').checked) });
  // copy link
  const ctx = p.browserContext(); await ctx.overridePermissions(base, ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']);
  await p.evaluate(() => document.querySelector('#share label[for=forShare]').click()); await sleep(500);
  await p.evaluate(() => document.querySelector('.cpL label').click()); await sleep(700);
  out('C03 copy', vp, { clipboard: await p.evaluate(() => navigator.clipboard.readText().catch((e) => 'ERR ' + e.message)), toast: await p.evaluate(() => document.querySelector('.ntfTst, .ntf-toast, [class*=toast], #ntfT')?.textContent?.trim().slice(0, 40) ?? null) });
  await p._ctx.close();
}
// settings: quick buttons changed, one set to none, popup subset, share off
mods({ wplusui_share_quick_1: 'telegram', wplusui_share_quick_2: '', wplusui_share_quick_3: 'linkedin', wplusui_share_popup_facebook: false, wplusui_share_popup_x: false, wplusui_share_popup_email: false });
for (const vp of ['desktop', 'mobile']) { const p = await open('/?p=26', vp); const r = await p.evaluate(share); out('C03 custom', vp, { quick: r.quick.map((x) => x.split(' ')[0]), popup: r.popup.map((x) => x.split(' ')[0]) }); await p._ctx.close(); }
mods({ wplusui_share_enabled: false, wplusui_mobile_bar_show: true });
for (const vp of ['desktop', 'mobile']) { const p = await open('/?p=26', vp); const r = await p.evaluate(share); out('C03 off', vp, { ...r, mobileBarShare: await p.evaluate(() => !!document.querySelector('.mobM label[for=forShare]')), over: await p.evaluate(() => document.documentElement.scrollWidth > innerWidth) }); await p._ctx.close(); }
mods({ wplusui_mobile_bar_show: saved.wplusui_mobile_bar_show ?? null });
mods(clear);
// C04 off, C05 default
mods({ wplusui_related_show: false });
{ const p = await open('/?p=26', 'desktop'); out('C04 off', 'desktop', await p.evaluate(() => ({ related: !!document.getElementById('related'), authorBox: !!document.querySelector('.authorBox') }))); await p._ctx.close(); }
mods(clear);
// C07 bookmark remove
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=26', vp);
  await p.evaluate(() => document.querySelector('.bm-button').click()); await sleep(400);
  const added = await p.evaluate(() => ({ cls: document.querySelector('.bm-button').className, badge: document.querySelector('.tBkm')?.dataset.text }));
  await p.evaluate(() => document.querySelector('.bm-button').click()); await sleep(400);
  const removed = await p.evaluate(() => ({ cls: document.querySelector('.bm-button').className, badge: document.querySelector('.tBkm')?.dataset.text, stored: Object.keys(JSON.parse(localStorage.WPLUS_UI_STORAGE).state.bookmarks).length }));
  // add on card at home, remove from the panel's trash
  await p.goto(base + '/', { waitUntil: 'networkidle0' }); await sleep(1500);
  await p.evaluate(() => document.querySelector('.blogP .bm-button, .bm-button').click()); await sleep(400);
  await p.evaluate(() => document.querySelector('label[for=forBookmark]').click()); await sleep(600);
  const inPanel = await p.evaluate(() => document.querySelectorAll('.bmC .itm, .bmL .itm, #bookmarks .itm, [class*=bmItm]').length);
  const trash = await p.evaluate(() => { const t = document.querySelector('#forBookmark ~ * .bm-remove, .bmH ~ * button, [class*=bookmark] button[class*=rm], .bmP button'); return !!t; });
  out('C07 remove', vp, { added, removed, inPanel, trash });
  await p._ctx.close();
}
// C08 views: logged-in user and preview are not counted
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
const views = () => +wp(`echo (int)get_post_meta(28,'wplusui_views',true);`);
const v0 = views();
{ const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' }))); await p.setUserAgent('Mozilla/5.0 Chrome/124'); await p.goto(base + '/?p=28', { waitUntil: 'networkidle0' }); await ctx.close(); }
const v1 = views();
{ const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' }))); await p.setUserAgent('Mozilla/5.0 Chrome/124'); await p.goto(base + '/?p=28&preview=true', { waitUntil: 'networkidle0' }); await ctx.close(); }
const v2 = views();
{ const p = await open('/?p=28', 'desktop'); await p._ctx.close(); }
out('C08', 'php', { loggedIn: v1 - v0, preview: v2 - v1, visitor: views() - v2 });
// C09 page 2 of a split post
const sid = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji split','post_status'=>'publish','post_content'=>"Halaman satu\\n<!--nextpage-->\\nHalaman dua\\n<!--nextpage-->\\nHalaman tiga"]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + sid, vp);
  await p.evaluate(() => document.querySelector('.blogN a.olLnk').click()); await sleep(1500);
  out('C09 page2', vp, await p.evaluate(() => ({ url: location.search, body: document.getElementById('postBody').innerText.trim(), nav: [...document.querySelectorAll('.blogN > *')].map((e) => (e.dataset.text || e.getAttribute('aria-label') || '').trim()).join('|') })));
  await p._ctx.close();
}
wp(`wp_delete_post(${sid},true);`);
mods(Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== null)));
await close();
