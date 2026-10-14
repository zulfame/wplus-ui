// JavaScript error check for the WPlus UI theme (a release gate, like the visual regression run).
//
// It opens the main page types at desktop (1280x720) and mobile (390) width, uses the page the way a visitor
// would (mouse, scroll, header search, appearance and bookmark panels, menu, carousel, load more, table of
// contents, share, comments) and fails when anything goes wrong:
//   - an uncaught JavaScript error (pageerror) or a console error
//   - a script, stylesheet or font of this site that cannot be loaded, or a script answered with HTML
//   - a request to a Blogger feed (the original live search; WordPress has none)
// Requests to other hosts that fail (offline machine, blocked ad or avatar host) only produce a warning.
//
//   node tests/visual/js-errors.mjs http://127.0.0.1:8091
//   add --only=home,search to check a few pages, --verbose to print every page, --allow=text to ignore a message
//
// Needs `npm install` in the repo root (puppeteer-core) and Chrome (CHROME_PATH).
import puppeteer from 'puppeteer-core';

const baseUrl = (process.argv[2] || 'http://127.0.0.1:8091').replace(/\/$/, '');
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const allow = process.argv.filter((a) => a.startsWith('--allow=')).map((a) => a.slice(8));
const verbose = process.argv.includes('--verbose');
const host = new URL(baseUrl).host;

const pages = {
  home: '/',
  'home-page-2': '/?paged=2',
  'post-components': '/?name=ui-components-and-typography',
  'post-docs': '/?name=getting-started-and-installation',
  'post-tabs': '/?name=tabs-post',
  'post-split': '/?name=split-post',
  'post-split-page-2': '/?name=split-post&page=2',
  'post-product': '/?name=product-post',
  about: '/?pagename=about-2',
  contact: '/?pagename=contact',
  category: '/?category_name=documentation',
  tag: '/?tag=featured',
  author: '/?author=1',
  date: '/?m=202410',
  search: '/?s=pagination',
  'search-empty': '/?s=zzzxxyy',
  'not-found': '/?name=this-page-does-not-exist',
};
const viewports = {
  desktop: { width: 1280, height: 720, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const agents = {
  desktop: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  mobile: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Things a visitor does; every step is optional (the element may not exist on every page).
const interact = async (page, vp) => {
  const click = (sel) => page.evaluate((s) => { const e = document.querySelector(s); if (e) e.click(); return !!e; }, sel);
  await page.mouse.move(60, 60); await sleep(1200); // the theme runtime starts after the first interaction
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await sleep(700);
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(300);
  // header search: type three letters and press Enter-less, like a visitor thinking
  if (vp === 'mobile') await click('label.tSrch');
  const box = await page.$('#forSearch');
  if (box) { await box.focus(); await page.keyboard.type('lor', { delay: 60 }); await sleep(1500); await page.evaluate(() => { const i = document.getElementById('forSearch'); if (i) { i.value = ''; i.blur(); } }); }
  // panels
  for (const sel of ['label[for=forAppearance]', '.aprW .drkB', '.aprW .lgtB', 'label.thmB', '.thmP .csB3', 'label[for=forBookmark]', '.bm-button', 'label[for=forShare]', 'label[for=forComments], .cmBtn', 'label.tocH']) {
    await click(sel); await sleep(250);
  }
  await page.keyboard.press('Escape'); await sleep(200);
  // menu, carousel, load more, spoiler/accordion, copy button
  await click(vp === 'mobile' ? 'label[for=forNavigation]' : '.headL .tNav'); await sleep(300);
  await click('.sldW .sldN label'); await sleep(300);
  await click('#blog-pager button.jsLd'); await sleep(1500);
  await click('#postBody details summary'); await sleep(200);
  await click('#postBody pre button'); await sleep(200);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2)); await sleep(500);
};

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox'] });
let failures = 0, warnings = 0, checked = 0;
try {
  for (const [name, url] of Object.entries(pages)) {
    if (only.length && !only.includes(name)) continue;
    for (const vp of Object.keys(viewports)) {
      const ctx = await browser.createBrowserContext();
      const page = await ctx.newPage();
      await page.setViewport(viewports[vp]); await page.setUserAgent(agents[vp]);
      const problems = [], notes = [];
      const mainUrl = baseUrl + url;
      page.on('pageerror', (e) => problems.push('JavaScript error: ' + e.message.split('\n')[0].slice(0, 160)));
      page.on('console', (m) => { if (m.type() === 'error') { const t = m.text(); if (!/Failed to load resource/.test(t)) problems.push('console error: ' + t.slice(0, 160)); } });
      page.on('requestfailed', (r) => { const u = new URL(r.url()); const msg = `${r.failure()?.errorText || 'failed'}: ${r.url().slice(0, 110)}`; if (u.host === host && !/ERR_ABORTED/.test(msg)) problems.push('request failed ' + msg); else if (u.host !== host) notes.push('other host: ' + msg); });
      page.on('response', (r) => {
        const u = new URL(r.url()); const t = r.request().resourceType(); const ct = r.headers()['content-type'] || '';
        if (/\/feeds\/posts\//.test(r.url())) problems.push('request to a Blogger feed: ' + r.url().slice(0, 110));
        if (u.host === host && r.url() !== mainUrl && r.status() >= 400 && ['script', 'stylesheet', 'font', 'xhr', 'fetch'].includes(t)) problems.push(`HTTP ${r.status()} for ${t}: ${r.url().slice(0, 110)}`);
        if (u.host === host && t === 'script' && /html/.test(ct) && r.status() < 300) problems.push('script answered with HTML: ' + r.url().slice(0, 110));
      });
      try {
        await page.goto(mainUrl, { waitUntil: 'networkidle0', timeout: 60000 });
        await interact(page, vp);
      } catch (e) { problems.push('page could not be used: ' + e.message.slice(0, 120)); }
      const shown = problems.filter((p) => !allow.some((a) => p.includes(a)));
      checked++; failures += shown.length ? 1 : 0; warnings += notes.length ? 1 : 0;
      if (shown.length) console.log(`FAIL ${name}/${vp}\n` + [...new Set(shown)].map((p) => '   - ' + p).join('\n'));
      else if (verbose) console.log(`ok   ${name}/${vp}${notes.length ? ' (warnings: ' + [...new Set(notes)].slice(0, 2).join('; ') + ')' : ''}`);
      await ctx.close();
    }
  }
} finally {
  await browser.close();
}
console.log(failures ? `FAIL: ${failures} of ${checked} page checks have JavaScript or script-loading problems.` : `OK: ${checked} page checks (desktop and mobile) without JavaScript errors${warnings ? `; ${warnings} with warnings about other hosts (use --verbose)` : ''}.`);
process.exit(failures ? 1 : 0);
