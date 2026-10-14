// Generates the critical CSS files in wp-content/themes/wplus-ui/assets/css/critical/.
//
// Needs: a running site with demo content, Chrome, and `npm i puppeteer-core esbuild` somewhere on NODE_PATH.
// Set CRITICAL_SUFFIX=-box while the site has the box design on to generate the box set.
// Usage: CHROME_PATH="/path/to/chrome" node bin/critical-css.mjs http://127.0.0.1:8091 [post-id] [category-id]
// It keeps every rule of assets/css/style.min.css that matches an element in the first screen
// (390x844 and 1280x900), in the original rule order, then minifies the result.
import { execFileSync } from 'child_process';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const base = (process.argv[2] || 'http://127.0.0.1:8091').replace(/\/$/, '');
const suffix = process.env.CRITICAL_SUFFIX || '';
const urls = { home: base + '/', single: base + '/?p=' + (process.argv[3] || '27'), archive: base + '/?cat=' + (process.argv[4] || '2') };
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '../wp-content/themes/wplus-ui/assets/css/critical');
fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox'] });

const collector = () => {
  const vh = window.innerHeight, vw = window.innerWidth;
  const dyn = /:(hover|focus|focus-visible|focus-within|active|visited|target|link|any-link)\b/g;
  const pseudoEl = /::?(before|after|first-line|first-letter|placeholder|selection|marker|backdrop|-webkit-[\w-]+|-moz-[\w-]+|-ms-[\w-]+|scrollbar[\w-]*)/g;
  const inFold = new Set();
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    // Popups start hidden (display:none until the runtime is ready); their hiding rules must be inline
    // or they flash unstyled before the full stylesheet arrives.
    if (cs.display === 'none' && !/^(absolute|fixed)$/.test(cs.position)) continue;
    if (cs.display === 'none') { inFold.add(el); continue; }
    if (r.top < vh && r.bottom > -5000 && (r.width > 0 || r.height > 0 || el === document.documentElement || el === document.body)) inFold.add(el);
  }
  const foldArr = [...inFold];
  const cache = new Map();
  const matchSel = (sel) => {
    if (cache.has(sel)) return cache.get(sel);
    let s = sel.replace(pseudoEl, '').replace(dyn, '').trim();
    if (!s) s = '*';
    let ok = false;
    try { for (const el of foldArr) { if (el.matches(s)) { ok = true; break; } } } catch (e) { ok = true; }
    cache.set(sel, ok);
    return ok;
  };
  const keepStyle = (rule) => rule.selectorText.split(/,(?![^(]*\))/).some(s => matchSel(s.trim()));
  const out = [];
  let counter = 0;
  const walk = (rules, media) => {
    for (const r of rules) {
      const i = counter++;
      if (r.type === 1) { if (keepStyle(r)) out.push({ i, media, text: r.cssText }); }
      else if (r.type === 4) { walk(r.cssRules, (media ? media + ' and ' : '') + r.conditionText); }
      else if (r.type === 5 || r.type === 7) { out.push({ i, media, text: r.cssText }); }
      else if (r.type === 12) { walk(r.cssRules, media); }
    }
  };
  for (const sheet of document.styleSheets) {
    if (!sheet.href || !/style\.min\.css/.test(sheet.href)) continue;
    walk(sheet.cssRules, null);
  }
  return JSON.stringify(out);
};

for (const [key, url] of Object.entries(urls)) {
  const parts = [];
  for (const vp of [{ width: 390, height: 844 }, { width: 1280, height: 900 }]) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 1500));
    parts.push(await page.evaluate(collector));
    await page.close();
  }
  const byI = new Map();
  for (const p of parts) for (const it of JSON.parse(p)) if (!byI.has(it.i)) byI.set(it.i, it);
  const items = [...byI.values()].sort((x, y) => x.i - y.i);
  let css = '', cur = null, buf = [];
  const flush = () => { if (buf.length) css += (cur ? '@media ' + cur + '{' + buf.join('') + '}' : buf.join('')) + '\n'; buf = []; };
  for (const it of items) { if (it.media !== cur) { flush(); cur = it.media; } buf.push(it.text); }
  flush();
  fs.writeFileSync(`${outDir}/${key}${suffix}.css`, css);
  console.log(key, css.length);
}
await browser.close();

for (const key of Object.keys(urls)) {
  const f = `${outDir}/${key}${suffix}.css`;
  const min = execFileSync('npx', ['esbuild', '--loader=css', '--minify'], { input: fs.readFileSync(f), maxBuffer: 1 << 26 });
  fs.writeFileSync(f, min);
  console.log('minified', key, min.length);
}
