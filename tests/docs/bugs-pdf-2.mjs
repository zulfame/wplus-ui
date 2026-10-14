// Regression for the owner's second list (14 Oct 2026): read time switch and position, one date in the post header,
// author box layout, header label (dynamic) and header logo styles.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary } = L;
await launch();
const POST = '/?name=getting-started-and-installation';
const id = wp(`echo get_page_by_path('getting-started-and-installation',OBJECT,'post')->ID;`);
const orig = JSON.parse(wp(`global $wpdb;echo json_encode($wpdb->get_row($wpdb->prepare("SELECT post_date,post_date_gmt,post_modified,post_modified_gmt FROM $wpdb->posts WHERE ID=%d",${id}),ARRAY_A));`));
// setModified(null): modified = published (unchanged post); setModified(date): changed on that date; restore(): the original values.
const upd = (a, b) => wp(`global $wpdb;$wpdb->update($wpdb->posts,['post_modified'=>'${a}','post_modified_gmt'=>'${b}'],['ID'=>${id}]);clean_post_cache(${id});echo 'ok';`);
const setModified = (mod) => (mod ? upd(mod, mod) : upd(orig.post_date, orig.post_date_gmt));
const restore = () => upd(orig.post_modified, orig.post_modified_gmt);
const bio0 = wp(`echo get_user_meta(1,'description',true);`);
const logo0 = wp(`echo get_theme_mod('custom_logo',0);`);
mods({ custom_logo: null }); // a clean start: the header-logo claims need a site without a logo
try {
  for (const vp of ['desktop', 'mobile']) {
    // read time: on by default, right edge in line with the last icon, off with the switch
    let p = await open(POST, vp);
    let r = await p.evaluate(() => { const rd = document.querySelector('.pRd'); const ic = [...document.querySelectorAll('.pInf .pIc > *')].pop(); return { rd: rd && Math.round(rd.getBoundingClientRect().right), ic: ic && Math.round(ic.getBoundingClientRect().right) }; });
    claim('BUG2-1 ' + vp, 'waktu baca tampil dan tepi kanannya sejajar dengan ikon di atasnya (selisih <= 6px)', r.rd !== null && Math.abs(r.ic - r.rd) <= 6, r);
    await p._ctx.close();
    mods({ wplusui_reading_time_show: false });
    p = await open(POST, vp);
    r = await p.evaluate(() => ({ rd: document.querySelectorAll('.pRd').length, dates: document.querySelectorAll('.pDr .pDt').length }));
    claim('BUG2-2 ' + vp, 'saklar Show the estimated read time mematikan waktu baca', r.rd === 0 && r.dates === 1, r);
    await p._ctx.close(); mods({ wplusui_reading_time_show: null });
    // one date: Published when unchanged, Updated when changed on a later day
    setModified(null);
    p = await open(POST, vp);
    r = await p.evaluate(() => ({ p: document.querySelectorAll('.pDr .pDt.p').length, u: document.querySelectorAll('.pDr .pDt.u').length }));
    claim('BUG2-3 ' + vp, 'tanpa perubahan: hanya Published', r.p === 1 && r.u === 0, r);
    await p._ctx.close();
    setModified('2030-01-02 10:00:00');
    p = await open(POST, vp);
    r = await p.evaluate(() => ({ p: document.querySelectorAll('.pDr .pDt.p').length, u: document.querySelectorAll('.pDr .pDt.u').length }));
    claim('BUG2-4 ' + vp, 'ada perubahan di hari berikutnya: hanya Updated', r.p === 0 && r.u === 1, r);
    await p._ctx.close(); setModified(null);
    // author box with and without a bio: avatar left of the text (also on phones), compact without a bio
    mods({ wplusui_author_box: true });
    for (const bio of ['', 'WPlus UI is a sleek, modern, and fully responsive WordPress theme designed to provide an exceptional user experience across all devices.']) {
      wp(`update_user_meta(1,'description',${JSON.stringify(bio)});`);
      p = await open(POST, vp);
      r = await p.evaluate(() => { const rc = (s) => document.querySelector(s).getBoundingClientRect(); const b = rc('.authorBox'); return { avRight: Math.round(rc('.authorAvatar').right), infoLeft: Math.round(rc('.authorInfo').left), boxH: Math.round(b.height), av: Math.round(rc('.authorAvatar').width), bio: !!document.querySelector('.authorBio') }; });
      claim(`BUG2-5 ${vp} ${bio ? 'dengan bio' : 'tanpa bio'}`, 'avatar di kiri teks, avatar kecil (<=64px); tanpa bio kotaknya ringkas (<=110px)', r.avRight <= r.infoLeft && r.av <= 64 && (bio ? r.bio : r.boxH <= 110), r);
      await p._ctx.close();
    }
    mods({ wplusui_author_box: null });
  }
  // header: label is dynamic (theme version by default), can be hidden or replaced; logo styles
  const ver = wp(`echo WPLUSUI_VERSION;`);
  let p = await open('/', 'desktop');
  let r = await p.evaluate(() => ({ sub: document.querySelector('.headH').dataset.sub }));
  claim('BUG2-6', 'label di header = versi tema (WPLUSUI_VERSION), bukan teks tetap', r.sub === ver, { r, ver }); await p._ctx.close();
  mods({ wplusui_header_sub_text: 'Beta' }); p = await open('/', 'desktop'); r = await p.evaluate(() => document.querySelector('.headH').dataset.sub);
  claim('BUG2-7', 'teks label bisa diganti di Customizer', r === 'Beta', r); await p._ctx.close();
  mods({ wplusui_header_sub_show: false }); p = await open('/', 'desktop'); r = await p.evaluate(() => ({ sub: document.querySelector('.headH').dataset.sub || null, cls: document.querySelector('.headH').className }));
  claim('BUG2-8', 'label bisa dimatikan', r.sub === null && !/hasSub/.test(r.cls), r); await p._ctx.close();
  mods({ wplusui_header_sub_text: null, wplusui_header_sub_show: null });
  const att = wp(`$a=get_posts(['post_type'=>'attachment','numberposts'=>1,'post_mime_type'=>'image']);echo $a[0]->ID;`);
  for (const vp of ['desktop', 'mobile']) {
    mods({ wplusui_header_logo: 'logo_text' }); p = await open('/', vp); r = await p.evaluate(() => ({ cls: document.querySelector('.headW').className, imgs: document.querySelectorAll('.headW img').length }));
    claim('BUG2-9a ' + vp, 'tanpa logo situs, gaya logo diabaikan (tetap teks)', /\bn\b/.test(r.cls) && r.imgs === 0, r); await p._ctx.close();
    mods({ custom_logo: Number(att), wplusui_header_logo: 'logo_text' }); p = await open('/', vp);
    r = await p.evaluate(() => { const w = document.querySelector('.headW'); const i = w.querySelector('img'); const h = w.querySelector('.headH'); return { cls: w.className, img: i && Math.round(i.getBoundingClientRect().height), title: getComputedStyle(h).display, name: h.textContent.trim().length > 0 }; });
    claim('BUG2-9b ' + vp, 'Logo and site name: logo 40px di kiri nama situs', /\bb\b/.test(r.cls) && r.img === 40 && r.title !== 'none' && r.name, r); await p._ctx.close();
    mods({ wplusui_header_logo: 'logo' }); p = await open('/', vp);
    r = await p.evaluate(() => { const w = document.querySelector('.headW'); const h = w.querySelector('.headH'); return { cls: w.className, img: !!w.querySelector('img'), title: getComputedStyle(h).display, inDom: h.textContent.trim().length > 0 }; });
    claim('BUG2-9c ' + vp, 'Logo only: nama situs disembunyikan tetapi tetap ada di DOM (SEO, pembaca layar)', /\br\b/.test(r.cls) && r.img && r.title === 'none' && r.inDom, r); await p._ctx.close();
    mods({ custom_logo: null, wplusui_header_logo: null });
  }
} finally {
  restore();
  wp(`update_user_meta(1,'description',${JSON.stringify(bio0)});`);
  mods({ wplusui_author_box: null, wplusui_reading_time_show: null, wplusui_header_sub_text: null, wplusui_header_sub_show: null, custom_logo: Number(logo0) || null, wplusui_header_logo: null });
}
await close();
summary('bugs-pdf-2');
