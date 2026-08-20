import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="CONTACT"
        title="Let’s Connect"
        description="I'm open to cybersecurity internships, junior opportunities, technical collaboration, and project discussions."
      />
    </Section>
  );
}
