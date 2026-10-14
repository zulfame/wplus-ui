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
