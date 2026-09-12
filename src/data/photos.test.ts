import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PHOTOS, STOREFRONT_PHOTO } from "./photos";
import { MENU } from "./restaurant";
import { KHAO_SOI_BOWL, KHAO_SOI_PARTS } from "./khaoSoi";

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
  it("has an image for the bowl and every part", () => {
    const missing = [KHAO_SOI_BOWL.image, ...KHAO_SOI_PARTS.map((part) => part.image)]
      .flatMap((base) => [`${base}.jpg`, `${base}-600.webp`])
      .filter((file) => !existsSync(publicPath(file)));
    expect(missing).toEqual([]);
  });

  it("spreads the parts around the ring without repeating an angle", () => {
    const angles = KHAO_SOI_PARTS.map((part) => part.angle);
    expect(new Set(angles).size).toBe(angles.length);
  });
});
