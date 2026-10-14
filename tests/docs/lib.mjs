// Shared helpers for the documentation cross-tests: change theme settings through PHP, load pages in
// desktop (1280x720) and mobile (390x844) Chrome, and print JSON evidence.
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const root = path.join(here, '../..');
export const base = process.env.BASE || 'http://127.0.0.1:8091';
export const VP = {
  desktop: { width: 1280, height: 720, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const php = (code, args = []) =>
  execFileSync('php', ['-r', `$_SERVER["HTTP_HOST"]="127.0.0.1:8091"; require "${root}/wp-load.php"; ${code}`, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

/** Set (or with null remove) theme mods. */
export const mods = (obj) => php('foreach(json_decode($argv[1],true) as $k=>$v){ if($v===null) remove_theme_mod($k); else set_theme_mod($k,$v);} echo "ok";', [JSON.stringify(obj)]);
/** Run PHP and return its output. */
export const wp = (code) => php(code);

let browser;
export const launch = async () => {
  browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox'] });
  return browser;
};
export const close = async () => browser && (await browser.close());

/** Open a page in a viewport; returns the page after the runtime had time to start. */
export const open = async (url, vp = 'desktop', { scheme = 'light', wait = 1500, hour = null } = {}) => {
  // A fresh browser profile per page, so a visitor's saved choices from an earlier scenario do not leak in.
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  page._ctx = ctx;
  await page.setViewport(VP[vp]);
  // Headless Chrome announces itself as a bot, which makes the theme runtime skip its interactive part.
  await page.setUserAgent(vp === 'mobile'
    ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
    : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  if (hour !== null) await page.evaluateOnNewDocument((h) => { Date.prototype.getHours = () => h; }, hour);
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
  await page.goto(url.startsWith('http') ? url : base + url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.mouse.move(40, 40);
  await new Promise((r) => setTimeout(r, wait));
  return page;
};
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const out = (id, vp, data) => console.log(`${id} [${vp}] ${JSON.stringify(data)}`);

// Claim checks: one line per claim, PASS or FAIL, counted so a run ends with a summary. Items are also written to
// /tmp/trace/<script>.json so tests/docs/trace-report.mjs can build docs/TRACE.md from the real results.
import fs from 'fs';
export const tally = { pass: 0, fail: 0, failed: [], items: [] };
export const claim = (id, text, ok, detail = '') => {
  const m = /^([A-N]\d\d-\d+[a-z]?)(?: (desktop|mobile))?$/.exec(id.trim());
  tally.items.push({ id: m ? m[1] : id, vp: m ? (m[2] || '-') : '-', text, ok: !!ok, detail: ok ? '' : JSON.stringify(detail).slice(0, 300) });
  if (ok) tally.pass++; else { tally.fail++; tally.failed.push(id + ' ' + text); }
  console.log(`${ok ? 'PASS' : 'FAIL'} ${id} ${text}${ok ? '' : '  -> ' + JSON.stringify(detail)}`);
};
export const summary = () => {
  console.log(`SUMMARY pass=${tally.pass} fail=${tally.fail}${tally.fail ? ' :: ' + tally.failed.join(' | ') : ''}`);
  try { fs.mkdirSync('/tmp/trace', { recursive: true }); fs.writeFileSync('/tmp/trace/' + path.basename(process.argv[1], '.mjs') + '.json', JSON.stringify(tally.items)); } catch (e) { /* the report is optional */ }
};
/** Run fn with theme mods set (null removes one) and restore the previous values afterwards. */
export const withMods = async (obj, fn) => {
  const saved = JSON.parse(wp(`$o=[];foreach(array_keys(json_decode($argv[1],true)) as $k)$o[$k]=get_theme_mod($k,null);echo json_encode($o);`.replace('$argv[1]', "'" + JSON.stringify(obj).replace(/'/g, "\\'") + "'")));
  mods(obj);
  try { return await fn(); } finally { mods(saved); }
};
