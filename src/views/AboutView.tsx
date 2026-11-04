import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero, { CtaBlock } from "@/components/PageHero";
import { Grain } from "@/components/Icons";
import { getDictionary } from "@/content";
import { href, type Locale } from "@/content/routes";

export default function AboutView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).about;
  return (
    <PageShell locale={locale} page="about">
      <PageHero eyebrow={t.eyebrow} titleA={t.titleA} titleB={t.titleB} sub={t.sub} />

      <div className="container">
        <div className="photo-ph" role="img" aria-label={t.photo}>
          <Grain dark />
          <span>{t.photo}</span>
        </div>
      </div>

      <section className="section">
        <div className="container story">
          <h2>{t.storyTitle}</h2>
          <div>
            {t.story.map((para, i) => <p key={i} className={i === 0 ? "story__lead" : undefined}>{para}</p>)}
            <p className="story__motto">{t.motto}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">{t.valuesEyebrow}</p>
          <h2 className="headline">{t.valuesTitle}</h2>
          <div className="values">
            {t.values.map(([name, desc], i) => (
              <div key={name} className="value">
                <small>0{i + 1}</small>
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock title={t.ctaTitle}>
        <Link className="btn btn--dark" href={href("production", locale)}>{t.ctaBtn}</Link>
      </CtaBlock>
    </PageShell>
  );
}
