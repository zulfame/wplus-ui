// N01 placeholder thumbnails (cards, popular, carousel, pinned, 4 variants, dark) and N02 short date on cards.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close } = L;
await launch();
const ids = JSON.parse(wp(`$o=[];for($i=1;$i<=5;$i++){$o[]=wp_insert_post(['post_title'=>'Tanpa gambar '.$i,'post_status'=>'publish','post_category'=>[2],'post_content'=>'Isi '.$i,'post_date'=>date('Y-m-d H:i:s',time()-$i)]);}wp_set_post_tags($o[0],['featured']);echo json_encode($o);`));
const probe = () => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const ph = [...document.querySelectorAll('.plcH')];
  return { count: ph.length, visible: ph.filter(vis).length, variants: [...new Set(ph.map((e) => (e.className.match(/plcV\d/) || [''])[0]))].sort().join(','), where: [...new Set(ph.map((e) => e.closest('.sldW, .pinned, .pnPs, .popP, .itmPs, .ntry, #HTML_pop')?.className?.split(' ')[0] || '?'))].join(','), bg: ph[0] && getComputedStyle(ph[0]).backgroundImage.slice(0, 40), txt: ph[0] && getComputedStyle(ph[0], '::after').content, dates: [...document.querySelectorAll('.ntry time, .ntry .pbl, .ntry .upd')].slice(0, 3).map((t) => (t.dataset.time || t.textContent).trim()) };
};
for (const scheme of ['light', 'dark']) for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp, { scheme, wait: 2000 }); out('N01 home ' + scheme, vp, await p.evaluate(probe)); if (scheme === 'light') await p.screenshot({ path: `/tmp/n1-${vp}.png` }); await p._ctx.close(); }
for (const vp of ['desktop', 'mobile']) { const p = await open('/?cat=2', vp); out('N01 archive', vp, await p.evaluate(probe)); await p._ctx.close(); }
// N02 date on cards of the demo posts: short form
for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp); out('N02', vp, await p.evaluate(() => [...document.querySelectorAll('.ntry')].slice(0, 6).map((n) => (n.querySelector('.pDt, time')?.textContent || '').trim().replace(/\s+/g, ' ')).filter(Boolean).slice(0, 4))); await p._ctx.close(); }
wp(`foreach(${JSON.stringify(ids)} as $i)wp_delete_post($i,true);`);
await close();
