// D05/L03 with the real Contact Form 7 plugin: layout, validation messages, successful submit (mail skipped by a temporary mu-plugin), both viewports.
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
await launch();
const page = 155;
const info = () => { const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.width), Math.round(b.height)]; }; return { body: r('#postBody'), name: r('input[name=your-name]'), email: r('input[name=your-email]'), subject: r('input[name=your-subject]'), msg: r('textarea'), submit: r('.wpcf7-submit'), grid: !!document.querySelector('.cf-grid'), over: document.documentElement.scrollWidth > innerWidth + 1 }; };
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?page_id=' + page, vp, { wait: 1500 });
  out('CF7 layout', vp, await p.evaluate(info));
  // empty submit -> validation errors
  await p.click('.wpcf7-submit'); await sleep(2500);
  out('CF7 invalid', vp, await p.evaluate(() => ({ tips: [...document.querySelectorAll('.wpcf7-not-valid-tip')].map((t) => t.textContent), resp: document.querySelector('.wpcf7-response-output')?.textContent, respColor: getComputedStyle(document.querySelector('.wpcf7-response-output')).borderColor })));
  await p.screenshot({ path: `/tmp/cf7-invalid-${vp}.png` });
  // valid submit
  await p.type('input[name=your-name]', 'Penguji'); await p.type('input[name=your-email]', 'uji@example.com');
  if (await p.$('input[name=your-subject]')) await p.type('input[name=your-subject]', 'Subjek');
  await p.type('textarea', 'Pesan uji'); await p.click('.wpcf7-submit'); await p.waitForFunction(() => document.querySelector('.wpcf7-form')?.classList.contains('sent'), { timeout: 15000 }).catch(() => {}); await sleep(500);
  out('CF7 valid', vp, await p.evaluate(() => ({ resp: document.querySelector('.wpcf7-response-output')?.textContent, status: document.querySelector('.wpcf7-form')?.className.match(/sent|invalid|failed|spam/)?.[0] })));
  await p.screenshot({ path: `/tmp/cf7-ok-${vp}.png` });
  await p._ctx.close();
}
await close();
