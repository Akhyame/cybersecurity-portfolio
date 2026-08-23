import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
};

export default function ContactPage() {
  return <ContactContent />;
}
