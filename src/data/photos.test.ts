import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PHOTOS, STOREFRONT_PHOTO } from "./photos";
import { MENU } from "./restaurant";
import { KHAO_SOI_PARTS, KHAO_SOI_TURN } from "./khaoSoi";
import { HERO_VIDEO } from "./media";

/*
  Photos are referenced by string keys, so a rename or a retired file would only show up
  as a hole on the page. These walk the data and the public folder together.
*/

const publicPath = (src: string) => `public${src}`;

describe("dish photos", () => {
  it("every photo key on the menu exists in the photo data", () => {
    const missing = MENU.flatMap((section) => section.dishes)
      .map((dish) => dish.photo)
      .filter((key): key is string => Boolean(key))
      .filter((key) => !PHOTOS[key]);
    expect(missing).toEqual([]);
  });

  it("ships every size it promises, in all three formats", () => {
    const missing: string[] = [];
    for (const photo of [...Object.values(PHOTOS), STOREFRONT_PHOTO]) {
      if (!existsSync(publicPath(`${photo.base}.jpg`))) missing.push(`${photo.base}.jpg`);
      for (const width of photo.widths) {
        for (const format of ["webp", "avif"]) {
          const file = `${photo.base}-${width}.${format}`;
          if (!existsSync(publicPath(file))) missing.push(file);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("credits every photo it uses", () => {
    const uncredited = [...Object.values(PHOTOS), STOREFRONT_PHOTO].filter(
      (photo) => !photo.credit || !photo.sourceUrl || !photo.alt
    );
    expect(uncredited).toEqual([]);
  });
});

describe("khao soi breakdown", () => {
  it("has an image for every part", () => {
    const missing = KHAO_SOI_PARTS.map((part) => part.image)
      .flatMap((base) => [`${base}.jpg`, `${base}-600.webp`])
      .filter((file) => !existsSync(publicPath(file)));
    expect(missing).toEqual([]);
  });

  it("ships every frame of the turning bowl in both formats, at the size the data gives", () => {
    for (const frames of Object.values(KHAO_SOI_TURN.sizes)) {
      const expected = Array.from({ length: frames.count }, (_, index) => String(index).padStart(3, "0"))
        .flatMap((name) => [`${name}.avif`, `${name}.webp`])
        .sort();
      expect(readdirSync(publicPath(frames.dir)).sort()).toEqual(expected);

      // The canvas takes its shape from the data, so it has to match the files. Extended WebP
      // header: canvas width and height minus one, 24-bit little endian, at bytes 24 and 27.
      const header = readFileSync(publicPath(`${frames.dir}/000.webp`));
      expect(header.toString("ascii", 12, 16)).toBe("VP8X");
      expect([header.readUIntLE(24, 3) + 1, header.readUIntLE(27, 3) + 1]).toEqual([frames.width, frames.height]);
    }
  });

  it("spreads the parts around the ring without repeating an angle", () => {
    const angles = KHAO_SOI_PARTS.map((part) => part.angle);
    expect(new Set(angles).size).toBe(angles.length);
  });
});

describe("hero video", () => {
  it("ships the clip and the poster, and index.html preloads that same poster", () => {
    const missing = [HERO_VIDEO.src, HERO_VIDEO.poster].filter((src) => !existsSync(publicPath(src)));
    expect(missing).toEqual([]);
    expect(readFileSync("index.html", "utf8")).toContain(`href="${HERO_VIDEO.poster}"`);
  });
});
