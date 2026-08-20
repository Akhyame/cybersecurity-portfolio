import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="RESUME"
        title="Resume"
        description="A concise overview of my education, technical skills, selected projects, certifications, and languages."
      />
    </Section>
  );
}
