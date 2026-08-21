import type { Metadata } from "next";
import { KubernetesProjectDetail } from "@/components/projects/kubernetes-project-detail";

export const metadata: Metadata = {
  title: "Kubernetes Multi-Tenant Security Platform | Portfolio",
  description:
    "Detailed project page for a Kubernetes multi-tenant security platform built with secure defaults, policy enforcement, network segmentation, and GitOps deployment patterns.",
};

export default function Page() {
  return <KubernetesProjectDetail />;
}
