// L02 multilingual (stub Polylang / WPML functions), L04 child theme activation copies settings (dev state restored), L05 pot freshness.
import * as L from './lib.mjs';
import { execFileSync } from 'child_process';
import fs from 'fs';
const { wp, mods, open, out, launch, close, root, base } = L;
const run = (pre, code) => execFileSync('php', ['-d', 'display_errors=0', '-r', `${pre}$_SERVER["HTTP_HOST"]="127.0.0.1:8091";require "${root}/wp-load.php";${code}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('\n').pop();
const nt = JSON.parse(wp(`echo json_encode(get_theme_mod('wplusui_notification_text',null));`));
mods({ wplusui_notification_text: 'Halo dunia', wplusui_popular_title: 'Terpopuler', wplusui_related_title: 'Terkait' });
out('L02 plain', 'php', run('', 'echo get_theme_mod("wplusui_notification_text"),"|",get_theme_mod("wplusui_popular_title");'));
out('L02 polylang', 'php', run('$GLOBALS["reg"]=[];function pll_register_string($n,$v,$g){$GLOBALS["reg"][]=$g.":".$v;}function pll__($s){return "PLL(".$s.")";}', 'do_action("init");echo "\n",get_theme_mod("wplusui_notification_text"),"|",get_theme_mod("wplusui_popular_title"),"|reg=",count($GLOBALS["reg"]);'));
out('L02 wpml', 'php', run('', 'add_filter("wpml_translate_single_string",function($v,$ctx,$name){return "WPML[$ctx](".$v.")";},10,3);echo "\n",get_theme_mod("wplusui_notification_text"),"|",get_theme_mod("wplusui_related_title");'));
mods({ wplusui_notification_text: nt, wplusui_popular_title: null, wplusui_related_title: null });
// L04: WordPress runs after_switch_theme on the next request, so load a page after switching
const bk = JSON.parse(wp(`echo json_encode(['sw'=>get_option('sidebars_widgets'),'tm'=>get_option('theme_mods_wplus-ui'),'cn'=>get_option('current_theme')]);`));
try {
  wp(`switch_theme("wplus-ui-child");`);
  await fetch(base + '/', { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } });
  out('L04 copy', 'php', wp(`$c=get_option("theme_mods_wplus-ui-child");$p=get_option("theme_mods_wplus-ui");echo "active=",get_option("stylesheet")," copied=",get_option("wplusui_child_mods_copied")," child=",count($c)," parent=",count($p)," missing_in_child=",count(array_diff_key($p,$c))," menus=",json_encode($c["nav_menu_locations"]??null);`));
  await launch();
  for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp); out('L04 child front', vp, await p.evaluate(() => ({ menu: document.querySelectorAll('.mnMn > li').length, css: [...document.querySelectorAll('link[rel=stylesheet],link[rel=preload][as=style]')].map((l) => l.href.split('/themes/')[1]?.split('?')[0]).filter(Boolean).join(','), widgets: document.querySelectorAll('aside.sideB .widget').length }))); await p._ctx.close(); }
  await close();
} finally {
  fs.writeFileSync('/tmp/l4-bk.json', JSON.stringify(bk));
  out('L04 restore', 'php', wp(`$b=json_decode(file_get_contents('/tmp/l4-bk.json'),true);switch_theme('wplus-ui');update_option('sidebars_widgets',$b['sw']);update_option('theme_mods_wplus-ui',$b['tm']);delete_option('theme_mods_wplus-ui-child');delete_option('wplusui_child_mods_copied');update_option('current_theme',$b['cn']);echo get_option('stylesheet'),' widgets_ok=',(int)(get_option('sidebars_widgets')==$b['sw']);`));
  fs.rmSync('/tmp/l4-bk.json', { force: true });
}
// L05 every translatable string of the theme is in the .pot
const pot = fs.readFileSync(root + '/wp-content/themes/wplus-ui/languages/wplus-ui.pot', 'utf8');
const ids = new Set([...pot.matchAll(/^msgid "(.*)"$/gm)].map((m) => m[1]));
const missing = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const f = d + '/' + e.name; if (e.isDirectory()) { if (!['node_modules', 'demo-content', 'languages'].includes(e.name)) walk(f); } else if (/\.php$/.test(e.name) || e.name === 'editor.js') for (const m of fs.readFileSync(f, 'utf8').matchAll(/\b(?:__|_e|esc_html__|esc_attr__|esc_html_e|esc_attr_e)\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'wplus-ui'\s*\)/g)) { const s = m[1].replace(/\\'/g, "'").replace(/"/g, '\\"'); if (!ids.has(s)) missing.push(s); } });
walk(root + '/wp-content/themes/wplus-ui');
out('L05 pot', 'node', { entries: ids.size, missing: missing.length, sample: missing.slice(0, 3) });
