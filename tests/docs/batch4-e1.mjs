// E01-E05, E08: a temporary menu on the Primary location covers icons, options, divider, groups, active item and fallback.
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
await launch();
wp(`if(get_option('wplusui_test_oldloc')){set_theme_mod('nav_menu_locations',get_option('wplusui_test_oldloc'));delete_option('wplusui_test_oldloc');}wp_delete_nav_menu('Uji batch4');`);
const setup = wp(`
$m=wp_create_nav_menu('Uji batch4');
$a=function($t,$args)use($m){return wp_update_nav_menu_item($m,0,array_merge(['menu-item-title'=>$t,'menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#'],$args));};
$home=$a('Beranda',['menu-item-url'=>home_url('/')]);update_post_meta($home,'_wplusui_menu_icon','home');
$par=$a('Induk',[]); update_post_meta($par,'_wplusui_menu_flags',['open','dot']);
$a('Anak satu',['menu-item-parent-id'=>$par]);
$a('Anak dua',['menu-item-parent-id'=>$par]);
$nov=$a('Tanpa ikon',[]);update_post_meta($nov,'_wplusui_menu_icon','none');
$a('---',[]);
$bd=$a('Berbadge',[]);update_post_meta($bd,'_wplusui_menu_badge','new');update_post_meta($bd,'_wplusui_menu_flags',['divider']);
$grp=$a('More...',[]);update_post_meta($grp,'_wplusui_menu_flags',['group']);
$a('Dalam grup',['menu-item-parent-id'=>$grp]);
$pp=$a('Induk aktif',[]);
$a('Halaman About',['menu-item-type'=>'post_type','menu-item-object'=>'page','menu-item-object-id'=>44,'menu-item-url'=>'','menu-item-parent-id'=>$pp]);
$loc=get_nav_menu_locations();update_option('wplusui_test_oldloc',$loc);$loc['primary']=$m;set_theme_mod('nav_menu_locations',$loc);echo $m;`);
const mid = +setup;
const dump = () => ({
  top: [...document.querySelectorAll('.mnMn > li')].map((li) => ({ t: (li.querySelector(':scope > a, :scope > label')?.textContent || li.getAttribute('role') || '').trim().replace(/\s+/g, ' '), cls: li.className, svg: !!li.querySelector(':scope > a > svg, :scope > label > svg'), checked: li.querySelector(':scope > input')?.checked ?? null, badge: li.querySelector('.new,.free')?.className ?? null, kids: li.querySelectorAll(':scope > ul > li').length })),
});
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?page_id=44', vp);
  out('E01-E05', vp, await p.evaluate(dump));
  // dropdown works without JS: toggle checkbox via its label
  const tog = await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Induk aktif/.test(l.textContent)); const cb = li.querySelector(':scope > input'); const before = cb.checked; li.querySelector(':scope > label').click(); return [before, cb.checked]; });
  out('E01 toggle', vp, tog);
  await p._ctx.close();
}
// without JS: the page still lets menus open (checkbox based) -> CSS only; check checkbox + sibling ul rule exists via computed style when checked
const p = await open('/?page_id=44', 'desktop');
out('E01 nojs-css', 'desktop', await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Induk aktif/.test(l.textContent)); const ul = li.querySelector(':scope > ul'); const cb = li.querySelector(':scope > input'); cb.checked = false; const a = getComputedStyle(ul).display + '/' + getComputedStyle(ul).maxHeight; cb.checked = true; const b = getComputedStyle(ul).display + '/' + getComputedStyle(ul).maxHeight; return [a, b]; }));
await p._ctx.close();
// E08 fallback: no menu on Primary
wp(`set_theme_mod('nav_menu_locations',['primary'=>0,'quicklinks'=>get_option('wplusui_test_oldloc')['quicklinks']??0]);`);
for (const vp of ['desktop', 'mobile']) {
  const q = await open('/?page_id=44', vp);
  out('E08', vp, await q.evaluate(() => [...document.querySelectorAll('.mnMn > li')].map((l) => l.textContent.trim().replace(/\s+/g, ' '))));
  await q._ctx.close();
}
wp(`set_theme_mod('nav_menu_locations',get_option('wplusui_test_oldloc'));delete_option('wplusui_test_oldloc');wp_delete_nav_menu(${mid});`);
await close();
