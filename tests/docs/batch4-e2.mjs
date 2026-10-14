// E02 (icon count), E03 'open' class, E06 quick links (on/off, active underline), E07 flyout of the collapsed rail.
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
await launch();
wp(`if(get_option('wplusui_test_oldloc')){set_theme_mod('nav_menu_locations',get_option('wplusui_test_oldloc'));delete_option('wplusui_test_oldloc');}wp_delete_nav_menu('Uji batch4');`);
out('E02 library', 'php', wp(`$l=wplusui_nav_icon_library();echo count($l),' ',implode(',',array_slice(array_keys($l),0,6));`));
const mid = +wp(`
$m=wp_create_nav_menu('Uji batch4');
$a=function($t,$args)use($m){return wp_update_nav_menu_item($m,0,array_merge(['menu-item-title'=>$t,'menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#'],$args));};
for($i=0;$i<4;$i++)$a('Item '.$i,[]);
$o=$a('Buka kelas',['menu-item-classes'=>'open']);$a('k1',['menu-item-parent-id'=>$o]);
$t=$a('Tinggi',[]);for($i=1;$i<=16;$i++)$a('Anak '.$i,['menu-item-parent-id'=>$t]);
$loc=get_nav_menu_locations();update_option('wplusui_test_oldloc',$loc);$loc['primary']=$m;set_theme_mod('nav_menu_locations',$loc);echo $m;`);
let p = await open('/?page_id=44', 'desktop');
out('E03 class open', 'desktop', await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Buka kelas/.test(l.textContent)); return li.querySelector(':scope > input').checked; }));
// collapsed rail (JS closed state): hover the tall item
const state = await p.evaluate(() => ({ navChecked: document.getElementById('forNavigation')?.checked, railW: Math.round(document.querySelector('.mainN .mnBrs, .mnBr')?.getBoundingClientRect().width) }));
const pos = await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Tinggi/.test(l.textContent)); const r = li.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
await p.mouse.move(pos[0], pos[1]); await sleep(700);
out('E07', 'desktop', { state, flyout: await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Tinggi/.test(l.textContent)); const ul = li.querySelector(':scope > ul'); const r = ul.getBoundingClientRect(); return { pos: getComputedStyle(ul).position, top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight, overflowY: getComputedStyle(ul).overflowY, scrollable: ul.scrollHeight > ul.clientHeight }; }) });
await p.screenshot({ path: '/tmp/e7.png' });
await p._ctx.close();
wp(`set_theme_mod('nav_menu_locations',get_option('wplusui_test_oldloc'));delete_option('wplusui_test_oldloc');wp_delete_nav_menu(${mid});`);
// E06 quick links
for (const vp of ['desktop', 'mobile']) {
  p = await open('/?cat=2', vp);
  out('E06 on', vp, await p.evaluate(() => { const ul = document.querySelector('.mainC ~ *, .qLnk, .quickLinks, #LinkList01') ; const links = [...document.querySelectorAll('a')].filter((a) => /^Link 0\d$|^Documentation$/.test(a.textContent.trim())).map((a) => [a.textContent.trim(), a.className, getComputedStyle(a).borderBottomWidth || '', a.closest('li,div')?.className]); return links.slice(0, 3); }));
  await p.screenshot({ path: `/tmp/e6-${vp}.png`, clip: { x: 0, y: 0, width: vp === 'desktop' ? 1280 : 390, height: 260 } });
  await p._ctx.close();
}
wp(`$l=get_nav_menu_locations();update_option('wplusui_test_ql',$l);unset($l['quicklinks']);set_theme_mod('nav_menu_locations',$l);`);
p = await open('/?cat=2', 'desktop');
out('E06 off', 'desktop', await p.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /^Link 0\d$/.test(a.textContent.trim())).length));
await p._ctx.close();
wp(`set_theme_mod('nav_menu_locations',get_option('wplusui_test_ql'));delete_option('wplusui_test_ql');`);
await close();
