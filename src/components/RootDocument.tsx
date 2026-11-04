import "@fontsource-variable/inter";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import type { Locale } from "@/content/routes";

export const siteMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: { icon: "/bhs-logo.svg" },
};

/** viewport-fit=cover lets the header pad itself away from the notch; zoom is never disabled. */
export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#ffffff",
};

/**
 * Runs in <head> before anything paints, and is never re-created by React (the root layout renders once).
 * On the homepage it puts the header in its over-the-film look straight away, so there is no white flash over
 * the dark video, and keeps it correct on scroll until the film component takes over (data-live). If the page's
 * JavaScript ever fails to load, this alone keeps the header readable.
 */
const HEADER_BOOT = `(function(){var d=document.documentElement,p=location.pathname.replace(/\\/$/,'');
if(p===''||p==='/en'){d.dataset.hero='over';d.dataset.docked='false';}
function u(){if(d.dataset.live)return;var f=document.querySelector('.film');if(!f)return;var r=f.getBoundingClientRect(),o=r.bottom>72;d.dataset.hero=o?'over':'past';d.dataset.docked=o?'false':'true';}
addEventListener('scroll',u,{passive:true});addEventListener('resize',u);document.addEventListener('DOMContentLoaded',u);})();`;

export default function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    // The film script sets data attributes on <html> before React hydrates; that is intended
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEADER_BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
