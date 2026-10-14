// M01 demo XML contents, M02 finishing the demo is safe to run twice (snapshot before/after, restored if it changes anything).
import * as L from './lib.mjs';
import fs from 'fs';
const { wp, out, root } = L;
const xml = fs.readFileSync(root + '/wp-content/themes/wplus-ui/demo-content/wplus-ui-demo-content.xml', 'utf8');
const count = (t) => [...xml.matchAll(new RegExp(`<wp:post_type><!\\[CDATA\\[${t}\\]\\]>`, 'g'))].length;
out('M01', 'xml', { posts: count('post'), pages: count('page'), menuItems: count('nav_menu_item'), images: fs.readdirSync(root + '/wp-content/themes/wplus-ui/demo-content/images').length, validXml: /<\/rss>\s*$/.test(xml) });
out('M01 importer', 'php', wp(`foreach(glob(WP_PLUGIN_DIR.'/wordpress-importer/parsers/class-*.php') as $f)require_once $f;$r=(new WXR_Parser())->parse(get_template_directory().'/demo-content/wplus-ui-demo-content.xml');if(is_wp_error($r)){echo 'ERR';exit;}$t=[];foreach($r['posts'] as $x)$t[$x['post_type']]=($t[$x['post_type']]??0)+1;echo json_encode(['parsed'=>$t,'cats'=>count($r['categories']),'tags'=>count($r['tags'])]);`));
const snap = () => wp(`$o=['mods'=>get_option('theme_mods_wplus-ui'),'sw'=>get_option('sidebars_widgets'),'posts'=>wp_count_posts()->publish,'pages'=>wp_count_posts('page')->publish,'att'=>wp_count_posts('attachment')->inherit,'menus'=>count(wp_get_nav_menus()),'items'=>array_sum(array_map(fn($m)=>count(wp_get_nav_menu_items($m)),wp_get_nav_menus())),'sticky'=>get_option('sticky_posts'),'thumbs'=>count(get_posts(['meta_key'=>'_thumbnail_id','numberposts'=>-1,'fields'=>'ids']))];echo md5(serialize($o)),' ',json_encode(array_diff_key($o,['mods'=>1,'sw'=>1]));`);
const before = snap();
wp(`wp_set_current_user(1);require_once get_template_directory().'/inc/demo-setup.php';wplusui_demo_run_setup();`);
const once = snap();
wp(`wp_set_current_user(1);require_once get_template_directory().'/inc/demo-setup.php';wplusui_demo_run_setup();`);
const twice = snap();
out('M02', 'php', { before, once, twice, sameAfterTwo: once === twice });
