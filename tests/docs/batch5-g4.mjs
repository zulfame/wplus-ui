// G11 source label/comment/mark, G07 code-tabs variant, G14 limits (5 tabs, sticky="false").
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
await launch();
const code = (s, c) => `<!-- wp:code ${JSON.stringify({ wplusuiSource: s, wplusuiComment: c })} --><pre class="wp-block-code" data-source="${s}" data-comment="${c}"><code>let a = 1;\n<mark class="block purple" data-before="Label">let b = 2;</mark>\nreturn a + b;</code></pre><!-- /wp:code -->`;
const content = [code('app.js', 'Contoh komentar'),
  '<!-- wp:wplusui/tabs {"variant":"code"} --><div class="wp-block-wplusui-tabs"><!-- wp:wplusui/tab {"title":"JS"} -->' + code('a.js', 'x') + '<!-- /wp:wplusui/tab --><!-- wp:wplusui/tab {"title":"PHP"} -->' + code('a.php', 'y') + '<!-- /wp:wplusui/tab --></div><!-- /wp:wplusui/tabs -->',
  '<!-- wp:shortcode -->[pu_tabs sticky="false"]' + Array.from({ length: 7 }, (_, i) => `[pu_tab title="T${i + 1}"]c${i + 1}[/pu_tab]`).join('') + '[/pu_tabs]<!-- /wp:shortcode -->'].join('\n');
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji kode 2','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(content).toString('base64')}')]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + id, vp, { wait: 3000 });
  out('G11', vp, await p.evaluate(() => { const pre = document.querySelector('#postBody pre'); const bx = pre.parentElement; const cs = (e) => getComputedStyle(e); const m = pre.querySelector('mark'); return { source: pre.dataset.source, comment: pre.dataset.comment, headText: bx.className + '|' + (bx.querySelector('.hd, .head, header')?.innerText || '').slice(0, 60), markCls: m.className, markBg: cs(m).backgroundColor, markBefore: getComputedStyle(m, '::before').content, over: pre.scrollWidth > pre.clientWidth }; }));
  out('G07 code tabs', vp, await p.evaluate(() => { const t = document.querySelector('#postBody .pre.tabs'); const labels = [...t.querySelectorAll('label')].map((l) => l.dataset.text); const vis = () => [...t.querySelectorAll('pre')].map((e) => e.getBoundingClientRect().height > 0); const a = vis(); t.querySelectorAll('label')[1].click(); return { labels, before: a, after: vis() }; }));
  out('G14', vp, await p.evaluate(() => { const t = [...document.querySelectorAll('#postBody .tabs')].pop(); return { labels: t.querySelectorAll('label').length, cls: t.className }; }));
  const pre = await p.$('#postBody pre'); await pre.scrollIntoView(); await sleep(300); await pre.screenshot({ path: `/tmp/g4-${vp}.png` });
  await p._ctx.close();
}
wp(`wp_delete_post(${id},true);`);
await close();
