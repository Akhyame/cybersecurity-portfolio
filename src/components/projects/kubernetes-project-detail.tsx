import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { EvidenceGallery } from "@/components/projects/evidence-gallery";

const projectStats = [
  { label: "Cluster", value: "One shared three-node K3s cluster" },
  { label: "Control Plane", value: "1 control-plane node" },
  { label: "Workers", value: "2 worker nodes" },
  { label: "Tenant Model", value: "4 isolated tenant namespaces" },
];

const runtimeFlow = [
  "External User",
  "HTTPS",
  "Traefik",
  "Tenant ClusterIP Service",
  "Uptime Kuma",
];

const gitOpsFlow = [
  "Git",
  "Argo CD ApplicationSet",
  "Helm tenant-platform",
  "Tenant Namespace",
  "Workload + Security Baseline",
];

const architectureComponents = [
  "K3s",
  "Cilium",
  "Traefik",
  "cert-manager",
  "Helm",
  "Argo CD",
  "Prometheus",
  "Grafana",
  "Loki",
  "Grafana Alloy",
  "Cilium Hubble",
];

const securityCards = [
  {
    name: "RBAC",
    details: [
      "tenant-scoped least privilege",
      "own-namespace reads allowed",
      "cross-namespace access denied",
      "secrets and destructive access excluded from the readonly role",
    ],
  },
  {
    name: "Pod Security Admission",
    details: [
      "rootless workloads",
      "runAsNonRoot",
      "allowPrivilegeEscalation=false",
      "all Linux capabilities dropped",
      "RuntimeDefault seccomp",
      "ServiceAccount token automount disabled",
    ],
  },
  {
    name: "Default-deny NetworkPolicies",
    details: [
      "default-deny ingress and egress",
      "explicit DNS egress",
      "Traefik-to-tenant traffic allowed",
      "controlled HTTP/HTTPS egress for Uptime Kuma",
    ],
  },
  {
    name: "CiliumNetworkPolicy",
    details: [
      "explicit allow rules for required service paths",
      "tenant isolation enforced at L3/L4 layer",
      "unauthorized east-west traffic denied",
    ],
  },
  {
    name: "TLS / HTTPS",
    details: [
      "HTTPS exposed through Traefik",
      "private laboratory CA and certificate issuance",
      "tenant traffic protected at ingress",
    ],
  },
  {
    name: "ResourceQuota / LimitRange",
    details: [
      "resource caps prevent noisy neighbors",
      "compute and storage constraints applied per tenant",
      "workloads that exceed policy are rejected",
    ],
  },
  {
    name: "Dedicated ServiceAccounts",
    details: [
      "separate identities per tenant workload",
      "least-privilege access boundaries",
      "read-only role separation from admin functions",
    ],
  },
  {
    name: "Persistent Storage Isolation",
    details: [
      "dedicated PVC per tenant",
      "persistent data retained through pod recreation",
      "tenant storage separated from other namespaces",
    ],
  },
  {
    name: "GitOps Reconciliation",
    details: [
      "Git, Argo CD ApplicationSet, and reusable Helm chart",
      "tenant configuration applied consistently",
      "reconciliation keeps workloads and security baseline aligned",
    ],
  },
];

const techGroups = [
  {
    label: "Platform",
    values: ["Kubernetes", "K3s", "Linux"],
  },
  {
    label: "Networking & Ingress",
    values: ["Cilium", "Cilium Hubble", "Traefik"],
  },
  {
    label: "Security",
    values: [
      "RBAC",
      "Pod Security Admission",
      "NetworkPolicy",
      "CiliumNetworkPolicy",
      "ResourceQuota",
      "LimitRange",
      "TLS/HTTPS",
      "K3s secrets encryption",
    ],
  },
  {
    label: "Automation",
    values: ["Helm", "Git", "Argo CD"],
  },
  {
    label: "Observability",
    values: ["Prometheus", "Grafana", "Loki", "Grafana Alloy", "Cilium Hubble"],
  },
  {
    label: "Workload & Storage",
    values: ["Uptime Kuma", "ClusterIP Services", "persistent PVCs"],
  },
  {
    label: "PKI",
    values: ["cert-manager", "private laboratory CA"],
  },
];

const validationResults = [
  "Orange → Atlas application access: Blocked",
  "Cross-tenant Kubernetes API access: Forbidden",
  "Insecure privileged Pod: Rejected by Pod Security Admission",
  "ResourceQuota / LimitRange violation: Rejected",
  "Authorized Traefik → tenant workload: Allowed",
  "Atlas HTTPS through Traefik: Validated",
  "Pod recreation with persistent data: Data preserved",
  "Required Uptime Kuma HTTP/HTTPS egress: Allowed",
];

