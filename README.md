# WPlus UI for WordPress

A fast, clean WordPress blog theme with light and dark mode, 16 color schemes, a carousel and pinned post, popup comments, bookmarks, an optional cookie notice and block editor support. It is a WordPress fork of **Plus UI v3.2.0** by Fineshop Design, adapted by Zulfadli Rizal.

> Read [NOTICE.md](NOTICE.md) first: it explains what is licensed how and where the original code comes from.

Requires WordPress 6.3 or newer and PHP 7.4 or newer.

## Install

1. Download `wplus-ui-<version>.zip` from the [latest release](../../releases/latest).
2. In WordPress open **Appearance → Themes → Add New → Upload Theme**, choose the zip, install and activate it.
3. Optional: install `wplus-ui-child-<version>.zip` the same way if you want a child theme for your own CSS and PHP.
4. Optional: for a sample site, open **Appearance → WPlus UI Demo** and press **Download demo content**. The sample content is not part of the theme zip, to keep the theme small (about 1 MB).

All settings are in **Appearance → Customize** (the sections start with "WPlus UI").

## Updating

WordPress tells you when a new version is out: **Appearance → Themes** shows the notice, and **Appearance → WPlus UI Update** shows your version, the latest version and what is new. Press **Update now** (automatic updates can be switched on there too). Your settings are kept.

The theme asks the releases of this repository for the latest version, at most every 12 hours. Only the IP address of the site and the theme version are visible to the server; the download is checked against its checksum before it is installed. To turn it off add `define( 'WPLUSUI_DISABLE_UPDATES', true );` to `wp-config.php`.

## Documentation

In Indonesian, in [`docs/`](docs/README.md): [PANDUAN.md](docs/PANDUAN.md) (how to use every feature), [FITUR.md](docs/FITUR.md) (all features, where to set them, defaults), [KONFIGURASI.md](docs/KONFIGURASI.md) (server and plugin advice) and the test records [CEKLIS.md](docs/CEKLIS.md) and [TRACE.md](docs/TRACE.md). The theme's own `readme.txt` has the changelog and the privacy note.

## What is in this repository

- `wp-content/themes/wplus-ui`: the theme.
- `wp-content/themes/wplus-ui-child`: the child theme.
- `bin/build-zip.sh`: builds the installable zips into `dist/` (theme, child theme and the demo pack).
- `bin/release-notes.sh`: prints the text of one version from `CHANGELOG.md` (it becomes the text of the GitHub release).
- `tests/`: the checks described below. `docs/`: the documentation (not part of the theme zip).

## Development

Branches, versions and the release steps are in [CONTRIBUTING.md](CONTRIBUTING.md).

The tests run against a local WordPress that has the theme and its demo content (a site at `http://127.0.0.1:8091` in the author's setup) and need `npm install` in the repository root (puppeteer-core) and Chrome (`CHROME_PATH` if it is not in the default macOS path).

```bash
npm run visual               # layout regression of 11 pages x 2 widths against tests/visual/baseline.json
npm run visual:update        # accept the current layout as the new baseline
npm run js-errors            # JavaScript errors and failed scripts over 17 page types, desktop and mobile
node tests/docs/trace-a.mjs  # one of the feature checks in tests/docs (every claim in docs/FITUR.md)
```

`tests/visual/run.mjs` compares the bounding boxes of the main regions and of every post-body block, plus sample colors, with a 1 px tolerance. `tests/visual/js-errors.mjs` uses each page like a visitor (scroll, header search, appearance and bookmark panels, menu, carousel, load more, copy button) and fails on any uncaught error, console error, own script, stylesheet or font that fails to load, or script answered with HTML.

## License

The WordPress-specific code is released under the GNU General Public License v2 or later (see the theme's `LICENSE`); code that comes from Plus UI stays the work of its authors. Details in [NOTICE.md](NOTICE.md).
