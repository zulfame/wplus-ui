// L01 with the real WooCommerce: shop, product, cart, checkout, my account in light and dark at 1280 and 390; screenshots in /tmp/woo-*.
import * as L from './lib.mjs';
const { open, wp, mods, out, launch, close, sleep, VP, base } = L;
const b = await launch();
const saved = wp(`echo json_encode(get_theme_mod('wplusui_default_mode',null));`);
const probe = () => ({ h1: (document.querySelector('.pS h1, .postBody h1, h1.product_title, .woocommerce-products-header h1, h1.pTtl')?.textContent || document.querySelector('h1')?.textContent || '').trim().slice(0, 30), over: document.documentElement.scrollWidth > innerWidth + 1, cards: [...document.querySelectorAll('ul.products li.product')].map((l) => { const r = l.getBoundingClientRect(); return Math.round(r.width) + 'x' + Math.round(r.height); }).join(','), mode: document.documentElement.className.includes('drK') || document.body.className.includes('drK') ? 'dark' : 'light' });
for (const mode of ['light', 'dark']) {
  mods({ wplusui_default_mode: mode });
  for (const vp of ['desktop', 'mobile']) {
    const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport(VP[vp]);
    await p.setUserAgent(vp === 'mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
    const go = async (name, url, wait = 1500) => { await p.goto(base + url, { waitUntil: 'networkidle0', timeout: 60000 }); await p.mouse.move(40, 40); await sleep(wait); out(`Woo ${name} ${mode}`, vp, await p.evaluate(probe)); await p.screenshot({ path: `/tmp/woo-${name}-${mode}-${vp}.png`, fullPage: name !== 'cart' && name !== 'checkout' }); };
    await go('shop', '/?page_id=274');
    await go('product', '/?product=produk-uji-b');
    await p.click('.single_add_to_cart_button'); await sleep(2500);
    await go('cart', '/?page_id=275', 2500);
    await go('checkout', '/?page_id=276', 2500);
    await go('account', '/?page_id=277');
    await ctx.close();
  }
}
mods({ wplusui_default_mode: JSON.parse(saved) });
await close();
