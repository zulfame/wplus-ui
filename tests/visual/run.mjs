// Layout and color regression check for the WPlus UI theme.
//
// It loads the demo pages in Chrome (logged out), at desktop and mobile width, in light and
// dark mode, and records bounding boxes of the main regions and of every block in the post
// body, plus computed colors of sample elements. The result is compared with
// tests/visual/baseline.json (tolerance 1px).
//
//   node tests/visual/run.mjs http://127.0.0.1:8091            compare with the baseline
//   node tests/visual/run.mjs http://127.0.0.1:8091 --update   rewrite the baseline
//   add --only=home,post-docs to check or update just those pages
//
// Needs `npm install` in the repo root (puppeteer-core) and Chrome (CHROME_PATH).
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = (process.argv[2] || 'http://127.0.0.1:8091').replace(/\/$/, '');
const update = process.argv.includes('--update');
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const baselineFile = path.join(here, 'baseline.json');
const TOL = 1;

const pages = {
  home: '/',
  'home-page-2': '/?paged=2',
  'post-components': '/?name=ui-components-and-typography',
  'post-docs': '/?name=getting-started-and-installation',
  'post-tabs': '/?name=tabs-post',
  'post-split': '/?name=split-post',
  'post-product': '/?name=product-post',
  about: '/?pagename=about-2',
  category: '/?category_name=documentation',
  search: '/?s=pagination',
  'not-found': '/?name=this-page-does-not-exist',
};
const viewports = { desktop: { width: 1280, height: 900 }, mobile: { width: 390, height: 844 } };

const collector = () => {
  const R = (el) => { const r = el.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)]; };
  const regions = ['.mainH', '.headL', '.headR', '.headS', '.navS', '.ntfC', '.mainC', '.mainB', '.blogB', '.sideB', '.mainF', '.sldW', '#FeaturedPost01', '#Blog01', '.blogP', '.blogN', '#Label01', '#PopularPosts01', '#related', '.pCmnts', '.brdCmb', 'h1.pTtl', '.pInf', '#share', '.ldW', '.erroP'];
  const out = { regions: {}, body: [], cards: [], widths: { scrollW: document.documentElement.scrollWidth } };
  for (const s of regions) { const el = document.querySelector(s); if (el) out.regions[s] = R(el); }
  const body = document.querySelector('#postBody');
  if (body) out.body = [...body.children].map((c) => { const r = R(c); return [r[1], r[3], c.tagName]; });
  out.cards = [...document.querySelectorAll('.blogP .ntry')].slice(0, 12).map((c) => R(c));
  return out;
};

const colorProbe = () => {
  const sels = ['body', '.mainH', '.mainF', '.ntry .pTtl a', '.pJmp', '.sideB .title', '#postBody h2', '#postBody .note', '#postBody .alert', '#postBody .button', '#postBody details.ac', '#postBody blockquote', '#postBody pre', '.adB'];
  const out = {};
  for (const s of sels) { const el = document.querySelector(s); if (!el) continue; const c = getComputedStyle(el); out[s] = [c.color, c.backgroundColor, c.borderTopColor].join('|'); }
  return out;
};

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox'] });
const result = {};
for (const [key, p] of Object.entries(pages)) {
  if (only.length && !only.includes(key)) continue;
  result[key] = {};
  for (const [vpName, vp] of Object.entries(viewports)) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.setRequestInterception(true);
    page.on('request', (req) => { const u = req.url(); if (!u.startsWith(baseUrl)) req.abort(); else req.continue(); }); // only the site itself: no fonts/avatars/embeds
    const resp = await page.goto(baseUrl + p, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => window.scrollBy(0, 30));
    await new Promise((r) => setTimeout(r, 1800));
    // freeze the carousel on slide 1 and hide the greeting (changes with the time of day)
    await page.evaluate(() => { const r = document.querySelector('#ciImage01'); if (r) r.checked = true; document.querySelectorAll('#postGreeting, .pGV').forEach((e) => e.remove()); });
    const entry = { status: resp.status() };
    entry.layout = await page.evaluate(collector);
    if (vpName === 'desktop') {
      entry.colors = {};
      for (const mode of ['light', 'dark']) {
        await page.evaluate((m) => { const b = document.querySelector(m === 'dark' ? '.drkB' : '.lgtB'); if (b) b.click(); }, mode);
        await new Promise((r) => setTimeout(r, 700));
        entry.colors[mode] = await page.evaluate(colorProbe);
      }
    }
    result[key][vpName] = entry;
    await page.close();
  }
}
await browser.close();

