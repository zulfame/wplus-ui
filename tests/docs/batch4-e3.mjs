// E07: in a short window a tall flyout is limited to the window and scrolls.
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep, VP } = L;
await launch();
const mid = +wp(`$m=wp_create_nav_menu('Uji batch4');$a=function($t,$args)use($m){return wp_update_nav_menu_item($m,0,array_merge(['menu-item-title'=>$t,'menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#'],$args));};
$a('Satu',[]);$t=$a('Tinggi',[]);for($i=1;$i<=16;$i++)$a('Anak '.$i,['menu-item-parent-id'=>$t]);
$loc=get_nav_menu_locations();update_option('wplusui_test_oldloc',$loc);$loc['primary']=$m;set_theme_mod('nav_menu_locations',$loc);echo $m;`);
VP.short = { width: 1280, height: 420, deviceScaleFactor: 1 };
const p = await open('/?page_id=44', 'short');
const pos = await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Tinggi/.test(l.textContent)); const r = li.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
await p.mouse.move(pos[0], pos[1]); await sleep(700);
out('E07 short', 'desktop', await p.evaluate(() => { const li = [...document.querySelectorAll('.mnMn > li')].find((l) => /Tinggi/.test(l.textContent)); const ul = li.querySelector(':scope > ul'); const r = ul.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight, scrollable: ul.scrollHeight > ul.clientHeight, overflowY: getComputedStyle(ul).overflowY }; }));
await p._ctx.close();
wp(`set_theme_mod('nav_menu_locations',get_option('wplusui_test_oldloc'));delete_option('wplusui_test_oldloc');wp_delete_nav_menu(${mid});`);
await close();
