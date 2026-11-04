import tr from "./tr";
import en from "./en";
import type { Locale } from "./routes";

export const dictionaries = { tr, en };
export const getDictionary = (locale: Locale) => dictionaries[locale];

/** Client logos, shared by the homepage strip and the References page. Sizes balance their visual weight. */
export const REFERENCES = [
  { name: "Tête-à-Tête Cafeteria", src: "/refs/tete.png", w: 796, h: 710, strip: 108, tile: 58 },
  { name: "JOS Atelier", src: "/refs/jos.png", w: 1114, h: 683, strip: 58, tile: 30 },
  { name: "NETTA", src: "/refs/netta.png", w: 1200, h: 429, strip: 64, tile: 30 },
  { name: "Keller Williams Türkiye", src: "/refs/kw.png", w: 1200, h: 405, strip: 40, tile: 17 },
];

/** Replace with the real number (country code, no plus or spaces) once it is set up. */
export const WHATSAPP_URL = "https://wa.me/905000000000";
