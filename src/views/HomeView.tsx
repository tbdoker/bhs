import Link from "next/link";
import PageShell from "@/components/PageShell";
import Film from "@/components/home/Film";
import HeroCard from "@/components/home/HeroCard";
import Finishes from "@/components/home/Finishes";
import Statement from "@/components/home/Statement";
import LogoStrip from "@/components/home/LogoStrip";
import { Chat, Chevron, Instagram } from "@/components/Icons";
import { CONTACT, getDictionary, WHATSAPP_URL } from "@/content";
import { href, type Locale } from "@/content/routes";

/** Small drawings of each product family, every one carrying the BHS mark. */
const FAMILY_ART = [
  <>
    <div className="mini mini-card-a"><span className="mark" style={{ width: 46, color: "#C9A55A" }} /></div>
    <div className="mini mini-card-b"><span className="mark" style={{ width: 56, color: "#1A1918" }} /></div>
  </>,
  <div className="mini-box"><span className="mark" style={{ width: 58, color: "#3A2A18" }} /></div>,
  <div className="mini-book">
    <div className="mini-book__l"><span className="mark" style={{ width: 36, color: "#F4F2EE" }} /></div>
    <div className="mini-book__r"><i /><i /><i style={{ width: "60%" }} /></div>
  </div>,
  <div className="mini-env"><span className="mark" style={{ width: 32, color: "#7E5326" }} /></div>,
  <>
    <div className="mini mini-label-a" />
    <div className="mini mini-label-b"><span className="mark" style={{ width: 42, color: "#F4F2EE" }} /></div>
  </>,
];

export default function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home;
  return (
    <PageShell locale={locale} page="home" overlay>
      <Film label={t.videoLabel} scrollLabel={t.scroll} tagline={t.tagline} src="/media/hero-film.mp4" poster="/media/hero-poster.jpg" />

      <section id="giris" className="center" style={{ padding: "140px var(--gutter) 0" }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>{t.eyebrow}</p>
        <h1 className="display display--hero" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="line">{t.titleA}</span>
          <span className="line line--soft">{t.titleB}</span>
        </h1>
        <p className="lead">{t.sub}</p>
        <HeroCard label={t.cardLabel} name={t.cardName} role={t.cardTitle} hint={t.hint} />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.lineEyebrow}</p>
              <h2 className="headline">{t.lineTitle}</h2>
            </div>
            <Link className="link-arrow" href={href("products", locale)}>{t.allProducts}<Chevron /></Link>
          </div>
          <div className="families">
            {t.families.map(([name, desc], i) => (
              <Link key={name} className="family lift" href={href("products", locale)}>
                <div className="family__art" aria-hidden>{FAMILY_ART[i]}</div>
                <span className="family__name">{name}</span>
                <span className="family__desc">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Finishes eyebrow={t.finEyebrow} titleA={t.finA} titleB={t.finB} sub={t.finSub} tagline={t.tagline} finishes={t.finishes} />

      <Statement eyebrow={t.prodEyebrow} segments={t.statement} linkLabel={t.prodLink} linkHref={href("production", locale)} />

      <LogoStrip eyebrow={t.refsEyebrow} linkLabel={t.refsLink} linkHref={href("references", locale)} />

      <section className="cta">
        <h2>
          <span className="line">{t.ctaA}</span>
          <span className="line line--soft">{t.ctaB}</span>
        </h2>
        <p>{t.ctaSub}</p>
        <div className="btn-row">
          <Link className="btn btn--dark" href={href("contact", locale)}>{t.ctaBtn}</Link>
          <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><Chat />{t.whatsapp}</a>
          <a className="btn btn--ghost" href={CONTACT.instagramDm} target="_blank" rel="noopener noreferrer"><Instagram />{t.instagram}</a>
        </div>
      </section>
    </PageShell>
  );
}