const challengePairs = [
  {
    challenge:
      "Challenge: strong default-deny isolation while preserving DNS, Traefik ingress, and required Uptime Kuma outbound monitoring.",
    solution:
      "Solution: deny by default with narrowly scoped authorized exceptions.",
  },
  {
    challenge:
      "Challenge: maintaining consistent tenant configuration and lifecycle management.",
    solution:
      "Solution: a reusable Helm baseline with Git and Argo CD reconciliation.",
  },
];

const learningPoints = [
  "Kubernetes multi-tenancy requires complementary controls rather than namespaces alone.",
  "Default-deny policies must preserve required application flows.",
  "RBAC and dedicated ServiceAccounts provide tenant-scoped least privilege.",
  "Admission controls and quotas reject insecure or disruptive workloads.",
  "Networking, identity, ingress, TLS, persistence, automation, and observability must work together.",
  "Negative tests are necessary to prove unauthorized behavior is blocked.",
];

const limitations = [
  "Local laboratory environment",
  "Private laboratory CA and DNS",
  "local-path storage is not highly available",
  "GitOps bootstrap remains administrator-managed",
  "No large-scale load or tenant-density validation",
  "No complete disaster-recovery validation",
  "AWS is future optional work only",
];

const futureImprovements = [
  "Cloud-managed Kubernetes evaluation",
  "Highly available storage",
  "Production PKI and DNS",
  "Policy-as-code and CI security checks",
  "Backup and disaster-recovery automation",
  "Larger-scale tenant and performance testing",
  "Stronger secrets management",
  "Expanded alerting and incident-response workflows",
];

