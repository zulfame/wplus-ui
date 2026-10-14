// FITUR.md claims of groups E and G not yet measured: icons at every menu level, quick-links scrolling, sticky table header, YouTube ratio, download link attributes, quote citation markup, alert icons.
import * as L from './lib.mjs';
const { wp, open, launch, close, claim, summary, sleep } = L;
await launch();
const b = (name, attrs, inner) => `<!-- wp:${name} ${attrs ? JSON.stringify(attrs) : ''} -->${inner}<!-- /wp:${name} -->`;
const rows = Array.from({ length: 40 }, (_, i) => `<tr><td>${i}</td><td>x</td></tr>`).join('');
const content = [
  b('table', { className: 'is-style-data-table mh300' }, `<figure class="wp-block-table is-style-data-table mh300"><table><thead><tr><th>H1</th><th>H2</th></tr></thead><tbody>${rows}</tbody></table></figure>`),
  b('wplusui/youtube', { videoId: 'dQw4w9WgXcQ', ratio: '4 / 3' }, ''),
  b('wplusui/download', { type: 'zip', name: 'a.zip', size: '1MB', url: 'https://example.com/a.zip' }, ''),
  b('quote', { className: 'is-style-quote-highlight' }, '<blockquote class="wp-block-quote is-style-quote-highlight"><!-- wp:paragraph --><p>K</p><!-- /wp:paragraph --><cite>Penulis</cite></blockquote>'),
  ...['alert-info', 'alert-success', 'alert-warning', 'alert-error'].map((s) => b('group', { className: 'is-style-' + s }, `<div class="wp-block-group is-style-${s}"><!-- wp:paragraph --><p><strong>T</strong><br>x</p><!-- /wp:paragraph --></div>`)),
].join('\n');
const id = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji klaim','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(content).toString('base64')}')]);`);
const mid = +wp(`$m=wp_create_nav_menu('Uji klaim');$a=function($t,$args=[])use($m){return wp_update_nav_menu_item($m,0,array_merge(['menu-item-title'=>$t,'menu-item-status'=>'publish','menu-item-type'=>'custom','menu-item-url'=>'#'],$args));};$par=$a('Induk');$k=$a('Anak ikon',['menu-item-parent-id'=>$par]);update_post_meta($k,'_wplusui_menu_icon','mail');$g=$a('Cucu ikon',['menu-item-parent-id'=>$k]);update_post_meta($g,'_wplusui_menu_icon','home');$a('Anak otomatis',['menu-item-parent-id'=>$par]);$a('Anak tanpa',['menu-item-parent-id'=>$par]);$n=$a('X');
$all=wp_get_nav_menu_items($m);foreach($all as $it)if($it->title==='Anak tanpa')update_post_meta($it->ID,'_wplusui_menu_icon','none');
$loc=get_nav_menu_locations();update_option('wplusui_test_loc',$loc);$loc['primary']=$m;set_theme_mod('nav_menu_locations',$loc);echo $m;`);
try {
  for (const vp of ['desktop', 'mobile']) {
    let p = await open('/?p=' + id, vp, { wait: 2500 });
    const r = await p.evaluate(() => {
      const th = document.querySelector('#postBody table thead th'); const wrap = th.closest('figure, .tableW, div');
      const yt = document.querySelector('.lazyYt'); const dl = document.querySelector('.dlBox a'); const q = document.querySelector('#postBody blockquote');
      const ic = (cls) => { const e = document.querySelector('.alert.' + cls); const cs = getComputedStyle(e, '::before'); const w = e.querySelector('svg, img'); return cs.content !== 'none' || !!w || getComputedStyle(e.querySelector('p, strong, div') || e, '::before').content !== 'none'; };
      return { thPos: getComputedStyle(th).position, thTop: getComputedStyle(th).top, ratio: yt && getComputedStyle(yt).getPropertyValue('--ratio').trim() + '|' + getComputedStyle(yt).aspectRatio, dl: dl && [dl.target, dl.rel, dl.getAttribute('aria-label')], cite: q && [!!q.querySelector('cite'), q.lastElementChild?.tagName], alerts: ['info', 'success', 'warning', 'error'].map(ic) };
    });
    const st = await p.evaluate(() => { const f0 = document.querySelector('#postBody figure.table'); const th = f0.querySelector('thead'); const f = [f0, ...f0.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 20 && /auto|scroll/.test(getComputedStyle(e).overflowY)) || f0; f.scrollTo({ top: 400, behavior: 'instant' }); const fr = f.getBoundingClientRect(); const tr = th.getBoundingClientRect(); return { maxH: getComputedStyle(f).maxHeight, ov: getComputedStyle(f).overflowY, thead: getComputedStyle(th).position, offset: Math.round(tr.top - fr.top), scrolled: f.scrollTop }; });
    claim('G03 ' + vp, 'Data table dengan kelas tambahan mh300: tinggi dibatasi 300px, isi digulir dan header tetap di atas kotak', st.maxH === '300px' && /auto|scroll/.test(st.ov) && st.thead === 'sticky' && st.offset <= 2 && st.scrolled > 0, st);
    claim('G10 ' + vp, 'rasio kustom 4 / 3 dipakai pemutar', /4 \/ 3/.test(r.ratio || ''), r.ratio);
    claim('G08 ' + vp, 'tautan unduh: tab baru, nofollow noreferrer noopener, aria-label', r.dl && r.dl[0] === '_blank' && /nofollow/.test(r.dl[1]) && /noopener/.test(r.dl[1]) && r.dl[2] === 'Download', r.dl);
    claim('G04 ' + vp, 'sitasi kutipan menjadi <span> (bukan <cite>)', r.cite && r.cite[0] === false && r.cite[1] === 'SPAN', r.cite);
    claim('G02 ' + vp, 'tiap jenis alert punya ikon otomatis', r.alerts.every(Boolean), r.alerts);
    // E02/E06 on the temporary menu
    p = await open('/?page_id=44', vp, { wait: 1500 });
    const m = await p.evaluate(() => { const find = (t) => [...document.querySelectorAll('.mnMn li')].find((l) => new RegExp('^' + t).test((l.querySelector(':scope > a, :scope > label')?.textContent || '').trim())); const svg = (l) => !!l.querySelector(':scope > a > svg, :scope > label > svg'); return { child: svg(find('Anak ikon')), grand: svg(find('Cucu ikon')), auto: svg(find('Anak otomatis')), none: svg(find('Anak tanpa')) }; });
    claim('E02 ' + vp, 'ikon pilihan tampil di anak dan cucu; sub-item tanpa pilihan tidak berikon (hanya tingkat atas memakai ikon folder bawaan); No icon tanpa ikon', m.child && m.grand && !m.auto && !m.none, m);
    await p._ctx.close();
  }
  // E06: quick links row scrolls sideways when it does not fit (phone), and stays one line
  for (const vp of ['desktop', 'mobile']) {
    const p = await open('/', vp);
    const q = await p.evaluate(() => { const n = document.querySelector('.navS'); const u = n.querySelector('ul'); const cs = getComputedStyle(n); return { ox: cs.overflowX + '/' + getComputedStyle(u).overflowX, scrolls: Math.max(n.scrollWidth - n.clientWidth, u.scrollWidth - u.clientWidth), h: Math.round(n.getBoundingClientRect().height) }; });
    claim('E06 ' + vp, vp === 'mobile' ? 'baris tautan cepat bisa digeser mendatar di ponsel' : 'baris tautan cepat satu baris', vp === 'mobile' ? q.scrolls > 0 && /auto|scroll/.test(q.ox) : q.h < 80, q);
    await p._ctx.close();
  }
} finally {
  wp(`wp_delete_post(${id},true);set_theme_mod('nav_menu_locations',get_option('wplusui_test_loc'));delete_option('wplusui_test_loc');wp_delete_nav_menu(${mid});`);
  await close();
}
summary();
