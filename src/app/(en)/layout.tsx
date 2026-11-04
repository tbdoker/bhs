import RootDocument, { siteMetadata, siteViewport } from "@/components/RootDocument";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
