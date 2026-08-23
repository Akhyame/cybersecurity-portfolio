import type { Metadata } from "next";
import { SkillsContent } from "@/components/skills/skills-content";

export const metadata: Metadata = {
  title: "Technical Skills",
  description:
    "Evidence-backed cybersecurity and DevSecOps capabilities developed through academic work, practical labs, and hands-on projects.",
};

export default function SkillsPage() {
  return <SkillsContent />;
}
