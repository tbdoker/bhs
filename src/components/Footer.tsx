import Link from "next/link";
import Logo from "./Logo";
import { Instagram } from "./Icons";
import { href, type Locale, type PageKey } from "@/content/routes";
import { CONTACT, getDictionary } from "@/content";

const PAGES: PageKey[] = ["about", "production", "products", "references", "contact"];

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.footer;
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link href={href("home", locale)} aria-label="BHS"><Logo /></Link>
          <span>{t.tagline}</span>
        </div>
        <div className="site-footer__cols">
          <nav className="site-footer__col" aria-labelledby="footer-pages">
            <h2 id="footer-pages">{t.pages}</h2>
            {PAGES.map((p) => <Link key={p} href={href(p, locale)}>{d.nav[p as keyof typeof d.nav]}</Link>)}
          </nav>
          <div className="site-footer__col">
            <h2>{t.contact}</h2>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a className="social-icon" href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${CONTACT.instagram}`}>
              <Instagram size={20} />
            </a>
            <span>{t.address}</span>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} BHS</span>
        <nav aria-label={t.legal}>
          <a href="#">{t.privacy}</a>
          <a href="#">{t.cookies}</a>
        </nav>
      </div>
    </footer>
  );
}
