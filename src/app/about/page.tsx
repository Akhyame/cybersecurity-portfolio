import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="ABOUT"
        title="About Me"
        description="My current focus, practical approach, education, and professional objective in cybersecurity."
      />
    </Section>
  );
}
