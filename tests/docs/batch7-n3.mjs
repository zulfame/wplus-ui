// N01 in dark mode: placeholders keep contrast (screenshot of home with posts without image).
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close } = L;
await launch();
const old = wp(`echo json_encode(get_theme_mod('wplusui_default_mode',null));`);
const ids = JSON.parse(wp(`$o=[];for($i=1;$i<=3;$i++)$o[]=wp_insert_post(['post_title'=>'Tanpa gambar '.$i,'post_status'=>'publish','post_category'=>[2],'post_content'=>'Isi','post_date'=>date('Y-m-d H:i:s',time()-$i)]);echo json_encode($o);`));
mods({ wplusui_default_mode: 'dark' });
for (const vp of ['desktop', 'mobile']) { const p = await open('/?cat=2', vp, { wait: 2000 }); out('N01 dark', vp, await p.evaluate(() => { const e = document.querySelector('.plcH'); return { cls: document.body.className.includes('drK') || document.documentElement.className.includes('drK'), bg: getComputedStyle(document.body).backgroundColor, ph: getComputedStyle(e).backgroundImage.slice(0, 70) }; })); await p.screenshot({ path: `/tmp/n3-${vp}.png` }); await p._ctx.close(); }
mods({ wplusui_default_mode: JSON.parse(old) });
wp(`foreach(${JSON.stringify(ids)} as $i)wp_delete_post($i,true);`);
await close();
