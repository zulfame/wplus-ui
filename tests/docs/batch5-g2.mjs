// G07 tab switching, G10 lazy YouTube click, G05 details toggling, G11 code block, G12 patterns, G14 shortcode limits.
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
await launch();
const id = +wp(`echo get_option('wplusui_test_g');`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + id, vp, { wait: 2500 });
  // tabs
  out('G07', vp, await p.evaluate(() => { const t = document.querySelector('#postBody .tabs'); const labels = t.querySelectorAll('label'); const vis = (s) => { const e = t.querySelector(s); return e && e.getBoundingClientRect().height > 0; }; const before = [vis('.tabC-1'), vis('.tabC-2')]; labels[1].click(); const after = [vis('.tabC-1'), vis('.tabC-2')]; return { before, after, radios: t.querySelectorAll('input').length }; }));
  // details
  out('G05', vp, await p.evaluate(() => [...document.querySelectorAll('#postBody details.ac, #postBody details.sp:not(.toc)')].map((d) => { const s = d.querySelector('summary'); const o = d.open; s.click(); return [d.className.replace(/wp-block-details|is-style-\S+|is-layout-\S+|wp-block-details-is-layout-flow/g, '').trim(), o, d.open]; })));
  // lazy youtube
  const reqs = []; p.on('request', (r) => { if (/youtube|ytimg/.test(r.url())) reqs.push(r.url().slice(0, 70)); });
  const yt = await p.evaluate(() => { const y = document.querySelector('.lazyYt'); scrollTo({ top: y.getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }); return { before: !!y.querySelector('iframe'), poster: getComputedStyle(y).backgroundImage.slice(0, 60) }; });
  await sleep(500);
  const r = await p.evaluate(() => { const y = document.querySelector('.lazyYt').getBoundingClientRect(); return [y.x + y.width / 2, y.y + y.height / 2]; });
  await p.mouse.click(r[0], r[1]); await sleep(2500);
  out('G10', vp, { yt, iframe: await p.evaluate(() => document.querySelector('.lazyYt iframe')?.src.slice(0, 60) ?? null), reqs: reqs.length });
  await p._ctx.close();
}
// G12 patterns
out('G12', 'php', wp(`$r=WP_Block_Patterns_Registry::get_instance();$o=[];foreach($r->get_all_registered() as $p)if(in_array('wplus-ui',(array)($p['categories']??[]),true)){$b=parse_blocks($p['content']);$ok=count(array_filter($b,fn($x)=>$x['blockName']))>0;$o[]=str_replace('wplus-ui/','',$p['name']).($ok?'':'!');}echo count($o),': ',implode(',',$o);`));
// G11 code block (front end)
const code = '<!-- wp:code --><pre class="wp-block-code"><code>function hi() {\n  return "ok";\n}</code></pre><!-- /wp:code -->';
const cid = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji kode','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(code).toString('base64')}')]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + cid, vp, { wait: 3000 });
  out('G11', vp, await p.evaluate(() => { const pre = document.querySelector('#postBody pre'); const wrap = pre.closest('.codeWrap, .pre, .cdBx') || pre.parentElement; return { cls: pre.className, parent: pre.parentElement.className, tokens: pre.querySelectorAll('span[class*=tok], span[class*=hl], .token').length, btns: [...wrap.querySelectorAll('button')].map((b) => b.getAttribute('aria-label') || b.className), over: pre.scrollWidth > pre.clientWidth, head: wrap.innerText.slice(0, 40).replace(/\s+/g, ' ') }; }));
  await p.screenshot({ path: `/tmp/g11-${vp}.png`, clip: { x: 0, y: 150, width: L.VP[vp].width, height: 350 } });
  await p._ctx.close();
}
wp(`wp_delete_post(${cid},true);`);
await close();
