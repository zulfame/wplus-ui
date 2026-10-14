// J01-J04: head tags by page type (desktop/mobile identical, server-side), JSON-LD, SEO plugin switch-off, fallback icon, LCP preload.
import * as L from './lib.mjs';
import { execFileSync } from 'child_process';
const { wp, mods, out, launch, close, base } = L;
const get = async (u) => (await (await fetch(base + u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/124' } })).text());
const head = (h) => h.match(/<head[\s\S]*?<\/head>/)[0];
const tags = (h) => ({
  desc: h.match(/<meta name="description" content="([^"]*)"/)?.[1]?.slice(0, 70) ?? null,
  og: [...h.matchAll(/<meta property="(og:[a-z_:]+)"/g)].map((m) => m[1]).join(','),
  ogImage: h.match(/og:image" content="([^"]*)"/)?.[1]?.split('/').pop() ?? null,
  tw: h.match(/twitter:card" content="([^"]*)"/)?.[1] ?? null,
  ld: [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])['@graph'].map((n) => n['@type']).join('+')),
  icon: /rel="icon"[^>]*wplus-ui-logo-square/.test(h) ? 'fallback' : /rel="icon"/.test(h) ? 'site-icon' : 'none',
  preload: /rel="preload" as="image"/.test(h),
});
// accordion FAQ post
const faq = `<!-- wp:details {"className":"is-style-accordion"} --><details class="wp-block-details is-style-accordion"><summary>Apa itu uji?</summary><!-- wp:paragraph --><p>Jawaban uji.</p><!-- /wp:paragraph --></details><!-- /wp:details -->`;
const fid = +wp(`kses_remove_filters();echo wp_insert_post(['post_title'=>'Uji FAQ','post_status'=>'publish','post_excerpt'=>'Ringkas <b>uji</b>','post_content'=>base64_decode('${Buffer.from('<!-- wp:group {"className":"is-style-accordion-group"} --><div class="wp-block-group is-style-accordion-group">' + faq + '</div><!-- /wp:group -->').toString('base64')}')]);`);
for (const [name, url] of Object.entries({ home: '/', single: '/?p=26', faq: '/?p=' + fid, page: '/?page_id=44', category: '/?cat=2', search: '/?s=Navigation', notfound: '/?p=999999' })) out('J ' + name, 'html', tags(head(await get(url))));
// first-slide thumbnail preload only on first page of home
out('J04 paged', 'html', tags(head(await get('/?paged=2'))).preload);
// SEO plugin active: simulate by defining the plugin constant before WordPress loads
const sim = (url) => execFileSync('php', ['-r', `define("WPSEO_VERSION","1");$_SERVER["HTTP_HOST"]="127.0.0.1:8091";$_SERVER["REQUEST_URI"]="${url}";parse_str(parse_url("${url}",PHP_URL_QUERY),$_GET);$_REQUEST=$_GET;require "${L.root}/wp-load.php";wp();ob_start();do_action("wp_head");$h=ob_get_clean();echo json_encode(["og"=>substr_count($h,"og:"),"ld"=>substr_count($h,"ld+json"),"desc"=>substr_count($h,"name=\\"description\\""),"active"=>wplusui_seo_plugin_active()]);`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
out('J01/J02 plugin active', 'php', sim('/?p=26'));
out('J01/J02 plugin off', 'php', execFileSync('php', ['-r', `$_SERVER["HTTP_HOST"]="127.0.0.1:8091";$_SERVER["REQUEST_URI"]="/?p=26";$_GET["p"]=26;$_REQUEST=$_GET;require "${L.root}/wp-load.php";wp();ob_start();do_action("wp_head");$h=ob_get_clean();echo json_encode(["og"=>substr_count($h,"og:"),"ld"=>substr_count($h,"ld+json"),"desc"=>substr_count($h,"name=\\"description\\"")]);`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
// custom logo vs site icon: with a site icon the fallback is not printed
out('J03 site icon', 'php', wp(`$o=get_option('site_icon');update_option('site_icon',139);ob_start();wp();$x=has_site_icon();update_option('site_icon',$o);echo var_export($x,true),' (restored ',var_export($o,true),')';`));
wp(`wp_delete_post(${fid},true);`);
