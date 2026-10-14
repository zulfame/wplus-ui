# Contributing

## Branches

- `main` is the only long-lived branch: the stable, releasable code. Every release is cut from `main`.
- Versions are marked with **tags** (`v1.7.0`, `v1.7.1`, ...) and GitHub Releases, not with branches.
- Work happens on short-lived branches, merged into `main` by pull request and then deleted:
  - `fix/<slug>` for bug fixes (for example `fix/carousel-offset`)
  - `feature/<slug>` for new features (for example `feature/cookie-notice`)
- A `release/1.7` branch is created only when `main` has moved on to 1.8 and 1.7 still needs a patch (1.7.1, 1.7.2, ...).

## Versions

Semantic versions: `1.7.1` for fixes and small changes, `1.8.0` for new features, `2.0.0` for breaking changes. On every change update the version in `wp-content/themes/wplus-ui/style.css`, `functions.php` (`WPLUSUI_VERSION`), `package.json` and `package-lock.json`, the `Updated` date in the Template Information block of `assets/css/style.css`, `readme.txt` (stable tag and changelog), `CHANGELOG.md` and `languages/wplus-ui.pot`.

## Checks before a pull request

```bash
npm install                  # in the repo root and in wp-content/themes/wplus-ui
npm run build                # in wp-content/themes/wplus-ui: minified CSS/JS
npm run visual               # layout regression (needs the demo site, see README)
npm run js-errors            # JavaScript error check
```

PHP follows the WordPress coding standards (`phpcs --standard=WordPress-Extra,WordPress-Docs`); CI runs it on every push.
