import type { YouTubeVideo } from "@/components/YouTubeFacade";

/*
  Ambient hero loop: public-domain wok footage from Wikimedia Commons, cut to the twelve
  seconds with the flames and re-encoded here as H.264 (790 KB, down from a 4.3 MB WebM).
  AV1 was tried and dropped: at any size below this file it left block seams in the flames.
*/
export const HERO_VIDEO = {
  src: "/media/wok-flames.mp4",
  poster: "/media/wok-flames-poster.webp",
  label: "Wok video in the header",
  credit: "Benoît Prieur",
  license: "CC0",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Cuisine_au_wok_au_Sun_Sep_(Beynost).webm",
};

/* One visit filmed by a food creator. Verified through YouTube oEmbed; embedding allowed. */
export const VISIT_VIDEO: YouTubeVideo = {
  id: "-WdMRaZuZ9c",
  caption: "Crazy Thai tapas at Lung Yai",
  title: "Crazy Thai Tapas - Lung Yai Miami",
  author: "Bryan Ocampo",
  authorUrl: "https://www.youtube.com/@huntgoodstuff",
};
