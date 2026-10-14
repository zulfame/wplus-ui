// AUDIT groups A/E/F/G gaps: mobile bar items per page, footer menu via theme location, Show All gallery, spoiler, TOC block toggle, sticky tabs, every pattern renders.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close, sleep } = L;
await launch();
// A08: items of the bottom bar per page type
const saved = JSON.parse(wp(`echo json_encode(['bar'=>get_theme_mod('wplusui_mobile_bar_show',null)]);`));
mods({ wplusui_mobile_bar_show: true });
const bar = () => [...document.querySelectorAll('.mobM li')].map((l) => (l.querySelector('[data-text]')?.dataset.text || l.className) + (l.querySelector('a') ? '(link)' : ''));
for (const [n, u] of Object.entries({ home: '/', single: '/?p=26', page: '/?page_id=44', archive: '/?cat=2', search: '/?s=Navigation', notfound: '/?p=999999' })) { const p = await open(u, 'mobile'); out('A08 bar ' + n, 'mobile', await p.evaluate(bar)); await p._ctx.close(); }
{ const p = await open('/?p=26', 'mobile'); // actions: Search, Menu, Appearance (post has none), Comments anchor, Share
  out('A08 actions', 'mobile', await p.evaluate(() => ({ searchFor: document.querySelector('.mobM .mS label')?.getAttribute('for'), menuFor: document.querySelector('.mobM .mN label')?.getAttribute('for'), comments: document.querySelector('.mobM .mC a')?.getAttribute('href'), shareFor: document.querySelector('.mobM label[for=forShare]') ? 'forShare' : null })));
  await p.evaluate(() => document.querySelector('.mobM .mN label').click()); await sleep(600);
  const nav = await p.evaluate(() => document.getElementById('forNavigation').checked); await p.evaluate(() => document.querySelector('.mobM .mS label').click()); await sleep(600);
  out('A08 click', 'mobile', { navOpened: nav, searchChecked: await p.evaluate(() => document.getElementById('forSearch')?.checked) }); await p._ctx.close(); }
{ const p = await open('/', 'mobile'); await p.evaluate(() => scrollTo(0, 1500)); await sleep(500); const y = await p.evaluate(() => scrollY); await p.evaluate(() => [...document.querySelectorAll('.mobM button')].find((b) => /Top/.test(b.dataset.text || ''))?.click()); await sleep(900); out('A08 top', 'mobile', { before: y, after: await p.evaluate(() => scrollY) }); await p._ctx.close(); }
{ const p = await open('/', 'mobile'); const cls = () => p.evaluate(() => document.documentElement.className + '|' + document.body.className.split(' ').filter((c) => /lgT|drK/.test(c)).join(' ')); const a = await cls(); await p.evaluate(() => document.querySelector('.mobM .mL button')?.click()); await sleep(600); out('A08 appearance', 'mobile', { before: a, after: await cls() }); await p._ctx.close(); }
mods({ wplusui_mobile_bar_show: saved.bar });
// G: components
const b = (name, attrs, inner) => `<!-- wp:${name} ${attrs ? JSON.stringify(attrs) : ''} -->${inner}<!-- /wp:${name} -->`;
const big = 'http://127.0.0.1:8091/wp-content/uploads/2026/10/urban-basketball-game-1024x577.webp';
const img = (i) => b('image', null, `<figure class="wp-block-image"><img src="${big}" alt="g${i}"/></figure>`);
const gal = (s, n) => b('gallery', { className: 'is-style-' + s }, `<figure class="wp-block-gallery has-nested-images columns-default is-cropped is-style-${s}">${Array.from({ length: n }, (_, i) => img(i)).join('')}</figure>`);
const content = [gal('image-hidden', 7), b('details', { className: 'is-style-spoiler' }, '<details class="wp-block-details is-style-spoiler"><summary>Rahasia</summary>' + b('paragraph', null, '<p>Isi rahasia</p>') + '</details>'), b('wplusui/toc', { title: 'Isi', open: false }, ''), '<!-- wp:heading --><h2 class="wp-block-heading">Satu</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Satu A</h3><!-- /wp:heading -->', b('wplusui/tabs', { sticky: true }, '<div class="wp-block-wplusui-tabs">' + b('wplusui/tab', { title: 'A' }, '<p>a</p>') + b('wplusui/tab', { title: 'B' }, '<p>b</p>') + '</div>'), '<!-- wp:paragraph --><p>' + 'isi panjang. '.repeat(400) + '</p><!-- /wp:paragraph -->'].join('\n');
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji G','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(content).toString('base64')}')]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + id, vp, { wait: 2500 });
  // Show All
  const vis = () => p.evaluate(() => [...document.querySelectorAll('#postBody .psImg img')].filter((i) => i.getBoundingClientRect().height > 0).length);
  const v0 = await vis(); await p.evaluate(() => document.querySelector('.btImg label').click()); await sleep(600); out('G06 show all', vp, { before: v0, after: await vis() });
  // spoiler
  out('G05 spoiler', vp, await p.evaluate(() => { const d = document.querySelector('details.sp:not(.toc)'); const s = d.querySelector('summary'); const t0 = getComputedStyle(s, '::after').content; s.click(); return { openAfter: d.open, label0: t0, label1: getComputedStyle(s, '::after').content, bodyVisible: d.querySelector('div,p')?.getBoundingClientRect().height > 0 }; }));
  // TOC block closed initially then toggle
  out('G09 toc block', vp, await p.evaluate(() => { const d = document.querySelector('details.toc'); const o0 = d.open; d.querySelector('summary').click(); return { openInitially: o0, afterClick: d.open, items: [...d.querySelectorAll('.aToc a')].map((a) => a.textContent) }; }));
  // sticky tabs: position of tab bar stays visible after scrolling past the first tab's start
  out('G07 sticky', vp, await p.evaluate(() => { const t = document.querySelector('.tabs.stick'); const bar = t.querySelector(':scope > div'); const cs = getComputedStyle(bar); return { cls: t.className, position: cs.position, top: cs.top }; }));
  await p._ctx.close();
}
wp(`wp_delete_post(${id},true);`);
// G12: every pattern renders through the block renderer without notices and with output
out('G12 render', 'php', wp(`$r=WP_Block_Patterns_Registry::get_instance();$o=[];foreach($r->get_all_registered() as $p){if(!in_array('wplus-ui',(array)($p['categories']??[]),true))continue;ob_start();$h=do_blocks($p['content']);$n=ob_get_clean();$o[]=str_replace('wplus-ui/','',$p['name']).':'.strlen(wp_strip_all_tags($h)).($n?'!notice':'');}echo implode(' ',$o);`));
// F02: footer menu through the theme location (no Customizer menu chosen)
const fm = JSON.parse(wp(`$m=wp_create_nav_menu('Uji lokasi footer');foreach(['Satu','Dua'] as $t)wp_update_nav_menu_item($m,0,['menu-item-title'=>$t,'menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#']);$loc=get_nav_menu_locations();update_option('wplusui_test_loc',$loc);$loc['footer-2']=$m;set_theme_mod('nav_menu_locations',$loc);$sw=get_option('sidebars_widgets');update_option('wplusui_test_sw',$sw);$sw['footer-2']=[];update_option('sidebars_widgets',$sw);echo json_encode($m);`));
const savedMenus = JSON.parse(wp(`echo json_encode(['m2'=>get_theme_mod('wplusui_footer_menu_2',null)]);`));
mods({ wplusui_footer_menu_2: null });
for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp); await p.evaluate(() => scrollTo(0, 1e6)); out('F02 location', vp, await p.evaluate(() => [...document.querySelectorAll('#sec_Footer_Widgets > .widget')].map((w) => w.id + ':' + w.querySelector('.title')?.textContent + ':' + [...w.querySelectorAll('li')].map((l) => l.textContent.trim()).join('/')))); await p._ctx.close(); }
wp(`set_theme_mod('nav_menu_locations',get_option('wplusui_test_loc'));update_option('sidebars_widgets',get_option('wplusui_test_sw'));delete_option('wplusui_test_loc');delete_option('wplusui_test_sw');wp_delete_nav_menu(${fm});`);
mods({ wplusui_footer_menu_2: savedMenus.m2 });
await close();
