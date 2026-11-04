import type { Metadata } from "next";
import ReferencesView from "@/views/ReferencesView";
import { getDictionary } from "@/content";
import { alternates } from "@/content/routes";

const t = getDictionary("tr").meta.references;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: alternates("references", "tr") };

export default function Page() {
  return <ReferencesView locale="tr" />;
}
