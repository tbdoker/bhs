import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero, { CtaBlock } from "@/components/PageHero";
import { getDictionary, REFERENCES } from "@/content";
import { href, type Locale } from "@/content/routes";

export default function ReferencesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).references;
  return (
    <PageShell locale={locale} page="references">
      <PageHero eyebrow={t.eyebrow} titleA={t.titleA} titleB={t.titleB} center />
      <section style={{ paddingTop: 96 }}>
        <ul className="container ref-tiles" style={{ listStyle: "none", margin: "0 auto" }}>
          {REFERENCES.map((r) => (
            <li key={r.name} className="ref-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="reflogo" src={r.src} alt={r.name} width={r.w} height={r.h} style={{ maxHeight: `${r.tile}%` }} />
            </li>
          ))}
        </ul>
      </section>
      <CtaBlock title={t.ctaTitle}>
        <Link className="btn btn--dark" href={href("contact", locale)}>{t.ctaBtn}</Link>
      </CtaBlock>
    </PageShell>
  );
}
