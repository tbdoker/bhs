import type { Metadata } from "next";
import ProductionView from "@/views/ProductionView";
import { getDictionary } from "@/content";
import { alternates } from "@/content/routes";

const t = getDictionary("tr").meta.production;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: alternates("production", "tr") };

export default function Page() {
  return <ProductionView locale="tr" />;
}
