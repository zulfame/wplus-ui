#!/usr/bin/env bash
# Build installable zips of the WPlus UI theme and its child theme into dist/.
# Usage: bin/build-zip.sh [--no-assets]   (--no-assets skips `npm run build`)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
THEMES="$ROOT/wp-content/themes"
DIST="$ROOT/dist"

if [[ "${1:-}" != "--no-assets" && -f "$THEMES/wplus-ui/package.json" ]]; then
	(cd "$THEMES/wplus-ui" && npm install --no-audit --no-fund --silent && npm run build --silent)
fi

version() { sed -n 's/^Version:[[:space:]]*//p' "$1/style.css" | head -1 | tr -d '\r'; }

mkdir -p "$DIST"
for theme in wplus-ui wplus-ui-child; do
	src="$THEMES/$theme"
	[[ -d "$src" ]] || continue
	ver="$(version "$src")"
	out="$DIST/$theme-$ver.zip"
	rm -f "$out"
	tmp="$(mktemp -d)"
	rsync -a --exclude-from=<(cat "$src/.distignore" 2>/dev/null; printf '.distignore\nnode_modules/\n.DS_Store\n') "$src/" "$tmp/$theme/"
	(cd "$tmp" && zip -qr "$out" "$theme")
	rm -rf "$tmp"
	echo "$out ($(du -h "$out" | cut -f1))"
done

# The demo content (sample posts, pictures, import script) is not part of the theme zip: it is its own, optional zip in
# the same release, which the theme downloads from Appearance > WPlus UI Demo when the owner asks for it.
demo_src="$THEMES/wplus-ui/demo-content"
if [[ -d "$demo_src" ]]; then
	ver="$(version "$THEMES/wplus-ui")"
	out="$DIST/wplus-ui-demo-$ver.zip"
	rm -f "$out"
	tmp="$(mktemp -d)"
	rsync -a --exclude '.DS_Store' "$demo_src/" "$tmp/wplus-ui-demo/"
	(cd "$tmp" && zip -qr "$out" wplus-ui-demo)
	rm -rf "$tmp"
	echo "$out ($(du -h "$out" | cut -f1))"
fi
