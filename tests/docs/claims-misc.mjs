// Remaining FITUR.md claims: CTA button needs text AND link, numeric limits, CF7 shortcode id/hints.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep, base, VP } = L;
const b = await launch();
const keys = ['wplusui_cta_enabled', 'wplusui_cta_title', 'wplusui_cta_text', 'wplusui_cta_button', 'wplusui_cta_url', 'wplusui_cta_delay', 'wplusui_popular_count', 'wplusui_related_count', 'wplusui_ad_in_article_after'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
try {
  mods({ wplusui_cta_enabled: true, wplusui_cta_title: 'T', wplusui_cta_delay: 0 });
  for (const [btn, url, expect] of [['Klik', '', false], ['', 'https://example.com', false], ['Klik', 'https://example.com', true]]) { mods({ wplusui_cta_button: btn, wplusui_cta_url: url }); const h = await (await fetch(base + '/', { headers: { 'user-agent': 'Mozilla/5.0 Chrome' } })).text(); claim('I02', `tombol pop-up (teks="${btn}", tautan="${url}") ${expect ? 'tampil' : 'tidak tampil'}`, /puCtaBody[\s\S]*?class="button"/.test(h) === expect); }
  // numeric limits
  mods({ wplusui_related_count: 50, wplusui_popular_count: 50 });
  { const p = await open('/?p=26', 'desktop'); const n = await p.evaluate(() => ({ rel: document.querySelectorAll('#related .itemRp > *').length, pop: document.querySelectorAll('aside .itm, aside article').length })); claim('C04', 'jumlah related dibatasi maksimal 12 (pos tersedia 18)', n.rel === 12, n); claim('B07', 'jumlah Popular Posts dibatasi maksimal 10', n.pop <= 10, n); await p._ctx.close(); }
  mods({ wplusui_related_count: 0, wplusui_popular_count: 0 });
  { const p = await open('/?p=26', 'desktop'); const n = await p.evaluate(() => ({ rel: document.querySelectorAll('#related .itemRp > *').length })); claim('C04', 'jumlah 0 dianggap minimal 1', n.rel === 1, n); await p._ctx.close(); }
  mods({ wplusui_ad_in_article_after: 0 });
  // CF7 shortcode behaviour with the real plugin
  const forms = JSON.parse(wp(`$o=[];foreach(get_posts(['post_type'=>'wpcf7_contact_form','numberposts'=>-1,'post_status'=>'any']) as $x)$o[]=$x->ID;echo json_encode($o);`));
  const second = +wp(`$f=WPCF7_ContactForm::get_template();$f->set_title('Formulir kedua');$f->set_properties(['form'=>'<p>[text* nama-kedua]</p><p>[submit "Kirim kedua"]</p>']);$f->save();echo $f->id();`);
  const page = +wp(`echo wp_insert_post(['post_type'=>'page','post_status'=>'publish','post_title'=>'Uji shortcode','post_content'=>'[wplusui_contact_form id="${second}"]']);`);
  const html = async (u, cookies) => { const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); if (cookies) await p.setCookie(...cookies.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' }))); await p.goto(base + u, { waitUntil: 'networkidle0' }); const r = await p.evaluate(() => ({ second: !!document.querySelector('input[name=nama-kedua]'), first: !!document.querySelector('input[name=your-name]'), hint: document.querySelector('.note.wr')?.textContent.trim().slice(0, 60) ?? null })); await ctx.close(); return r; };
  const r1 = await html('/?page_id=' + page); claim('D05', 'shortcode dengan id memilih formulir itu (bukan yang pertama)', r1.second && !r1.first, r1);
  // delete every form: visitor sees nothing, admin sees the hint to create one
  wp(`foreach(get_posts(['post_type'=>'wpcf7_contact_form','numberposts'=>-1,'post_status'=>'any']) as $x)wp_delete_post($x->ID,true);wp_update_post(['ID'=>${page},'post_content'=>'[wplusui_contact_form]']);`);
  const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
  const rv = await html('/?page_id=' + page); const ra = await html('/?page_id=' + page, ck);
  claim('D05', 'tanpa formulir: pengunjung tidak melihat apa pun, admin melihat petunjuk membuat formulir', !rv.hint && !rv.first && /Create a form/.test(ra.hint || ''), { rv, ra });
  wp(`wp_delete_post(${page},true);wplusui_create_contact_page();`);
  claim('D05', 'helper membuat ulang formulir tema dan halaman Contact tetap satu', +wp(`echo count(get_posts(['post_type'=>'wpcf7_contact_form','numberposts'=>-1]));`) === 1 && +wp(`echo count(get_posts(['post_type'=>'page','name'=>'contact','numberposts'=>-1]));`) === 1);
} finally {
  mods(saved);
  await close();
}
summary();
