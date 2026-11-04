export type Locale = "tr" | "en";
export type PageKey = "home" | "about" | "production" | "products" | "references" | "contact";

/** Turkish lives at the root, English under /en, each with its own native slugs. */
export const ROUTES: Record<PageKey, Record<Locale, string>> = {
  home: { tr: "/", en: "/en" },
  about: { tr: "/hakkimizda", en: "/en/about" },
  production: { tr: "/uretim", en: "/en/production" },
  products: { tr: "/urunler", en: "/en/products" },
  references: { tr: "/referanslar", en: "/en/references" },
  contact: { tr: "/iletisim", en: "/en/contact" },
};

export const href = (page: PageKey, locale: Locale) => ROUTES[page][locale];

/** Search engines get each page's counterpart in the other language. */
export function alternates(page: PageKey, locale: Locale) {
  return {
    canonical: ROUTES[page][locale],
    languages: { tr: ROUTES[page].tr, en: ROUTES[page].en, "x-default": ROUTES[page].tr },
  };
}
