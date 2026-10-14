// I01 WhatsApp button, I02 CTA popup; dev settings restored.
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close, sleep } = L;
await launch();
const keys = ['wplusui_wa_enabled', 'wplusui_wa_number', 'wplusui_wa_message', 'wplusui_wa_side', 'wplusui_cta_enabled', 'wplusui_cta_title', 'wplusui_cta_text', 'wplusui_cta_button', 'wplusui_cta_url', 'wplusui_cta_delay', 'wplusui_cta_image', 'wplusui_cta_image_pos'];
const saved = JSON.parse(wp(`$o=[];foreach(${JSON.stringify(keys)} as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`));
const clear = Object.fromEntries(keys.map((k) => [k, null]));
const wa = () => { const a = document.querySelector('.puWa'); if (!a) return null; const r = a.getBoundingClientRect(); const s = document.querySelector('.tTb'); const sr = s?.getBoundingClientRect(); return { href: a.href, cls: a.className.replace('puWa ', ''), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), vw: innerWidth, vh: innerHeight, overlapScroll: sr ? !(r.right < sr.left || r.left > sr.right || r.bottom < sr.top || r.top > sr.bottom) : null, mobileBar: !!document.querySelector('.mobM') }; };
mods(clear);
mods({ wplusui_wa_enabled: true });
{ const p = await open('/', 'desktop'); out('I01 no number', 'desktop', await p.evaluate(wa)); await p._ctx.close(); }
mods({ wplusui_wa_number: '+62 812-3456 789', wplusui_wa_message: 'Halo & salam, ada tanya?', wplusui_wa_side: 'right' });
for (const side of ['right', 'left']) { mods({ wplusui_wa_side: side }); for (const vp of ['desktop', 'mobile']) { const p = await open('/?p=26', vp); out('I01 ' + side, vp, await p.evaluate(wa)); if (side === 'right') await p.screenshot({ path: `/tmp/i1-${vp}.png` }); await p._ctx.close(); } }
mods({ wplusui_wa_enabled: false });
{ const p = await open('/', 'desktop'); out('I01 off', 'desktop', await p.evaluate(wa)); await p._ctx.close(); }
// CTA
const cta = () => { const c = document.querySelector('.puCta'); if (!c) return null; const b = c.querySelector('.puCtaBox').getBoundingClientRect(); return { hidden: c.hidden, box: [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)], title: c.querySelector('#puCtaT').textContent, btn: c.querySelector('.button')?.outerHTML.slice(0, 80) ?? null, img: !!c.querySelector('.puCtaImg img'), cls: c.querySelector('.puCtaBox').className, vw: innerWidth, vh: innerHeight }; };
mods({ wplusui_cta_enabled: true });
{ const p = await open('/', 'desktop'); out('CTA no title', 'desktop', await p.evaluate(cta)); await p._ctx.close(); }
const img = wp(`echo wp_get_attachment_url(139);`);
mods({ wplusui_cta_title: 'Promo uji', wplusui_cta_text: 'Teks ajakan', wplusui_cta_button: 'Klik', wplusui_cta_url: 'https://example.com/promo', wplusui_cta_delay: 2 });
for (const vp of ['desktop', 'mobile']) {
  let p = await open('/', vp, { wait: 300 });
  const before = await p.evaluate(cta); await sleep(2500);
  const after = await p.evaluate(cta);
  await p.screenshot({ path: `/tmp/i2-${vp}.png` });
  out('CTA delay', vp, { before: before?.hidden, after });
  await p.evaluate(() => document.querySelector('.puCtaX').click()); await sleep(300);
  const closed = await p.evaluate(() => document.querySelector('.puCta').hidden);
  await p.reload({ waitUntil: 'networkidle0' }); await sleep(2800);
  const again = await p.evaluate(() => document.querySelector('.puCta').hidden);
  out('CTA close', vp, { closedByX: closed, hiddenAfterReload: again });
  await p._ctx.close();
  // outside click and Esc (fresh profiles)
  for (const how of ['outside', 'esc']) {
    p = await open('/', vp, { wait: 300 }); await sleep(2500);
    if (how === 'outside') await p.mouse.click(3, 3); else await p.keyboard.press('Escape');
    await sleep(300);
    out('CTA ' + how, vp, await p.evaluate(() => document.querySelector('.puCta').hidden));
    await p._ctx.close();
  }
}
// image positions
mods({ wplusui_cta_image: img });
for (const pos of ['top', 'side']) { mods({ wplusui_cta_image_pos: pos }); for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp, { wait: 300 }); await sleep(2500); out('CTA image ' + pos, vp, await p.evaluate(cta)); await p.screenshot({ path: `/tmp/i2-${pos}-${vp}.png` }); await p._ctx.close(); } }
mods(clear); mods(Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== null)));
await close();
