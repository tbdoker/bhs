import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { Chat } from "@/components/Icons";
import { CONTACT, getDictionary, WHATSAPP_URL } from "@/content";
import type { Locale } from "@/content/routes";

// OpenStreetMap needs no API key and sets no tracking cookies
const MAP_EMBED = "https://www.openstreetmap.org/export/embed.html?bbox=28.72%2C40.92%2C29.26%2C41.16&layer=mapnik";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=%C4%B0stanbul";

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
                <div><dt>{t.labels.email}</dt><dd><a className="info-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
                <div><dt>{t.labels.phone}</dt><dd><a className="info-link" href={CONTACT.phoneHref}>{CONTACT.phone}</a></dd></div>
                <div><dt>{t.labels.instagram}</dt><dd><a className="info-link" href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">{CONTACT.instagram}</a></dd></div>
                {t.info.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16 }}><Chat />{t.whatsapp}</a>
            </div>
            {/* The whole box opens the city in the visitor's maps app; the map itself ignores touches so it never traps scrolling */}
            <a className="map-box" href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label={`${t.mapCity} · ${t.mapOpen}`}>
              <iframe title={t.map} src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer" tabIndex={-1} aria-hidden />
              <span className="map-box__label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
                <b>{t.mapCity}</b>
                <span>{t.mapOpen}</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
