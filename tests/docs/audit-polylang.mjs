// L02 with the real Polylang 3.8: the theme's four texts appear under Languages > Translations (group "WPlus UI"), a translation is saved, and the front end shows it on ?lang=id (admin session by local cookie).
import * as L from './lib.mjs';
const { wp, mods, out, launch, close, sleep, VP, base } = L;
const b = await launch();
const orig = { n: 'Notification texts go here... <a href="#">Link</a>', p: null, r: null }; // demo values (a previous run may have left test texts)
mods({ wplusui_notification_text: 'Teks notifikasi uji', wplusui_popular_title: 'Judul populer uji', wplusui_related_title: 'Judul terkait uji' });
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP.desktop);
await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
await p.goto(base + '/wp-admin/admin.php?page=mlang_strings&s=uji&group=Plus+UI', { waitUntil: 'networkidle0', timeout: 90000 });
out('Polylang strings', 'desktop', await p.evaluate(() => [...document.querySelectorAll('tr')].filter((tr) => /WPlus UI/.test(tr.textContent) && /text|title/.test(tr.textContent)).map((tr) => tr.children[2]?.textContent.trim() + '|' + tr.children[3]?.textContent.trim())));
// translate the popular and related titles and the notification text into Indonesian, then save
const fill = await p.evaluate(() => { const set = (re, v) => { const tr = [...document.querySelectorAll('tr')].find((t) => re.test(t.textContent) && /WPlus UI/.test(t.textContent)); const ins = [...tr.querySelectorAll('input[type=text],textarea')]; const el = ins[1]; el.value = v; return el.name; }; return [set(/Popular posts title/, 'Populer ID'), set(/Related posts title/, 'Terkait ID'), set(/Notification text/, 'Notifikasi ID')]; });
out('Polylang fill', 'desktop', fill);
await p.click('#string-translation input[name=submit]'); await sleep(4000);
await ctx.close();
const fetchText = async (u) => (await (await fetch(base + u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } })).text());
for (const [lang, url] of [['id', '/?lang=id'], ['en', '/?lang=en']]) { const h = await fetchText(url); out('Polylang front ' + lang, 'html', { notif: /Notifikasi ID/.test(h) ? 'ID' : /Teks notifikasi uji/.test(h) ? 'EN(original)' : 'none', popular: /Populer ID/.test(h) ? 'ID' : /Judul populer uji/.test(h) ? 'EN(original)' : 'none', related: /Terkait ID/.test(h) ? 'ID' : /Judul terkait uji/.test(h) ? 'EN(original)' : 'none' }); }
mods({ wplusui_notification_text: orig.n, wplusui_popular_title: orig.p, wplusui_related_title: orig.r });
await close();
