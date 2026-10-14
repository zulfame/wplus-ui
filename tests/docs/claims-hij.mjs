// FITUR.md groups H/I/J claims not yet measured: image types and link attributes in ad slots, head/footer code absent in the Customizer preview, SEO description rules, JSON-LD contents, Coming Soon texts and background.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep, base, VP } = L;
const b = await launch();
const html = async (u) => (await (await fetch(base + u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } })).text());
const keys = ['wplusui_ad_under_header', 'wplusui_head_code', 'wplusui_footer_code', 'wplusui_adsense_id', 'wplusui_soon_mode', 'wplusui_soon_image', 'wplusui_soon_date', 'wplusui_soon_units', 'custom_logo'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const faq = '<!-- wp:group {"className":"is-style-accordion-group"} --><div class="wp-block-group is-style-accordion-group"><!-- wp:details {"className":"is-style-accordion"} --><details class="wp-block-details is-style-accordion"><summary>Apa itu uji?</summary><!-- wp:paragraph --><p>Jawaban uji pertama.</p><!-- /wp:paragraph --></details><!-- /wp:details --><!-- wp:details {"className":"is-style-accordion"} --><details class="wp-block-details is-style-accordion"><summary>Siapa?</summary><!-- wp:paragraph --><p>Jawaban kedua.</p><!-- /wp:paragraph --></details><!-- /wp:details --></div><!-- /wp:group -->';
const long = '[gallery ids="1"]' + Array.from({ length: 60 }, (_, i) => 'kata' + i).join(' ');
const pid = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji SEO','post_status'=>'publish','post_category'=>[2],'post_content'=>base64_decode('${Buffer.from(long).toString('base64')}')]);`);
const fid = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji FAQ klaim','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(faq).toString('base64')}')]);`);
try {
  // H05: image types
  for (const ext of ['jpg', 'png', 'gif', 'webp', 'avif', 'svg']) { mods({ wplusui_ad_under_header: `https://example.com/a.${ext}\nhttps://example.com/go` }); const h = await html('/'); claim('H05', `alamat gambar .${ext} menjadi <img> bertautan sponsored dan tab baru`, new RegExp(`<img[^>]*a\\.${ext}`).test(h) && /rel="sponsored noopener"/.test(h.match(/<div class="adB[^>]*>[\s\S]*?<\/div>/)?.[0] || '') && /target="_blank"/.test(h.match(/<div class="adB[^>]*>[\s\S]*?<\/div>/)?.[0] || ''), h.match(/<div class="adB[^>]*>[\s\S]{0,200}/)?.[0]); }
  mods({ wplusui_ad_under_header: null });
  // H03: the Customizer preview must not print the code (real Customizer, admin cookie)
  mods({ wplusui_head_code: '<meta name="x-head" content="1">', wplusui_footer_code: '<div id="x-foot"></div>' });
  const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
  { const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP.desktop); await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
    await p.goto(base + '/', { waitUntil: 'networkidle0' }); const front = await p.evaluate(() => ({ head: !!document.querySelector('meta[name=x-head]'), foot: !!document.getElementById('x-foot') }));
    await p.goto(base + '/wp-admin/customize.php?url=' + encodeURIComponent(base + '/'), { waitUntil: 'domcontentloaded', timeout: 90000 }); await sleep(9000);
    const fr = p.frames().find((f) => f.url().includes('customize_changeset_uuid') || f.url().includes('customize_messenger')); const prev = fr ? await fr.evaluate(() => ({ head: !!document.querySelector('meta[name=x-head]'), foot: !!document.getElementById('x-foot'), url: location.search.slice(0, 40) })) : null;
    claim('H03', 'di situs: kode tercetak; di pratinjau Customizer: tidak tercetak', front.head && front.foot && prev && !prev.head && !prev.foot, { front, prev }); await ctx.close(); }
  mods({ wplusui_head_code: null, wplusui_footer_code: null });
  // J01
  const h = await html('/?p=' + pid); const desc = h.match(/name="description" content="([^"]*)"/)?.[1] || '';
  claim('J01', 'tanpa kutipan: deskripsi dari awal isi, shortcode dibuang, maksimal 30 kata dan diakhiri …', !/gallery/.test(desc) && desc.split(/\s+/).length === 30 && desc.endsWith('…'), desc);
  mods({ custom_logo: 139 }); const hh = await html('/'); claim('J01', 'tanpa gambar unggulan, og:image memakai logo situs', /og:image" content="[^"]*"/.test(hh), hh.match(/og:image[^>]*/)?.[0]); mods({ custom_logo: saved.custom_logo });
  // J02
  const j = JSON.parse((await html('/?p=' + pid)).match(/application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const art = j.find((n) => n['@type'] === 'Article'); const bc = j.find((n) => n['@type'] === 'BreadcrumbList');
  claim('J02', 'Article: headline, tanggal, penulis, publisher, bahasa', art && art.headline === 'Uji SEO' && /^\d{4}-/.test(art.datePublished) && art.author?.['@type'] === 'Person' && art.publisher?.['@id'] && art.inLanguage, art);
  claim('J02', 'BreadcrumbList: Home, kategori, judul berurutan', bc && bc.itemListElement.map((x) => x.position + ':' + x.name).join() === '1:Home,2:Documentation,3:Uji SEO', bc?.itemListElement);
  const jf = JSON.parse((await html('/?p=' + fid)).match(/application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'].find((n) => n['@type'] === 'FAQPage');
  claim('J02', 'FAQPage berisi dua pertanyaan dan jawabannya dari accordion', jf && jf.mainEntity.length === 2 && jf.mainEntity[0].name === 'Apa itu uji?' && /Jawaban uji pertama/.test(jf.mainEntity[0].acceptedAnswer.text), jf);
  // I03: background image, labels, maintenance default texts
  const img = wp(`echo wp_get_attachment_url(139);`);
  mods({ wplusui_soon_mode: 'maintenance', wplusui_soon_image: img, wplusui_soon_date: wp(`echo wp_date('Y-m-d\\TH:i',time()+90000);`) });
  for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp); const r = await p.evaluate(() => ({ title: document.querySelector('h1').textContent, badge: document.querySelector('.badge').textContent, text: document.querySelector('.text').textContent, bg: getComputedStyle(document.body).backgroundImage.slice(0, 60), units: [...document.querySelectorAll('.cd span')].map((s) => s.textContent).join(), d: document.querySelector('[data-u=d]').textContent })); claim('I03 ' + vp, 'mode Maintenance: teks bawaan, gambar latar, satuan bawaan, hitung mundur 1 hari', r.title === 'We will be back soon' && r.badge === 'Maintenance' && /pages? being updated|being updated/.test(r.text) && /url/.test(r.bg) && r.units === 'Days,Hours,Minutes,Seconds' && r.d === '01', r); await p._ctx.close(); }
} finally {
  wp(`wp_delete_post(${pid},true);wp_delete_post(${fid},true);`);
  mods(saved);
  await close();
}
summary();
