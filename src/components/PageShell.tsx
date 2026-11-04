import Header from "./Header";
import Footer from "./Footer";
import { GrainDefs } from "./Icons";
import type { Locale, PageKey } from "@/content/routes";

export default function PageShell({ locale, page, overlay = false, children }: {
  locale: Locale; page: PageKey; overlay?: boolean; children: React.ReactNode;
}) {
  return (
    <>
      <GrainDefs />
      <Header locale={locale} page={page} overlay={overlay} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
