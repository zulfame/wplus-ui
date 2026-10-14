// Regression for the owner's findings in "Bug WPlus UI.pdf" (14 Oct 2026): carousel offset and height, carousel caption,
// one card per row on phones, search results columns beside the sidebar, no in-page table of contents.
import * as L from './lib.mjs';
const { wp, mods, open, launch, close, claim, summary } = L;
await launch();
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/', vp);
  const r = await p.evaluate(() => {
    const w = document.querySelector('.sldW'); const b = w.getBoundingClientRect();
    const ys = [...document.querySelectorAll('.sldA')].map((a) => Math.round(a.getBoundingClientRect().y));
    const g = document.querySelector('.blogP');
    return { w: b.width, h: b.height, ys, cols: getComputedStyle(g).gridTemplateColumns.split(' ').length, caption: [...document.querySelectorAll('.sldT')].every((t) => (t.dataset.caption || '').length > 0) };
  });
  claim('BUG1-1 ' + vp, 'semua slide carousel mulai di y yang sama (tanpa jarak 40px di atas slide ke-2 dst.)', new Set(r.ys).size === 1, r.ys);
  claim('BUG1-2 ' + vp, 'rasio carousel 5:2 (tinggi = lebar / 2.5, tidak 40px lebih tinggi)', Math.abs(r.h - r.w / 2.5) <= 1, r);
  claim('BUG1-3 ' + vp, 'tiap slide carousel punya judul dan keterangan (data-caption)', r.caption, r);
  claim('BUG1-4 ' + vp, vp === 'mobile' ? 'beranda di ponsel: satu kartu per baris' : 'beranda desktop: 3 kolom', r.cols === (vp === 'mobile' ? 1 : 3), r.cols);
  await p._ctx.close();
  const s = await open('/?s=google', vp);
  const c = await s.evaluate(() => getComputedStyle(document.querySelector('.blogP')).gridTemplateColumns.split(' ').length);
  claim('BUG1-5 ' + vp, vp === 'mobile' ? 'hasil pencarian di ponsel: satu kartu per baris' : 'hasil pencarian desktop (dengan sidebar): 3 kolom seperti beranda', c === (vp === 'mobile' ? 1 : 3), c);
  await s._ctx.close();
  const q = await open('/?name=ui-components-and-typography', vp);
  const t = await q.evaluate(() => ({ inline: document.querySelectorAll('#postBody .toc, #postBody details.toc, .entry-content details.toc, .postBody .toc').length, floating: !!document.getElementById('postToc'), tocText: [...document.querySelectorAll('#postBody summary, .postBody summary')].filter((e) => /table of contents/i.test(e.textContent)).length }));
  claim('BUG1-6 ' + vp, 'tidak ada kotak daftar isi di dalam halaman; panel ToC menggantung tetap ada', t.inline === 0 && t.tocText === 0 && t.floating, t);
  const rc = await q.evaluate(() => getComputedStyle(document.querySelector('.itemRp')).gridTemplateColumns.split(' ').length);
  claim('BUG1-9 ' + vp, vp === 'mobile' ? 'Related Posts di ponsel: satu kartu per baris' : 'Related Posts di desktop: lebih dari satu kolom', vp === 'mobile' ? rc === 1 : rc >= 2, rc);
  const rp = await q.evaluate(() => ({ boxes: document.querySelectorAll('#postBody .arp, #postBody .aRel, .postBody .arp, .postBody .aRel').length, theme: document.querySelectorAll('.itemRp').length }));
  claim('BUG1-8 ' + vp, 'Related Posts hanya satu kali (tidak ada contoh .arp di isi pos, hanya kotak tema)', rp.boxes === 0 && rp.theme === 1, rp);
  await q._ctx.close();
}
claim('BUG1-7', 'konten demo tidak memuat blok wplusui/toc', wp(`echo strpos(file_get_contents(get_theme_file_path("demo-content/wplus-ui-demo-content.xml")),"wp:wplusui/toc")===false?"ok":"no";`) === 'ok');
await close();
summary('bugs-pdf-1');
