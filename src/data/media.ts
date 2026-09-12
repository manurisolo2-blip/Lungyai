import type { YouTubeVideo } from "@/components/YouTubeFacade";

/* Ambient hero loop: public-domain wok footage, 480p WebM transcode from Wikimedia Commons. */
export const HERO_VIDEO = {
  src: "/media/wok-flames-480p.webm",
  poster: "/media/wok-flames-poster.jpg",
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
