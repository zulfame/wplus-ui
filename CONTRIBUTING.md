# Contributing

## Branches

- `main` is the only long-lived branch: the stable, releasable code. Every release is cut from `main`.
- Versions are marked with **tags** (`v1.7.0`, `v1.7.1`, ...) and GitHub Releases, not with branches.
- Work happens on short-lived branches, merged into `main` by pull request and then deleted:
  - `fix/<slug>` for bug fixes (for example `fix/carousel-offset`)
  - `feature/<slug>` for new features (for example `feature/cookie-notice`)
- A `release/1.7` branch is created only when `main` has moved on to 1.8 and 1.7 still needs a patch (1.7.x).

## Versions

Semantic versions: the last number (`1.7.2` to `1.7.3`) for fixes and small changes, the middle one (`1.8.0`) for new features, the first (`2.0.0`) for breaking changes. The number of the source template (Plus UI v3.2.0) is only recorded as `Source` in the Template Information block, never as the theme version.

On every release update the version in:

- `wp-content/themes/wplus-ui/style.css`, `functions.php` (`WPLUSUI_VERSION`), `package.json` and `package-lock.json`
- the `Version` and `Updated` lines of the Template Information block in `assets/css/style.css` (it is repeated; change every copy)
- `readme.txt` (stable tag and changelog), `CHANGELOG.md` and `languages/wplus-ui.pot` (`Project-Id-Version`)

## The changelog is written for users

`CHANGELOG.md` is the text people read in WordPress (the update screens) and on the release page, so keep it short and plain: three to eight lines per version, each starting with `New:`, `Fix:`, `Improved:` or `Safe:`. No file names, test names, constants or CSS details, and no mention of where the update comes from. Developer detail belongs in the commit message and in `docs/`. Every version needs a `## X.Y.Z - YYYY-MM-DD` section: the Release workflow stops when the tag has none.

## Checks before a pull request

```bash
npm install                  # in the repo root and in wp-content/themes/wplus-ui
npm run build                # in wp-content/themes/wplus-ui: minified CSS/JS
npm run visual               # layout regression
npm run js-errors            # JavaScript error check
```

PHP follows the WordPress coding standards (`phpcs --standard=WordPress-Extra,WordPress-Docs`); CI runs it on every push. New texts need an entry in `languages/wplus-ui.pot`; the `trace-klmn` check fails when one is missing.

## Releasing

1. Run the whole gate, one script at a time (they share one local site, so never in parallel and do not edit files meanwhile): every `node tests/docs/<name>.mjs` (`trace-a`, `trace-a6`, `trace-b`, `trace-c`, `trace-d`, `trace-ef`, `trace-g`, `trace-hij`, `trace-klmn`, `trace-cookie`, `trace-update`, `trace-demo`, `bugs-pdf-1`, `bugs-pdf-2`, `bugs-pdf-3`, `claims-config`, `claims-defaults`, `claims-cd`), then `npm run visual` and `npm run js-errors`. Everything must pass. `node tests/docs/trace-report.mjs` rebuilds `docs/TRACE.md` from the results.
2. Update the version everywhere (see Versions) and write the `CHANGELOG.md` section.
3. Commit and push to `main`, and wait for CI to pass.
4. Tag and push: `git tag -a vX.Y.Z -m "WPlus UI X.Y.Z" && git push origin vX.Y.Z`. The Release workflow builds three zips (theme, child theme, `wplus-ui-demo-X.Y.Z.zip` with the sample content) and publishes the release with the changelog section as its text.
5. Check the release: the zips match the working tree, the theme zip has no `demo-content/`, and a site on the previous version is offered the update and installs it from **Appearance → Themes**.

The theme zip must stay small: sample content and pictures live in `demo-content/` (kept out of the zip by `.distignore`) and ship as the demo pack.
