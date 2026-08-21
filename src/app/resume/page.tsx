import type { Metadata } from "next";
import { ResumeContent } from "@/components/resume/resume-content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Siham Akhyame, Cybersecurity and DevSecOps engineering student.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
