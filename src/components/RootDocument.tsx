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

export default function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    // The film script sets data attributes on <html> before React hydrates; that is intended
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
