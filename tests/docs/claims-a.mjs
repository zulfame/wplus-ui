// FITUR.md group A/B claims that earlier tests only touched: appearance panel, scheme panel, radius clamp, notification position/link, carousel interval.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep } = L;
await launch();
const keys = ['wplusui_button_radius', 'wplusui_default_scheme', 'wplusui_default_mode', 'wplusui_notification_text', 'wplusui_notification_cta_text', 'wplusui_notification_cta_url'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
try {
  for (const vp of ['desktop', 'mobile']) {
    const p = await open('/', vp, { wait: 2000 });
    // A01: appearance panel with Light / Dark / System
    const ico = await p.evaluate(() => { const l = document.querySelector('label[for=forAppearance], .tDL'); return l ? l.tagName + '.' + l.className : null; });
    await p.evaluate(() => { const l = document.querySelector('label[for=forAppearance]'); (l || document.querySelector('.tDL'))?.click(); }); await sleep(500);
    const panel = await p.evaluate(() => ({ open: document.getElementById('forAppearance')?.checked, buttons: [...document.querySelectorAll('.aprW button')].map((b) => b.getAttribute('aria-label')), theme: !!document.querySelector('.aprW label.thmB') }));
    claim('A01 ' + vp, 'ikon header membuka panel Appearance dengan Light, Dark, System, Theme', panel.buttons.join() === 'Light,Dark,System' && panel.theme, { ico, panel });
    const mode = async (name) => { await p.evaluate((n) => document.querySelector('.aprW .' + n).click(), name); await sleep(400); return p.evaluate(() => document.documentElement.className.match(/lgT|drK/)?.[0] + '|' + JSON.parse(localStorage.WPLUS_UI_STORAGE).state.theme); };
    claim('A01 ' + vp, 'tombol Dark lalu Light mengganti mode dan menyimpannya', (await mode('drkB')).startsWith('drK') && (await mode('lgtB')).startsWith('lgT'));
    // A02: 16 swatches, choosing one sets the scheme and keeps it after reload
    await p.evaluate(() => document.querySelector('label.thmB').click()); await sleep(400);
    const sw = await p.evaluate(() => document.querySelectorAll('.thmP button').length);
    await p.evaluate(() => document.querySelector('.thmP .csB7').click()); await sleep(400);
    await p.reload({ waitUntil: 'networkidle0' }); await p.mouse.move(30, 30); await sleep(1200);
    claim('A02 ' + vp, '16 lingkaran warna; pilihan 7 bertahan setelah muat ulang', sw === 16 && /cs7/.test(await p.evaluate(() => document.documentElement.className)), sw);
    await p._ctx.close();
  }
  // A02: default scheme setting
  mods({ wplusui_default_scheme: 9 });
  { const p = await open('/', 'desktop'); claim('A02', 'skema bawaan 9 dari pengaturan', /cs9/.test(await p.evaluate(() => document.documentElement.className))); await p._ctx.close(); }
  // A04: radius clamp 0..30 on output (a value outside the range stored by import/CLI must not go through)
  for (const [v, exp] of [[50, '30px'], [12, '12px'], [0, '0px']]) { mods({ wplusui_button_radius: String(v) }); const p = await open('/', 'desktop'); const got = await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--linkR').trim() || getComputedStyle(document.body).getPropertyValue('--linkR').trim()); claim('A04', `radius ${v} menghasilkan ${exp}`, got === exp, got); await p._ctx.close(); }
  // A09: bar notification below the quick links, text may hold a link, button goes to the URL
  mods({ wplusui_notification_text: 'Halo <a href="/x">tautan</a>', wplusui_notification_cta_text: 'Klik', wplusui_notification_cta_url: 'https://example.com/a' });
  for (const vp of ['desktop', 'mobile']) {
    const p = await open('/', vp);
    const r = await p.evaluate(() => { const n = document.querySelector('.ntfC'); const q = document.querySelector('.navS'); const t = n.querySelector('a:not(.ntfA > a)'); return { below: q ? n.getBoundingClientRect().top >= q.getBoundingClientRect().bottom - 2 : null, link: n.querySelector('.ntfT a, span a')?.getAttribute('href'), btn: n.querySelector('.ntfA > a')?.getAttribute('href') }; });
    claim('A09 ' + vp, 'bar di bawah tautan cepat, memuat tautan, tombol ke URL', r.below === true && r.link === '/x' && r.btn === 'https://example.com/a', r);
    await p._ctx.close();
  }
  // B01: automatic advance interval (4 s) measured between two advances, no hover
  mods({ wplusui_notification_text: null, wplusui_notification_cta_text: null, wplusui_notification_cta_url: null });
  { const p = await open('/', 'desktop', { wait: 500 }); await p.mouse.move(2, 700);
    const times = []; let last = await p.evaluate(() => [...document.querySelectorAll('.sldW > input')].findIndex((i) => i.checked)); const t0 = Date.now();
    while (times.length < 2 && Date.now() - t0 < 20000) { await sleep(150); const c = await p.evaluate(() => [...document.querySelectorAll('.sldW > input')].findIndex((i) => i.checked)); if (c !== last) { times.push(Date.now()); last = c; } }
    const gap = times.length === 2 ? (times[1] - times[0]) / 1000 : null;
    claim('B01', 'slide bergeser otomatis tiap 4 detik (selang dua pergeseran)', gap !== null && gap >= 3.6 && gap <= 4.6, gap); await p._ctx.close(); }
} finally {
  mods(Object.fromEntries(Object.entries(saved)));
  await close();
}
summary();
