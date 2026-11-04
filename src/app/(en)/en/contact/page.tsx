import type { Metadata } from "next";
import ContactView from "@/views/ContactView";
import { getDictionary } from "@/content";
import { alternates } from "@/content/routes";

const t = getDictionary("en").meta.contact;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: alternates("contact", "en") };

export default function Page() {
  return <ContactView locale="en" />;
}
