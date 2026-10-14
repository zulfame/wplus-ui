// Regression for the PageSpeed findings (15 Oct 2026): first card images load at once, search results use the critical CSS
// with the sidebar layout (no layout shift), 24px touch targets for category labels, contrast of the red code badge,
// WooCommerce stylesheet only on shop pages.
import * as L from './lib.mjs';
const { wp, open, launch, close, claim, summary } = L;
await launch();
const lum = (rgb) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
for (const vp of ['desktop', 'mobile']) {
  for (const [name, url] of [['beranda', '/'], ['pencarian', '/?s=google'], ['arsip', '/?category_name=documentation']]) {
    const p = await open(url, vp);
    const r = await p.evaluate(() => [...document.querySelectorAll('main .pThmb img.imgThm')].map((i) => [i.getAttribute('loading'), i.getAttribute('fetchpriority')]));
    claim(`PS-1 ${name} ${vp}`, '3 gambar kartu pertama eager (yang pertama fetchpriority=high), sisanya lazy', r.length >= 3 && r.slice(0, 3).every((x) => x[0] === 'eager') && r[0][1] === 'high' && r.slice(3).every((x) => x[0] === 'lazy'), r);
    await p._ctx.close();
  }
  const p = await open('/?name=getting-started-and-installation', vp);
  const r = await p.evaluate(() => [...document.querySelectorAll('.itemRp img.imgThm')].map((i) => i.getAttribute('loading')));
  claim('PS-2 ' + vp, 'kartu Related Posts di bawah pos tetap lazy', r.length > 0 && r.every((x) => x === 'lazy'), r); await p._ctx.close();
}
// critical CSS of a search page with the sidebar has the sidebar layout; Lighthouse-style layout shift stays ~0
let p = await open('/?s=google', 'desktop', { wait: 100 });
let r = await p.evaluate(() => { const c = document.getElementById('wplusui-critical'); return { has: !!c && c.textContent.includes('sideB') }; });
claim('PS-3', 'pencarian (dengan sidebar) memakai CSS kritis yang memuat tata letak sidebar', r.has, r); await p._ctx.close();
// touch targets and contrast
for (const vp of ['desktop', 'mobile']) {
  p = await open('/', vp);
  r = await p.evaluate(() => [...document.querySelectorAll('.pLbls > a')].slice(0, 12).map((a) => { const b = a.getBoundingClientRect(); return [Math.round(b.width), Math.round(b.height)]; }));
  claim('PS-4 ' + vp, 'label kategori di kartu: area sentuh minimal 24x24', r.length > 0 && r.every((x) => x[0] >= 24 && x[1] >= 24), r.slice(0, 4)); await p._ctx.close();
}
p = await open('/?name=ui-components-and-typography', 'desktop');
r = await p.evaluate(() => { const m = document.querySelector('code mark.red'); if (!m) return null; const cs = getComputedStyle(m); const rgb = (s) => s.match(/\d+/g).slice(0, 3).map(Number); return { bg: rgb(cs.backgroundColor), fg: rgb(getComputedStyle(m, '::before').color || cs.color) }; });
claim('PS-5', 'lencana merah di contoh kode: kontras putih terhadap latar >= 4,5', r && ratio([255, 255, 255], r.bg) >= 4.5, r); await p._ctx.close();
// WooCommerce stylesheet of the theme only where WooCommerce draws something
const wcHtml = (u) => wp(`$r=wp_remote_get(${JSON.stringify(L.base + '')}.${JSON.stringify(u)},['timeout'=>30]);echo strpos(wp_remote_retrieve_body($r),'themes/wplus-ui/assets/css/woocommerce.css')!==false?'yes':'no';`);
claim('PS-6', 'woocommerce.css milik tema tidak dimuat di beranda, dimuat di halaman toko', wcHtml('/') === 'no' && wcHtml('/?post_type=product') === 'yes', [wcHtml('/'), wcHtml('/?post_type=product')]);
await close();
summary('bugs-pdf-3');
