import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";

const skillGroups = [
  {
    title: "Cloud & Kubernetes Security",
    skills: ["Kubernetes", "K3s", "Cilium", "Pod Security Admission", "NetworkPolicies", "TLS"],
    evidence:
      "Applied in the shared three-node K3s platform through tenant namespaces, admission controls, NetworkPolicies, TLS, and documented security validation.",
  },
  {
    title: "Network Security",
    skills: ["Cilium", "CiliumNetworkPolicy", "Cilium Hubble", "pfSense", "VLAN", "VPN", "Firewall"],
    evidence:
      "Used for network segmentation, default-deny traffic controls, authorized ingress flows, and policy validation across practical security work.",
  },
  {
    title: "Identity & Access Control",
    skills: ["IAM", "Keycloak", "SSO", "MFA", "RBAC", "Active Directory"],
    evidence:
      "Documented through the IAM internship and project work involving centralized identity management, authentication, tenant-scoped access, and role-based controls.",
  },
  {
    title: "Linux & Infrastructure Security",
    skills: ["Linux (Ubuntu)", "OpenSSH", "Windows Server", "Apache", "DNS", "DHCP"],
    evidence:
      "Applied across infrastructure exercises and the IAM internship, including secure server authentication and supporting network services.",
  },
  {
    title: "DevSecOps & GitOps",
    skills: ["Docker", "Git", "GitLab CI/CD", "Terraform", "SAST", "DAST", "Helm", "Argo CD"],
    evidence:
      "Developed through secure delivery pipeline work and the Kubernetes platform's Git, Argo CD ApplicationSet, and reusable Helm delivery flow.",
  },
  {
    title: "Observability & Monitoring",
    skills: ["Splunk", "SIEM", "WAF", "Prometheus", "Grafana", "Loki", "Grafana Alloy"],
    evidence:
      "Applied through security log monitoring, WAF controls, and the platform's documented monitoring and observability stack.",
  },
];

export function SkillsContent() {
  return (
    <>
      <Section className="pt-10 sm:pt-12">
        <SectionHeading
          eyebrow="SKILLS"
          title="Technical Skills"
          level="h1"
          description="Evidence-backed capabilities developed through academic work, practical labs, and hands-on cybersecurity projects."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <Card key={group.title} className="h-full p-6">
              <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
                {group.title}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={`${group.title}-${skill}`} tone="neutral" className="whitespace-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-muted">
                <span className="font-medium text-foreground">Evidence:</span> {group.evidence}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
            See the skills in context
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Explore the Kubernetes platform documentation and validation evidence, or review the broader project record.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/projects/kubernetes-multi-tenant-security-platform" variant="primary">
              View Kubernetes Project
            </ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              View Resume
            </ButtonLink>
            <ButtonLink href="https://github.com/Akhyame" variant="secondary">
              GitHub
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
