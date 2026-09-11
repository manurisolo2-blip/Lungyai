/*
  The six parts come straight from the restaurant's menu description of khao soi:
  "Fresh egg noodles in golden curry, crispy noodles, coriander and red onion.
   Braised beef, chicken breast or chicken drumstick."
  Images are square crops of Wikimedia Commons photos (credited below).
*/

const DIR = "/images/khao-soi-parts";

export interface KhaoSoiPart {
  id: string;
  name: string;
  thai: string;
  note: string;
  image: string;
  /** Where the part lands on the ring, in degrees clockwise from the right. */
  angle: number;
}

export const KHAO_SOI_BOWL = {
  image: `${DIR}/bowl`,
  alt: "A bowl of khao soi seen from above, with braised beef, crispy noodles and green onion in orange curry",
};

export const KHAO_SOI_PARTS: KhaoSoiPart[] = [
  { id: "curry", name: "Golden curry", thai: "น้ำแกง", note: "Coconut curry broth.", image: `${DIR}/curry`, angle: -90 },
  { id: "egg-noodles", name: "Fresh egg noodles", thai: "บะหมี่", note: "Soft noodles under the curry.", image: `${DIR}/egg-noodles`, angle: -30 },
  { id: "crispy-noodles", name: "Crispy noodles", thai: "บะหมี่กรอบ", note: "Fried noodles on top, for crunch.", image: `${DIR}/crispy-noodles`, angle: 30 },
  { id: "beef", name: "Beef or chicken", thai: "เนื้อหรือไก่", note: "Braised beef, chicken breast or drumstick.", image: `${DIR}/beef`, angle: 90 },
  { id: "red-onion", name: "Red onion", thai: "หอมแดง", note: "Sliced raw, for a sharp bite.", image: `${DIR}/red-onion`, angle: 150 },
  { id: "coriander", name: "Coriander", thai: "ผักชี", note: "Fresh leaves to finish.", image: `${DIR}/coriander`, angle: 210 },
];

export const KHAO_SOI_CREDITS = [
  {
    label: "Khao soi bowl, curry, egg noodles and beef (cropped)",
    credit: "Takeaway",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Khao_soi_nuea_Fueng_Fah.jpg",
  },
  {
    label: "Red onion and coriander (cropped)",
    credit: "T.Tseng",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Khao_soi_kai_-_LA_California_-_2014-08-15_-_002.jpg",
  },
  {
    label: "Crispy noodles (cropped)",
    credit: "Ryan Snyder",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Khao_soi_topping_(5357372763).jpg",
  },
];
