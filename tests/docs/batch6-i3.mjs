// I03 Coming Soon / Maintenance: status codes, who sees what, countdown, texts, auto-open; dev settings restored.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close, sleep, VP, base } = L;
const b = await launch();
const keys = ['wplusui_soon_mode', 'wplusui_soon_enabled', 'wplusui_soon_title', 'wplusui_soon_text', 'wplusui_soon_badge', 'wplusui_soon_date', 'wplusui_soon_units', 'wplusui_soon_live', 'wplusui_soon_auto_open', 'wplusui_soon_social', 'wplusui_soon_image', 'wplusui_soon_button_text', 'wplusui_soon_button_url'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const clear = Object.fromEntries(keys.map((k) => [k, null]));
mods(clear);
const head = async (url, ua = 'Mozilla/5.0 Chrome/124') => { const r = await fetch(base + url, { headers: { 'user-agent': ua }, redirect: 'manual' }); return { status: r.status, retry: r.headers.get('retry-after'), t: (await r.text()).match(/<title>(.*?)<\/title>/)?.[1] }; };
out('off', 'fetch', await head('/'));
mods({ wplusui_soon_mode: 'coming_soon' });
out('coming_soon', 'fetch', await head('/'));
out('coming_soon REST', 'fetch', (await head('/index.php?rest_route=/')).status);
out('coming_soon feed', 'fetch', (await head('/?feed=rss2')).status);
mods({ wplusui_soon_mode: 'maintenance' });
out('maintenance', 'fetch', await head('/?p=26'));
// staff and preview
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
{ const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
  const r1 = await p.goto(base + '/', { waitUntil: 'domcontentloaded' }); out('staff', 'browser', { status: r1.status(), title: await p.title() });
  const r2 = await p.goto(base + '/?wplusui-preview=1', { waitUntil: 'domcontentloaded' }); out('staff preview', 'browser', { status: r2.status(), title: await p.title() }); await ctx.close(); }
// full page with countdown and custom texts
const future = wp(`echo wp_date('Y-m-d\\TH:i',time()+2*86400+3*3600+5*60+30);`);
mods({ wplusui_soon_mode: 'coming_soon', wplusui_soon_title: 'Segera hadir', wplusui_soon_text: 'Baris satu\nBaris dua', wplusui_soon_badge: 'Akan datang', wplusui_soon_date: future, wplusui_soon_units: 'Hari, Jam, Menit, Detik', wplusui_soon_button_text: 'Hubungi', wplusui_soon_button_url: 'https://example.com', wplusui_soon_social: true });
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/', vp);
  out('full page', vp, await p.evaluate(() => ({ title: document.title, h1: document.querySelector('h1').textContent, badge: document.querySelector('.badge').textContent, units: [...document.querySelectorAll('.cd span')].map((s) => s.textContent), cd: [...document.querySelectorAll('.cd b')].map((b) => b.textContent), btn: document.querySelector('.btn')?.textContent, social: document.querySelectorAll('.soc a').length, robots: document.querySelector('meta[name=robots]').content, over: document.documentElement.scrollWidth > innerWidth, mainW: Math.round(document.querySelector('main').getBoundingClientRect().width) })));
  await sleep(2200); out('ticking', vp, await p.evaluate(() => document.querySelector('[data-u=s]').textContent));
  await p.screenshot({ path: `/tmp/i3-${vp}.png` }); await p._ctx.close();
}
// social off, no button, defaults
mods({ wplusui_soon_social: false, wplusui_soon_title: null, wplusui_soon_text: null, wplusui_soon_badge: null, wplusui_soon_button_text: null, wplusui_soon_units: null });
{ const p = await open('/', 'desktop'); out('defaults', 'desktop', await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, badge: document.querySelector('.badge').textContent, text: document.querySelector('.text').textContent, units: [...document.querySelectorAll('.cd span')].map((s) => s.textContent).join(), social: document.querySelectorAll('.soc a').length, btn: !!document.querySelector('.btn') }))); await p._ctx.close(); }
// past date: auto-open on -> site; off -> live message
const past = wp(`echo wp_date('Y-m-d\\TH:i',time()-3600);`);
mods({ wplusui_soon_date: past, wplusui_soon_auto_open: true }); out('past + auto-open', 'fetch', await head('/'));
mods({ wplusui_soon_auto_open: false });
{ const p = await open('/', 'desktop'); out('past, no auto-open', 'desktop', await p.evaluate(() => ({ title: document.title, live: getComputedStyle(document.getElementById('live')).display, cd: [...document.querySelectorAll('.cd b')].map((b) => b.textContent).join(':') }))); await p._ctx.close(); }
mods(clear); mods(Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== null)));
out('restored', 'php', wp(`echo var_export(get_theme_mod('wplusui_soon_mode',null),true);`));
await close();
