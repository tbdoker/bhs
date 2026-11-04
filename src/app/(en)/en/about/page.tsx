import type { Metadata } from "next";
import AboutView from "@/views/AboutView";
import { getDictionary } from "@/content";
import { alternates } from "@/content/routes";

const t = getDictionary("en").meta.about;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: alternates("about", "en") };

export default function Page() {
  return <AboutView locale="en" />;
}
