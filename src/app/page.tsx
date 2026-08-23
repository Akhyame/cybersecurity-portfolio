import type { Metadata } from "next";
import { ContactCta } from "@/components/home/contact-cta";
import { CoreSkills } from "@/components/home/core-skills";
import { FeaturedProject } from "@/components/home/featured-project";
import { Hero } from "@/components/home/hero";
import { ShortAbout } from "@/components/home/short-about";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <ShortAbout />
      <FeaturedProject />
      <CoreSkills />
      <ContactCta />
    </>
  );
}
