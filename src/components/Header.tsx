"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { Close, Menu } from "./Icons";
import { href, type Locale, type PageKey } from "@/content/routes";
import { getDictionary } from "@/content";

type Props = {
  locale: Locale;
  page: PageKey;
  /** Homepage only: starts transparent with white type over the film. */
  overlay?: boolean;
};

const LEFT: PageKey[] = ["about", "production", "products"];
const RIGHT: PageKey[] = ["references", "contact"];

export default function Header({ locale, page, overlay = false }: Props) {
  const t = getDictionary(locale).nav;
  const [open, setOpen] = useState(false);
  // True when the big homepage logo still has to glide up into the header before the menu shows
  const [afterLogo, setAfterLogo] = useState(false);

  // The homepage film listens for this to fly its logo into the header while the menu is open
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.menu = open ? "open" : "closed";
    return () => { delete root.dataset.menu; };
  }, [open]);

  // Closing rolls the menu back up first; the header (and the homepage logo) follow once it's gone.
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const toggle = () => {
    if (open && !closing) {
      setClosing(true);
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      closeTimer.current = window.setTimeout(() => { setOpen(false); setClosing(false); }, still ? 0 : 300);
      return;
    }
    if (closing) { window.clearTimeout(closeTimer.current); setAfterLogo(false); setClosing(false); return; } // tapped again mid-close: reopen
    setAfterLogo(overlay && document.documentElement.dataset.docked === "false");
    setOpen(true);
  };
  const shown = open && !closing;

  const item = (key: PageKey) => (
    <Link key={key} href={href(key, locale)} className="navlink" aria-current={page === key ? "page" : undefined}>
      {t[key as keyof typeof t]}
    </Link>
  );

  return (
    <header className={`site-header${overlay ? " is-overlay" : ""}${open ? " is-open" : ""}`}>
      <div className="site-header__scrim" aria-hidden />
      <div className="site-header__bar">
        <div className="site-header__side">
          <nav className="navlinks" aria-label={t.menu}>{LEFT.map(item)}</nav>
          <button className="menubtn btn-reset" type="button" aria-expanded={shown} aria-controls="mobile-menu"
            aria-label={shown ? t.close : t.open} onClick={toggle}>
            {shown ? <Close /> : <Menu />}
          </button>
        </div>
        <Link href={href("home", locale)} className="site-header__logo" aria-label="BHS">
          <Logo />
        </Link>
        <div className="site-header__side site-header__side--end">
          <nav className="navlinks" aria-label={t.menu}>{RIGHT.map(item)}</nav>
          <div className="lang" role="group" aria-label={t.language}>
            {/* The switch keeps you on the same page in the other language */}
            <Link href={href(page, "tr")} hrefLang="tr" lang="tr" aria-current={locale === "tr" ? "true" : undefined}>TR</Link>
            <Link href={href(page, "en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>EN</Link>
          </div>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className={`mobile-menu${afterLogo ? " mobile-menu--after-logo" : ""}${closing ? " is-closing" : ""}`} aria-label={t.menu}>
          {[...LEFT, ...RIGHT].map((key, i) => (
            <Link key={key} href={href(key, locale)} style={{ "--i": i } as React.CSSProperties} aria-current={page === key ? "page" : undefined} onClick={() => setOpen(false)}>
              {t[key as keyof typeof t]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
