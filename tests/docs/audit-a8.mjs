// A08: the bar's Search and Comments buttons really do something.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close, sleep } = L;
await launch();
const saved = JSON.parse(wp(`echo json_encode(get_theme_mod('wplusui_mobile_bar_show',null));`));
mods({ wplusui_mobile_bar_show: true });
const p = await open('/?p=26', 'mobile');
const s0 = await p.evaluate(() => { const i = document.querySelector('#searchInput, .headS input, input[type=search]'); const r = i?.getBoundingClientRect(); return { inputVisible: !!r && r.height > 0, focus: document.activeElement?.tagName }; });
await p.evaluate(() => document.querySelector('.mobM .mS label').click()); await sleep(700);
out('A08 search', 'mobile', { before: s0, after: await p.evaluate(() => { const i = document.querySelector('input[type=search], input[name=s]'); const r = i?.getBoundingClientRect(); return { inputVisible: !!r && r.height > 0 && r.top >= 0, focus: document.activeElement?.name || document.activeElement?.tagName, forSearch: document.getElementById('forSearch')?.checked }; }) }); await p._ctx.close();
const q = await open('/?p=26', 'mobile');
await q.evaluate(() => document.querySelector('.mobM .mC a').click()); await sleep(900);
out('A08 comments', 'mobile', await q.evaluate(() => ({ hash: location.hash, panelOpen: document.getElementById('forComments').checked, anchorExists: !!document.getElementById((location.hash || '#').slice(1)) })));
await q._ctx.close();
mods({ wplusui_mobile_bar_show: saved });
await close();
