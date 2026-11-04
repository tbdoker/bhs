import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero, { CtaBlock } from "@/components/PageHero";
import ProductGrid from "@/components/products/ProductGrid";
import { getDictionary } from "@/content";
import { href, type Locale } from "@/content/routes";

export default function ProductsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).products;
  return (
    <PageShell locale={locale} page="products">
      <PageHero eyebrow={t.eyebrow} titleA={t.titleA} titleB={t.titleB} sub={t.sub} />
      <section style={{ paddingTop: 72 }}>
        <div className="container">
          <ProductGrid filterLabel={t.filterLabel} cats={t.cats} items={t.items} />
        </div>
      </section>
      <CtaBlock title={t.ctaTitle} sub={t.ctaSub}>
        <Link className="btn btn--dark" href={href("contact", locale)}>{t.ctaBtn}</Link>
      </CtaBlock>
    </PageShell>
  );
}
