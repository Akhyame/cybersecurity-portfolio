import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="SKILLS"
        title="Evidence-Backed Skills"
        description="Technical capabilities connected to practical implementation, testing, and documented project evidence."
      />
    </Section>
  );
}
