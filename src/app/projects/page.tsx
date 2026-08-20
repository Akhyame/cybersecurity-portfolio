import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="PROJECTS"
        title="Security Projects"
        description="Larger hands-on projects documented through architecture, implementation decisions, security controls, testing, and evidence."
      />
    </Section>
  );
}
