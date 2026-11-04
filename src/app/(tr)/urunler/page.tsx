import type { Metadata } from "next";
import ProductsView from "@/views/ProductsView";
import { getDictionary } from "@/content";
import { alternates } from "@/content/routes";

const t = getDictionary("tr").meta.products;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: alternates("products", "tr") };

export default function Page() {
  return <ProductsView locale="tr" />;
}
