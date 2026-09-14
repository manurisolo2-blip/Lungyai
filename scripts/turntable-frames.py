#!/usr/bin/env python3
"""
Frames for the turning khao soi bowl, cut out of a turntable clip shot on a white background.

    python scripts/turntable-frames.py bowl.mp4 public/media/khao-soi-turn --set 900:64 --set 720:36

Each --set is WIDTH:COUNT and writes COUNT transparent frames, evenly spaced through the clip,
to OUT/WIDTH/000.avif and 000.webp and on. Needs ffmpeg on PATH, numpy and Pillow with AVIF.

How the cut-out works: the camera is locked and a bowl's outline does not change while it turns,
so the brightest value each pixel reaches across the whole clip keeps the bowl and drops anything
that comes and goes, such as what a background remover leaves behind (a plate rim, a spoon).
A bowl is symmetric, so each row of that outline is trimmed to its narrower half, which cuts off
leftovers that stayed stuck to one side. The outline is kept fully opaque, white rim included.
Above the rim, where the crispy noodles move, every frame is keyed against white on its own.
"""
import argparse
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

WHITE_CUTOFF = 252  # a darkest channel above this is background
# Distance from white where the noodle key goes from clear to solid. The ramp is wide so the soft
# edge of a strand stays partly clear and loses its white, instead of turning into a pale outline.
KEY_LOW, KEY_HIGH = 10, 110


def video_size(video):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", video],
        capture_output=True, text=True, check=True,
    ).stdout
    width, height = out.strip().split(",")[:2]
    return int(width), int(height)


def frames(video, width, height):
    proc = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-i", video, "-an", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        stdout=subprocess.PIPE,
    )
    size = width * height * 3
    while True:
        buf = proc.stdout.read(size)
        if len(buf) < size:
            break
        yield np.frombuffer(buf, np.uint8).reshape(height, width, 3)
    proc.wait()


def grow(mask, steps):
    out = mask.copy()
    for _ in range(steps):
        step = out.copy()
        step[1:] |= out[:-1]
        step[:-1] |= out[1:]
        step[:, 1:] |= out[:, :-1]
        step[:, :-1] |= out[:, 1:]
        out = step
    return out


