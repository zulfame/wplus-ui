// TRACE group I04 (cookie notice): off by default; card with Cookie Policy and OK; the choice is kept; ads and scripts wait for OK;
// the policy page from the demo; reset button; layout on phones.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep } = L;
await launch();
const KEYS = ['wplusui_cookie_enabled', 'wplusui_cookie_text', 'wplusui_cookie_ok', 'wplusui_cookie_policy_label', 'wplusui_cookie_policy_url', 'wplusui_cookie_gate', 'wplusui_ad_sidebar_sticky', 'wplusui_head_code', 'wplusui_footer_code', 'wplusui_adsense_id', 'wplusui_adsense_lazy', 'wplusui_mobile_bar_show'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(KEYS)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const reset = () => mods(Object.fromEntries(KEYS.map((k) => [k, saved[k]])));
const vis = (p) => p.evaluate(() => { const n = document.querySelector('.puCk'); return !!n && !n.hidden && getComputedStyle(n).display !== 'none'; });
try {
  mods(Object.fromEntries(KEYS.map((k) => [k, null])));
  let p = await open('/', 'desktop');
  claim('I04-1', 'mati secara default: tidak ada banner cookie', (await p.evaluate(() => document.querySelectorAll('.puCk').length)) === 0); await p._ctx.close();

  mods({ wplusui_cookie_enabled: true });
  for (const vp of ['desktop', 'mobile']) {
    p = await open('/', vp);
    const r = await p.evaluate(() => { const n = document.querySelector('.puCk'); const b = n.getBoundingClientRect(); return { shown: !n.hidden, text: n.querySelector('.puCkT').textContent.trim(), policy: n.querySelector('.puCkP')?.textContent.trim(), href: n.querySelector('.puCkP')?.getAttribute('href'), ok: n.querySelector('.puCkO').textContent.trim(), box: [b.left, b.bottom, b.width].map(Math.round), vw: innerWidth, vh: innerHeight }; });
    claim('I04-2 ' + vp, 'banner tampil pada kunjungan pertama dengan teks bawaan, tombol Cookie Policy dan OK, got it.', r.shown && /We use cookies/.test(r.text) && r.policy === 'Cookie Policy' && r.ok === 'OK, got it.', r);
    claim('I04-3 ' + vp, 'tombol kebijakan mengarah ke halaman /cookie-policy dari demo', /cookie-policy|page_id=\d+/.test(r.href) && (await wp(`echo get_permalink(get_page_by_path('cookie-policy'));`)).trim() === r.href, r.href);
    claim('I04-4 ' + vp, 'banner di dalam layar dan tidak lebih lebar dari 440px', r.box[0] >= 0 && r.box[1] <= r.vh && r.box[2] <= 440 && r.box[2] <= r.vw, r.box);
    await p.click('.puCkO'); await sleep(300);
    const after = { shown: await vis(p), ls: await p.evaluate(() => localStorage.getItem('wplusui_cookie_ok')), cookie: await p.evaluate(() => /wplusui_cookie_ok=1/.test(document.cookie)) };
    claim('I04-5 ' + vp, 'menekan OK menutup banner dan menyimpan pilihan (localStorage dan cookie)', !after.shown && after.ls === '1' && after.cookie, after);
    await p.reload({ waitUntil: 'networkidle0' }); await sleep(600);
    claim('I04-6 ' + vp, 'setelah dimuat ulang banner tidak muncul lagi', !(await vis(p))); await p._ctx.close();
  }

  // texts and link from the Customizer, button hidden without any policy page
  mods({ wplusui_cookie_text: 'Kami memakai cookie.', wplusui_cookie_ok: 'Setuju', wplusui_cookie_policy_label: 'Kebijakan', wplusui_cookie_policy_url: 'https://example.com/kebijakan' });
  p = await open('/', 'desktop');
  let r = await p.evaluate(() => ({ t: document.querySelector('.puCkT').textContent.trim(), o: document.querySelector('.puCkO').textContent.trim(), p: document.querySelector('.puCkP')?.textContent.trim(), h: document.querySelector('.puCkP')?.getAttribute('href') }));
  claim('I04-7', 'teks, tombol, dan tautan kebijakan bisa diganti di Customizer', r.t === 'Kami memakai cookie.' && r.o === 'Setuju' && r.p === 'Kebijakan' && r.h === 'https://example.com/kebijakan', r); await p._ctx.close();
  mods({ wplusui_cookie_policy_url: null }); wp(`wp_update_post(['ID'=>get_page_by_path('cookie-policy')->ID,'post_status'=>'draft']);`);
  p = await open('/', 'desktop'); r = await p.evaluate(() => document.querySelectorAll('.puCkP').length);
  claim('I04-8', 'tanpa tautan dan tanpa halaman /cookie-policy (terbit), tombol kebijakan disembunyikan', r === 0, r); await p._ctx.close();
  wp(`wp_update_post(['ID'=>get_page_by_path('cookie-policy',OBJECT,'page')->ID,'post_status'=>'publish']);`);
  mods({ wplusui_cookie_text: null, wplusui_cookie_ok: null, wplusui_cookie_policy_label: null });

  // gate: script tags wait for OK, meta tags print at once, AdSense loader waits
  mods({ wplusui_head_code: '<meta name="wplusui-verify" content="abc"><script>window.__head=(window.__head||0)+1</script><script type="application/ld+json">{"@context":"https://schema.org"}</script>', wplusui_footer_code: '<script>window.__foot=(window.__foot||0)+1</script>', wplusui_adsense_id: 'ca-pub-1234567890123456', wplusui_adsense_lazy: false });
  p = await open('/', 'desktop');
  r = await p.evaluate(() => ({ meta: !!document.querySelector('meta[name=wplusui-verify]'), head: window.__head || 0, foot: window.__foot || 0, gated: document.querySelectorAll('script[type="text/plain"][data-wplusui-consent]').length, ld: document.querySelectorAll('script[type="application/ld+json"]:not([data-wplusui-consent])').length, ads: !![...document.scripts].find((s) => /adsbygoogle\.js/.test(s.src) && s.type !== 'text/plain') }));
  claim('I04-9', 'sebelum OK: meta tampil, skrip kode (head, footer, loader AdSense) belum jalan, JSON-LD tidak ditahan', r.meta && r.head === 0 && r.foot === 0 && r.gated >= 3 && r.ld >= 1 && !r.ads, r);
  await p.click('.puCkO'); await sleep(500);
  r = await p.evaluate(() => ({ head: window.__head || 0, foot: window.__foot || 0, gated: document.querySelectorAll('script[data-wplusui-consent]').length, ads: !![...document.scripts].find((s) => /adsbygoogle\.js/.test(s.src) && s.type !== 'text/plain') }));
  claim('I04-10', 'setelah OK: skrip kode jalan tepat sekali dan loader AdSense dimuat', r.head === 1 && r.foot === 1 && r.gated === 0 && r.ads, r);
  await p.reload({ waitUntil: 'networkidle0' }); await sleep(600);
  r = await p.evaluate(() => ({ head: window.__head || 0, foot: window.__foot || 0 }));
  claim('I04-11', 'kunjungan berikutnya (sudah setuju): skrip langsung jalan tanpa banner', r.head === 1 && r.foot === 1 && !(await vis(p)), r); await p._ctx.close();

  // lazy AdSense loader waits for OK too
  mods({ wplusui_adsense_lazy: true });
  p = await open('/', 'desktop'); await p.mouse.move(80, 80); await p.evaluate(() => scrollTo(0, 300)); await sleep(1200);
  r = await p.evaluate(() => !![...document.scripts].find((s) => /adsbygoogle\.js/.test(s.src) && s.type !== 'text/plain'));
  claim('I04-12', 'pemuat AdSense malas juga menunggu OK (tidak dimuat walau pengunjung menggulir)', r === false, r);
  await p.click('.puCkO'); await sleep(300); await p.mouse.move(200, 200); await sleep(500);
  r = await p.evaluate(() => !![...document.scripts].find((s) => /adsbygoogle\.js/.test(s.src) && s.type !== 'text/plain'));
  claim('I04-13', 'setelah OK pemuat AdSense malas bekerja seperti biasa (dimuat saat pengunjung bergerak, menggulir, atau setelah 5 detik)', r === true, r); await p._ctx.close();

  // gate off: everything prints at once even with the notice on
  mods({ wplusui_cookie_gate: false });
  p = await open('/', 'desktop'); r = await p.evaluate(() => ({ head: window.__head || 0, gated: document.querySelectorAll('script[data-wplusui-consent]').length }));
  claim('I04-14', 'saklar "Load ads and scripts only after OK" dimatikan: kode langsung jalan', r.head === 1 && r.gated === 0, r); await p._ctx.close();
  mods({ wplusui_cookie_gate: null, wplusui_head_code: null, wplusui_footer_code: null, wplusui_adsense_id: null, wplusui_adsense_lazy: null });

  // policy page: reset button
  p = await open('/cookie-policy/'.replace('/cookie-policy/', '/?pagename=cookie-policy'), 'desktop');
  await p.evaluate(() => localStorage.setItem('wplusui_cookie_ok', '1')); await p.reload({ waitUntil: 'networkidle0' }); await sleep(500);
  r = await p.evaluate(() => ({ btn: !!document.querySelector('[data-wplusui-cookie-reset]') && !document.querySelector('[data-wplusui-cookie-reset]').hidden, h1: document.querySelector('h1')?.textContent.trim() }));
  claim('I04-15', 'halaman Cookie Policy demo tampil dengan tombol "Forget my choice"', r.btn && /Cookie Policy/.test(r.h1), r);
  await Promise.all([p.waitForNavigation({ waitUntil: 'networkidle0' }), p.click('[data-wplusui-cookie-reset]')]); await sleep(600);
  r = { shown: await vis(p), ls: await p.evaluate(() => localStorage.getItem('wplusui_cookie_ok')) };
  claim('I04-16', 'tombol reset menghapus pilihan dan banner tampil lagi', r.shown && r.ls === null, r); await p._ctx.close();

  // a promo picture in an ad slot is not held back: only scripts (and the AdSense loader) wait for the OK
  mods({ wplusui_cookie_gate: true, wplusui_ad_sidebar_sticky: '<a href="https://example.com/p"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="300" height="250" alt="Promo" id="x-promo"></a>' });
  p = await open('/', 'desktop'); r = await p.evaluate(() => { const i = document.getElementById('x-promo'); return { banner: !document.querySelector('.puCk').hidden, img: !!i && i.getBoundingClientRect().height > 0 }; });
  claim('I04-18', 'gambar promosi di slot iklan tampil sebelum OK (hanya skrip dan pemuat AdSense yang menunggu)', r.banner && r.img, r); await p._ctx.close();
  // phones: the card sits above the bottom bar and does not cover it
  mods({ wplusui_mobile_bar_show: true });
  p = await open('/', 'mobile');
  r = await p.evaluate(() => { const c = document.querySelector('.puCk').getBoundingClientRect(); const m = document.querySelector('.mobM')?.getBoundingClientRect(); return { cardBottom: Math.round(c.bottom), barTop: m ? Math.round(m.top) : null, w: Math.round(c.width), vw: innerWidth }; });
  claim('I04-17', 'di ponsel kartu berada di atas bilah bawah dan selebar layar dikurangi margin', r.barTop !== null && r.cardBottom <= r.barTop && r.w >= r.vw - 30, r); await p._ctx.close();
} finally {
  wp(`$p=get_page_by_path('cookie-policy',OBJECT,'page');if($p&&$p->post_status!=='publish')wp_update_post(['ID'=>$p->ID,'post_status'=>'publish']);`);
  reset();
}
await close();
summary('trace-cookie');
