import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero, { CtaBlock } from "@/components/PageHero";
import ProductionStory from "@/components/production/ProductionStory";
import { getDictionary } from "@/content";
import { href, type Locale } from "@/content/routes";

export default function ProductionView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).production;
  return (
    <PageShell locale={locale} page="production">
      <PageHero eyebrow={t.eyebrow} titleA={t.titleA} titleB={t.titleB} sub={t.sub} />
      <section style={{ paddingTop: 120 }}>
        <div className="container">
          <ProductionStory steps={t.steps} chipMachine={t.chipMachine} chipCapacity={t.chipCapacity} />
        </div>
      </section>
      <CtaBlock title={t.ctaTitle}>
        <Link className="btn btn--dark" href={href("products", locale)}>{t.ctaBtn}</Link>
      </CtaBlock>
    </PageShell>
  );
}
