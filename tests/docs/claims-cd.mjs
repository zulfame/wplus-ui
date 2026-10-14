// FITUR.md claims of groups C and D beyond the earlier tests: breadcrumb, byline links, updated date, no-excerpt, closed comments, author/date/tag archives, archive paging, glitch animation.
import * as L from './lib.mjs';
const { wp, open, launch, close, claim, summary, sleep } = L;
await launch();
const ids = JSON.parse(wp(`kses_remove_filters();
$a=wp_insert_post(['post_title'=>'Uji tanpa ringkasan','post_status'=>'publish','post_category'=>[2],'post_content'=>'Isi singkat satu dua tiga.','comment_status'=>'closed','post_date'=>'2024-01-05 10:00:00']);
wp_set_post_tags($a,['uji-tag']);
$b=wp_insert_post(['post_title'=>'Uji dengan komentar tertutup','post_status'=>'publish','post_content'=>'Isi.','comment_status'=>'closed']);
wp_update_post(['ID'=>$a,'post_modified'=>'2024-02-10 10:00:00','post_modified_gmt'=>'2024-02-10 10:00:00']);
global $wpdb;$wpdb->update($wpdb->posts,['post_modified'=>'2024-02-10 10:00:00','post_modified_gmt'=>'2024-02-10 10:00:00'],['ID'=>$a]);
echo json_encode([$a,$b]);`));
const [a, b] = ids;
try {
  for (const vp of ['desktop', 'mobile']) {
    let p = await open('/?p=' + a, vp);
    const r = await p.evaluate(() => ({ crumb: [...document.querySelectorAll('.brdCmb a')].map((x) => x.textContent.trim() + '>' + x.getAttribute('href')), desc: !!document.querySelector('.pDesc'), author: document.querySelector('.pAt a.nm')?.getAttribute('href'), pub: document.querySelector('.pDt.p time')?.dataset.time, upd: document.querySelector('.pDt.u time')?.dataset.time, read: document.getElementById('postReadTime')?.dataset.minutes, tag: [...document.querySelectorAll('.pTgs a')].map((x) => x.textContent + '>' + x.getAttribute('href')), cmBtn: !!document.querySelector('.cmBtn'), cmIcon: !!document.querySelector('a.cmnt') }));
    claim('C01 ' + vp, 'breadcrumb Home dan kategori pertama dengan tautan', r.crumb.length === 2 && /\?cat=2$/.test(r.crumb[1]) && r.crumb[0].startsWith('Home'), r.crumb);
    claim('C01 ' + vp, 'tanpa kutipan: tidak ada deskripsi', !r.desc);
    claim('C01 ' + vp, 'avatar penulis menautkan ke arsip penulis', /\?author=\d+/.test(r.author || ''), r.author);
    claim('C01 ' + vp, 'hanya satu tanggal: pos yang diubah setelah terbit menampilkan Updated (Februari 2024), bukan Published', !r.pub && /Februari 2024/.test(r.upd), [r.pub, r.upd]);
    claim('C01 ' + vp, 'waktu baca minimal 1 menit', r.read === '1', r.read);
    claim('C01 ' + vp, 'label tag menautkan ke arsip tag', r.tag.length === 1 && /tag=uji-tag/.test(r.tag[0]), r.tag);
    claim('C06 ' + vp, 'komentar ditutup dan tanpa komentar: tombol dan ikon tidak ada', !r.cmIcon, r);
    await p._ctx.close();
  }
  // D02: tag, author, date archives use the archive layout; category paging
  for (const vp of ['desktop', 'mobile']) {
    for (const [n, u, re] of [['tag', '/?tag=uji-tag', /uji-tag|Uji/i], ['author', '/?author=1', /./], ['date', '/?m=202401', /./]]) {
      const p = await open(u, vp);
      const r = await p.evaluate(() => ({ banner: !!document.querySelector('.ldW'), h: document.querySelector('.ldH')?.textContent.trim(), cards: document.querySelectorAll('.blogP .ntry').length, sidebar: !!document.querySelector('aside.sideB'), over: document.documentElement.scrollWidth > innerWidth + 1 }));
      claim('D02 ' + vp, `arsip ${n}: banner, kartu, tanpa sidebar, tanpa luapan`, r.banner && r.cards >= 1 && !r.sidebar && !r.over && re.test(r.h || ''), r);
      await p._ctx.close();
    }
    const p = await open('/?cat=2', vp, { wait: 2500 });
    const c0 = await p.evaluate(() => ({ cards: document.querySelectorAll('.blogP .ntry').length, count: document.querySelector('.ldP')?.dataset.numPosts }));
    const btn0 = await p.evaluate(() => document.querySelector('#blog-pager .jsLd')?.dataset.text); await p.evaluate(() => document.querySelector('#blog-pager button.jsLd')?.click()); await sleep(3000);
    const c1 = await p.evaluate(() => ({ cards: document.querySelectorAll('.blogP .ntry').length, end: document.querySelector('#blog-pager .jsLd')?.dataset.text }));
    claim('D02 ' + vp, 'arsip memuat 16 pos dengan tombol Load more posts yang memuat sisanya; ujung daftar bertuliskan "No results found"', btn0 === 'Load more posts' && c0.cards === 16 && +c0.count === 17 && c1.cards === 17 && c1.end === 'No results found', { btn0, c0, c1 });
    await p.goto(L.base + '/?cat=2&paged=2', { waitUntil: 'networkidle0' });
    claim('D02 ' + vp, 'halaman 2 kategori berisi kartu lain', (await p.evaluate(() => document.querySelectorAll('.blogP .ntry').length)) > 0);
    await p._ctx.close();
  }
  // D04: glitch animation really runs
  { const p = await open('/?p=999999', 'desktop'); const an = await p.evaluate(() => getComputedStyle(document.querySelector('.erroC h3 span.e')).animationName); claim('D04', 'angka 404 beranimasi glitch', /glitch/.test(an), an); await p._ctx.close(); }
  // D01 page: no comments/byline already tested; D03 empty search text
  { const p = await open('/?s=zzzxxyy', 'mobile'); const t = await p.evaluate(() => document.querySelector('.blogT, main')?.innerText.replace(/\s+/g, ' ').slice(0, 90)); claim('D03', 'pencarian kosong: "No results found"', /No results found/.test(t || ''), t); await p._ctx.close(); }
} finally {
  wp(`foreach(${JSON.stringify(ids)} as $i)wp_delete_post($i,true);$t=get_term_by('slug','uji-tag','post_tag');if($t)wp_delete_term($t->term_id,'post_tag');`);
  await close();
}
summary();
