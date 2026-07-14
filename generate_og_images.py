#!/usr/bin/env python3
"""
Rasterizes every SVG game logo in games/ into a PNG suitable for use as an
og:image / twitter:image (Discord, Twitter, Facebook, etc. don't reliably
render SVG in link previews).

Each SVG logo (e.g. games/snake-logo.svg) gets a matching PNG sibling
(games/snake-logo-og.png) at 1024x1024. The original SVG files are left
untouched -- they're still used for on-site UI (game cards, etc).

Idempotent: safe to re-run any time a logo SVG changes; it will just
re-render the PNG.

Requires: pip install cairosvg --break-system-packages

Usage: run from the repo root (same folder as games.json's parent):
    python3 generate_og_images.py
"""
import json
import sys
from pathlib import Path

try:
    import cairosvg
except ImportError:
    sys.exit(
        "Missing dependency 'cairosvg'.\n"
        "Install it with: pip install cairosvg --break-system-packages"
    )

ROOT = Path(__file__).resolve().parent
GAMES_DIR = ROOT / "games"
OG_SIZE = 1024  # px, square -- plenty large for Discord/Twitter/FB cards

with open(GAMES_DIR / "games.json", encoding="utf-8") as f:
    games = json.load(f)


def main():
    converted = 0
    skipped = 0

    for game in games:
        logo = game.get("logo", "")
        if not logo.lower().endswith(".svg"):
            continue  # already a raster logo, nothing to do

        svg_path = GAMES_DIR / logo
        if not svg_path.exists():
            print(f"  [skip] {game['id']}: logo file not found -> {svg_path}")
            skipped += 1
            continue

        png_name = svg_path.stem + "-og.png"  # e.g. snake-logo.svg -> snake-logo-og.png
        png_path = GAMES_DIR / png_name

        cairosvg.svg2png(
            url=str(svg_path),
            write_to=str(png_path),
            output_width=OG_SIZE,
            output_height=OG_SIZE,
        )
        print(f"  [ok]   {game['id']:16s} {logo:24s} -> games/{png_name}")
        converted += 1

    print(f"\nDone. Converted {converted} logo(s), skipped {skipped}.")


if __name__ == "__main__":
    main()
