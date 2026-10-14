// TRACE A06 (Box design): each component named in FITUR.md changes its box between plain and box design, desktop and mobile.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep } = L;
await launch();
const saved = JSON.parse(wp(`echo json_encode(get_theme_mod('wplusui_box_design',null));`));
const content = '<!-- wp:table {"className":"is-style-data-table"} --><figure class="wp-block-table is-style-data-table"><table><tbody><tr><td>1</td></tr></tbody></table></figure><!-- /wp:table --><!-- wp:quote {"className":"is-style-quote-highlight"} --><blockquote class="wp-block-quote is-style-quote-highlight"><!-- wp:paragraph --><p>k</p><!-- /wp:paragraph --></blockquote><!-- /wp:quote --><!-- wp:details {"className":"is-style-accordion"} --><details class="wp-block-details is-style-accordion"><summary>S</summary><!-- wp:paragraph --><p>i</p><!-- /wp:paragraph --></details><!-- /wp:details -->';
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji box trace','post_status'=>'publish','post_category'=>[2],'post_content'=>base64_decode('${Buffer.from(content).toString('base64')}')]);`);
const sig = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return [c.borderTopWidth, c.borderTopStyle, c.borderTopLeftRadius, c.boxShadow, c.backgroundColor, c.paddingTop].join('|'); };
const targets = { 'kartu pos': ['A06-1', '/', '.blogP .ntry'], 'daftar populer': ['A06-2', '/', '.itemPp > *'], 'pos terkait': ['A06-2', '/?p=26', '#related .itemRp > *'], 'tabel': ['A06-3', '/?p=' + id, '#postBody .table'], 'kutipan': ['A06-3', '/?p=' + id, '#postBody blockquote'], 'accordion': ['A06-3', '/?p=' + id, '#postBody details.ac'] };
const popups = { 'panel Appearance': ['label[for=forAppearance]', '.aprW'], 'panel Theme': ['label.thmB', '.thmW'], 'panel Bookmark': ['label[for=forBookmark]', '.wBkm'] };
try {
  for (const vp of ['desktop', 'mobile']) {
    const res = {};
    for (const box of [false, true]) {
      mods({ wplusui_box_design: box });
      for (const [name, [cid, url, sel]] of Object.entries(targets)) { const p = await open(url, vp, { wait: 1200 }); (res[name] ||= { cid })[box] = await p.evaluate(sig, sel); await p._ctx.close(); }
      for (const [name, [trig, sel]] of Object.entries(popups)) { const p = await open('/', vp, { wait: 1200 }); await p.evaluate((t) => document.querySelector(t)?.click(), trig); await sleep(400); if (name === 'panel Theme') await p.evaluate(() => document.querySelector('label[for=forAppearance]')?.click()); (res[name] ||= { cid: 'A06-4' })[box] = await p.evaluate(sig, sel); await p._ctx.close(); }
    }
    for (const [name, v] of Object.entries(res)) claim(`${v.cid} ${vp}`, `${name}: berbeda antara desain biasa dan Box design`, v[false] !== null && v[true] !== null && v[false] !== v[true], v);
    mods({ wplusui_box_design: true }); const p = await open('/', vp); claim('A06-5 ' + vp, 'set CSS kritis sendiri untuk desain box (kelas bX dan gaya inline berbeda)', (await p.evaluate(() => /\bbX\b/.test(document.body.className))) && (await p.evaluate(() => /\.bX/.test(document.getElementById('wplusui-critical')?.textContent || ''))), 0); await p._ctx.close();
  }
} finally {
  wp(`wp_delete_post(${id},true);`);
  mods({ wplusui_box_design: saved });
  await close();
}
summary();
