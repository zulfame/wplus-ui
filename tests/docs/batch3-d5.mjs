// D05: the shortcode without the plugin (admin hint), and the CF7 styling using CF7's own markup (plugin itself not installed here).
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
const b = await launch();
const html = `<div class="wpcf7 js" id="wpcf7-f1-p9-o1" lang="en-US" dir="ltr"><form action="#" method="post" class="wpcf7-form init"><div class="cf-grid"><p><label>Your name <span class="wpcf7-form-control-wrap" data-name="your-name"><input size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" autocomplete="name" aria-required="true" type="text" name="your-name"></span></label></p><p><label>Your email <span class="wpcf7-form-control-wrap" data-name="your-email"><input size="40" class="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" type="email" name="your-email"></span></label></p></div><p><label>Subject <span class="wpcf7-form-control-wrap"><input size="40" class="wpcf7-form-control wpcf7-text" type="text" name="your-subject"><span class="wpcf7-not-valid-tip" aria-hidden="true">Please fill out this field.</span></span></label></p><p><label>Your message <span class="wpcf7-form-control-wrap"><textarea cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea" name="m"></textarea></span></label></p><p><input class="wpcf7-form-control wpcf7-submit has-spinner" type="submit" value="Send message"><span class="wpcf7-spinner"></span></p><div class="wpcf7-response-output" aria-hidden="true">One or more fields have an error.</div></form></div>`;
const b64 = Buffer.from('<!-- wp:html -->\n' + html + '\n<!-- /wp:html -->').toString('base64');
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_type'=>'page','post_status'=>'publish','post_title'=>'Uji CF7','post_content'=>'[wplusui_contact_form]'.base64_decode('${b64}')]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?page_id=' + id, vp);
  out('D05', vp, await p.evaluate(() => { const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.width), Math.round(b.height)]; }; return { body: r('#postBody'), name: r('input[name=your-name]'), email: r('input[name=your-email]'), subject: r('input[name=your-subject]'), msg: r('textarea'), submit: r('.wpcf7-submit'), tip: r('.wpcf7-not-valid-tip'), over: document.documentElement.scrollWidth > innerWidth + 1, hint: !!document.querySelector('.note.wr') }; }));
  await p.screenshot({ path: `/tmp/d5-${vp}.png`, fullPage: false });
  await p._ctx.close();
}
// admin sees the hint
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
const ctx = await b.createBrowserContext(); const pg = await ctx.newPage(); await pg.setViewport(L.VP.desktop);
await pg.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' })));
await pg.goto(L.base + '/?page_id=' + id, { waitUntil: 'networkidle0' });
out('D05 admin hint', 'desktop', await pg.evaluate(() => document.querySelector('.note.wr')?.innerText.replace(/\s+/g, ' ')));
await ctx.close();
// idempotent page creation
out('D05 create', 'php', wp(`$a=wplusui_create_contact_page();$b=wplusui_create_contact_page();echo $a,'=',$b,' count=',count(get_posts(['post_type'=>'page','name'=>'contact','numberposts'=>-1]));`));
wp(`wp_delete_post(${id},true);`);
await close();
