// F06 all 13 networks in footer and drawer, F07 registered widget areas.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close } = L;
await launch();
const nets = JSON.parse(wp(`echo json_encode(array_keys(wplusui_social_networks()));`));
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(nets)} as $k)$o['wplusui_social_'.$k]=get_theme_mod('wplusui_social_'.$k,null);echo json_encode($o);`));
mods(Object.fromEntries(nets.map((n) => ['wplusui_social_' + n, 'https://example.com/' + n])));
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?page_id=44', vp);
  await p.evaluate(() => scrollTo(0, 1e6));
  out('F06', vp, await p.evaluate((n) => ({ footer: document.querySelectorAll('.fotS a').length, footerSvgs: new Set([...document.querySelectorAll('.fotS a svg')].map((s) => s.innerHTML)).size, drawer: document.querySelectorAll('.mSoc a').length, labels: [...document.querySelectorAll('.fotS a')].map((a) => a.getAttribute('aria-label')).join(','), n: n.length, over: document.documentElement.scrollWidth > innerWidth + 1, rowH: Math.round(document.querySelector('.fotS')?.getBoundingClientRect().height) }), nets));
  await p.screenshot({ path: `/tmp/f6-${vp}.png` });
  await p._ctx.close();
}
mods(Object.fromEntries(nets.map((n) => ['wplusui_social_' + n, saved['wplusui_social_' + n]])));
out('F07 areas', 'php', wp(`global $wp_registered_sidebars;echo implode(' | ',array_map(fn($s)=>$s['id'].'='.$s['name'],$wp_registered_sidebars));`));
await close();
