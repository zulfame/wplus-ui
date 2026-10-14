// N01: placeholders also in the Pinned Post box and Popular Posts.
import * as L from './lib.mjs';
const { wp, open, out, launch, close } = L;
await launch();
const old = JSON.parse(wp(`echo json_encode(get_option('sticky_posts'));`));
const id = +wp(`$i=wp_insert_post(['post_title'=>'Pin tanpa gambar','post_status'=>'publish','post_category'=>[2],'post_content'=>'Isi']);update_post_meta($i,'wplusui_views',999999);update_option('sticky_posts',[$i]);echo $i;`);
for (const scheme of ['light', 'dark']) for (const vp of ['desktop', 'mobile']) {
  const p = await open('/', vp, { scheme, wait: 2000 });
  out('N01 pin+popular ' + scheme, vp, await p.evaluate(() => ({ pinned: !!document.querySelector('[id*=Pinned] .plcH, .pinP .plcH, .pnPs .plcH'), popular: [...document.querySelectorAll('aside .plcH, .popP .plcH, #popular .plcH')].length, all: [...document.querySelectorAll('.plcH')].map((e) => e.parentElement.className.split(' ')[0] + '>' + (e.closest('[id]')?.id || '')).slice(0, 6) })));
  if (vp === 'desktop') await p.screenshot({ path: `/tmp/n2-${scheme}.png` });
  await p._ctx.close();
}
wp(`wp_delete_post(${id},true);update_option('sticky_posts',${JSON.stringify(old)});`);
await close();
