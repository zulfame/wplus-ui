// PANDUAN: which heading levels reach the table of contents.
import * as L from './lib.mjs';
const { wp, open, out, launch, close } = L;
await launch();
const c = '<!-- wp:heading {"level":1} --><h1>H1 uji</h1><!-- /wp:heading --><!-- wp:heading --><h2>H2 uji</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>H3 uji</h3><!-- /wp:heading --><!-- wp:heading {"level":4} --><h4>H4 uji</h4><!-- /wp:heading --><!-- wp:heading {"level":5} --><h5>H5 uji</h5><!-- /wp:heading --><!-- wp:paragraph --><p>x</p><!-- /wp:paragraph -->';
const id = +wp(`echo wp_insert_post(['post_title'=>'Uji TOC','post_status'=>'publish','post_content'=>base64_decode('${Buffer.from(c).toString('base64')}')]);`);
const p = await open('/?p=' + id, 'desktop', { wait: 2000 });
out('TOC levels', 'desktop', await p.evaluate(() => [...document.querySelectorAll('#postToc .tocIn a')].map((a) => a.textContent)));
await p._ctx.close(); wp(`wp_delete_post(${id},true);`);
await close();
