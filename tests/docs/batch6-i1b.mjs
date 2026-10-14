// I01 with the mobile bottom bar on: no overlap.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close } = L;
await launch();
const saved = JSON.parse(wp(`echo json_encode(['b'=>get_theme_mod('wplusui_mobile_bar_show',null),'e'=>get_theme_mod('wplusui_wa_enabled',null),'n'=>get_theme_mod('wplusui_wa_number',null)]);`));
mods({ wplusui_mobile_bar_show: true, wplusui_wa_enabled: true, wplusui_wa_number: '628123456789' });
for (const url of ['/', '/?p=26']) { const p = await open(url, 'mobile'); out('I01 bar', url, await p.evaluate(() => { const w = document.querySelector('.puWa').getBoundingClientRect(); const b = document.querySelector('.mobM').getBoundingClientRect(); return { wa: [Math.round(w.top), Math.round(w.bottom)], bar: [Math.round(b.top), Math.round(b.bottom)], overlap: !(w.bottom <= b.top || w.top >= b.bottom) }; })); await p.screenshot({ path: '/tmp/i1bar.png' }); await p._ctx.close(); }
mods({ wplusui_mobile_bar_show: saved.b, wplusui_wa_enabled: saved.e, wplusui_wa_number: saved.n });
await close();
