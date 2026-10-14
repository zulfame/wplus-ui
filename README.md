# WPlus UI for WordPress

WordPress theme forked from Plus UI (Fineshop Design) and adapted by Zulfadli Rizal.

- `wp-content/themes/wplus-ui`: the theme (see its `readme.txt` and `demo-content/README.md`).
- `wp-content/themes/wplus-ui-child`: child theme for custom CSS and PHP.
- `bin/build-zip.sh`: builds installable zips into `dist/`.

> Fork of a commercial Blogger template. Read [NOTICE.md](NOTICE.md) first: it explains what is licensed how and where the original code comes from. Branches and versions are described in [CONTRIBUTING.md](CONTRIBUTING.md).

## Release

```bash
bin/build-zip.sh          # runs `npm run build`, then zips both themes into dist/
git tag vX.Y.Z && git push origin vX.Y.Z   # the Release workflow attaches the zips
```

## Visual regression test

`tests/visual/run.mjs` loads the demo pages (desktop and mobile, light and dark) and compares the layout (bounding boxes of the main regions and of every post-body block) and sample colors with `tests/visual/baseline.json` (tolerance 1px).

```bash
npm install                   # puppeteer-core; set CHROME_PATH if Chrome is not in the default macOS path
npm run visual                # compare (site on http://127.0.0.1:8091 with the demo content)
npm run visual:update         # accept the current layout as the new baseline
node tests/visual/run.mjs http://127.0.0.1:8091 --only=home,post-docs
```

## JavaScript error check

`tests/visual/js-errors.mjs` opens 17 page types (home, posts, pages, archives, search, 404) at desktop and mobile width, uses them like a visitor (scroll, header search, appearance and bookmark panels, menu, carousel, load more, copy button) and fails on any uncaught JavaScript error, console error, own script/stylesheet/font that fails to load, script answered with HTML, or request to a Blogger feed. Run it before every release together with the visual regression.

```bash
npm run js-errors
node tests/visual/js-errors.mjs http://127.0.0.1:8091 --only=home,search --verbose
```

## Versioning

The theme has its own version (currently 1.7.0). The number of the source Blogger template (Plus UI v3.2.0) is only recorded as `Source` in the Template Information block at the top of `wp-content/themes/wplus-ui/assets/css/style.css`. A minor change raises the last number (1.7.0 -> 1.7.1). On every change update `Published`/`Updated` in that block, `Version` in `style.css`, `WPLUSUI_VERSION` in `functions.php`, `package.json`/`package-lock.json`, `Stable tag` and the changelog in `readme.txt`, `CHANGELOG.md`, and `Project-Id-Version` in `languages/wplus-ui.pot`. Releases 3.2.0 to 3.2.10 used the old numbering.
