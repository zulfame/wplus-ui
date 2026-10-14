// G15: block editor (admin session by local cookie): WPlus UI blocks/category, styles in the inserter, theme styles inside the canvas, classes added in the editor.
import * as L from './lib.mjs';
const { wp, out, launch, close, sleep, VP, base } = L;
const b = await launch();
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
for (const vp of ['desktop', 'mobile']) {
  const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP[vp]);
  await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
  await p.goto(`${base}/wp-admin/post-new.php`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await p.waitForFunction(() => window.wp?.data?.select('core/block-editor'), { timeout: 30000 });
  await sleep(2000);
  const r = await p.evaluate(async () => {
    const { select, dispatch } = wp.data; const { createBlock, getBlockTypes } = wp.blocks; const getBlockStyles = (n) => select('core/blocks').getBlockStyles(n);
    const types = getBlockTypes().filter((t) => t.name.startsWith('wplusui/')).map((t) => t.name + ':' + t.category);
    const styles = ['core/paragraph', 'core/group', 'core/details', 'core/gallery', 'core/quote', 'core/list', 'core/table'].map((n) => n + '=' + (getBlockStyles(n) || []).map((s) => s.name).join('/')).filter(Boolean);
    const blocks = [createBlock('core/group', { className: 'is-style-alert-info' }, [createBlock('core/paragraph', { content: 'Isi' })]), createBlock('core/paragraph', { className: 'is-style-note', content: 'Catatan' }), createBlock('core/details', { className: 'is-style-spoiler', summary: 'Sp' })];
    dispatch('core/block-editor').insertBlocks(blocks);
    return { types, styles, cats: select('core/blocks').getCategories().map((c) => c.slug).slice(0, 3) };
  });
  await sleep(1500);
  const canvas = await p.evaluate(() => { const f = document.querySelector('iframe[name="editor-canvas"]'); const d = f ? f.contentDocument : document; const a = d.querySelector('.alert'); const n = d.querySelector('p.note'); const cs = (e) => e && { cls: e.className.replace(/wp-block\S*|is-\S*|has-\S*/g, '').trim(), bg: getComputedStyle(e).backgroundColor, font: getComputedStyle(e).fontFamily.slice(0, 40) }; return { iframe: !!f, alert: cs(a), note: cs(n), spoiler: d.querySelector('details')?.className.includes('sp') }; });
  out('G15', vp, { ...r, canvas });
  await p.screenshot({ path: `/tmp/g15-${vp}.png` });
  await p.evaluate(() => wp.data.dispatch('core/editor').editPost({ status: 'auto-draft' }));
  await ctx.close();
}
await close();
