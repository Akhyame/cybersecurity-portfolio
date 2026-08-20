import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";

export function FeaturedProject() {
  return (
    <Section>
      <SectionHeading
        eyebrow="FEATURED PROJECT"
        title="Kubernetes Multi-Tenant Security Platform"
        description="Designed and secured a multi-tenant Kubernetes platform hosting isolated Uptime Kuma environments with network segmentation, RBAC, Pod Security, TLS, resource governance, GitOps automation and observability."
      />

      <Card className="mt-8 overflow-hidden" hoverable>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-6 flex flex-wrap gap-2">
              <Badge tone="cyan">Cloud Security</Badge>
              <Badge tone="blue">Kubernetes</Badge>
              <Badge tone="violet">Network Security</Badge>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {[
                "K3s",
                "Cilium",
                "Traefik",
                "Helm",
                "Argo CD",
                "Grafana",
              ].map((item) => (
                <Badge key={item} tone="neutral">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge tone="success">Advanced</Badge>
              <Badge tone="cyan">Security validated</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[220px] lg:items-end">
            <ButtonLink href="/projects/kubernetes-multi-tenant-security-platform" variant="primary">
              View Project
            </ButtonLink>
            <ButtonLink href="https://github.com/Akhyame/pfa-kubernetes-multitenant" variant="secondary">
              GitHub
            </ButtonLink>
          </div>
        </div>
      </Card>
    </Section>
  );
}
