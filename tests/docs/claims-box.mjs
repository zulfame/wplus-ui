// A06: with Box design on, every component named in FITUR.md changes its box (border, radius, shadow or background) compared with the plain design.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary, sleep, base } = L;
await launch();
const saved = JSON.parse(wp(`echo json_encode(get_theme_mod('wplusui_box_design',null));`));
const content = '<!-- wp:table {"className":"is-style-data-table"} --><figure class="wp-block-table is-style-data-table"><table><tbody><tr><td>1</td></tr></tbody></table></figure><!-- /wp:table --><!-- wp:quote {"className":"is-style-quote-highlight"} --><blockquote class="wp-block-quote is-style-quote-highlight"><!-- wp:paragraph --><p>k</p><!-- /wp:paragraph --></blockquote><!-- /wp:quote --><!-- wp:details {"className":"is-style-accordion"} --><details class="wp-block-details is-style-accordion"><summary>S</summary><!-- wp:paragraph --><p>i</p><!-- /wp:paragraph --></details><!-- /wp:details --><!-- wp:details {"className":"is-style-spoiler"} --><details class="wp-block-details is-style-spoiler"><summary>Sp</summary><!-- wp:paragraph --><p>i</p><!-- /wp:paragraph --></details><!-- /wp:details -->';
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji box','post_status'=>'publish','post_category'=>[2],'post_content'=>base64_decode('${Buffer.from(content).toString('base64')}')]);`);
const sig = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return [c.borderTopWidth, c.borderTopStyle, c.borderTopLeftRadius, c.boxShadow, c.backgroundColor, c.paddingTop].join('|'); };
const targets = { 'kartu pos (beranda)': ['/', '.blogP .ntry'], 'daftar populer': ['/', '.itemPp > *'], 'pos terkait': ['/?p=26', '#related .itemRp > *'], 'kutipan': ['/?p=' + id, '#postBody blockquote'], 'tabel': ['/?p=' + id, '#postBody .table'], 'accordion': ['/?p=' + id, '#postBody details.ac'], 'spoiler': ['/?p=' + id, '#postBody details.sp'] };
const popups = { 'panel Appearance': ['label[for=forAppearance], .tDL', '.aprW'], 'panel Theme': ['label.thmB', '.thmW .thmP, .thmW'], 'panel Bookmark': ['label[for=forBookmark]', '.wBkm'] };
try {
  for (const vp of ['desktop', 'mobile']) {
    const res = {};
    for (const box of [false, true]) {
      mods({ wplusui_box_design: box });
      for (const [name, [url, sel]] of Object.entries(targets)) { const p = await open(url, vp, { wait: 1500 }); (res[name] ||= {})[box] = await p.evaluate(sig, sel); await p._ctx.close(); }
      for (const [name, [trig, sel]] of Object.entries(popups)) { const p = await open('/', vp, { wait: 1500 }); await p.evaluate((t) => { const l = document.querySelector(t); if (name !== 'x') l?.click(); }, trig); await sleep(500); if (name === 'panel Theme') { await p.evaluate(() => { document.querySelector('label[for=forAppearance]')?.click(); }); } (res[name] ||= {})[box] = await p.evaluate(sig, sel); await p._ctx.close(); }
    }
    for (const [name, v] of Object.entries(res)) claim('A06 ' + vp, `${name}: tampilan berbeda antara desain biasa dan Box design`, v[false] !== null && v[true] !== null && v[false] !== v[true], v);
  }
} finally {
  wp(`wp_delete_post(${id},true);`);
  mods({ wplusui_box_design: saved });
  await close();
}
summary();