if (update || !fs.existsSync(baselineFile)) {
  const merged = fs.existsSync(baselineFile) && only.length ? { ...JSON.parse(fs.readFileSync(baselineFile, 'utf8')), ...result } : result;
  fs.writeFileSync(baselineFile, JSON.stringify(merged, null, 1));
  console.log('Baseline written:', baselineFile);
  process.exit(0);
}

const baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8'));
const diffs = [];
const cmpNum = (a, b) => Math.abs(a - b) <= TOL;
for (const key of Object.keys(baseline)) {
  if (!result[key]) continue;
  for (const vp of Object.keys(baseline[key])) {
    const A = baseline[key][vp], B = result[key]?.[vp];
    if (!B) { diffs.push(`${key}/${vp}: missing`); continue; }
    if (A.status !== B.status) diffs.push(`${key}/${vp}: status ${A.status} -> ${B.status}`);
    for (const [s, ra] of Object.entries(A.layout.regions)) {
      const rb = B.layout.regions[s];
      if (!rb) { diffs.push(`${key}/${vp}: region ${s} missing`); continue; }
      if (!ra.every((v, i) => cmpNum(v, rb[i]))) diffs.push(`${key}/${vp}: ${s} [${ra}] -> [${rb}]`);
    }
    for (const s of Object.keys(B.layout.regions)) if (!A.layout.regions[s]) diffs.push(`${key}/${vp}: new region ${s}`);
    if (A.layout.body.length !== B.layout.body.length) diffs.push(`${key}/${vp}: body blocks ${A.layout.body.length} -> ${B.layout.body.length}`);
    else A.layout.body.forEach((a, i) => { const b = B.layout.body[i]; if (!cmpNum(a[0], b[0]) || !cmpNum(a[1], b[1]) || a[2] !== b[2]) diffs.push(`${key}/${vp}: body[${i}] ${a[2]} top/height ${a[0]}/${a[1]} -> ${b[0]}/${b[1]}`); });
    if (A.layout.cards.length !== B.layout.cards.length) diffs.push(`${key}/${vp}: cards ${A.layout.cards.length} -> ${B.layout.cards.length}`);
    else A.layout.cards.forEach((a, i) => { if (!a.every((v, j) => cmpNum(v, B.layout.cards[i][j]))) diffs.push(`${key}/${vp}: card[${i}] [${a}] -> [${B.layout.cards[i]}]`); });
    if (A.layout.widths.scrollW !== B.layout.widths.scrollW) diffs.push(`${key}/${vp}: scrollWidth ${A.layout.widths.scrollW} -> ${B.layout.widths.scrollW}`);
    if (A.colors) for (const mode of ['light', 'dark']) for (const [s, v] of Object.entries(A.colors[mode])) if (B.colors[mode][s] !== v) diffs.push(`${key}/${vp}/${mode}: color ${s} ${v} -> ${B.colors[mode][s]}`);
  }
}
if (diffs.length) { console.log(`FAIL: ${diffs.length} difference(s)`); diffs.slice(0, 60).forEach((d) => console.log(' -', d)); process.exit(1); }
console.log(`OK: ${Object.keys(result).length} pages x ${Object.keys(viewports).length} viewports match the baseline.`);
