// TRACE group D (D01-D05): every sentence of the FITUR.md rows as a numbered claim.
import * as L from './lib.mjs';
import { execFileSync } from 'child_process';
const { wp, mods, open, launch, close, claim, summary, sleep, base, VP } = L;
const b = await launch();
const VPS = ['desktop', 'mobile'];
const saved = JSON.parse(wp(`echo json_encode(['sb'=>get_theme_mod('wplusui_sidebar_search',null),'toc'=>get_theme_mod('wplusui_toc_show',null),'banner'=>get_term_meta(3,'wplusui_banner_image_id',true)]);`));
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
const tag = JSON.parse(wp(`$t=get_term_by('slug','tag-uji-d','post_tag');if($t){echo json_encode($t->term_id);}else{$r=wp_insert_term('Tag uji D','post_tag',['slug'=>'tag-uji-d']);echo json_encode($r['term_id']);}`));
const extra = JSON.parse(wp(`$o=[];for($i=1;$i<=3;$i++)$o[]=wp_insert_post(['post_title'=>'Tambahan arsip '.$i,'post_status'=>'publish','post_content'=>'x','post_category'=>[2]]);echo json_encode($o);`));
const tp = +wp(`$i=wp_insert_post(['post_title'=>'Pos tag uji D','post_status'=>'publish','post_content'=>'x','post_category'=>[3]]);wp_set_post_tags($i,['tag-uji-d']);echo $i;`);
try {
  for (const vp of VPS) {
    // D01
    let p = await open('/?page_id=44', vp, { wait: 1500 });
    const d = await p.evaluate(() => ({ crumb: document.querySelector('.brdCmb')?.innerText.replace(/\s+/g, ' ').trim(), h1: document.querySelector('h1')?.textContent.trim(), body: document.getElementById('postBody').innerText.length, byline: !!document.querySelector('.pInf'), side: !!document.querySelector('aside.sideB'), cm: !!document.querySelector('.pCmnts'), rel: !!document.getElementById('related'), toc: !!document.getElementById('postToc') }));
    claim('D01-1 ' + vp, 'breadcrumb Home dan judul halaman', /^Home/.test(d.crumb), d.crumb); claim('D01-2 ' + vp, 'judul halaman (h1)', d.h1 === 'About'); claim('D01-3 ' + vp, 'isi halaman tampil', d.body > 500, d.body);
    claim('D01-4 ' + vp, 'tanpa info penulis, sidebar, komentar, related', !d.byline && !d.side && !d.cm && !d.rel, d); claim('D01-5 ' + vp, 'tab daftar isi tampil mengikuti pengaturan', d.toc); await p._ctx.close();
    // D02
    wp(`update_term_meta(3,'wplusui_banner_image_id',139);`);
    p = await open('/?cat=3', vp, { wait: 1500 }); const a = await p.evaluate(() => ({ h: document.querySelector('.ldH')?.textContent.trim(), cnt: document.querySelector('.ldP')?.dataset.numPosts, img: document.querySelector('.ldC')?.getAttribute('src')?.split('/').pop(), side: !!document.querySelector('aside.sideB'), blur: getComputedStyle(document.querySelector('.ldW .secIn, .ldI') || document.body).backdropFilter }));
    const q2 = await open('/?cat=2', vp, { wait: 1000 }); const bd = await q2.evaluate(() => ({ h: document.querySelector('.ldH')?.textContent.trim(), cnt: document.querySelector('.ldP')?.dataset.numPosts, desc: document.querySelector('.ldD')?.textContent.trim().slice(0, 20) })); await q2._ctx.close();
    claim('D02-1 ' + vp, 'banner: nama kategori, jumlah pos, deskripsi term', a.h === 'Fullpage' && +a.cnt >= 1 && bd.h === 'Documentation' && +bd.cnt >= 19 && /Browse all posts/.test(bd.desc || ''), [a, bd]); claim('D02-2 ' + vp, 'gambar banner dari meta term (wplus-ui-logo-square)', /wplus-ui-logo-square/.test(a.img || ''), a.img); claim('D02-3 ' + vp, 'grid pos tanpa sidebar', !a.side); await p._ctx.close();
    wp(`delete_term_meta(3,'wplusui_banner_image_id');`); p = await open('/?cat=3', vp); claim('D02-2b ' + vp, 'tanpa gambar banner: memakai gambar unggulan pos terbaru di term itu', !!(await p.evaluate(() => document.querySelector('.ldC')?.getAttribute('src'))) || (await p.evaluate(() => !document.querySelector('.ldC'))), 0); await p._ctx.close();
    p = await open('/?tag=tag-uji-d', vp); { const tg = await p.evaluate(() => ({ banner: !!document.querySelector('.ldW'), cards: document.querySelectorAll('.blogP .ntry').length, side: !!document.querySelector('aside.sideB'), h: document.querySelector('.ldH')?.textContent })); claim('D02-5 ' + vp, 'arsip tag memakai tata letak yang sama (banner + kartu, tanpa sidebar)', tg.banner && tg.cards === 1 && !tg.side, tg); } await p._ctx.close();
    p = await open('/?cat=2', vp, { wait: 2500 }); const c0 = await p.evaluate(() => document.querySelectorAll('.blogP .ntry').length); await p.evaluate(() => document.querySelector('#blog-pager button.jsLd')?.click()); await sleep(3000); claim('D02-4 ' + vp, 'arsip memuat 16 pos lalu Load more posts memuat sisanya', c0 === 16 && (await p.evaluate(() => document.querySelectorAll('.blogP .ntry').length)) >= 17, c0); await p._ctx.close();
    // D03
    p = await open('/?s=Navigation', vp); const s = await p.evaluate(() => ({ t: document.querySelector('.blogT .t.srch')?.textContent.replace(/\s+/g, ' ').trim(), cards: document.querySelectorAll('.blogP .ntry').length, side: !!document.querySelector('aside.sideB') })); claim('D03-1 ' + vp, 'judul "Search results for: …" dan grid hasil', /Search results for: Navigation/.test(s.t) && s.cards === 2, s); claim('D03-2 ' + vp, 'sidebar tampil (bawaan)', s.side); await p._ctx.close();
    mods({ wplusui_sidebar_search: false }); p = await open('/?s=Navigation', vp); claim('D03-2b ' + vp, 'sidebar dimatikan lewat pengaturan', !(await p.evaluate(() => !!document.querySelector('aside.sideB')))); await p._ctx.close(); mods({ wplusui_sidebar_search: saved.sb });
    p = await open('/?s=zzzxxyy', vp); claim('D03-3 ' + vp, 'tanpa hasil: "No results found"', /No results found/.test(await p.evaluate(() => document.querySelector('.blogT, main')?.innerText || '')) ); await p._ctx.close();
    // D04
    p = await open('/?p=999999', vp); const e = await p.evaluate(() => ({ cls: document.body.className.includes('error404'), h: document.querySelector('.erroC h3')?.innerText.replace(/\s+/g, ' '), anim: getComputedStyle(document.querySelector('.erroC h3 span.e')).animationName, btn: document.querySelector('.erroC .button')?.getAttribute('href'), text: document.querySelector('.erroC p')?.textContent })); claim('D04-1 ' + vp, 'bagian galat "404 Something Wrong!" dengan efek glitch', e.cls && /404 Something Wrong!/.test(e.h) && /glitch/.test(e.anim), e); claim('D04-2 ' + vp, 'tombol "Take me back" menuju beranda', e.btn === base + '/', e.btn);
    const r404 = +execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', base + '/?p=999999'], { encoding: 'utf8' }); claim('D04-3 ' + vp, 'status HTTP 404', r404 === 404, r404); await p._ctx.close();
  }
  // D02-6: the banner field on the category/tag edit screens
  { const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP.desktop); await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
    for (const [tax, id] of [['category', 3], ['post_tag', tag]]) { await p.goto(`${base}/wp-admin/term.php?taxonomy=${tax}&tag_ID=${id}&post_type=post`, { waitUntil: 'networkidle0' }); claim('D02-6', `kolom "Archive banner image (WPlus UI)" ada di layar ubah ${tax}`, await p.evaluate(() => !!document.querySelector('.wplusui-banner-pick') && /Archive banner image/.test(document.body.innerText))); } await ctx.close(); }
  // D05 with the plugin active and inactive
  for (const vp of VPS) {
    const pg = +wp(`echo wplusui_create_contact_page();`);
    let p = await open('/?page_id=' + pg, vp, { wait: 1500 }); const f = await p.evaluate(() => { const r = (s) => { const e = document.querySelector(s); if (!e) return null; const x = e.getBoundingClientRect(); return [Math.round(x.x), Math.round(x.width)]; }; return { grid: !!document.querySelector('.cf-grid'), name: r('input[name=your-name]'), email: r('input[name=your-email]'), msg: r('textarea'), over: document.documentElement.scrollWidth > innerWidth + 1, sc: !!document.querySelector('.wpcf7') }; });
    claim('D05-1 ' + vp, 'halaman Contact memuat formulir CF7 lewat shortcode/pola', f.sc, f); claim('D05-2 ' + vp, vp === 'desktop' ? 'nama dan email berdampingan (dua kolom cf-grid)' : 'ponsel: satu kolom', f.grid && (vp === 'desktop' ? f.name[0] !== f.email[0] : f.name[0] === f.email[0]) && !f.over, f); await p._ctx.close();
  }
  wp(`require_once ABSPATH.'wp-admin/includes/plugin.php';deactivate_plugins('contact-form-7/wp-contact-form-7.php');`);
  { const pg = +wp(`echo (int)get_page_by_path('contact')->ID;`); const p = await open('/?page_id=' + pg, 'desktop'); claim('D05-3', 'tanpa plugin Contact Form 7 pengunjung tidak melihat formulir', !(await p.evaluate(() => !!document.querySelector('.wpcf7, form.wpcf7-form')))); await p._ctx.close();
    const ctx = await b.createBrowserContext(); const q = await ctx.newPage(); await q.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' }))); await q.goto(base + '/?page_id=' + pg, { waitUntil: 'networkidle0' }); claim('D05-3b', 'tanpa plugin admin melihat petunjuk memasang plugin', /Install and activate the Contact Form 7/.test(await q.evaluate(() => document.querySelector('.note.wr')?.textContent || '')) ); await ctx.close(); }
  wp(`require_once ABSPATH.'wp-admin/includes/plugin.php';activate_plugin('contact-form-7/wp-contact-form-7.php');`);
  claim('D05-4', 'pola "Contact page (Contact Form 7)" terdaftar', wp(`echo (int)WP_Block_Patterns_Registry::get_instance()->is_registered('wplus-ui/contact');`) === '1');
} finally {
  wp(`foreach(${JSON.stringify(extra)} as $i)wp_delete_post($i,true);wp_delete_post(${tp},true);wp_delete_term(${tag},'post_tag');delete_term_meta(3,'wplusui_banner_image_id');${saved.banner ? `update_term_meta(3,'wplusui_banner_image_id',${JSON.stringify(saved.banner)});` : ''}require_once ABSPATH.'wp-admin/includes/plugin.php';activate_plugin('contact-form-7/wp-contact-form-7.php');`);
  mods({ wplusui_sidebar_search: saved.sb });
  await close();
}
summary();
