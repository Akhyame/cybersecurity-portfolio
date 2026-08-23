import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
};

export default function AboutPage() {
  return <AboutContent />;
}