export function KubernetesProjectDetail() {
  return (
    <div className="space-y-8 pb-16 text-foreground">
      <section className="relative overflow-hidden rounded-[28px] border border-border bg-surface/70 p-5 md:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),transparent_35%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="cyan">FLAGSHIP PROJECT</Badge>
              <Badge tone="blue">In Progress</Badge>
              <Badge tone="violet">Advanced</Badge>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Multi-tenant Kubernetes security
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-[3rem]">
                Kubernetes Multi-Tenant Security Platform
              </h1>
            </div>

            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">
              Designed and secured a multi-tenant Kubernetes platform hosting isolated Uptime Kuma environments with network segmentation, RBAC, Pod Security, TLS, resource governance, GitOps automation and observability.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              <span className="rounded-full border border-border bg-surface/70 px-2.5 py-1.5">Cloud Security</span>
              <span className="rounded-full border border-border bg-surface/70 px-2.5 py-1.5">Kubernetes</span>
              <span className="rounded-full border border-border bg-surface/70 px-2.5 py-1.5">Network Security</span>
              <span className="rounded-full border border-border bg-surface/70 px-2.5 py-1.5">Blue Team</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <ButtonLink href="https://github.com/Akhyame/pfa-kubernetes-multitenant" variant="primary">
                GitHub Repository
              </ButtonLink>
              <ButtonLink href="https://github.com/Akhyame/pfa-kubernetes-multitenant#readme" variant="secondary">
                Technical Documentation
              </ButtonLink>
              <ButtonLink href="#evidence" variant="secondary">
                Explore Evidence
              </ButtonLink>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-2 xl:grid-cols-4">
              <Card className="p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Cluster</p>
                <p className="mt-2 text-sm font-medium text-foreground">Shared K3s cluster</p>
              </Card>
              <Card className="p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Control plane</p>
                <p className="mt-2 text-sm font-medium text-foreground">1 control plane</p>
              </Card>
              <Card className="p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Workers</p>
                <p className="mt-2 text-sm font-medium text-foreground">2 worker nodes</p>
              </Card>
              <Card className="p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Tenant namespaces</p>
                <p className="mt-2 text-sm font-medium text-foreground">4 isolated tenant namespaces</p>
              </Card>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/80 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
            <div className="relative overflow-hidden rounded-xl border border-border">
              <Image
                src="/images/projects/kubernetes-multi-tenant-security-platform/kubernetes-multitenant-security-platform-cover.svg"
                alt="Cover illustration for Kubernetes multi-tenant security platform"
                width={1200}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <nav className="flex flex-wrap gap-2" aria-label="Project sections">
        {[
          ["Overview", "#overview"],
          ["Architecture", "#architecture"],
          ["Security", "#security"],
          ["Validation", "#validation"],
          ["Evidence", "#evidence"],
          ["Learnings", "#learnings"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {label}
          </Link>
        ))}
      </nav>

      <Section id="overview" className="scroll-mt-28 py-10 md:py-12">
        <SectionHeading
          eyebrow="Project overview"
          title="A shared K3s environment designed for tenant isolation and controlled service exposure"
          description="One shared three-node K3s cluster hosts four tenants: Atlas, Orange, MarocTech, and Rif. Each tenant has one dedicated namespace, and each namespace contains its own Uptime Kuma Deployment, ClusterIP Service, PVC, TLS certificate, quotas, RBAC, Pod Security Admission, and NetworkPolicies. Namespaces alone are not sufficient isolation, so complementary security controls are used."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projectStats.map((stat) => (
            <Card key={stat.label} className="p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-primary">{stat.label}</p>
              <p className="mt-3 text-base font-medium text-foreground">{stat.value}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="architecture" className="scroll-mt-28 py-10 md:py-12">
        <SectionHeading
          eyebrow="Architecture"
          title="Verified runtime and GitOps flows for a multi-tenant platform"
          description="The design uses a shared control plane and explicit policy boundaries to keep traffic, access, and workloads separated while preserving required ingress and monitoring flows."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Card className="p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Runtime</p>
            <ol className="space-y-3 text-sm leading-7 text-muted md:text-base">
              {runtimeFlow.map((step, index) => (
                <li key={`${step}-${index}`} className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                  {index < runtimeFlow.length - 1 ? (
                    <span aria-hidden="true" className="text-xs text-primary">→</span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted">Runtime flow: External User → HTTPS → Traefik → Tenant ClusterIP Service → Uptime Kuma</p>
          </Card>

          <Card className="p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">GitOps</p>
            <ol className="space-y-3 text-sm leading-7 text-muted md:text-base">
              {gitOpsFlow.map((step, index) => (
                <li key={`${step}-${index}`} className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                  {index < gitOpsFlow.length - 1 ? (
                    <span aria-hidden="true" className="text-xs text-primary">→</span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted">GitOps flow: Git → Argo CD ApplicationSet → Helm tenant-platform → Tenant Namespace → Workload + Security Baseline</p>
          </Card>
        </div>

        <div className="mt-6">
          <div className="rounded-2xl border border-border bg-surface/70 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Verified architecture components</p>
            <div className="flex flex-wrap gap-2">
              {architectureComponents.map((component) => (
                <span
                  key={component}
                  className="rounded-full border border-border bg-background/70 px-3 py-2 text-xs font-medium uppercase tracking-[0.1em] text-muted"
                >
                  {component}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="security" className="scroll-mt-28 py-10 md:py-12">
        <SectionHeading
          eyebrow="Security"
          title="Core controls applied to each tenant boundary"
          description="The platform relies on tenant-scoped RBAC, enforced admission controls, explicit network rules, resource limits, and GitOps coordination to keep workloads isolated and predictable."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {securityCards.map((card) => (
            <Card key={card.name} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{card.name}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                {card.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="validation" className="scroll-mt-28 py-10 md:py-12">
        <SectionHeading
          eyebrow="Validation"
          title="Security controls validated through authorized and unauthorized lab scenarios"
          description="The validation steps below document the outcomes of both permitted and denied traffic and workload flows in the laboratory environment."
        />

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {validationResults.map((result) => (
            <Card key={result} className="p-4">
              <p className="text-sm leading-7 text-muted">{result}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="evidence" className="scroll-mt-28 py-10 md:py-12">
        <SectionHeading
          eyebrow="Evidence"
          title="Laboratory screenshots confirming the tenant isolates and access decisions"
          description="The evidence gallery records the denial, allow, and persistence outcomes observed in the K3s environment."
        />
        <div className="mt-6">
          <EvidenceGallery />
        </div>
      </Section>

      <Section id="learnings" className="scroll-mt-28 py-10 md:py-12">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Challenges & solutions</p>
            <div className="mt-4 space-y-5">
              {challengePairs.map((pair) => (
                <div key={pair.challenge} className="space-y-2 rounded-xl border border-border bg-background/60 p-4">
                  <p className="text-sm leading-7 text-muted">{pair.challenge}</p>
                  <p className="text-sm leading-7 text-muted">{pair.solution}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What I learned</p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-muted">
              {learningPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="py-10 md:py-12">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Limitations</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              {limitations.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Future improvements</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              {futureImprovements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <div className="rounded-[28px] border border-primary/30 bg-primary/5 p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">EXPLORE MORE</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground md:text-3xl">
              Explore the implementation and validation evidence.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="https://github.com/Akhyame/pfa-kubernetes-multitenant" variant="primary">
              GitHub Repository
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Back to Projects
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
