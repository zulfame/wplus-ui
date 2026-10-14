// G01-G10, G13, G14: one post with every block style and custom block; checks classes, markup and no horizontal overflow.
import * as L from './lib.mjs';
const { wp, open, out, launch, close, sleep } = L;
await launch();
const reg = JSON.parse(wp(`$o=[];foreach(WP_Block_Styles_Registry::get_instance()->get_all_registered() as $b=>$ss){foreach($ss as $s)if(!in_array($b,['core/button','core/image','core/separator','core/site-logo','core/social-links','core/quote'])||strpos($s['name'],'quote-')===0)$o[$b][]=$s['name'].'='.$s['label'];}echo json_encode($o);`));
for (const [b, v] of Object.entries(reg)) out('G styles', b, v.join(' | '));
const b = (name, attrs, inner) => `<!-- wp:${name} ${attrs ? JSON.stringify(attrs) : ''} -->${inner}<!-- /wp:${name} -->`;
const para = (s, t) => b('paragraph', { className: 'is-style-' + s }, `<p class="is-style-${s}">${t}</p>`);
const grp = (s) => b('group', { className: 'is-style-' + s }, `<div class="wp-block-group is-style-${s}">${b('paragraph', null, `<p><strong>T ${s}</strong><br>Teks ${s}</p>`)}</div>`);
const det = (s) => b('details', { className: 'is-style-' + s }, `<details class="wp-block-details is-style-${s}"><summary>Ringkas ${s}</summary>${b('paragraph', null, '<p>Isi rinci</p>')}</details>`);
const img = (i) => b('image', null, `<figure class="wp-block-image"><img src="${'http://127.0.0.1:8091/wp-content/uploads/2026/10/wplus-ui-logo-square.webp'}" alt="g${i}"/></figure>`);
const gal = (s, n) => b('gallery', { className: 'is-style-' + s }, `<figure class="wp-block-gallery has-nested-images columns-default is-cropped is-style-${s}">${Array.from({ length: n }, (_, i) => img(i)).join('')}</figure>`);
const content = [
  ...['note', 'note-warning', 'indent', 'reference'].map((s) => para(s, 'Paragraf ' + s)),
  ...['alert', 'alert-info', 'alert-success', 'alert-warning', 'alert-error', 'alert-info-outline', 'alert-success-outline', 'alert-warning-outline', 'alert-error-outline', 'alert-outline', 'accordion-group', 'related-links'].map(grp),
  b('list', { ordered: true, className: 'is-style-steps' }, '<ol class="wp-block-list is-style-steps">' + ['A', 'B'].map((t) => b('list-item', null, `<li>${t}</li>`)).join('') + '</ol>'),
  b('table', { className: 'is-style-data-table' }, '<figure class="wp-block-table is-style-data-table"><table><thead><tr><th>H1</th><th>H2</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table></figure>'),
  ...['quote-highlight', 'quote-icon'].map((s) => b('quote', { className: 'is-style-' + s }, `<blockquote class="wp-block-quote is-style-${s}">${b('paragraph', null, '<p>Kutipan</p>')}<cite>Sumber</cite></blockquote>`)),
  ...['accordion', 'accordion-alt', 'spoiler'].map(det),
  gal('image-grid', 3), gal('image-hidden', 6), gal('image-scroll', 4),
  b('wplusui/tabs', { sticky: true }, '<div class="wp-block-wplusui-tabs">' + b('wplusui/tab', { title: 'Satu' }, '<p>Isi satu</p>') + b('wplusui/tab', { title: 'Dua' }, '<p>Isi dua</p>') + '</div>'),
  b('wplusui/download', { type: 'pdf', name: 'laporan.pdf', size: '1MB', url: 'https://example.com/laporan.pdf' }, ''),
  b('wplusui/toc', { title: 'Isi', open: true }, ''),
  b('wplusui/youtube', { videoId: 'dQw4w9WgXcQ' }, ''),
  b('buttons', null, '<div class="wp-block-buttons">' + b('button', null, '<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#">Isi</a></div>') + b('button', { className: 'is-style-outline' }, '<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="#">Garis</a></div>') + '</div>'),
  b('shortcode', null, '[pu_tabs][pu_tab title="Sat"]Satu[/pu_tab][pu_tab title="Dua"]Dua[/pu_tab][/pu_tabs]'),
  '<!-- wp:heading --><h2 class="wp-block-heading">Judul bagian</h2><!-- /wp:heading -->',
].join('\n');
const b64 = Buffer.from(content).toString('base64');
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji blok','post_status'=>'publish','post_content'=>base64_decode('${b64}')]);`);
for (const vp of ['desktop', 'mobile']) {
  const p = await open('/?p=' + id, vp, { wait: 2500 });
  out('G render', vp, await p.evaluate(() => {
    const q = (s) => document.querySelectorAll('#postBody ' + s).length;
    const cls = (s) => [...document.querySelectorAll('#postBody ' + s)].map((e) => e.className);
    const over = [...document.querySelectorAll('#postBody *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && !e.closest('pre,.tableW,.psImg,.scrImg,.tabs,table')).slice(0, 5).map((e) => e.tagName + '.' + e.className);
    return {
      notes: cls('p.note'), indent: q('p.pIndent'), ref: q('p.pRef'),
      alerts: cls('div.alert').map((c) => c.replace('wp-block-group is-style-', '').split(' ').filter((x) => !x.startsWith('wp-') && !x.startsWith('is-')).join('.')),
      showH: q('.showH'), relate: q('.pRelate'), steps: q('ol.steps'), table: cls('table'), quote: cls('blockquote'), det: cls('details'),
      grids: cls('.psImg, .scrImg, .imgs').slice(0, 6), showAll: q('.btImg label'), imgs: q('img'),
      tabsEls: q('.tabs'), tabLabels: [...document.querySelectorAll('#postBody .tabs label')].map((l) => l.dataset.text), tabsCls: cls('.tabs'),
      dl: { box: q('.dlBox'), type: document.querySelector('.dlBox .fT')?.dataset.text, name: document.querySelector('.dlBox .fN span')?.textContent, href: document.querySelector('.dlBox a')?.href, html: document.querySelector('.dlBox')?.outerHTML.slice(-150) },
      toc: { details: q('details.toc'), items: q('.aToc a') }, yt: q('.lazyYt'), btn: cls('a.button'),
      over, docOver: document.documentElement.scrollWidth > innerWidth + 1,
    };
  }));
  await p.screenshot({ path: `/tmp/g1-${vp}.png`, fullPage: true });
  await p._ctx.close();
}
wp(`update_option('wplusui_test_g',${id});`);
await close();
