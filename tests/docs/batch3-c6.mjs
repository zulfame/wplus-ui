// C06: native comment posting (visitor) and Disqus embed request on opening the popup (real Disqus account not available).
import * as L from './lib.mjs';
const { wp, mods, open, out, launch, close, sleep } = L;
await launch();
wp(`update_option('comment_moderation',0);update_option('comment_previously_approved',0);update_option('require_name_email',1);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=28', vp);
  await p.evaluate(() => document.querySelector('.cmBtn').click()); await sleep(500);
  await p.type('#commentform #comment', 'Komentar uji ' + vp);
  await p.type('#commentform #author', 'Penguji'); await p.type('#commentform #email', 'uji@example.com');
  await Promise.all([p.waitForNavigation({ waitUntil: 'networkidle0' }), p.evaluate(() => document.querySelector('#commentform [type=submit]').click())]);
  await sleep(1200);
  if (!(await p.$('.cmBtn'))) { console.log('PAGE', p.url(), (await p.evaluate(() => document.body.innerText)).slice(0, 300)); }
  else { await p.evaluate(() => document.querySelector('.cmBtn').click()); await sleep(500); }
  out('C06 post', vp, await p.evaluate(() => ({ url: location.hash, list: [...document.querySelectorAll('.cmC .comment, .cmC li, #comments li')].slice(0, 3).map((e) => e.innerText.replace(/\s+/g, ' ').slice(0, 80)), count: document.querySelector('.cmnt')?.dataset.text })));
  await p._ctx.close();
  wp(`foreach(get_comments(['post_id'=>28]) as $c) wp_delete_comment($c->comment_ID,true);`);
}
wp(`foreach(get_comments(['post_id'=>28]) as $c) wp_delete_comment($c->comment_ID,true);delete_option('comment_moderation');`);
mods({ wplusui_disqus_shortname: 'contoh-uji' });
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=28', vp);
  const reqs = []; p.on('request', (r) => { if (/disqus/.test(r.url())) reqs.push(r.url()); });
  const pre = await p.evaluate(() => ({ thread: !!document.getElementById('disqus_thread'), form: !!document.getElementById('commentform') }));
  await p.evaluate(() => document.querySelector('.cmBtn').click()); await sleep(2500);
  out('C06 disqus', vp, { pre, reqs });
  await p._ctx.close();
}
mods({ wplusui_disqus_shortname: null });
await close();
