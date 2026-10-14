// PANDUAN: Accordion group with two Details inside.
import * as L from './lib.mjs';
const { wp, open, out, launch, close } = L;
await launch();
const d = (t) => `<!-- wp:details {"className":"is-style-accordion"} --><details class="wp-block-details is-style-accordion"><summary>${t}</summary><!-- wp:paragraph --><p>Isi ${t}</p><!-- /wp:paragraph --></details><!-- /wp:details -->`;
const c = `<!-- wp:group {"className":"is-style-accordion-group"} --><div class="wp-block-group is-style-accordion-group">${d('Satu')}${d('Dua')}${d('Tiga')}</div><!-- /wp:group -->`;
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji grup','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(c).toString('base64')}')]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + id, vp, { wait: 1500 });
  const el = await p.$('.showH');
  out('accordion-group', vp, await p.evaluate(() => { const g = document.querySelector('.showH'); const r = g.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), btn: [...g.querySelectorAll('button, label, summary')].length, firstText: g.textContent.trim().slice(0, 40) }; }));
  await el.scrollIntoView(); await el.screenshot({ path: `/tmp/acc-${vp}.png` });
  await p._ctx.close();
}
wp(`wp_delete_post(${id},true);`);
await close();