def flood(mask, seed):
    """Pixels of mask connected to seed (x, y)."""
    # copy(): an image made by fromarray is read-only, and floodfill would drop its writes.
    canvas = Image.fromarray(np.where(mask, 255, 0).astype(np.uint8)).copy()
    ImageDraw.floodfill(canvas, seed, 128)
    return np.asarray(canvas) == 128


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("video")
    parser.add_argument("out")
    parser.add_argument("--set", action="append", required=True, help="WIDTH:COUNT")
    # Picked by eye against each other on the noodles: these two look the same at 1x.
    parser.add_argument("--avif-quality", type=int, default=60)
    parser.add_argument("--webp-quality", type=int, default=72)
    args = parser.parse_args()
    sets = [tuple(int(n) for n in s.split(":")) for s in args.set]
    width, height = video_size(args.video)

    # Pass 1: what every frame shares, and everything any frame shows.
    brightest = darkest = None
    total = 0
    for frame in frames(args.video, width, height):
        low = frame.min(axis=2)
        if brightest is None:
            brightest, darkest = low.copy(), low.copy()
        else:
            np.maximum(brightest, low, out=brightest)
            np.minimum(darkest, low, out=darkest)
        total += 1

    # The bowl: the solid region under the middle of the static shape, with its holes filled.
    solid = brightest <= WHITE_CUTOFF
    ys, xs = np.nonzero(solid)
    nearest = np.argmin((ys - ys.mean()) ** 2 + (xs - xs.mean()) ** 2)
    bowl = flood(solid, (int(xs[nearest]), int(ys[nearest])))
    padded = np.pad(~bowl, 1, constant_values=True)
    bowl = ~flood(padded, (0, 0))[1:-1, 1:-1]
    # Opening: shave off thin spurs where a leftover touched the bowl in every frame.
    bowl = grow(~grow(~bowl, 3), 3)

    # Mirror: the foot gives the axis, and every row keeps its narrower half on both sides.
    rows = np.nonzero(bowl.any(axis=1))[0]
    foot = [np.nonzero(bowl[y])[0] for y in range(rows[-1] - 30, rows[-1] - 1)]
    centre = float(np.median([(xs[0] + xs[-1]) / 2 for xs in foot if len(xs)]))
    half = np.full(height, -1.0)
    for y in rows:
        xs = np.nonzero(bowl[y])[0]
        half[y] = min(centre - xs[0], xs[-1] - centre)
    bowl = np.abs(np.arange(width)[None, :] - centre) <= half[:, None]

    core = ~grow(~bowl, 2)
    blurred = Image.fromarray(bowl.astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(0.8))
    static_alpha = np.where(core, 1.0, np.asarray(blurred, np.float32) / 255)

    rim_row = int(np.argmax(bowl.sum(axis=1)))
    # Below the rim the outline is the grey body, so a pixel on its edge that is white in a given
    # frame is background showing through, and is dropped frame by frame.
    edge = bowl & grow(~bowl, 3)
    edge[:rim_row] = False

    # Where the noodles can rise above the rim: above the widest row of the outline, within its width,
    # and only where something ever appears.
    bx = np.nonzero(bowl.any(axis=0))[0]
    zone = np.zeros_like(bowl)
    zone[:rim_row, bx[0]:bx[-1] + 1] = True
    # Includes the outline's soft outer edge, so a strand crossing the rim line stays solid there.
    zone &= grow(darkest <= WHITE_CUTOFF - 5, 6) & ~core

    ys, xs = np.nonzero(bowl | zone)
    pad = 8
    left, top = max(int(xs.min()) - pad, 0), max(int(ys.min()) - pad, 0)
    right, bottom = min(int(xs.max()) + pad + 1, width), min(int(ys.max()) + pad + 1, height)

    picks = {}
    for set_width, count in sets:
        (Path(args.out) / str(set_width)).mkdir(parents=True, exist_ok=True)
        for n, index in enumerate(np.round(np.linspace(0, total - 1, count)).astype(int)):
            picks.setdefault(int(index), []).append((set_width, n))

    # Pass 2: cut out the picked frames.
    written = {(set_width, fmt): 0 for set_width, _ in sets for fmt in ("avif", "webp")}
    for index, frame in enumerate(frames(args.video, width, height)):
        if index not in picks:
            continue
        rgb = frame.astype(np.float32)
        distance = 255 - rgb.min(axis=2)
        key = np.clip((distance - KEY_LOW) / (KEY_HIGH - KEY_LOW), 0, 1)
        alpha = np.maximum(static_alpha, np.where(zone, key, 0))
        alpha = np.where(edge, alpha * np.clip((distance - 2) / 10, 0, 1), alpha)
        # Take the white out of edge pixels, so the outline does not glow on a coloured page.
        colour = np.clip((rgb - (1 - alpha[..., None]) * 255) / np.maximum(alpha, 1e-3)[..., None], 0, 255)
        rgba = np.dstack([colour, alpha * 255]).round().astype(np.uint8)[top:bottom, left:right]
        image = Image.fromarray(rgba, "RGBA").convert("RGBa")
        for set_width, n in picks[index]:
            set_height = round(set_width * (bottom - top) / (right - left))
            sized = image.resize((set_width, set_height), Image.LANCZOS).convert("RGBA")
            base = Path(args.out) / str(set_width) / f"{n:03d}"
            sized.save(base.with_suffix(".avif"), "AVIF", quality=args.avif_quality, speed=6)
            sized.save(base.with_suffix(".webp"), "WEBP", quality=args.webp_quality, method=4)
            for fmt in ("avif", "webp"):
                written[(set_width, fmt)] += base.with_suffix(f".{fmt}").stat().st_size

    print(f"{total} frames read, crop {right - left}x{bottom - top} at ({left}, {top}), axis x {centre:.1f}, rim row {rim_row}")
    for set_width, count in sets:
        set_height = round(set_width * (bottom - top) / (right - left))
        sizes = ", ".join(f"{fmt} {written[(set_width, fmt)] / 1024:.0f} KB" for fmt in ("avif", "webp"))
        print(f"  {set_width}x{set_height}: {count} frames, {sizes}")


if __name__ == "__main__":
    main()
