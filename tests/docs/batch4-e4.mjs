// E02/E03: the fields in Appearance > Menus save the icon, options and badge (admin session by locally generated cookie).
import * as L from './lib.mjs';
const { wp, out, launch, close, sleep, VP, base } = L;
const b = await launch();
wp(`wp_delete_nav_menu('Uji admin');`);
const [mid, item] = wp(`$m=wp_create_nav_menu('Uji admin');$i=wp_update_nav_menu_item($m,0,['menu-item-title'=>'Uji','menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#']);echo $m,' ',$i;`).split(' ').map(Number);
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
for (const vp of ['desktop', 'mobile']) {
  const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP[vp]);
  await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
  await p.goto(`${base}/wp-admin/nav-menus.php?action=edit&menu=${mid}`, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.querySelector('.item-edit').click()); await sleep(400);
  const icons = await p.evaluate(() => document.querySelectorAll('select[name^="menu-item-wplusui-icon"] option').length);
  await p.select(`select[name="menu-item-wplusui-icon[${item}]"]`, vp === 'desktop' ? 'mail' : 'none');
  await p.evaluate((i) => { document.querySelectorAll(`input[name="menu-item-wplusui-flag[${i}][]"]`).forEach((c) => { c.checked = c.value === 'dot' || c.value === 'divider'; }); }, item);
  await p.select(`select[name="menu-item-wplusui-badge[${item}]"]`, 'free');
  await Promise.all([p.waitForNavigation({ waitUntil: 'networkidle0' }), p.evaluate(() => document.querySelector('#save_menu_header, #save_menu_footer').click())]);
  out('E02/E03 admin', vp, { optionsInSelect: icons, icon: wp(`echo get_post_meta(${item},'_wplusui_menu_icon',true);`), flags: wp(`echo implode(',',(array)get_post_meta(${item},'_wplusui_menu_flags',true));`), badge: wp(`echo get_post_meta(${item},'_wplusui_menu_badge',true);`) });
  if (vp === 'desktop') await p.screenshot({ path: '/tmp/e4.png' });
  await ctx.close();
}
wp(`wp_delete_nav_menu(${mid});`);
await close();
