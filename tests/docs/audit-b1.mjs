// AUDIT interaction gaps: carousel controls, TOC links, code Copy button, notification button link, related/popular links, header bookmark panel link.
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep, base } = L;
await launch();
for (const vp of ['desktop', 'mobile']) {
  let p = await open('/', vp, { wait: 2000 });
  // B01 carousel: dots / controls
  out('B01 controls', vp, await p.evaluate(() => { const w = document.querySelector('.sldW'); return { inputs: w.querySelectorAll('input').length, labels: [...w.querySelectorAll('label')].map((l) => l.className || l.getAttribute('aria-label') || l.dataset.text).slice(0, 8), checked: [...w.querySelectorAll('input')].findIndex((i) => i.checked) }; }));
  const idx = () => p.evaluate(() => [...document.querySelectorAll('.sldW input')].findIndex((i) => i.checked));
  const i0 = await idx();
  await p.evaluate(() => { const n = document.querySelector('.sldW label.nx, .sldW .nxt, .sldW label[aria-label*=ext]'); (n || document.querySelectorAll('.sldW .sldN label, .sldW label')[3]).click(); }); await sleep(500);
  const i1 = await idx();
  await p.evaluate(() => { const n = document.querySelector('.sldW label.pv, .sldW .prv, .sldW label[aria-label*=rev]'); if (n) n.click(); }); await sleep(500);
  out('B01 click', vp, { start: i0, afterNext: i1, afterPrev: await idx() });
  await p._ctx.close();
  // A09 notification button link
  p = await open('/', vp);
  out('A09 button', vp, await p.evaluate(() => { const a = document.querySelector('.ntfA > a'); return a && { href: a.getAttribute('href'), text: a.textContent.trim() }; }));
  await p._ctx.close();
  // C02 TOC: click an entry scrolls to the heading and closes the panel
  p = await open('/?p=26', vp, { wait: 2000 });
  await p.evaluate(() => document.querySelector('.tocH').click()); await sleep(700);
  const target = await p.evaluate(() => { const a = [...document.querySelectorAll('#postToc .tocIn a')][5]; return { text: a.textContent, href: a.getAttribute('href') }; });
  await p.evaluate(() => [...document.querySelectorAll('#postToc .tocIn a')][5].click()); await sleep(1500);
  out('C02 link', vp, { target, panelOpen: await p.evaluate(() => document.getElementById('forTocJs').checked), headingTop: await p.evaluate((h) => { const e = document.getElementById(h.slice(1)); return e ? Math.round(e.getBoundingClientRect().top) : 'no-anchor'; }, target.href), scrollY: await p.evaluate(() => scrollY) });
  // C04 related link and popular link navigate
  await p.evaluate(() => scrollTo(0, 0));
  const rel = await p.evaluate(() => document.querySelector('#related .itemRp a[href*="?p="]')?.getAttribute('href'));
  await p.goto(rel, { waitUntil: 'networkidle0' });
  out('C04 related link', vp, { to: rel, h1: await p.evaluate(() => document.querySelector('h1')?.textContent.trim().slice(0, 40)) });
  await p._ctx.close();
  // G11 code Copy
  const code = '<!-- wp:code --><pre class="wp-block-code"><code>echo "salin";</code></pre><!-- /wp:code -->';
  const cid = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji salin','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(code).toString('base64')}')]);`);
  p = await open('/?p=' + cid, vp, { wait: 2500 });
  await p.browserContext().overridePermissions(base, ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']);
  await p.evaluate(() => [...document.querySelectorAll('#postBody button')].find((b) => /Copy/i.test(b.getAttribute('aria-label') || b.textContent))?.click()); await sleep(700);
  out('G11 copy', vp, { clipboard: await p.evaluate(() => navigator.clipboard.readText().catch((e) => 'ERR ' + e.message)) });
  await p._ctx.close(); wp(`wp_delete_post(${cid},true);`);
}
await close();
