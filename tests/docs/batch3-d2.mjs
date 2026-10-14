// D02: banner image field on category/tag edit screens (needs admin: auth cookie generated locally, no password involved).
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
const b = await launch();
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
const att = +wp(`$a=get_posts(['post_type'=>'attachment','numberposts'=>1,'post_mime_type'=>'image','fields'=>'ids']);echo $a[0];`);
const tag = +wp(`$t=get_term_by('slug','alfa-uji','post_tag');if(!$t){$r=wp_insert_term('Alfa uji','post_tag',['slug'=>'alfa-uji']);echo $r['term_id'];}else echo $t->term_id;`);
for (const vp of ['desktop', 'mobile']) {
  for (const [tax, id] of [['category', 3], ['post_tag', tag]]) {
    const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(L.VP[vp]);
    await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
    await p.goto(`${L.base}/wp-admin/term.php?taxonomy=${tax}&tag_ID=${id}&post_type=post`, { waitUntil: 'networkidle0' });
    const has = await p.evaluate(() => !!document.querySelector('.wplusui-banner-pick'));
    await p.click('.wplusui-banner-pick'); await p.waitForSelector('.media-modal .attachment', { timeout: 15000 }).catch(() => {}); await sleep(500);
    const modal = await p.evaluate(() => !!document.querySelector('.media-modal'));
    await p.evaluate((a) => { const att = document.querySelector(`.attachment[data-id="${a}"]`) || document.querySelector('.attachments .attachment'); att.click(); }, att); await sleep(400);
    await p.click('.media-button-select'); await sleep(500);
    const shown = await p.evaluate(() => ({ val: document.querySelector('input[name=wplusui_banner_image_id]').value, img: document.querySelector('.wplusui-banner-field img').style.display }));
    await p.click('input[type=submit].button-primary, #submit'); await p.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
    const saved = wp(`echo (int)get_term_meta(${id},'wplusui_banner_image_id',true);`);
    out('D02 field ' + tax, vp, { has, modal, shown, saved });
    await ctx.close();
  }
}
// archive uses it, fallback for tag/category
for (const vp of ['desktop', 'mobile']) {
  const p = await open(`/?cat=3`, vp);
  out('D02 cat3', vp, await p.evaluate(() => ({ img: document.querySelector('.ldC')?.src, h: document.querySelector('.ldH')?.innerText, count: document.querySelector('.ldP')?.dataset.numPosts, posts: document.querySelectorAll('.blogP article, .ntry').length, sidebar: !!document.querySelector('aside.sideB'), over: document.documentElement.scrollWidth > innerWidth })));
  await p._ctx.close();
}
// remove: clear field, fallback to newest post with thumbnail
wp(`delete_term_meta(3,'wplusui_banner_image_id');`);
const p = await open('/?cat=3', 'desktop');
out('D02 fallback', 'desktop', await p.evaluate(() => document.querySelector('.ldC')?.src));
await p._ctx.close();
wp(`wp_delete_term(${tag},'post_tag');`);
await close();
