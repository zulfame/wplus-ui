// TRACE groups E and F (E01-E08, F01-F07): every sentence of the FITUR.md rows as a numbered claim. Menus, widgets and settings are restored.
import * as L from './lib.mjs';
import { execFileSync } from 'child_process';
const { wp, mods, open, launch, close, claim, summary, sleep, base, VP } = L;
const b = await launch();
const VPS = ['desktop', 'mobile'];
const fkeys = ['wplusui_footer_about', 'wplusui_footer_copyright', ...[1, 2, 3, 4].flatMap((c) => ['wplusui_footer_menu_' + c, 'wplusui_footer_title_' + c]), ...['facebook', 'instagram', 'twitter', 'threads', 'bluesky', 'whatsapp', 'pinterest', 'snapchat', 'discord', 'youtube', 'tiktok', 'telegram', 'linkedin'].map((n) => 'wplusui_social_' + n), 'wplusui_soon_mode', 'wplusui_soon_social'];
const savedMods = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(fkeys)} as $k)$o[$k]=get_theme_mod($k,null);$o['_loc']=get_nav_menu_locations();$o['_sw']=get_option('sidebars_widgets');$o['_tw']=get_option('widget_text');echo json_encode($o);`));
const clearF = Object.fromEntries(fkeys.map((k) => [k, null]));
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
let mid = 0, qid = 0;
try {
  // ---------- E: a temporary primary menu covering every option
  mid = +wp(`$m=wp_create_nav_menu('Uji trace');$a=function($t,$args=[])use($m){return wp_update_nav_menu_item($m,0,array_merge(['menu-item-title'=>$t,'menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#'],$args));};
