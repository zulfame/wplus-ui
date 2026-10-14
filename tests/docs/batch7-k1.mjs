// K01-K05: critical CSS (inline + async full CSS), min assets, WebP subsizes, local images, runtime scripts.
import * as L from './lib.mjs';
import { execFileSync } from 'child_process';
import fs from 'fs';
const { wp, mods, open, out, launch, close, base, VP } = L;
const b = await launch();
const saved = JSON.parse(wp(`echo json_encode(['box'=>get_theme_mod('wplusui_box_design',null)]);`));
const html = async (u) => (await (await fetch(base + u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } })).text());
const info = (h) => ({
  critical: (h.match(/<style id="wplusui-critical">([\s\S]*?)<\/style>/)?.[1].length ?? 0),
  firstInHead: h.indexOf('<style id="wplusui-critical">') < h.indexOf('<link'),
  css: [...h.matchAll(/<link[^>]*wplusui-style[^>]*>/g)].map((m) => (/rel='preload'/.test(m[0]) ? 'preload+onload' : 'blocking') + ' ' + m[0].match(/style[^"']*\.css/)?.[0]),
  noscript: /<noscript><link[^>]*wplusui-style/.test(h),
  js: [...h.matchAll(/<script[^>]*src="[^"]*(script[^"]*\.js)/g)].map((m) => m[1]).join(','),
});
for (const box of [false, true]) {
  mods({ wplusui_box_design: box });
  for (const [n, u] of Object.entries({ home: '/', single: '/?p=26', page: '/?page_id=44', archive: '/?cat=2', search: '/?s=Navigation' })) out('K01 box=' + box + ' ' + n, 'html', info(await html(u)));
}
mods({ wplusui_box_design: saved.box });
// without the full stylesheet the first screen is already styled (critical only)
for (const vp of ['desktop', 'mobile']) {
  const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP[vp]);
  await p.setRequestInterception(true);
  p.on('request', (r) => (/wplusui-style|style(\.min)?\.css/.test(r.url()) && !/critical/.test(r.url()) ? r.abort() : r.continue()));
  await p.goto(base + '/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1500));
  out('K01 critical only', vp, await p.evaluate(() => ({ headerH: Math.round(document.querySelector('header')?.getBoundingClientRect().height), bodyBg: getComputedStyle(document.body).backgroundColor, h2: getComputedStyle(document.querySelector('h2, h3')).fontSize })));
  await p.screenshot({ path: `/tmp/k1-${vp}.png` });
  await ctx.close();
}
// full CSS applies after load
{ const p = await open('/', 'desktop'); out('K01 after load', 'desktop', await p.evaluate(() => [...document.querySelectorAll('link[id^="wplusui-style"]')].map((l) => l.rel))); await p._ctx.close(); }
// K02: SCRIPT_DEBUG switches to the readable files
const dbg = (c) => execFileSync('php', ['-r', `${c}$_SERVER["HTTP_HOST"]="127.0.0.1:8091";$_SERVER["REQUEST_URI"]="/";require "${L.root}/wp-load.php";wp();ob_start();do_action("wp_head");wp_print_scripts();do_action("wp_footer");$h=ob_get_clean();preg_match_all("~(style|script)[^\\"\\x27 ]*\\\\.(css|js)~",$h,$m);echo implode(" ",array_unique($m[0]));`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
out('K02 normal', 'php', dbg(''));
out('K02 SCRIPT_DEBUG', 'php', dbg('define("SCRIPT_DEBUG",true);'));
// K03 WebP sub-sizes: sideload a JPEG
const jpg = '/tmp/uji-webp.jpg';
execFileSync('php', ['-r', `$i=imagecreatetruecolor(1600,900);imagefill($i,0,0,imagecolorallocate($i,200,80,40));imagejpeg($i,"${jpg}",85);`]);
out('K03', 'php', wp(`require_once ABSPATH.'wp-admin/includes/image.php';require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/media.php';wp_set_current_user(1);$f=['name'=>'uji-webp.jpg','tmp_name'=>'${jpg}'];copy('${jpg}','/tmp/uji-webp-copy.jpg');$f['tmp_name']='/tmp/uji-webp-copy.jpg';$id=media_handle_sideload($f,0);$m=wp_get_attachment_metadata($id);echo 'files=',implode('|',array_map('basename',glob(dirname(get_attached_file($id)).'/uji-webp*'))),' orig=',basename($m['file']),' sizes=',implode(',',array_map(fn($s)=>$s['file'].'('.$s['mime-type'].')',array_slice($m['sizes'],0,3))),' srcset-ok=',(int)(strpos((string)wp_get_attachment_image($id,'large'),'.webp')!==false);update_option('wplusui_test_att',$id);`));
// K04/K05
const att = +wp(`echo get_option('wplusui_test_att');`);
const imgUrl = wp(`echo wp_get_attachment_url(${att});`);
const content = `<!-- wp:html --><img src="${imgUrl}" alt="lokal"><!-- /wp:html -->\n<!-- wp:html --><script>(function(PU, window, document){window.xRan = (typeof PU) + ':' + (document.currentScript ? 'cs' : 'nocs');})(PU, window, document);</script><!-- /wp:html -->\n<!-- wp:image --><figure class="wp-block-image"><img src="${imgUrl}" alt="b"/></figure><!-- /wp:image -->`;
const pid = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji K','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(content).toString('base64')}')]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + pid, vp, { wait: 2500 });
  out('K04/K05', vp, await p.evaluate(() => ({ imgs: [...document.querySelectorAll('#postBody img')].map((i) => ({ loading: i.loading, w: i.getAttribute('width'), h: i.getAttribute('height') })), ran: window.xRan })));
  await p._ctx.close();
}
wp(`wp_delete_post(${pid},true);wp_delete_attachment(${att},true);delete_option('wplusui_test_att');`);
fs.rmSync(jpg, { force: true });
await close();
