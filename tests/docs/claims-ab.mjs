// Per-sentence claims of A01-A05 and A07 that the earlier claim tests did not measure: system mode both ways, visitor choice wins over a changed default, accent colours in both modes and visitor scheme priority, font scope, left menu toggle button.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep, VP, base } = L;
await launch();
const keys = ['wplusui_default_mode', 'wplusui_default_scheme', 'wplusui_accent_light', 'wplusui_accent_dark', 'wplusui_font_body', 'wplusui_font_heading', 'wplusui_box_design', 'wplusui_menu_default'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const cls = (p) => p.evaluate(() => document.documentElement.className.match(/lgT|drK/)?.[0] + ' ' + (document.documentElement.className.match(/cs\d+/)?.[0] || ''));
try {
  mods(Object.fromEntries(keys.map((k) => [k, null])));
  // A01: System follows the device both ways; visitor choice wins when the default later changes
  mods({ wplusui_default_mode: 'system' });
  for (const vp of ['desktop', 'mobile']) {
    for (const scheme of ['dark', 'light']) { const p = await open('/', vp, { scheme }); claim('A01 ' + vp, `mode System mengikuti perangkat ${scheme}`, (await cls(p)).startsWith(scheme === 'dark' ? 'drK' : 'lgT'), await cls(p)); await p._ctx.close(); }
    const p = await open('/', vp, { scheme: 'light' });
    await p.evaluate(() => document.querySelector('.aprW .drkB').click()); await sleep(400);
    mods({ wplusui_default_mode: 'light' });
    await p.reload({ waitUntil: 'networkidle0' }); await p.mouse.move(30, 30); await sleep(1200);
    claim('A01 ' + vp, 'pilihan Dark pengunjung menang walau pengaturan bawaan diganti ke Light', (await cls(p)).startsWith('drK'), await cls(p));
    mods({ wplusui_default_mode: 'system' }); await p._ctx.close();
  }
  mods({ wplusui_default_mode: 'light', wplusui_accent_light: '#e91e63', wplusui_accent_dark: '#ff9800' });
  for (const vp of ['desktop', 'mobile']) {
    const get = async (p) => p.evaluate(() => getComputedStyle(document.querySelector('.ntfA > a, a.button, .cmBtn') || document.body).backgroundColor + '|' + getComputedStyle(document.documentElement).getPropertyValue('--linkB').trim());
    let p = await open('/?p=26', vp); const lightCol = await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--linkB').trim() || getComputedStyle(document.body).getPropertyValue('--linkB').trim()); await p._ctx.close();
    mods({ wplusui_default_mode: 'dark' }); p = await open('/?p=26', vp); const darkCol = await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--linkB').trim() || getComputedStyle(document.body).getPropertyValue('--linkB').trim()); 
    claim('A03 ' + vp, 'aksen terang #e91e63 di mode terang dan aksen gelap #ff9800 di mode gelap', /e91e63/i.test(lightCol) && /ff9800/i.test(darkCol), { lightCol, darkCol });
    // visitor scheme beats the custom accent
    await p.evaluate(() => document.querySelector('label.thmB').click()); await sleep(300); await p.evaluate(() => document.querySelector('.thmP .csB7').click()); await sleep(500);
    const after = await p.evaluate(() => ({ cls: document.documentElement.className.match(/cs\d+/)?.[0], link: getComputedStyle(document.documentElement).getPropertyValue('--linkB').trim() || getComputedStyle(document.body).getPropertyValue('--linkB').trim() }));
    claim('A03 ' + vp, 'skema yang dipilih pengunjung mengalahkan warna aksen kustom', after.cls === 'cs7' && !/ff9800/i.test(after.link), after);
    await p._ctx.close(); mods({ wplusui_default_mode: 'light' });
  }
  mods({ wplusui_accent_light: null, wplusui_accent_dark: null, wplusui_default_mode: 'light' });
  // A05: font scope
  mods({ wplusui_font_body: 'Lora', wplusui_font_heading: 'Merriweather' });
  const html = await (await fetch(base + '/', { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } })).text();
  claim('A05', 'font dimuat dari fonts.googleapis.com dengan kedua nama', /fonts\.googleapis\.com[^"']*Lora/.test(html) && /fonts\.googleapis\.com[^"']*Merriweather/.test(html), html.match(/fonts\.googleapis\.com[^"']*/g));
  for (const vp of ['desktop', 'mobile']) {
    const p = await open('/?p=26', vp); const f = await p.evaluate(() => { const fam = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '') : null; }; return { postTitle: fam('h1.pTtl'), siteName: fam('.headH'), cardTitle: null, bodyText: fam('#postBody p'), h2: fam('#postBody h2') }; });
    claim('A05 ' + vp, 'judul pos dan nama situs memakai Heading font; teks isi memakai Body font', f.postTitle === 'Merriweather' && f.siteName === 'Merriweather' && f.bodyText === 'Lora', f);
    await p._ctx.close();
    const q = await open('/', vp); const c = await q.evaluate(() => { const e = document.querySelector('.blogP .ntry .pTtl, .blogP .ntry h2, .blogP .ntry .aTtl'); return e ? getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '') : null; }); claim('A05 ' + vp, 'judul kartu memakai Heading font', c === 'Merriweather', c); await q._ctx.close();
  }
  mods({ wplusui_font_body: null, wplusui_font_heading: null });
  // A06 is measured in claims-box.mjs (signature of each component in plain and box design)
  // A07: toggle button beside the site name flips the left menu width
  mods({ wplusui_box_design: null, wplusui_menu_default: 'collapsed' });
  { const p = await open('/', 'desktop'); const w0 = await p.evaluate(() => Math.round(document.querySelector('.mainN .mnBrs, .mainL')?.getBoundingClientRect().width)); const hit = await p.evaluate(() => { const t = document.querySelector('.headL .tNav'); return t ? t.tagName + ' ' + (t.getAttribute('aria-label') || t.dataset.text || '') : null; }); await p.evaluate(() => document.querySelector('.headL .tNav').click()); await sleep(600); const w1 = await p.evaluate(() => Math.round(document.querySelector('.mainN .mnBrs, .mainL')?.getBoundingClientRect().width));
    claim('A07', 'tombol di samping nama situs membuka menu kiri (lebar berubah)', hit && w1 > w0, { hit, w0, w1 }); await p._ctx.close(); }
} finally {
  mods(saved);
  await close();
}
summary();
