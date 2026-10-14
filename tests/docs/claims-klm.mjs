// K01 off in the Customizer preview; L04 child theme: values already set on the child win, menus and widgets follow; dev state restored.
import * as L from './lib.mjs';
import fs from 'fs';
const { wp, mods, open, launch, close, claim, summary, sleep, base, VP } = L;
const b = await launch();
// K01: Customizer preview prints no critical CSS and loads the full stylesheet normally
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
{ const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP.desktop); await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
  await p.goto(base + '/', { waitUntil: 'networkidle0' }); const site = await p.evaluate(() => ({ crit: !!document.getElementById('wplusui-critical') }));
  await p.goto(base + '/wp-admin/customize.php?url=' + encodeURIComponent(base + '/'), { waitUntil: 'domcontentloaded', timeout: 90000 }); await sleep(9000);
  const fr = p.frames().find((f) => f.url().includes('customize_changeset_uuid') || f.url().includes('customize_messenger')); const prev = fr ? await fr.evaluate(() => ({ crit: !!document.getElementById('wplusui-critical'), css: [...document.querySelectorAll('link[rel=stylesheet]')].some((l) => /style\.min\.css/.test(l.href)) })) : null;
  claim('K01', 'situs memakai CSS kritis inline; pratinjau Customizer tidak, dengan stylesheet penuh langsung', site.crit && prev && !prev.crit && prev.css, { site, prev }); await ctx.close(); }
// L04: child values win
const bk = JSON.parse(wp(`echo json_encode(['sw'=>get_option('sidebars_widgets'),'tm'=>get_option('theme_mods_wplus-ui'),'cn'=>get_option('current_theme')]);`));
try {
  wp(`delete_option('wplusui_child_mods_copied');update_option('theme_mods_wplus-ui-child',['wplusui_default_scheme'=>3]);set_theme_mod('wplusui_default_scheme',8);switch_theme('wplus-ui-child');`);
  await fetch(base + '/', { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } });
  const r = JSON.parse(wp(`$c=get_option('theme_mods_wplus-ui-child');echo json_encode(['scheme'=>$c['wplusui_default_scheme']??null,'carousel'=>array_key_exists('wplusui_notification_cta_text',$c),'menus'=>$c['nav_menu_locations']??null,'copied'=>get_option('wplusui_child_mods_copied')]);`));
  claim('L04', 'nilai yang sudah ada di child (skema 3) menang atas induk (8); pengaturan lain tersalin; menu ikut', r.scheme === 3 && r.carousel && r.menus?.primary && String(r.copied) === '1', r);
  for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp); const q = await p.evaluate(() => ({ scheme: document.documentElement.className.match(/cs\d+/)?.[0], child: [...document.querySelectorAll('link')].some((l) => /wplus-ui-child\/style\.css/.test(l.href)), menu: document.querySelectorAll('.mnMn > li').length, widgets: document.querySelectorAll('aside.sideB .widget').length })); claim('L04 ' + vp, 'situs dengan child: skema 3, stylesheet child dimuat, menu dan widget tampil', q.scheme === 'cs3' && q.child && q.menu > 0 && q.widgets > 0, q); await p._ctx.close(); }
} finally {
  fs.writeFileSync('/tmp/l4k.json', JSON.stringify(bk));
  wp(`$b=json_decode(file_get_contents('/tmp/l4k.json'),true);switch_theme('wplus-ui');update_option('sidebars_widgets',$b['sw']);update_option('theme_mods_wplus-ui',$b['tm']);delete_option('theme_mods_wplus-ui-child');delete_option('wplusui_child_mods_copied');update_option('current_theme',$b['cn']);`);
  fs.rmSync('/tmp/l4k.json', { force: true });
  await close();
}
summary();
