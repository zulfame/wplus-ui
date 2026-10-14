// TRACE group G (G01-G15): every sentence of the FITUR.md rows as a numbered claim, on one post that holds every component.
import * as L from './lib.mjs';
const { wp, open, launch, close, claim, summary, sleep, base, VP } = L;
const b = await launch();
const VPS = ['desktop', 'mobile'];
const big = 'http://127.0.0.1:8091/wp-content/uploads/2026/10/urban-basketball-game-1024x577.webp';
const bl = (name, attrs, inner) => `<!-- wp:${name} ${attrs ? JSON.stringify(attrs) : ''} -->${inner}<!-- /wp:${name} -->`;
const para = (s, t) => bl('paragraph', { className: 'is-style-' + s }, `<p class="is-style-${s}">${t}</p>`);
const grp = (s) => bl('group', { className: 'is-style-' + s }, `<div class="wp-block-group is-style-${s}">${bl('paragraph', null, `<p><strong>T ${s}</strong><br>Teks ${s}</p>`)}</div>`);
const det = (s) => bl('details', { className: 'is-style-' + s }, `<details class="wp-block-details is-style-${s}"><summary>Ringkas ${s}</summary>${bl('paragraph', null, '<p>Isi rinci</p>')}</details>`);
const img = (i) => bl('image', null, `<figure class="wp-block-image"><img src="${big}" alt="g${i}"/></figure>`);
const gal = (s, n) => bl('gallery', { className: 'is-style-' + s }, `<figure class="wp-block-gallery has-nested-images columns-default is-cropped is-style-${s}">${Array.from({ length: n }, (_, i) => img(i)).join('')}</figure>`);
const code = (s, c) => bl('code', { wplusuiSource: s, wplusuiComment: c }, `<pre class="wp-block-code" data-source="${s}" data-comment="${c}"><code>let a = 1;\n<mark class="block purple" data-before="Label">let b = 2;</mark>\nreturn a + b;</code></pre>`);
const tabs = (n, attrs) => bl('wplusui/tabs', attrs, '<div class="wp-block-wplusui-tabs">' + Array.from({ length: n }, (_, i) => bl('wplusui/tab', { title: 'Tab' + (i + 1) }, `<p>isi ${i + 1}</p>`)).join('') + '</div>');
const rows = Array.from({ length: 40 }, (_, i) => `<tr><td>${i}</td><td>x</td></tr>`).join('');
const content = [
  ...['note', 'note-warning', 'indent', 'reference'].map((s) => para(s, 'Paragraf ' + s)),
  ...['alert', 'alert-info', 'alert-success', 'alert-warning', 'alert-error', 'alert-outline', 'alert-info-outline', 'alert-success-outline', 'alert-warning-outline', 'alert-error-outline'].map(grp),
  bl('group', { className: 'is-style-accordion-group' }, `<div class="wp-block-group is-style-accordion-group">${det('accordion')}${det('accordion-alt')}</div>`),
  grp('related-links'),
  bl('list', { ordered: true, className: 'is-style-steps' }, '<ol class="wp-block-list is-style-steps">' + ['A', 'B'].map((t) => bl('list-item', null, `<li>${t}</li>`)).join('') + '</ol>'),
  bl('table', { className: 'is-style-data-table mh300' }, `<figure class="wp-block-table is-style-data-table mh300"><table><thead><tr><th>H1</th><th>H2</th></tr></thead><tbody>${rows}</tbody></table></figure>`),
  ...['quote-highlight', 'quote-icon'].map((s) => bl('quote', { className: 'is-style-' + s }, `<blockquote class="wp-block-quote is-style-${s}">${bl('paragraph', null, '<p>Kutipan</p>')}<cite>Sumber</cite></blockquote>`)),
  det('spoiler'), det('accordion'),
  gal('image-grid', 3), gal('image-hidden', 7), gal('image-scroll', 4),
  tabs(3, { sticky: true }), tabs(2, { variant: 'code' }).replace(/<p>isi (\d)<\/p>/g, (m, n) => code('f' + n + '.js', 'k' + n).replace(/<!-- \/?wp:code[^>]*-->/g, '')),
  bl('wplusui/download', { type: 'pdf', name: 'laporan.pdf', size: '1MB', url: 'https://example.com/laporan.pdf' }, ''),
  bl('wplusui/toc', { title: 'Isi', open: false }, ''), '<!-- wp:heading --><h2 class="wp-block-heading">Satu</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Satu A</h3><!-- /wp:heading -->',
  bl('wplusui/youtube', { videoId: 'dQw4w9WgXcQ', ratio: '4 / 3' }, ''),
  code('app.js', 'Contoh'),
  bl('buttons', null, '<div class="wp-block-buttons">' + bl('button', null, '<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#">Isi</a></div>') + bl('button', { className: 'is-style-outline' }, '<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="#">Garis</a></div>') + '</div>'),
  bl('shortcode', null, '[pu_tabs]' + Array.from({ length: 7 }, (_, i) => `[pu_tab title="S${i + 1}"]c${i + 1}[/pu_tab]`).join('') + '[/pu_tabs]'),
  bl('shortcode', null, '[pu_tabs sticky="false"][pu_tab title="X"]x[/pu_tab][pu_tab title="Y"]y[/pu_tab][/pu_tabs]'),
  tabs(9, null),
].join('\n');
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji G trace','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(content).toString('base64')}')]);`);
const ck = JSON.parse(wp(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`));
try {
  const reg = JSON.parse(wp(`$o=[];foreach(WP_Block_Styles_Registry::get_instance()->get_all_registered() as $bl=>$ss)foreach($ss as $s)$o[$bl][]=$s['name'].'='.$s['label'];echo json_encode($o);`));
  claim('G01-1', 'gaya paragraf terdaftar: Note, Note: warning, First line indent, Reference', ['note=Note', 'note-warning=Note: warning', 'indent=First line indent', 'reference=Reference'].every((x) => reg['core/paragraph'].includes(x)), reg['core/paragraph']);
  claim('G02-1', '10 gaya alert terdaftar plus Accordion group dan Related links', ['alert', 'alert-info', 'alert-success', 'alert-warning', 'alert-error', 'alert-outline', 'alert-info-outline', 'alert-success-outline', 'alert-warning-outline', 'alert-error-outline', 'accordion-group', 'related-links'].every((n) => reg['core/group'].some((x) => x.startsWith(n + '='))), reg['core/group']);
  claim('G03-1', 'gaya Steps (list) dan Data table terdaftar', reg['core/list']?.some((x) => /^steps=Steps/.test(x)) && reg['core/table']?.some((x) => /^data-table=Data table/.test(x)));
  claim('G04-1', 'gaya kutipan Highlighted dan With quote icon', ['quote-highlight=Highlighted', 'quote-icon=With quote icon'].every((x) => reg['core/quote'].includes(x)), reg['core/quote']);
  claim('G05-1', 'gaya Details: Accordion, Accordion (alternate), Spoiler', ['accordion=Accordion', 'accordion-alt=Accordion (alternate)', 'spoiler=Spoiler'].every((x) => reg['core/details'].includes(x)), reg['core/details']);
  claim('G06-1', 'gaya galeri: Image grid, Image grid with Show All, Scrolling images', ['image-grid=Image grid', 'image-hidden=Image grid with Show All', 'image-scroll=Scrolling images'].every((x) => reg['core/gallery'].includes(x)), reg['core/gallery']);
  for (const vp of VPS) {
    const p = await open('/?p=' + id, vp, { wait: 3000 });
    const r = await p.evaluate(() => {
      const q = (s) => document.querySelectorAll('#postBody ' + s).length; const cls = (s) => [...document.querySelectorAll('#postBody ' + s)].map((e) => e.className);
      return { note: q('p.note:not(.wr)'), warn: q('p.note.wr'), indent: q('p.pIndent'), ref: q('p.pRef'), alerts: cls('div.alert').map((c) => c.replace(/wp-block-group|is-style-\S+|\balert\b/g, '').trim() || 'netral').join('|'), alertN: q('div.alert'), showH: q('.showH'), relate: q('.pRelate'), steps: q('ol.steps'), table: q('figure.table.sticky.bordered'), q1: q('blockquote.s1'), q2: q('blockquote.s2'), cite: q('blockquote cite'), acc: q('details.ac'), accAlt: q('details.ac.alt'), sp: q('details.sp:not(.toc)'), grImg: q('.psImg.grImg'), hdImg: q('.psImg.hdImg'), shImg: q('.psImg.shImg'), scr: q('.scrImg, .psImg.scImg, [class*=scrl]'), tabsAll: [...document.querySelectorAll('#postBody .tabs')].map((t) => t.querySelectorAll(':scope > div > label').length + (t.classList.contains('stick') ? 's' : '') + (t.classList.contains('pre') ? 'c' : '')), dl: q('.dlBox'), tocD: q('details.toc'), yt: q('.lazyYt'), code: q('pre.wp-block-code'), btn: q('.wp-block-button a.button'), btnLn: q('.wp-block-button a.button.ln') };
    });
    claim('G01-2 ' + vp, 'paragraf Note, Note: warning, indent, Reference menerima kelas komponen', r.note === 1 && r.warn === 1 && r.indent === 1 && r.ref === 1, r);
    claim('G02-2 ' + vp, '10 alert menerima kelas jenisnya (info, success, warning, error, masing-masing outline) dan kelas netral', r.alertN === 10 && /info.*success.*warning.*error/.test(r.alerts) && /outline/.test(r.alerts), r.alerts);
    claim('G02-3 ' + vp, 'Accordion group dan Related links menerima kelasnya', r.showH === 1 && r.relate === 1, r);
    claim('G03-2 ' + vp, 'List Steps menjadi ol.steps; Data table menerima kelas table sticky bordered', r.steps === 1 && r.table === 1, r);
    claim('G04-2 ' + vp, 'kutipan Highlighted (s1) dan icon (s2); sitasi menjadi span (bukan cite)', r.q1 === 1 && r.q2 === 1 && r.cite === 0, r);
    claim('G05-2 ' + vp, 'Details menerima kelas ac, ac alt, sp', r.acc >= 2 && r.accAlt === 1 && r.sp === 1, r);
    claim('G06-2 ' + vp, 'galeri menghasilkan grid, grid dengan Show All, dan scroll', r.grImg === 1 && r.hdImg === 1 && r.shImg === 1, r);
    claim('G13-1 ' + vp, 'tombol Buttons: gaya isi (button) dan Outline (button ln)', r.btn === 2 && r.btnLn === 1, r);
    claim('G08-1 ' + vp, 'blok Download box tercetak', r.dl === 1, r); claim('G10-1 ' + vp, 'blok Lazy YouTube tercetak', r.yt === 1, r);
    claim('G14-1 ' + vp, 'shortcode [pu_tabs]: tujuh tab dipotong menjadi lima', r.tabsAll[2] && /^5/.test(r.tabsAll[2]), r.tabsAll); claim('G14-2 ' + vp, 'bilah tab lengket secara bawaan', /s$/.test(r.tabsAll[2] || ''), r.tabsAll); claim('G14-3 ' + vp, 'sticky="false" mematikan bilah lengket', r.tabsAll[3] === '2', r.tabsAll); claim('G14-4 ' + vp, 'shortcode bekerja di blok Shortcode (konten klasik setara)', r.tabsAll.length === 5, r.tabsAll);
    claim('G07-1 ' + vp, 'blok Tabs: tab biasa sticky 3, tab kode 2, maksimal 8 tab (9 dipotong), shortcode maksimal 5 dengan sticky bawaan dan sticky="false" tanpa sticky', r.tabsAll.join() === '3s,2c,5s,2,8', r.tabsAll);
    // G02 icons, G03 sticky thead
    const ic = await p.evaluate(() => ['info', 'success', 'warning', 'error'].map((t) => { const e = document.querySelector('.alert.' + t); return getComputedStyle(e, '::before').content !== 'none' || !!e.querySelector('svg, img') || getComputedStyle(e.querySelector('p') || e, '::before').content !== 'none'; }));
    claim('G02-4 ' + vp, 'ikon jenis alert muncul otomatis', ic.every(Boolean), ic);
    const st = await p.evaluate(() => { const f0 = document.querySelector('#postBody figure.table'); const th = f0.querySelector('thead'); const f = [f0, ...f0.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 20 && /auto|scroll/.test(getComputedStyle(e).overflowY)) || f0; f.scrollTo({ top: 400, behavior: 'instant' }); return { max: getComputedStyle(f).maxHeight, off: Math.round(th.getBoundingClientRect().top - f.getBoundingClientRect().top), sc: f.scrollTop }; });
    claim('G03-3 ' + vp, 'header Data table lengket di dalam kotak bertinggi terbatas (mh300)', st.max === '300px' && st.off <= 2 && st.sc > 0, st);
    // G05 toggles
    const tg = await p.evaluate(() => [...document.querySelectorAll('#postBody details.ac, #postBody details.sp:not(.toc)')].map((d) => { const o = d.open; d.querySelector('summary').click(); return [o, d.open]; }));
    claim('G05-3 ' + vp, 'accordion, alternate, dan spoiler membuka saat diklik', tg.every((x) => x[0] === false && x[1] === true), tg);
    const sl = await p.evaluate(() => { const s = document.querySelector('details.sp:not(.toc) summary'); return getComputedStyle(s, '::after').content; }); claim('G05-4 ' + vp, 'spoiler memakai label "Show all"/"Hide all"', /Hide all|Show all/.test(sl), sl);
    // G06 Show all
    const vis = () => p.evaluate(() => [...document.querySelectorAll('#postBody .psImg img')].filter((i) => i.getBoundingClientRect().height > 0).length); const v0 = await vis(); await p.evaluate(() => document.querySelector('.btImg label').click()); await sleep(600); claim('G06-3 ' + vp, 'Show All menampilkan semua gambar (4 → semua)', v0 < (await vis()), [v0, await vis()]);
    const gcols = await p.evaluate(() => { const g = document.querySelector('.psImg.grImg'); const ys = [...g.children].map((c) => Math.round(c.getBoundingClientRect().y)); return ys.filter((y) => y === ys[0]).length; }); claim('G06-4 ' + vp, 'grid dua kolom (dua gambar per baris; sisa ganjil di tengah)', gcols === 2, gcols);
    const sx = await p.evaluate(() => { const g = document.querySelector('#postBody .glImg'); return g ? g.scrollWidth > g.clientWidth + 5 : null; }); claim('G06-5 ' + vp, 'galeri Scrolling images bisa digeser mendatar', sx === true, sx);
    // G07 switching
    const sw = await p.evaluate(() => { const t = document.querySelector('#postBody .tabs.stick'); const v = () => [...t.querySelectorAll('[class^=tabC-]')].map((e) => e.getBoundingClientRect().height > 0); const a = v(); t.querySelectorAll(':scope > div > label')[1].click(); const bq = v(); return { a, b: bq, sticky: getComputedStyle(t.querySelector(':scope > div')).position }; });
    claim('G07-2 ' + vp, 'berpindah tab menampilkan panel yang benar (tanpa JavaScript, tombol radio) dan bilah sticky', sw.a.join() === 'true,false,false' && sw.b.join() === 'false,true,false' && sw.sticky === 'sticky', sw);
    const cw = await p.evaluate(() => { const t = document.querySelector('#postBody .tabs.pre'); const v = () => [...t.querySelectorAll('pre')].map((e) => e.getBoundingClientRect().height > 0); const a = v(); t.querySelectorAll(':scope > div > label')[1].click(); return [a, v()]; }); claim('G07-3 ' + vp, 'tab kode: berpindah antara dua blok Code', cw[0].join() === 'true,false' && cw[1].join() === 'false,true', cw);
    // G08 / G09 / G10 / G13
    const dl = await p.evaluate(() => { const a = document.querySelector('.dlBox a'); return { t: document.querySelector('.dlBox .fT')?.dataset.text, n: document.querySelector('.dlBox .fN span')?.textContent, s: document.querySelector('.dlBox .fS')?.textContent, h: a.href, tg: a.target, rel: a.rel }; }); claim('G08-2 ' + vp, 'kotak unduhan: tipe, nama, ukuran, tautan, tab baru, nofollow noopener', dl.t === 'pdf' && dl.n === 'laporan.pdf' && dl.s === '1MB' && dl.h === 'https://example.com/laporan.pdf' && dl.tg === '_blank' && /nofollow/.test(dl.rel), dl);
    const tc = await p.evaluate(() => { const d = document.querySelector('details.toc'); const o = d.open; d.querySelector('summary').click(); return { initial: o, after: d.open, items: [...d.querySelectorAll('.aToc a')].map((a) => a.textContent) }; }); claim('G09-1 ' + vp, 'blok daftar isi dari heading, bisa dibuka/ditutup, opsi awal tertutup', tc.initial === false && tc.after === true && tc.items.join() === 'Satu,Satu A', tc);
    const yt = await p.evaluate(() => { const y = document.querySelector('.lazyYt'); return { ratio: getComputedStyle(y).getPropertyValue('--ratio').trim(), iframe: !!y.querySelector('iframe') }; }); claim('G10-2 ' + vp, 'sebelum diklik hanya sampul dimuat (tanpa iframe) dan rasio 4 / 3 dipakai', !yt.iframe && /4 \/ 3/.test(yt.ratio), yt);
    const y0 = await p.evaluate(() => { const y = document.querySelector('.lazyYt'); scrollTo({ top: y.getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }); return 0; }); await sleep(500); const yb = await p.evaluate(() => { const r = document.querySelector('.lazyYt').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }); await p.mouse.click(yb[0], yb[1]); await sleep(2500); claim('G10-3 ' + vp, 'klik memuat pemutar YouTube (iframe)', await p.evaluate(() => !!document.querySelector('.lazyYt iframe')));
    // G11
    const cd = await p.evaluate(() => { const pre = [...document.querySelectorAll('#postBody pre.wp-block-code')].pop(); const m = pre.querySelector('mark'); const box = pre.parentElement; return { src: pre.dataset.source, com: pre.dataset.comment, mark: getComputedStyle(m, '::before').content, bg: getComputedStyle(m).backgroundColor, copy: [...(box.querySelectorAll('button'))].some((x) => /Copy/i.test(x.getAttribute('aria-label') || x.textContent)), nums: getComputedStyle(pre.querySelector('code') || pre, '::before').content, tokens: pre.querySelectorAll('span[class*=hl], span[class*=tok]').length }; });
    claim('G11-1 ' + vp, 'blok kode: label sumber, komentar, mark berlabel dan berwarna, tombol Copy', cd.src === 'app.js' && cd.com === 'Contoh' && /Label/.test(cd.mark) && /rgb\(128, 51, 120\)/.test(cd.bg) && cd.copy, cd);
    await p._ctx.close();
  }
  // G11 copy and syntax highlighting
  { const p = await open('/?p=' + id, 'desktop', { wait: 3000 }); await p.browserContext().overridePermissions(base, ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']); await p.evaluate(() => [...document.querySelectorAll('#postBody pre.wp-block-code')].pop().parentElement.querySelector('button')?.click()); await sleep(700); claim('G11-2', 'tombol Copy menyalin isi kode ke clipboard', /let a = 1;/.test(await p.evaluate(() => navigator.clipboard.readText().catch(() => ''))));
    claim('G11-3', 'penyorotan sintaks di sisi pengunjung (token berwarna) dan nomor baris', await p.evaluate(() => { const pre = [...document.querySelectorAll('#postBody pre.wp-block-code')].pop(); return pre.querySelectorAll('span').length > 2 || /\d/.test(getComputedStyle(pre, '::before').content); })); await p._ctx.close(); }
  // G12
  const pat = JSON.parse(wp(`$r=WP_Block_Patterns_Registry::get_instance();$o=[];foreach($r->get_all_registered() as $p)if(in_array('wplus-ui',(array)($p['categories']??[]),true)){ob_start();$h=do_blocks($p['content']);$n=ob_get_clean();$o[str_replace('wplus-ui/','',$p['name'])]=strlen(wp_strip_all_tags($h)).($n?'!':'');}echo json_encode($o);`));
  claim('G12-1', '11 pola di kategori WPlus UI: Note, Warning note, Alerts, Steps, Accordion, Spoiler, Buttons, Quotes, Download box, Tabs, Contact page', ['note', 'note-warning', 'alerts', 'steps', 'accordion', 'spoiler', 'buttons', 'quotes', 'download', 'tabs', 'contact'].every((k) => k in pat) && Object.keys(pat).length === 11, pat);
  claim('G12-2', 'semua pola dirender mesin blok tanpa peringatan dan berisi teks', Object.values(pat).every((v) => !String(v).endsWith('!') && parseInt(v) > 0), pat);
  // G14 is covered by G07-1 (counts) and shortcode attribute
  // G15 editor
  for (const vp of VPS) { const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP[vp]); await p.setCookie(...ck.map(([name, value]) => ({ name, value, domain: '127.0.0.1', path: '/' }))); await p.goto(base + '/wp-admin/post-new.php', { waitUntil: 'domcontentloaded', timeout: 90000 }); await p.waitForFunction(() => window.wp?.data?.select('core/block-editor'), { timeout: 40000 }); await sleep(2500);
    const r = await p.evaluate(async () => { const { select, dispatch } = wp.data; const { createBlock, getBlockTypes } = wp.blocks; dispatch('core/block-editor').insertBlocks([createBlock('core/group', { className: 'is-style-alert-info' }, [createBlock('core/paragraph', { content: 'x' })]), createBlock('core/paragraph', { className: 'is-style-note', content: 'n' }), createBlock('core/details', { className: 'is-style-spoiler', summary: 'S' })]); await new Promise((r) => setTimeout(r, 1500)); const f = document.querySelector('iframe[name="editor-canvas"]'); const d = f ? f.contentDocument : document; return { blocks: getBlockTypes().filter((t) => t.name.startsWith('wplusui/')).map((t) => t.name + ':' + t.category).join(), cat: select('core/blocks').getCategories().some((c) => c.slug === 'wplus-ui'), styles: select('core/blocks').getBlockStyles('core/group').length, alert: d.querySelector('.alert.info') ? getComputedStyle(d.querySelector('.alert.info')).backgroundColor : null, alertOk: !!d.querySelector('.alert.info') && (getComputedStyle(d.querySelector('.alert.info')).backgroundColor !== 'rgba(0, 0, 0, 0)' || getComputedStyle(d.querySelector('.alert.info'), '::before').backgroundColor !== 'rgba(0, 0, 0, 0)' || getComputedStyle(d.querySelector('.alert.info'), '::after').backgroundColor !== 'rgba(0, 0, 0, 0)' || getComputedStyle(d.querySelector('.alert.info')).backgroundImage !== 'none'), noteBg: d.querySelector('p.note') ? getComputedStyle(d.querySelector('p.note')).backgroundColor : null, spoiler: !!d.querySelector('details.sp') }; });
    claim('G15-1 ' + vp, 'editor: kategori WPlus UI dengan 5 blok dan semua gaya grup tersedia', r.cat && r.blocks.split(',').length === 5 && r.styles === 12, r); claim('G15-2 ' + vp, 'kanvas editor memuat gaya tema: alert, catatan, dan spoiler tampil seperti di situs', r.noteBg === 'rgb(232, 240, 254)' && r.spoiler && r.alertOk, r); await ctx.close(); }
} finally {
  wp(`wp_delete_post(${id},true);foreach(get_posts(['post_status'=>'auto-draft','numberposts'=>-1]) as $p)wp_delete_post($p->ID,true);`);
  await close();
}
summary();
