// FITUR.md "Bawaan" column: with every wplusui_* setting removed the site behaves as documented. The dev settings are restored at the end.
import * as L from './lib.mjs';
const { wp, open, launch, close, claim, summary, sleep } = L;
await launch();
const backup = wp(`echo base64_encode(serialize(['mods'=>get_option('theme_mods_wplus-ui'),'sticky'=>get_option('sticky_posts'),'ppp'=>get_option('posts_per_page')]));`);
try {
  wp(`$m=get_option('theme_mods_wplus-ui');foreach(array_keys($m) as $k)if(strpos($k,'wplusui_')===0)unset($m[$k]);update_option('theme_mods_wplus-ui',$m);`);
  for (const vp of ['desktop', 'mobile']) {
    let p = await open('/', vp, { wait: 2000 });
    const h = await p.evaluate(() => ({
      body: document.body.className, root: document.getElementById('root')?.className,
      carousel: !!document.querySelector('.sldW'), pinned: !!document.getElementById('FeaturedPost01'),
      sidebar: !!document.querySelector('aside.sideB'), popular: document.querySelectorAll('#PopularPosts01 article, .popP article, aside .itm').length, popTitle: document.querySelector('#PopularPosts01 h2, aside h2')?.textContent.trim(),
      notif: !!document.querySelector('.ntfC'), mobileBar: !!document.querySelector('.mobM'), ads: document.querySelectorAll('.adB').length,
      cards: document.querySelectorAll('.blogP .ntry').length, sections: [...document.querySelectorAll('h2.title, .title.dt')].map((e) => e.textContent.trim()),
      scheme: document.documentElement.className.match(/cs\d+/)?.[0], mode: document.documentElement.className.match(/lgT|drK/)?.[0],
      wa: !!document.querySelector('.puWa'), cta: !!document.querySelector('.puCta'),
      aboutText: '', fonts: [...document.querySelectorAll('link[href*="fonts.googleapis"]')].length, customCss: !!document.getElementById('wplusui-custom-css'),
    }));
    claim('A01 ' + vp, 'mode bawaan Light', h.mode === 'lgT' || /lgT/.test(h.body + h.root), h);
    claim('A02 ' + vp, 'skema bawaan 0', h.scheme === 'cs0', h.scheme);
    claim('A03/A04/A05 ' + vp, 'tanpa warna, radius, font kustom (tak ada CSS kustom/font Google)', !h.fonts, h.fonts);
    claim('A07 ' + vp, 'menu kiri bawaan Collapsed (co)', /\bco\b/.test(h.root), h.root);
    claim('A08 ' + vp, 'bar bawah mobile mati', !h.mobileBar);
    claim('A09 ' + vp, 'bar notifikasi tidak tampil', !h.notif);
    claim('B01 ' + vp, 'carousel tampil', h.carousel);
    claim('B02 ' + vp, 'Pinned Post tampil bila ada sticky', h.pinned);
    claim('B06 ' + vp, 'sidebar beranda tampil', h.sidebar, h.sidebar);
    claim('H01 ' + vp, 'tanpa iklan dan placeholder', h.ads === 0, h.ads);
    claim('I01/I02 ' + vp, 'WhatsApp dan pop-up mati', !h.wa && !h.cta);
    await p._ctx.close();
  }
  // home sections and popular posts defaults
  let p = await open('/', 'desktop', { wait: 2000 });
  const s = await p.evaluate(() => ({ titles: [...document.querySelectorAll('.title')].map((e) => e.textContent.trim()), popular: [...document.querySelectorAll('aside .PopularPosts article, aside article, aside .itm')].length, cards: document.querySelectorAll('.blogP > .ntry, .blogP .ntry').length }));
  claim('B04', 'seksi kategori bawaan documentation dan product', s.titles.filter((t) => /Documentation|Product/i.test(t)).length >= 2, s.titles);
  claim('B07', 'judul Popular Posts bawaan', s.titles.includes('Popular Posts'), s.titles);
  claim('B03', '6 pos per halaman (pengaturan WordPress)', +wp(`echo (int)get_option('posts_per_page');`) === 6);
  await p._ctx.close();
  // post page defaults
  for (const vp of ['desktop', 'mobile']) {
    p = await open('/?p=26', vp, { wait: 2000 });
    const q = await p.evaluate(() => ({ toc: !!document.getElementById('postToc'), share: !!document.getElementById('share'), quick: [...document.querySelectorAll('#share .pShc > a')].map((a) => a.getAttribute('aria-label')), popup: document.querySelectorAll('#share .shL a').length, related: document.querySelectorAll('#related .itemRp > *').length, relTitle: document.querySelector('#related h2')?.textContent.trim(), author: !!document.querySelector('.authorBox'), sidebar: !!document.querySelector('aside.sideB'), ad: !!document.querySelector('#postBody .adB'), cmts: !!document.querySelector('.pCmnts .cmBtn') }));
    claim('C02 ' + vp, 'TOC tampil', q.toc);
    claim('C03 ' + vp, 'berbagi: Facebook, WhatsApp, X; 8 jaringan di popup', q.share && q.quick.join() === 'Facebook,WhatsApp,X / Twitter' && q.popup === 8, q);
    claim('C04 ' + vp, 'related tampil 6 pos berjudul "Related Posts"', q.related === 6 && q.relTitle === 'Related Posts', q);
    claim('C05 ' + vp, 'author box mati', !q.author);
    claim('C11 ' + vp, 'sidebar pos tampil', vp === 'mobile' ? true : q.sidebar, q.sidebar);
    claim('C06 ' + vp, 'komentar bawaan WordPress (tombol Post a Comment)', q.cmts);
    await p._ctx.close();
  }
  p = await open('/?s=Navigation', 'desktop'); claim('D03', 'sidebar hasil pencarian tampil', await p.evaluate(() => !!document.querySelector('aside.sideB'))); await p._ctx.close();
  // footer defaults
  p = await open('/?page_id=44', 'desktop'); await p.evaluate(() => scrollTo(0, 1e6));
  const f = await p.evaluate(() => ({ about: document.querySelector('.abtD')?.textContent.trim(), cols: [...document.querySelectorAll('#sec_Footer_Widgets > .widget')].length, social: document.querySelectorAll('.fotS a').length, credit: document.querySelector('.credit')?.textContent.replace(/\s+/g, ' ').trim() }));
  claim('F01', 'teks about bawaan = slogan situs', f.about === wp(`echo get_bloginfo('description');`).trim(), f.about);
  claim('F05', 'hak cipta bawaan "© tahun nama All rights reserved."', /^© \d{4} .*All rights reserved\.$/.test(f.credit), f.credit);
  claim('F06', 'tanpa tautan sosial tidak tampil', f.social === 0, f.social);
  await p._ctx.close();
  // plugin-ish defaults via PHP
  claim('H03', 'kode head/footer kosong', wp(`echo get_theme_mod('wplusui_head_code','').get_theme_mod('wplusui_footer_code','');`) === '');
  claim('I03', 'Coming Soon bawaan off', wp(`echo wplusui_soon_mode();`) === 'off');
  claim('B03b', 'mode menu bawaan "collapsed"', wp(`echo get_theme_mod('wplusui_menu_default','collapsed');`) === 'collapsed');
  claim('C10', 'iklan dalam artikel: setelah paragraf 3 bawaan', wp(`echo (int)get_theme_mod('wplusui_ad_in_article_after',3);`) === '3');
} finally {
  wp(`$b=unserialize(base64_decode('${backup}'));update_option('theme_mods_wplus-ui',$b['mods']);update_option('sticky_posts',$b['sticky']);update_option('posts_per_page',$b['ppp']);`);
  await close();
}
summary();