$home=$a('Beranda',['menu-item-url'=>home_url('/')]);update_post_meta($home,'_wplusui_menu_icon','home');
$par=$a('Induk',[]);update_post_meta($par,'_wplusui_menu_flags',['open','dot']);
$k1=$a('Anak ikon',['menu-item-parent-id'=>$par]);update_post_meta($k1,'_wplusui_menu_icon','mail');$g1=$a('Cucu ikon',['menu-item-parent-id'=>$k1]);update_post_meta($g1,'_wplusui_menu_icon','home');$a('Anak polos',['menu-item-parent-id'=>$par]);
$nov=$a('Tanpa ikon',[]);update_post_meta($nov,'_wplusui_menu_icon','none');$a('Folder otomatis',[]);
$cl=$a('Kelas ikon',['menu-item-classes'=>'ico-users']);
$ov=$a('Pilihan menang',['menu-item-classes'=>'ico-users']);update_post_meta($ov,'_wplusui_menu_icon','phone');
$a('---',[]);
$bd=$a('Berbadge',[]);update_post_meta($bd,'_wplusui_menu_badge','free');update_post_meta($bd,'_wplusui_menu_flags',['divider']);
$cc=$a('Kelas lain',['menu-item-classes'=>'new nt br']);
$grp=$a('More...',[]);update_post_meta($grp,'_wplusui_menu_flags',['group']);$a('Dalam grup',['menu-item-parent-id'=>$grp]);
$pp=$a('Induk aktif',[]);$a('Halaman About',['menu-item-type'=>'post_type','menu-item-object'=>'page','menu-item-object-id'=>44,'menu-item-url'=>'','menu-item-parent-id'=>$pp]);
$loc=get_nav_menu_locations();$loc['primary']=$m;set_theme_mod('nav_menu_locations',$loc);echo $m;`);
  const dump = () => { const fnd = (t) => [...document.querySelectorAll('.mnMn li')].find((l) => new RegExp('^' + t).test((l.querySelector(':scope > a, :scope > label')?.textContent || '').trim())); const svg = (l) => !!l?.querySelector(':scope > a > svg, :scope > label > svg'); const icon = (l) => l?.querySelector(':scope > a > svg, :scope > label > svg')?.innerHTML.length; return { home: svg(fnd('Beranda')), child: svg(fnd('Anak ikon')), grand: svg(fnd('Cucu ikon')), plain: svg(fnd('Anak polos')), none: svg(fnd('Tanpa ikon')), auto: svg(fnd('Folder otomatis')), clsIcon: icon(fnd('Kelas ikon')), winIcon: icon(fnd('Pilihan menang')), mail: icon(fnd('Anak ikon')), sepLi: !!document.querySelector('.mnMn > li.br[role=separator]'), brLi: fnd('Berbadge')?.className, badge: fnd('Berbadge')?.querySelector('.free')?.className, other: fnd('Kelas lain')?.className, otherBadge: fnd('Kelas lain')?.querySelector('.new')?.className, dot: fnd('Induk')?.className, open: fnd('Induk')?.querySelector(':scope > input')?.checked, grp: fnd('More')?.className, grpOpen: fnd('More')?.querySelector(':scope > input')?.checked, actPar: fnd('Induk aktif')?.className, actOpen: fnd('Induk aktif')?.querySelector(':scope > input')?.checked, aboutAria: document.querySelector('.mnMn a[aria-current=page]')?.textContent.trim(), noScriptCheck: true }; };
  for (const vp of VPS) {
    const p = await open('/?page_id=44', vp, { wait: 1500 }); const d = await p.evaluate(dump);
    { const w = await p.evaluate(() => ({ rail: Math.round(document.querySelector('.mainL').getBoundingClientRect().width), x: Math.round(document.querySelector('.mainN .mnBr, .mainL').getBoundingClientRect().x) })); claim('E01-3 ' + vp, vp === 'desktop' ? 'desktop: menu berupa rel ikon (75px)' : 'mobile: menu berupa laci yang tertutup di luar layar', vp === 'desktop' ? w.rail === 75 : w.x < 0, w); }
    claim('E01-1 ' + vp, 'menu bertingkat dengan ikon di sisi kiri', d.home && d.child, d);
    claim('E02-1 ' + vp, 'ikon pilihan tampil di semua tingkat (anak dan cucu)', d.child && d.grand, d); claim('E02-2 ' + vp, 'tingkat atas tanpa pilihan memakai ikon folder bawaan', d.auto, d); claim('E02-3 ' + vp, '"No icon" menghilangkan ikon', !d.none, d);
    claim('E02-4 ' + vp, 'kelas CSS ico-nama memilih ikon (Customizer)', d.clsIcon > 0 && d.clsIcon !== d.winIcon, d); claim('E02-5 ' + vp, 'pilihan pada item mengalahkan kelas CSS', d.winIcon > 0 && d.winIcon !== d.clsIcon, d);
    claim('E02-6 ' + vp, 'sub-item tanpa pilihan tidak berikon', !d.plain, d);
    claim('E03-1 ' + vp, 'opsi Divider menambah garis setelah item (kelas br)', /\bbr\b/.test(d.brLi || ''), d); claim('E03-2 ' + vp, 'opsi Notification dot (kelas nt)', /\bnt\b/.test(d.dot || ''), d); claim('E03-3 ' + vp, 'opsi Sub-menu starts open: sub-menu terbuka sejak awal', d.open === true, d);
    claim('E03-4 ' + vp, 'opsi Flat "More..." group (kelas mr) selalu terbuka', /\bmr\b/.test(d.grp || '') && d.grpOpen === true, d); claim('E03-5 ' + vp, 'lencana Free', !!d.badge, d); claim('E03-6 ' + vp, 'kelas CSS Customizer (new, nt, br) setara opsi', /\bnt\b/.test(d.other) && /\bbr\b/.test(d.other) && !!d.otherBadge, d);
    claim('E04-1 ' + vp, 'Tautan Khusus "---" menjadi garis pemisah tanpa tautan', d.sepLi, d);
    claim('E05-1 ' + vp, 'item halaman yang dibuka diberi aria-current dan induknya aktif dan terbuka', d.aboutAria === 'Halaman About' && /\bactive\b/.test(d.actPar || '') && d.actOpen === true, d);
    // dropdown without JavaScript
    const ctx = await b.createBrowserContext(); const q = await ctx.newPage(); await q.setViewport(VP[vp]); await q.setJavaScriptEnabled(false); await q.goto(base + '/?page_id=44', { waitUntil: 'networkidle0' }); await q.evaluate(() => document.querySelector('label[for=forNavigation]')?.click());
    await q.evaluate(() => { window.__t = 0; });
    const hh = () => q.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /^Induk(?! aktif)/.test((l.querySelector(':scope > label')?.textContent || '').trim())); return Math.round(li.querySelector(':scope > ul').getBoundingClientRect().height); });
    const tg = () => q.evaluate(() => [...document.querySelectorAll('.mnMn > li')].find((l) => /^Induk(?! aktif)/.test((l.querySelector(':scope > label')?.textContent || '').trim())).querySelector(':scope > label').click());
    const nj = [await hh()]; await tg(); await sleep(700); nj.push(await hh()); await tg(); await sleep(700); nj.push(await hh());
    claim('E01-2 ' + vp, 'dropdown menutup dan membuka lagi tanpa JavaScript (tinggi: terbuka, tertutup 0, terbuka)', nj[0] > 0 && nj[1] === 0 && nj[2] > 0, nj); await ctx.close(); await p._ctx.close();
  }
  // E07 flyout: collapsed rail, hover item with many children, window short and tall
  const tall = +wp(`$m=wp_create_nav_menu('Uji tinggi');$a=function($t,$args=[])use($m){return wp_update_nav_menu_item($m,0,array_merge(['menu-item-title'=>$t,'menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#'],$args));};$a('Satu');$t=$a('Tinggi');for($i=1;$i<=16;$i++)$a('Anak '.$i,['menu-item-parent-id'=>$t]);$loc=get_nav_menu_locations();$loc['primary']=$m;set_theme_mod('nav_menu_locations',$loc);echo $m;`);
  for (const [h, name] of [[720, 'penuh'], [420, 'pendek']]) { VP.tmp = { width: 1280, height: h, deviceScaleFactor: 1 }; const p = await open('/?page_id=44', 'tmp'); const pos = await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Tinggi/.test(l.textContent)); const r = li.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }); await p.mouse.move(pos[0], pos[1]); await sleep(700);
    const f = await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Tinggi/.test(l.textContent)); const ul = li.querySelector(':scope > ul'); const r = ul.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight, scroll: ul.scrollHeight > ul.clientHeight, pos: getComputedStyle(ul).position }; });
    claim('E07-1', `rel menciut, jendela ${name}: sub-menu muncul di sisi dan tidak keluar jendela`, f.pos === 'absolute' && f.top >= 0 && f.bottom <= f.vh, f); if (h === 420) claim('E07-2', 'sub-menu yang lebih tinggi dari jendela bisa digulir', f.scroll, f); await p._ctx.close(); }
  wp(`wp_delete_nav_menu(${tall});`);
  // E06 quick links
  qid = +wp(`echo (int)get_nav_menu_locations()['quicklinks'];`);
  for (const vp of VPS) { const p = await open('/?cat=2', vp); const q = await p.evaluate(() => { const n = document.querySelector('.navS'); const u = n?.querySelector('ul'); const act = n?.querySelector('a.active'); return n && { items: n.querySelectorAll('li').length, below: n.getBoundingClientRect().top >= document.querySelector('header')?.getBoundingClientRect().bottom - 2, scroll: Math.max(n.scrollWidth - n.clientWidth, u.scrollWidth - u.clientWidth), act: act?.getAttribute('aria-label'), actBorder: act ? getComputedStyle(act, '::after').borderBottomWidth + '|' + getComputedStyle(act).borderBottomWidth : null }; });
    claim('E06-1 ' + vp, 'baris tautan di bawah header, memuat item menu Quick Links', q && q.items === 10 && q.below, q); claim('E06-2 ' + vp, 'tautan halaman aktif diberi penanda (kelas active)', q.act === 'Documentation', q); if (vp === 'mobile') claim('E06-3 ' + vp, 'baris bisa digeser mendatar bila tidak muat', q.scroll > 0, q); await p._ctx.close(); }
  wp(`$l=get_nav_menu_locations();update_option('wplusui_test_ql',$l['quicklinks']);unset($l['quicklinks']);set_theme_mod('nav_menu_locations',$l);`);
  { const p = await open('/', 'desktop'); claim('E06-4', 'lokasi dikosongkan: baris tidak tampil', !(await p.evaluate(() => !!document.querySelector('.navS')))); await p._ctx.close(); }
  wp(`$l=get_nav_menu_locations();$l['quicklinks']=get_option('wplusui_test_ql');set_theme_mod('nav_menu_locations',$l);delete_option('wplusui_test_ql');`);
  // E08 fallback
  wp(`$l=get_nav_menu_locations();$l['primary']=0;set_theme_mod('nav_menu_locations',$l);`);
  for (const vp of VPS) { const p = await open('/?page_id=44', vp); const r = await p.evaluate(() => [...document.querySelectorAll('.mnMn > li')].map((l) => l.textContent.trim().replace(/\s+/g, ' '))); claim('E08-1 ' + vp, 'tanpa menu terpasang: daftar halaman dipakai', ['About', 'Contact'].every((x) => r.includes(x)), r); await p._ctx.close(); }
  wp(`set_theme_mod('nav_menu_locations',json_decode(base64_decode('${Buffer.from(JSON.stringify(savedMods._loc)).toString('base64')}'),true));wp_delete_nav_menu(${mid});`); mid = 0;
  // ---------- F
  mods(clearF);
  wp(`update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['footer-1'=>[],'footer-2'=>[],'footer-3'=>[],'footer-4'=>[]]));`);
  const foot = (p) => p.evaluate(() => ({ about: document.querySelector('.abtD')?.textContent.trim(), logo: document.querySelector('.abtL img')?.className, name: document.querySelector('.abtT h2')?.textContent, cols: [...document.querySelectorAll('#sec_Footer_Widgets > .widget')].map((w) => ({ id: w.id, title: w.querySelector('.title')?.textContent, n: w.querySelectorAll('li').length, x: Math.round(w.getBoundingClientRect().x) })), credit: document.querySelector('.credit')?.textContent.replace(/\s+/g, ' ').trim(), creator: document.querySelector('.creator')?.textContent.replace(/\s+/g, ' ').trim(), social: [...document.querySelectorAll('.fotS a')].map((a) => a.getAttribute('aria-label')), drawer: document.querySelectorAll('.mSoc a').length }));
  const page = async (vp, u = '/?page_id=44') => { const p = await open(u, vp); await p.evaluate(() => scrollTo(0, 1e6)); const r = await foot(p); await p._ctx.close(); return r; };
  for (const vp of VPS) {
    let f = await page(vp);
    claim('F01-1 ' + vp, 'tanpa pengaturan: teks about = slogan situs', f.about === wp(`echo get_bloginfo('description');`).trim(), f.about); claim('F01-2 ' + vp, 'nama situs di footer', f.name === 'WPlus UI Demo');
    claim('F02-4 ' + vp, 'tanpa menu atau widget kolom tidak dicetak', f.cols.length === 0, f.cols); claim('F05-1 ' + vp, 'hak cipta bawaan memuat tahun, nama situs, All rights reserved.', /^© \d{4} .*WPlus UI Demo.*All rights reserved\.$/.test(f.credit), f.credit); claim('F05-3 ' + vp, 'baris atribusi tema selalu ada', /Forked from Plus UI by Fineshop Design/.test(f.creator), f.creator); claim('F06-1 ' + vp, 'tanpa URL tidak ada ikon sosial', f.social.length === 0 && f.drawer === 0, f);
    mods({ wplusui_footer_about: 'Tentang uji', wplusui_footer_copyright: '© {year} Uji Bersama', wplusui_footer_menu_1: 14, wplusui_footer_menu_3: 13, wplusui_footer_title_1: 'Tautan' });
    f = await page(vp); claim('F01-3 ' + vp, 'teks about kustom', f.about === 'Tentang uji'); claim('F05-2 ' + vp, '{year} menjadi tahun berjalan dan baris hak cipta diganti', f.credit === `© ${new Date().getFullYear()} Uji Bersama`, f.credit);
    claim('F02-1 ' + vp, 'kolom bermenu memakai menu pilihan (Quick Links 10 tautan, Primary 7)', f.cols[0]?.n === 10 && f.cols[1]?.n === 7, f.cols); claim('F03-1 ' + vp, 'judul kolom kustom dan bawaan ("Tautan", "Support")', f.cols[0]?.title === 'Tautan' && f.cols[1]?.title === 'Support', f.cols);
    if (vp === 'desktop') claim('F04-1 ' + vp, 'dua kolom terisi dari slot paling kanan', f.cols[0].x === 905 && f.cols[1].x === 1092, f.cols); else claim('F04-2 ' + vp, 'ponsel: kolom dua per baris dari kiri', f.cols[0].x === 20 && f.cols[1].x > 150, f.cols);
    mods({ wplusui_footer_menu_2: 14, wplusui_footer_menu_4: 13 }); f = await page(vp); claim('F04-3 ' + vp, 'empat kolom bermenu dengan judul bawaan Resources dan Company', f.cols.length === 4 && f.cols[1].title === 'Resources' && f.cols[3].title === 'Company', f.cols);
    // widget column and location
    mods({ wplusui_footer_menu_1: null, wplusui_footer_menu_2: null, wplusui_footer_menu_3: null, wplusui_footer_menu_4: null });
    wp(`update_option('widget_text',[7=>['title'=>'Widget uji','text'=>'Isi','filter'=>false],'_multiwidget'=>1]);update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['footer-2'=>['text-7']]));`);
    f = await page(vp); claim('F02-2 ' + vp, 'tanpa menu: kolom memakai widget', f.cols.length === 1 && f.cols[0].id === 'text-7', f.cols); claim('F03-2 ' + vp, 'kolom widget memakai judul widget', f.cols[0].title === 'Widget uji', f.cols);
    const lm = +wp(`$m=wp_create_nav_menu('Uji lokasi footer');wp_update_nav_menu_item($m,0,['menu-item-title'=>'Satu','menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#']);$l=get_nav_menu_locations();$l['footer-2']=$m;set_theme_mod('nav_menu_locations',$l);echo $m;`);
    f = await page(vp); claim('F02-3 ' + vp, 'menu lokasi Footer Column mengalahkan widget', f.cols[0]?.id === 'footer-menu-2' && f.cols[0].n === 1, f.cols);
    wp(`$l=get_nav_menu_locations();unset($l['footer-2']);set_theme_mod('nav_menu_locations',$l);wp_delete_nav_menu(${lm});update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['footer-2'=>[]]));`);
    // F06
    const nets = ['facebook', 'instagram', 'twitter', 'threads', 'bluesky', 'whatsapp', 'pinterest', 'snapchat', 'discord', 'youtube', 'tiktok', 'telegram', 'linkedin'];
    mods(Object.fromEntries(nets.map((n) => ['wplusui_social_' + n, 'https://example.com/' + n]))); f = await page(vp);
    claim('F06-2 ' + vp, '13 jaringan: 13 ikon di footer dan 13 di laci menu dengan label sendiri', f.social.length === 13 && f.drawer === 13 && new Set(f.social).size === 13, f.social);
    mods(clearF); mods({ wplusui_social_facebook: 'https://facebook.com/uji', wplusui_social_youtube: 'https://youtube.com/uji' }); f = await page(vp); claim('F06-3 ' + vp, 'hanya jaringan yang diisi yang tampil', f.social.join() === 'Facebook,YouTube', f.social);
    mods({ wplusui_soon_mode: 'coming_soon', wplusui_soon_social: true }); { const p = await open('/', vp); claim('F06-4 ' + vp, 'ikon sosial juga tampil di halaman Coming Soon', (await p.evaluate(() => document.querySelectorAll('.soc a').length)) === 2); await p._ctx.close(); } mods({ wplusui_soon_mode: null, wplusui_soon_social: null });
    mods(clearF);
    // F07
    claim('F07-1 ' + vp, 'lima area widget terdaftar (Footer Column 1-4, Blog Sidebar)', wp(`global $wp_registered_sidebars;echo count(array_intersect(array_keys($wp_registered_sidebars),['footer-1','footer-2','footer-3','footer-4','sidebar-1']));`) === '5');
    wp(`update_option('widget_text',[8=>['title'=>'Widget sidebar','text'=>'Isi','filter'=>false],'_multiwidget'=>1]);update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['sidebar-1'=>['text-8']]));`);
    { const p = await open('/?p=26', vp); const t = await p.evaluate(() => [...document.querySelectorAll('aside.sideB .widget')].map((w) => w.querySelector('.title')?.textContent.trim() || '')); claim('F07-2 ' + vp, 'widget Blog Sidebar tampil di bawah Popular Posts dan Labels', t.indexOf('Widget sidebar') > t.indexOf('Popular Posts') && t.indexOf('Widget sidebar') > t.indexOf('Labels'), t); await p._ctx.close(); }
    wp(`update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['sidebar-1'=>[]]));`);
  }
} finally {
  mods(Object.fromEntries(Object.entries(savedMods).filter(([k, v]) => k[0] !== '_' && v !== null)));
  mods(Object.fromEntries(Object.entries(savedMods).filter(([k, v]) => k[0] !== '_' && v === null)));
  wp(`set_theme_mod('nav_menu_locations',json_decode(base64_decode('${Buffer.from(JSON.stringify(savedMods._loc)).toString('base64')}'),true));update_option('sidebars_widgets',json_decode(base64_decode('${Buffer.from(JSON.stringify(savedMods._sw)).toString('base64')}'),true));update_option('widget_text',json_decode(base64_decode('${Buffer.from(JSON.stringify(savedMods._tw)).toString('base64')}'),true));foreach(['Uji trace','Uji tinggi','Uji lokasi footer'] as $n)wp_delete_nav_menu($n);`);
  await close();
}
summary();
