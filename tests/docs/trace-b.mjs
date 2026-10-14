// TRACE group B (B01-B07): every sentence of the FITUR.md rows as a numbered claim. Settings, tags, sticky posts and comment counts are restored at the end.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep, base, VP } = L;
const b = await launch();
const keys = ['wplusui_carousel_enabled', 'wplusui_pinned_enabled', 'wplusui_home_categories', 'wplusui_home_exclude_cats', 'wplusui_sidebar_home', 'wplusui_popular_show', 'wplusui_popular_title', 'wplusui_popular_count', 'wplusui_popular_order', ...[1, 2, 3, 4, 5].flatMap((i) => ['image', 'title', 'url'].map((k) => `wplusui_carousel_${k}_${i}`))];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);$o['_sticky']=get_option('sticky_posts');$o['_ppp']=get_option('posts_per_page');$t=get_term_by('slug','featured','post_tag');$o['_featured']=$t?$t->term_id:0;echo json_encode($o);`));
const clear = Object.fromEntries(keys.map((k) => [k, null]));
const VPS = ['desktop', 'mobile'];
const slides = (p) => p.evaluate(() => [...document.querySelectorAll('.sldW .sldA')].map((s) => ({ title: s.querySelector('.sldT')?.dataset.title, href: s.querySelector('.sldL')?.getAttribute('href'), ph: !!s.querySelector('.plcH'), img: s.querySelector('img')?.getAttribute('src')?.split('/').pop() })));
const cards = (p) => p.evaluate(() => document.querySelectorAll('#Blog01 .blogP .ntry').length);
const html = async (u) => (await (await fetch(base + u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } })).text());
try {
  mods(clear);
  const latest = JSON.parse(wp(`echo json_encode(array_map(fn($p)=>$p->post_title,get_posts(['numberposts'=>5])));`));
  const featuredTitles = JSON.parse(wp(`echo json_encode(array_map(fn($p)=>$p->post_title,get_posts(['numberposts'=>5,'tag'=>'featured'])));`));
  for (const vp of VPS) {
    // B01
    let p = await open('/', vp, { wait: 2000 }); const s0 = await slides(p);
    claim('B01-1 ' + vp, 'sampai 5 slide', s0.length === 5, s0.length);
    claim('B01-4 ' + vp, 'tanpa slide kustom: pos berlabel featured', JSON.stringify(s0.map((x) => x.title).sort()) === JSON.stringify(featuredTitles.slice().sort()), [s0.map((x) => x.title), featuredTitles]);
    claim('B01-7 ' + vp, 'gambar slide pertama di-preload saat carousel tampil', /rel="preload" as="image"/.test(await html('/')));
    await p._ctx.close();
    // B01-2: interval between two advances ~4 s
    { const q = await open('/', vp, { wait: 500 }); await q.mouse.move(2, 600); const times = []; let last = await q.evaluate(() => [...document.querySelectorAll('.sldW > input')].findIndex((i) => i.checked)); const t0 = Date.now(); while (times.length < 2 && Date.now() - t0 < 20000) { await sleep(150); const c = await q.evaluate(() => [...document.querySelectorAll('.sldW > input')].findIndex((i) => i.checked)); if (c !== last) { times.push(Date.now()); last = c; } } const gap = times.length === 2 ? (times[1] - times[0]) / 1000 : null; claim('B01-2 ' + vp, 'slide bergeser otomatis tiap 4 detik', gap && gap >= 3.6 && gap <= 4.6, gap); await q._ctx.close(); }
    // B01-3 custom slides: image required, title/link optional, slide without image ignored
    const att = wp(`echo wp_get_attachment_url(139);`);
    mods({ wplusui_carousel_image_1: att, wplusui_carousel_title_1: 'Kustom satu', wplusui_carousel_url_1: 'https://example.com/satu', wplusui_carousel_image_2: att, wplusui_carousel_title_3: 'Tanpa gambar', wplusui_carousel_url_3: 'https://example.com/tiga' });
    p = await open('/', vp, { wait: 1500 }); const sc = await slides(p);
    claim('B01-3 ' + vp, 'slide kustom: gambar wajib; judul dan tautan opsional; slide tanpa gambar diabaikan', sc.length === 2 && sc[0].title === 'Kustom satu' && sc[0].href === 'https://example.com/satu' && !sc[1].title, sc); await p._ctx.close();
    mods(clear);
    // B01-5: no featured tag → 5 latest
    wp(`$t=get_term_by('slug','featured','post_tag');if($t)wp_update_term($t->term_id,'post_tag',['slug'=>'featured-uji-x']);`);
    p = await open('/', vp, { wait: 1500 }); const sn = await slides(p); claim('B01-5 ' + vp, 'tanpa pos featured: 5 pos terbaru', JSON.stringify(sn.map((x) => x.title)) === JSON.stringify(latest) || (sn.length === 5 && sn.every((x) => latest.includes(x.title))), [sn.map((x) => x.title), latest]); await p._ctx.close();
    wp(`$t=get_term_by('slug','featured-uji-x','post_tag');if($t)wp_update_term($t->term_id,'post_tag',['slug'=>'featured']);`);
    // B01-6 placeholder for post without thumbnail
    const pid = +wp(`$i=wp_insert_post(['post_title'=>'Slide tanpa gambar','post_status'=>'publish','post_content'=>'x']);wp_set_post_tags($i,['featured']);echo $i;`);
    p = await open('/', vp, { wait: 1500 }); claim('B01-6 ' + vp, 'pos tanpa gambar unggulan memakai placeholder', (await slides(p)).some((x) => x.title === 'Slide tanpa gambar' && x.ph), await slides(p)); await p._ctx.close(); wp(`wp_delete_post(${pid},true);`);
    // B01-8 off
    mods({ wplusui_carousel_enabled: false }); p = await open('/', vp); const off = await p.evaluate(() => !!document.querySelector('.sldW')); claim('B01-8 ' + vp, 'dimatikan: carousel hilang dan preload tidak dicetak', !off && !/rel="preload" as="image"/.test(await html('/')), off); await p._ctx.close(); mods(clear);
    // B02
    const sticky = (ids) => wp(`update_option('sticky_posts',${JSON.stringify(ids)});`);
    const pinned = (pp) => pp.evaluate(() => { const e = document.getElementById('FeaturedPost01'); if (!e) return null; const t = e.querySelector('.thmb, .iThmb'); const x = e.querySelector('.iCtnt, .pTtl, h3, .iTtl'); return { title: e.querySelector('.iTtl, h3 a, .pTtl')?.textContent.trim().slice(0, 30), imgX: Math.round((t || e).getBoundingClientRect().x), imgBottom: Math.round((t || e).getBoundingClientRect().bottom), txtX: x ? Math.round(x.getBoundingClientRect().x) : null, txtTop: x ? Math.round(x.getBoundingClientRect().top) : null, w: Math.round(e.getBoundingClientRect().width) }; });
    sticky([26]); p = await open('/', vp); const pn = await pinned(p); claim('B02-1 ' + vp, 'pos sticky tampil di kotak Pinned Post', !!pn, pn);
    claim('B02-5 ' + vp, vp === 'desktop' ? 'desktop: gambar di kiri, teks di kanan' : 'ponsel: kartu teks menimpa bagian bawah gambar (satu kolom)', pn && (vp === 'desktop' ? pn.txtX > pn.imgX + 100 : pn.txtTop < pn.imgBottom && pn.txtTop > pn.imgBottom - 200 && pn.w === 350), pn); await p._ctx.close();
    sticky([26, 27]); p = await open('/', vp); claim('B02-2 ' + vp, 'beberapa sticky: satu yang tampil', (await p.evaluate(() => document.querySelectorAll('#FeaturedPost01 article').length)) === 1); await p._ctx.close();
    sticky([]); p = await open('/', vp); claim('B02-3 ' + vp, 'tanpa pos sticky: kotak tidak tampil', !(await pinned(p))); await p._ctx.close();
    sticky([26]); mods({ wplusui_pinned_enabled: false }); p = await open('/', vp); claim('B02-4 ' + vp, 'dimatikan: kotak tidak tampil', !(await pinned(p))); await p._ctx.close(); mods(clear);
    // B03
    wp(`update_option('posts_per_page',6);`); p = await open('/', vp, { wait: 1500 });
    const grid = await p.evaluate(() => { const cs = [...document.querySelectorAll('#Blog01 .blogP .ntry')]; const xs = [...new Set(cs.map((c) => Math.round(c.getBoundingClientRect().x)))]; return { n: cs.length, cols: xs.length }; });
    claim('B03-1 ' + vp, vp === 'desktop' ? 'grid 3 kolom' : 'grid 1 kolom (satu kartu per baris)', grid.cols === (vp === 'desktop' ? 3 : 1), grid); claim('B03-5 ' + vp, 'jumlah kartu mengikuti Pengaturan > Membaca (6)', grid.n === 6, grid);
    const before = await cards(p); await p.evaluate(() => document.querySelector('#blog-pager button.jsLd')?.click()); await sleep(2500); claim('B03-2 ' + vp, 'tombol Load more posts memuat pos berikutnya tanpa pindah halaman', (await cards(p)) === before + 6 && p.url().endsWith('/'), [before, await cards(p)]); await p._ctx.close();
    { const ctx = await b.createBrowserContext(); const q = await ctx.newPage(); await q.setViewport(VP[vp]); await q.setJavaScriptEnabled(false); await q.goto(base + '/', { waitUntil: 'networkidle0' }); const nj = await q.evaluate(() => [...document.querySelectorAll('#blog-pager a, #blog-pager .nPst')].map((e) => e.getAttribute('aria-label') || e.className)); claim('B03-3 ' + vp, 'tanpa JavaScript: tautan Newest/Home/Oldest', /Oldest|olLnk/.test(nj.join()), nj); await ctx.close(); }
    { const r = await b.createBrowserContext(); const q = await r.newPage(); const res = await q.goto(base + '/?paged=99', { waitUntil: 'domcontentloaded' }); claim('B03-4 ' + vp, 'halaman di luar jangkauan menampilkan 404', res.status() === 404, res.status()); await r.close(); }
    // B04
    const secs = (pp) => pp.evaluate(() => [...document.querySelectorAll('.aCat')].map((w) => ({ t: w.querySelector('.title')?.textContent.trim(), n: w.querySelectorAll('article').length, all: w.querySelector('.blogT a[aria-label="View all"]')?.getAttribute('href') || null })));
    mods({ wplusui_home_categories: ' documentation , tidak-ada ,product ' }); p = await open('/', vp, { wait: 1500 }); const s4 = await secs(p); claim('B04-1 ' + vp, 'slug dipisah koma, spasi diabaikan, slug tak dikenal dilewati', s4.length === 2 && s4[0].t === 'Documentation' && s4[1].t === 'Product', s4);
    claim('B04-2 ' + vp, 'seksi berisi hingga 6 pos dan tautan View all ke arsip kategori', s4.length === 2 && s4[0].n === 6 && s4[1].n === 1 && s4.every((x) => /\?cat=\d+/.test(x.all || '')), s4);
    await p.goto(base + '/?paged=2', { waitUntil: 'networkidle0' }); claim('B04-3 ' + vp, 'seksi kategori hanya di halaman 1 beranda', (await secs(p)).length === 0); await p._ctx.close();
    mods({ wplusui_home_categories: ' ' }); p = await open('/', vp); claim('B04-4 ' + vp, 'kosong: tidak ada seksi', (await secs(p)).length === 0); await p._ctx.close(); mods(clear);
    // B05
    const docId = +wp(`echo get_category_by_slug('documentation')->term_id;`);
    for (const [label, val] of [['slug', 'documentation'], ['ID', String(docId)]]) { mods({ wplusui_home_exclude_cats: val, wplusui_home_categories: 'documentation' }); p = await open('/', vp, { wait: 1500 }); const r = await p.evaluate(() => ({ latest: [...document.querySelectorAll('#Blog01 .blogP .ntry')].filter((a) => /in Documentation/.test(a.textContent)).length, carousel: document.querySelectorAll('.sldW .sldA').length, sections: [...document.querySelectorAll('.aCat .title')].some((t) => /Documentation/.test(t.textContent)) })); claim('B05-1 ' + vp, `kategori disembunyikan lewat ${label}`, true); claim('B05-2 ' + vp, `${label}: pos kategori itu hilang dari grid Latest Posts`, r.latest === 0 && (await cards(p)) > 0, r); claim('B05-3 ' + vp, `${label}: carousel dan seksi kategori tidak terpengaruh`, r.carousel === 5 && r.sections, r); await p._ctx.close(); }
    mods(clear); sticky(saved._sticky || [26]);
    // B06
    p = await open('/', vp); const sb = await p.evaluate(() => { const s = document.querySelector('aside.sideB'); const m = document.querySelector('.blogP'); return s ? { w: Math.round(s.getBoundingClientRect().width), top: Math.round(s.getBoundingClientRect().top), mainBottom: Math.round(m.getBoundingClientRect().bottom), x: Math.round(s.getBoundingClientRect().x), mx: Math.round(m.getBoundingClientRect().x) } : null; });
    claim('B06-1 ' + vp, vp === 'desktop' ? 'nyala: sidebar 300px di samping' : 'nyala: sidebar turun di bawah konten', sb && (vp === 'desktop' ? sb.w === 300 && sb.x > sb.mx : sb.top >= sb.mainBottom - 4), sb); await p._ctx.close();
    mods({ wplusui_sidebar_home: false }); p = await open('/', vp); claim('B06-2 ' + vp, 'mati: sidebar tidak ada', !(await p.evaluate(() => !!document.querySelector('aside.sideB')))); await p._ctx.close(); mods(clear);
    // B07
    const pop = (pp) => pp.evaluate(() => ({ title: document.querySelector('#PopularPosts01 h2, aside h2')?.textContent.trim(), items: [...document.querySelectorAll('#PopularPosts01 article, aside .PopularPosts article')].map((a) => a.querySelector('.pTtl, h3, .iTtl, a.itm')?.textContent.trim() || a.textContent.trim().slice(0, 30)) }));
    p = await open('/', vp); const pd = await pop(p); claim('B07-1 ' + vp, 'bawaan: kotak tampil dengan 5 pos berjudul Popular Posts', pd.items.length === 5 && pd.title === 'Popular Posts', pd); await p._ctx.close();
    mods({ wplusui_popular_title: 'Terpilih', wplusui_popular_count: 3 }); p = await open('/', vp); const pc = await pop(p); claim('B07-2 ' + vp, 'judul kustom dan jumlah 3 berlaku', pc.title === 'Terpilih' && pc.items.length === 3, pc); await p._ctx.close();
    const expect = (order) => JSON.parse(wp(`$q=['numberposts'=>3,'post_type'=>'post','suppress_filters'=>false];if('${order}'==='views'){$q+=['meta_key'=>'wplusui_views','orderby'=>'meta_value_num','order'=>'DESC'];}elseif('${order}'==='comments'){$q+=['orderby'=>'comment_count','order'=>'DESC'];}else{$q+=['orderby'=>'date','order'=>'DESC'];}echo json_encode(array_map(fn($p)=>$p->post_title,get_posts($q)));`));
    wp(`global $wpdb;$wpdb->update($wpdb->posts,['comment_count'=>90],['ID'=>34]);$wpdb->update($wpdb->posts,['comment_count'=>80],['ID'=>35]);$wpdb->update($wpdb->posts,['comment_count'=>70],['ID'=>29]);`);
    for (const order of ['views', 'comments', 'recent']) { mods({ wplusui_popular_order: order, wplusui_popular_count: 3 }); p = await open('/', vp); const r = await pop(p); const e = expect(order); claim('B07-4 ' + vp, `urutan ${order}`, r.items.length === 3 && JSON.stringify(r.items.map((x) => x.slice(0, 20))) === JSON.stringify(e.map((x) => x.slice(0, 20))), [r.items, e]); await p._ctx.close(); }
    wp(`global $wpdb;foreach([34,35,29] as $i)$wpdb->update($wpdb->posts,['comment_count'=>(int)$wpdb->get_var($wpdb->prepare("select count(*) from {$wpdb->comments} where comment_post_ID=%d and comment_approved='1'",$i))],['ID'=>$i]);`);
    mods({ wplusui_popular_order: 'views', wplusui_popular_count: 5 }); p = await open('/?p=26', vp); const inPost = await pop(p); claim('B07-5 ' + vp, 'di halaman pos, pos yang sedang dibaca tidak ikut terdaftar', !inPost.items.some((x) => /UI Components and Typography/.test(x)), inPost); await p._ctx.close();
    const only = +wp(`$i=wp_insert_post(['post_title'=>'Satu-satunya','post_status'=>'publish','post_content'=>'x']);echo $i;`);
    const others = JSON.parse(wp(`$o=[];global $wpdb;foreach(get_posts(['numberposts'=>-1,'exclude'=>[${only}],'fields'=>'ids']) as $i){$o[$i]=get_post_status($i);$wpdb->update($wpdb->posts,['post_status'=>'draft'],['ID'=>$i]);clean_post_cache($i);}echo json_encode($o);`));
    p = await open('/?p=' + only, vp); const sole = await pop(p); claim('B07-6 ' + vp, 'bila pos yang dibaca satu-satunya, ia tetap ditampilkan', sole.items.length === 1 && /Satu-satunya/.test(sole.items[0]), sole); await p._ctx.close();
    wp(`global $wpdb;foreach(json_decode('${JSON.stringify(others)}',true) as $i=>$s){$wpdb->update($wpdb->posts,['post_status'=>$s],['ID'=>$i]);clean_post_cache($i);}wp_delete_post(${only},true);`);
    mods({ wplusui_popular_show: false }); p = await open('/', vp); claim('B07-3 ' + vp, 'dimatikan: kotak hilang', !(await p.evaluate(() => !!document.getElementById('PopularPosts01')))); await p._ctx.close(); mods(clear);
  }
} finally {
  mods(Object.fromEntries(Object.entries(saved).filter(([k]) => k[0] !== '_')));
  wp(`update_option('sticky_posts',${JSON.stringify(saved._sticky || [])});update_option('posts_per_page',${+saved._ppp || 6});$t=get_term_by('slug','featured-uji-x','post_tag');if($t)wp_update_term($t->term_id,'post_tag',['slug'=>'featured']);`);
  await close();
}
summary();
