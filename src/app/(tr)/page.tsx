import type { Metadata } from "next";
import HomeView from "@/views/HomeView";
import { getDictionary } from "@/content";
import { alternates } from "@/content/routes";

const t = getDictionary("tr").meta.home;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: alternates("home", "tr") };

export default function Page() {
  return <HomeView locale="tr" />;
}
