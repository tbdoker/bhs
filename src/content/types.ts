export type Pair = [string, string];
export type FinishId = "matte" | "soft" | "foil" | "uv" | "emboss";
export type ProductCat = "all" | "cards" | "stationery" | "catalogs" | "packaging" | "labels";
export type ProductId = "card" | "letter" | "envelope" | "catalog" | "notebook" | "box" | "bag" | "label" | "invite";
/** A run of words in the homepage statement; the number marks a production stage (0 = plain words). */
export type StatementSegment = [string, number];

type Meta = { title: string; description: string };

export interface Dictionary {
  meta: { siteName: string } & Record<"home" | "about" | "production" | "products" | "references" | "contact", Meta>;
  nav: { about: string; production: string; products: string; references: string; contact: string; menu: string; open: string; close: string; language: string };
  footer: { tagline: string; pages: string; contact: string; email: string; phone: string; address: string; legal: string; privacy: string; cookies: string };
  home: {
    videoLabel: string; scroll: string; tagline: string;
    eyebrow: string; titleA: string; titleB: string; sub: string; hint: string;
    cardLabel: string; cardName: string; cardTitle: string;
    lineEyebrow: string; lineTitle: string; allProducts: string; families: Pair[];
    finEyebrow: string; finA: string; finB: string; finSub: string; finishes: Record<FinishId, Pair>;
    prodEyebrow: string; prodLink: string; statement: StatementSegment[];
    refsEyebrow: string; refsLink: string;
    ctaA: string; ctaB: string; ctaSub: string; ctaBtn: string; whatsapp: string;
  };
  about: {
    eyebrow: string; titleA: string; titleB: string; sub: string; photo: string;
    storyTitle: string; story: string; storyPlaceholder: string; facts: Pair[];
    valuesEyebrow: string; valuesTitle: string; values: Pair[]; ctaTitle: string; ctaBtn: string;
  };
  production: {
    eyebrow: string; titleA: string; titleB: string; sub: string; chipMachine: string; chipCapacity: string;
    steps: Pair[]; ctaTitle: string; ctaBtn: string;
  };
  products: {
    eyebrow: string; titleA: string; titleB: string; sub: string; filterLabel: string;
    cats: Record<ProductCat, string>; items: Record<ProductId, Pair>; ctaTitle: string; ctaSub: string; ctaBtn: string;
  };
  references: { eyebrow: string; titleA: string; titleB: string; ctaTitle: string; ctaBtn: string };
  contact: {
    eyebrow: string; titleA: string; titleB: string; formTitle: string;
    name: string; company: string; email: string; phone: string; topic: string; topics: string[]; message: string;
    kvkkBefore: string; kvkkLink: string; kvkkAfter: string;
    send: string; thanksTitle: string; thanksSub: string; again: string; info: Pair[]; whatsapp: string; map: string;
  };
}
