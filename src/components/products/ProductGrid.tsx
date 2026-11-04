"use client";

import { useEffect, useRef, useState } from "react";
import ProductArt from "./ProductArt";
import { Grain } from "../Icons";
import type { Pair, ProductCat, ProductId } from "@/content/types";

const CATS: ProductCat[] = ["all", "cards", "stationery", "catalogs", "packaging", "labels"];
const ITEMS: { id: ProductId; cat: Exclude<ProductCat, "all"> }[] = [
  { id: "card", cat: "cards" }, { id: "letter", cat: "stationery" }, { id: "envelope", cat: "stationery" },
  { id: "catalog", cat: "catalogs" }, { id: "notebook", cat: "stationery" }, { id: "box", cat: "packaging" },
  { id: "bag", cat: "packaging" }, { id: "label", cat: "labels" }, { id: "invite", cat: "cards" },
];

export default function ProductGrid({ filterLabel, cats, items }: { filterLabel: string; cats: Record<ProductCat, string>; items: Record<ProductId, Pair> }) {
  const [cat, setCat] = useState<ProductCat>("all");
  const bar = useRef<HTMLDivElement>(null);
  // The edge fade only shows while there is more to scroll to
  const updateFade = () => {
    const el = bar.current;
    if (el) el.classList.toggle("at-end", el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };
  useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, []);
  const pick = (c: ProductCat, el: HTMLButtonElement) => {
    setCat(c);
    el.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  };
  const shown = ITEMS.filter((it) => cat === "all" || it.cat === cat);
  return (
    <>
      <div className="filters" ref={bar} onScroll={updateFade} role="group" aria-label={filterLabel}>
        {CATS.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={(e) => pick(c, e.currentTarget)}>{cats[c]}</button>)}
      </div>
      <div className="products" aria-live="polite">
        {shown.map(({ id, cat: c }) => (
          <article key={id} className="product">
            <div className="product__stage" aria-hidden>
              <Grain />
              <ProductArt id={id} />
            </div>
            <div className="product__body">
              <span className="product__cat">{cats[c]}</span>
              <h2 className="product__name" style={{ margin: 0 }}>{items[id][0]}</h2>
              <span className="product__desc">{items[id][1]}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
