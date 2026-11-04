import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { Chat, Grain, Pin } from "@/components/Icons";
import { getDictionary, WHATSAPP_URL } from "@/content";
import type { Locale } from "@/content/routes";

export default function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).contact;
  return (
    <PageShell locale={locale} page="contact">
      <PageHero eyebrow={t.eyebrow} titleA={t.titleA} titleB={t.titleB} />
      <section style={{ padding: "80px 0 160px" }}>
        <div className="container contact">
          <div className="contact__form"><ContactForm t={t} locale={locale} /></div>
          <div className="contact__side">
            <div className="info-card">
              <dl>
                {t.info.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16 }}><Chat />{t.whatsapp}</a>
            </div>
            <div className="map-ph" role="img" aria-label={t.map}>
              <Grain />
              <Pin />
              <span>{t.map}</span>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
