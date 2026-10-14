// F01-F07: footer text, columns (menus/widgets/titles/fill from right), copyright, social, widget areas; restores the dev settings.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close } = L;
await launch();
const keys = ['wplusui_footer_about','wplusui_footer_copyright',...[1,2,3,4].flatMap((c)=>['wplusui_footer_menu_'+c,'wplusui_footer_title_'+c]),'wplusui_social_facebook','wplusui_social_instagram','wplusui_social_twitter','wplusui_social_threads','wplusui_social_bluesky','wplusui_social_whatsapp','wplusui_social_youtube'];
const saved = JSON.parse(wp(`$o=[];foreach(json_decode('${JSON.stringify(keys)}') as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const sw = wp(`echo json_encode(get_option('sidebars_widgets'));`); const textw = wp(`echo json_encode(get_option('widget_text'));`);
const none = Object.fromEntries(keys.map((k) => [k, null]));
const foot = () => ({
  about: document.querySelector('.abtD')?.textContent,
  name: document.querySelector('.abtT h2')?.textContent,
  cols: [...document.querySelectorAll('#sec_Footer_Widgets > .widget')].map((w) => ({ id: w.id, title: w.querySelector('.title')?.textContent, links: w.querySelectorAll('li').length, x: Math.round(w.getBoundingClientRect().x), w: Math.round(w.getBoundingClientRect().width) })),
  social: [...document.querySelectorAll('.fotS a')].map((a) => a.getAttribute('aria-label') + '>' + a.getAttribute('href')),
  credit: document.querySelector('.credit')?.textContent.replace(/\s+/g, ' ').trim(),
  creator: document.querySelector('.creator')?.textContent.replace(/\s+/g, ' ').trim(),
  over: document.documentElement.scrollWidth > innerWidth + 1,
});
const run = async (tag) => { for (const vp of ['desktop', 'mobile']) { const p = await open('/?page_id=44', vp); await p.evaluate(() => scrollTo(0, 1e6)); out(tag, vp, await p.evaluate(foot)); await p._ctx.close(); } };
mods(none);
wp(`update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['footer-1'=>[],'footer-2'=>[],'footer-3'=>[],'footer-4'=>[]]));`);
await run('F defaults (nothing set)');
mods({ wplusui_footer_about: 'Tentang situs uji', wplusui_footer_copyright: '© {year} Uji Bersama', wplusui_footer_menu_1: 14, wplusui_footer_menu_3: 13, wplusui_footer_title_1: 'Tautan', wplusui_social_facebook: 'https://facebook.com/uji', wplusui_social_youtube: 'https://youtube.com/uji' });
await run('F set 2 menus');
mods({ wplusui_footer_menu_2: 14, wplusui_footer_menu_4: 13 });
await run('F set 4 menus');
// widget column: footer-2 gets a text widget when no menu is chosen
mods({ wplusui_footer_menu_2: null, wplusui_footer_menu_1: null, wplusui_footer_menu_3: null, wplusui_footer_menu_4: null });
wp(`update_option('widget_text',[7=>['title'=>'Widget uji','text'=>'Isi widget','filter'=>false],'_multiwidget'=>1]);update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['footer-2'=>['text-7']]));`);
await run('F widget col 2');
// sidebar-1 widget under Popular Posts
wp(`update_option('widget_text',[8=>['title'=>'Widget sidebar','text'=>'Isi sidebar','filter'=>false],'_multiwidget'=>1]);update_option('sidebars_widgets',array_merge(get_option('sidebars_widgets'),['sidebar-1'=>['text-8']]));`);
for (const vp of ['desktop', 'mobile']) { const p = await open('/?p=26', vp); out('F07 sidebar', vp, await p.evaluate(() => { const t = [...document.querySelectorAll('aside.sideB .widget')].map((w) => (w.querySelector('.title')?.textContent || w.className).trim()); return t; })); await p._ctx.close(); }
// restore
mods({ ...none, ...Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== null)) });
wp(`update_option('sidebars_widgets',json_decode('${sw.replace(/'/g, "\\'")}',true));update_option('widget_text',json_decode('${textw.replace(/'/g, "\\'")}',true));`);
await close();
