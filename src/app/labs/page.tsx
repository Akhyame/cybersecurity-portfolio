import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Labs",
};

export default function LabsPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="LABS"
        title="Hands-on Security Labs"
        level="h1"
        description="Focused security experiments and technical exercises documented through investigation, validation, and lessons learned."
      />
    </Section>
  );
}
