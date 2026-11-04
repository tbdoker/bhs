import "@fontsource-variable/inter";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import type { Locale } from "@/content/routes";

/** The live address: set NEXT_PUBLIC_SITE_URL at launch; on Vercel it falls back to the project's own address. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

/**
 * Search engines stay out until launch: the preview for client feedback must not end up in Google.
 * Set ALLOW_INDEXING=true on the final server (and redeploy) to open the site to search engines.
 */
const allowIndexing = process.env.ALLOW_INDEXING === "true";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/bhs-logo.svg" },
  robots: allowIndexing ? undefined : { index: false, follow: false, googleBot: { index: false, follow: false } },
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
