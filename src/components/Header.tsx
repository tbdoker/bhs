"use client";

import Link from "next/link";
import { useState } from "react";
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
          <button className="menubtn btn-reset" type="button" aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? t.close : t.open} onClick={() => setOpen((v) => !v)}>
            {open ? <Close /> : <Menu />}
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
        <nav id="mobile-menu" className="mobile-menu" aria-label={t.menu}>
          {[...LEFT, ...RIGHT].map((key) => (
            <Link key={key} href={href(key, locale)} aria-current={page === key ? "page" : undefined} onClick={() => setOpen(false)}>
              {t[key as keyof typeof t]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
