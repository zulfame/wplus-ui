// KONFIGURASI.md: every "Diukur" claim of the configuration guide, as a pass/fail check. Plugins and settings are restored afterwards.
import * as L from './lib.mjs';
import { execFileSync } from 'child_process';
import fs from 'fs';
const { wp, mods, open, launch, close, claim, summary, sleep, base, VP, root } = L;
const b = await launch();
const th = root + '/wp-content/themes/wplus-ui';
const plug = (on, list) => wp(`require_once ABSPATH.'wp-admin/includes/plugin.php';${on ? 'activate_plugins' : 'deactivate_plugins'}(${JSON.stringify(list)});`);
const hosts = async (u, vp = 'desktop', wait = 3000) => { const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP[vp]); await p.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'); const h = new Set(); p.on('request', (r) => { try { const x = new URL(r.url()); if (x.host && !/127\.0\.0\.1/.test(x.host)) h.add(x.host); } catch (e) {} }); await p.goto(base + u, { waitUntil: 'networkidle0' }); await p.mouse.move(40, 40); await sleep(wait); await p.evaluate(() => { document.querySelector('.bm-button')?.click(); document.querySelector('.aprW .drkB')?.click(); }); await sleep(400); const cookie = await p.evaluate(() => document.cookie); const ls = await p.evaluate(() => Object.keys(localStorage)); await ctx.close(); return { hosts: [...h].sort(), cookie, ls }; };
const sav = JSON.parse(wp(`echo json_encode(['avatars'=>get_option('show_avatars'),'attr'=>get_option('woocommerce_feature_order_attribution_enabled'),'front'=>[get_option('show_on_front'),get_option('page_on_front'),get_option('page_for_posts')]]);`));
try {
  // sizes
  const size = (f) => fs.statSync(th + f).size; const gz = (f) => execFileSync('gzip', ['-c', th + f], { maxBuffer: 1 << 26 }).length;
  claim('K-1', 'style.min.css ±193 KB (gzip ±40 KB) dan script.min.js ±113 KB (gzip ±48 KB)', Math.abs(size('/assets/css/style.min.css') - 193479) < 20000 && gz('/assets/css/style.min.css') < 50000 && Math.abs(size('/assets/js/script.min.js') - 113505) < 12000 && gz('/assets/js/script.min.js') < 55000, [size('/assets/css/style.min.css'), gz('/assets/css/style.min.css'), size('/assets/js/script.min.js'), gz('/assets/js/script.min.js')]);
  const crit = fs.readdirSync(th + '/assets/css/critical').map((f) => size('/assets/css/critical/' + f)); claim('K-2', 'CSS kritis inline 42 sampai 58 KB per jenis halaman', Math.min(...crit) > 41000 && Math.max(...crit) < 59500, crit);
  claim('K-3', 'alamat CSS/JS memuat waktu ubah berkas (?ver=<versi tema>.<angka>)', /style\.min\.css\?ver=\d+\.\d+\.\d+\.\d{9,}/.test(execFileSync('curl', ['-s', '-A', 'Mozilla/5.0 Chrome', base + '/'], { encoding: 'utf8', maxBuffer: 1 << 26 })));
  // external services by default (plugins that add their own requests switched off)
  plug(false, ['woocommerce/woocommerce.php', 'contact-form-7/wp-contact-form-7.php']);
  const home = await hosts('/'); const homeHosts = home.hosts.filter((h) => h !== 'placehold.co'); // placehold.co = gambar contoh iklan yang diisi paket demo, bukan bagian tema
  claim('P-1', 'beranda bawaan: layanan luar hanya fonts.gstatic.com dan secure.gravatar.com (selain gambar contoh iklan demo)', JSON.stringify(homeHosts) === JSON.stringify(['fonts.gstatic.com', 'secure.gravatar.com']), home.hosts);
  claim('P-2', 'tema tidak memasang cookie dan hanya memakai localStorage (WPLUS_UI_STORAGE, WPLUS_UI_LAZY)', home.cookie === '' && home.ls.includes('WPLUS_UI_STORAGE') && home.ls.includes('WPLUS_UI_LAZY'), home);
  const plain = +wp(`echo wp_insert_post(['post_title'=>'Uji tanpa kode','post_status'=>'publish','post_content'=>'Paragraf biasa tanpa blok kode.']);`); const withCode = await hosts('/?p=26'); const noCode = await hosts('/?p=' + plain); wp(`wp_delete_post(${plain},true);`); claim('P-3', 'cdnjs.cloudflare.com (highlight.js) hanya dimuat pada pos yang memuat blok kode', withCode.hosts.includes('cdnjs.cloudflare.com') && !noCode.hosts.includes('cdnjs.cloudflare.com'), [withCode.hosts, noCode.hosts]);
  wp(`update_option('show_avatars',0);`); const na = await hosts('/'); claim('P-4', 'avatar dimatikan di Pengaturan > Diskusi: tidak ada permintaan ke Gravatar', !na.hosts.includes('secure.gravatar.com'), na.hosts); wp(`update_option('show_avatars',${JSON.stringify(sav.avatars)});`);
  mods({ wplusui_font_body: 'Lora' }); const fn = await hosts('/'); claim('P-5', 'Body font diisi: fonts.googleapis.com ikut dipakai', fn.hosts.includes('fonts.googleapis.com'), fn.hosts); mods({ wplusui_font_body: null });
  plug(true, ['woocommerce/woocommerce.php', 'contact-form-7/wp-contact-form-7.php']);
  const wc = await hosts('/'); claim('P-6', 'WooCommerce aktif menambahkan cookie atribusi sbjs_* pada beranda', /sbjs_/.test(wc.cookie), wc.cookie.slice(0, 60));
  wp(`update_option('woocommerce_feature_order_attribution_enabled','no');`); const wc2 = await hosts('/'); claim('P-7', 'fitur Order attribution dimatikan: cookie sbjs_* tidak lagi dipasang', !/sbjs_/.test(wc2.cookie), wc2.cookie.slice(0, 60)); wp(`update_option('woocommerce_feature_order_attribution_enabled',${JSON.stringify(sav.attr || 'yes')});`);
  // lazy start of the theme runtime: nothing before an interaction, the UI object exists after each kind of interaction
  for (const [how, act] of [['gerak mouse', (p) => p.mouse.move(60, 60)], ['gulir', (p) => p.evaluate(() => scrollBy(0, 50))], ['tombol keyboard', (p) => p.keyboard.press('Tab')], ['sentuhan/klik', (p) => p.mouse.click(5, 5)]]) { const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP.desktop); await p.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'); await p.goto(base + '/', { waitUntil: 'networkidle0' }); await sleep(400); const b0 = await p.evaluate(() => !!(window.PU && PU.ui)); await act(p); await sleep(1500); const a1 = await p.evaluate(() => !!(window.PU && PU.ui)); claim('K-4', `JavaScript tema aktif setelah ${how} (sebelum: ${b0}, sesudah: ${a1})`, !b0 && a1, [b0, a1]); await ctx.close(); }
  // front page choices
  wp(`update_option('show_on_front','page');update_option('page_on_front',44);update_option('page_for_posts',0);`);
  { const p = await open('/', 'desktop'); const r = await p.evaluate(() => ({ car: !!document.querySelector('.sldW'), cls: document.body.className })); claim('R-1', 'halaman statis sebagai halaman depan: isi halaman tampil tanpa carousel', !r.car && /\bpage\b/.test(r.cls), r); await p._ctx.close(); }
  wp(`update_option('page_for_posts',155);`);
  { const p = await open('/?page_id=155', 'desktop'); const r = await p.evaluate(() => ({ car: !!document.querySelector('.sldW'), n: document.querySelectorAll('#Blog01 .blogP .ntry').length })); claim('R-2', 'halaman pos (Halaman pos di Pengaturan > Membaca): tata letak beranda penuh dengan carousel dan 6 kartu', r.car && r.n === 6, r); await p._ctx.close(); }
  wp(`update_option('show_on_front',${JSON.stringify(sav.front[0])});update_option('page_on_front',${+sav.front[1]});update_option('page_for_posts',${+sav.front[2]});`);
  // sitemap (plain permalinks) and sizes registered
  claim('R-3', 'sitemap bawaan WordPress tersedia di /?sitemap=index (tautan polos)', execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', base + '/?sitemap=index'], { encoding: 'utf8' }) === '200');
  claim('R-4', 'ukuran gambar tema: 600x337 dipotong dan 150x150', wp(`global $_wp_additional_image_sizes;$a=$_wp_additional_image_sizes;echo json_encode([$a['post-thumbnail']['width'],$a['post-thumbnail']['height'],$a['post-thumbnail']['crop'],$a['wplusui-square']['width'],$a['wplusui-square']['height']]);`) === '[600,337,true,150,150]');
  const lang = wp(`echo get_locale();`); const idn = await (async () => { const p = await open('/?p=26', 'desktop'); const r = await p.evaluate(() => ({ date: document.querySelector('.pDr .pDt time')?.dataset.time, ui: document.querySelector('#related h2')?.textContent })); await p._ctx.close(); return r; })(); claim('R-5', `bahasa situs ${lang}: tanggal WordPress berbahasa Indonesia sedangkan teks tema tetap Inggris ("Related Posts")`, lang === 'id_ID' ? /Oktober|Januari|Februari|Maret|Mei|Juni|Juli|Agustus/.test(idn.date) && idn.ui === 'Related Posts' : true, [lang, idn]);
  claim('R-6', 'tema tidak menyertakan terjemahan siap pakai (hanya wplus-ui.pot) dan .pot memuat ±499 teks', fs.readdirSync(th + '/languages').join() === 'wplus-ui.pot' && (fs.readFileSync(th + '/languages/wplus-ui.pot', 'utf8').match(/^msgid "/gm) || []).length >= 495, fs.readdirSync(th + '/languages'));
} finally {
  plug(true, ['woocommerce/woocommerce.php', 'contact-form-7/wp-contact-form-7.php']);
  wp(`update_option('show_avatars',${JSON.stringify(sav.avatars)});update_option('show_on_front',${JSON.stringify(sav.front[0])});update_option('page_on_front',${+sav.front[1]});update_option('page_for_posts',${+sav.front[2]});`);
  mods({ wplusui_font_body: null });
  await close();
}
summary();
