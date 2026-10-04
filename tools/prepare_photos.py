#!/usr/bin/env python3
"""Turn camera originals into web-ready photos for a gallery.

For every input photo this writes two files into --out:

    <name>.jpg      2000px on the long edge — lightbox and hero
    <name>-sm.jpg    960px on the long edge — gallery grid

and prints a line to paste into the site's photo list, with the
real width and height filled in (the gallery needs them to lay
rows out without cropping).

All metadata is dropped on the way through: camera EXIF carries
capture times and, from phones, GPS coordinates. Rotation is baked
into the pixels first, so nothing ends up sideways.

    python3 tools/prepare_photos.py --out sites/rory/assets/img \\
        ~/Downloads/"Kitchen 003.jpg" ~/Downloads/"Garden 002.jpg"

Needs Pillow:  pip install pillow
"""
import argparse
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

SIZES = (("", 2000, 84), ("-sm", 960, 80))


def slug(stem):
    return re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")


def save(im, path, long_edge, quality, icc):
    im = im.copy()
    im.info = {}  # newer Pillow re-saves XMP from here if it's left in
    im.thumbnail((long_edge, long_edge), Image.LANCZOS)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True,
            subsampling="4:2:0", icc_profile=icc)
    return im.size


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("photos", nargs="+", type=Path)
    ap.add_argument("--out", required=True, type=Path, help="the site's assets/img folder")
    ap.add_argument("--name", action="append", default=[],
                    help="output name for the matching photo (repeatable); defaults to a slug of the filename")
    args = ap.parse_args()

    args.out.mkdir(parents=True, exist_ok=True)
    names = args.name + [None] * (len(args.photos) - len(args.name))

    for src, name in zip(args.photos, names):
        name = name or slug(src.stem)
        with Image.open(src) as raw:
            icc = raw.info.get("icc_profile")
            im = ImageOps.exif_transpose(raw).convert("RGB")
        for suffix, edge, quality in SIZES:
            w, h = save(im, args.out / f"{name}{suffix}.jpg", edge, quality, icc)
            if suffix == "":
                full = (w, h)
        caption = re.sub(r"[\s_-]*\d+$", "", src.stem).strip() or name
        print(f'    {{ src: "{name}.jpg", w: {full[0]}, h: {full[1]}, '
              f'caption: "{caption}", alt: "" }},')

    print(f"\nWrote {len(args.photos) * 2} files to {args.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
