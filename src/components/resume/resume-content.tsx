import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";

const buttonBaseClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-out no-underline outline-none focus-visible:ring-offset-2";

const buttonVariantClasses = {
  primary:
    "bg-primary text-slate-950 shadow-[0_0_0_1px_rgba(34,211,238,0.15)] hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  secondary:
    "border border-border bg-surface/70 text-foreground hover:border-primary/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ghost:
    "border border-transparent bg-transparent text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

const education = [
  {
    title: "Engineering Cycle – Cybersecurity",
    institution: "Université Euroméditerranéenne de Fès – EIDIA",
    period: "2024 – Present",
  },
  {
    title: "Preparatory Classes – Digital Engineering & AI",
    institution: "Université Euroméditerranéenne de Fès",
    period: "2022 – 2024",
  },
  {
    title: "Baccalaureate in Physical Sciences – French option",
    institution: "",
    period: "2022",
  },
];

const experience = [
  {
    role: "IAM Intern – Identity & Access Management",
    organization: "Direction Générale des Impôts – Morocco",
    date: "August 2025",
    responsibilities: [
      "Deployed an IAM solution with Keycloak, SSO, MFA, and RBAC for centralized identity management.",
      "Integrated OpenSSH for secure authentication to internal servers.",
      "Monitored security logs through Splunk SIEM and implemented WAF controls.",
    ],
  },
];

const projectGroups = [
  {
    name: "Kubernetes Multi-Tenant Security Platform",
    status: "In Progress",
    statusTone: "blue" as const,
    description:
      "A shared three-node K3s platform designed around tenant namespaces, RBAC, Pod Security Admission, NetworkPolicies, GitOps delivery, monitoring, and documented security validation.",
    link: "/projects/kubernetes-multi-tenant-security-platform",
    technologies: [],
  },
  {
    name: "Decentralized Academic Assistant",
    technologies: ["Blockchain", "Solidity", "Node.js", "Express", "RAG", "Smart Contracts"],
    description:
      "A decentralized application combining Solidity smart contracts, a Node.js and Express backend, and a RAG-based AI agent to centralize and secure access to academic information.",
  },
  {
    name: "Zero Trust Architecture",
    technologies: ["Zero Trust", "pfSense", "IAM", "MFA", "VPN", "Network Segmentation"],
    description:
      "A Zero Trust implementation using network segmentation, identity-based access, MFA, continuous verification, attack simulation, and policy validation.",
  },
  {
    name: "Multi-Cloud DevSecOps Pipeline",
    technologies: ["Node.js", "Docker", "GitLab CI/CD", "Terraform", "AWS", "Azure"],
    description:
      "A secure CI/CD pipeline with SAST and DAST controls and Terraform-based deployment across AWS and Azure.",
  },
  {
    name: "Digital Forensics Lab – A to Z",
    technologies: ["Autopsy", "Volatility", "FTK Imager", "Incident Response"],
    description:
      "A practical investigation covering attack simulation, memory and disk analysis, log investigation, and incident reporting.",
  },
  {
    name: "Docker & Kubernetes",
    technologies: ["Docker", "Kubernetes", "Java", "Apache", "DNS", "DHCP"],
    description:
      "Containerization and Kubernetes orchestration with automatic scaling and supporting network services.",
  },
  {
    name: "Kaspersky Malware Analysis",
    technologies: ["Malware Analysis", "Sandbox", "Windows", "Forensics"],
    description:
      "Behavioral malware analysis in a sandbox environment, including threat detection, log investigation, and evasion testing.",
  },
];

const skillGroups = [
  {
    title: "Security & IAM",
    items: ["IAM", "NAC", "SSO", "MFA", "RBAC", "Active Directory", "Zero Trust", "Keycloak"],
  },
  {
    title: "DevSecOps",
    items: ["Docker", "Kubernetes", "GitLab CI/CD", "Terraform", "SAST", "DAST", "Git"],
  },
  {
    title: "Forensics & Pentesting",
    items: ["Autopsy", "Volatility", "FTK Imager", "KAPE", "Wireshark", "Metasploit", "Kali Linux", "Nmap"],
  },
  {
    title: "Cloud & Infrastructure",
    items: ["AWS", "Azure", "Linux (Ubuntu)", "Windows Server", "Apache", "DNS", "DHCP", "VPN"],
  },
  {
    title: "Networking",
    items: ["TCP/IP", "OSI", "pfSense", "Firewall", "IDS/IPS", "VLAN"],
  },
  {
    title: "Blockchain & Web3",
    items: ["Solidity", "Smart Contracts", "DApp", "Node.js", "Decentralized Architecture", "RAG"],
  },
  {
    title: "AI & Machine Learning",
    items: ["Keras", "Machine Learning", "MLP", "CNN", "RNN", "RAG"],
  },
  {
    title: "Programming",
    items: ["Python", "Java", "C/C++", "PHP", "SQL", "HTML/CSS", "Bash"],
  },
];

const languages = [
  "Arabic — Native",
  "French — Fluent",
  "English — Fluent",
  "Spanish — Beginner",
];

export function ResumeContent() {
  return (
    <>
      <Section className="pb-8 sm:pb-10">
        <SectionHeading
          eyebrow="RESUME"
          title="Cybersecurity & DevSecOps Engineering Student"
          description="Cybersecurity and DevSecOps engineering student focused on identity and access management, Zero Trust architecture, cloud security, secure delivery pipelines, digital forensics, and practical security validation."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/documents/siham-akhyame-resume.pdf"
            download="siham-akhyame-resume.pdf"
            className={`${buttonBaseClasses} ${buttonVariantClasses.primary}`}
          >
            Download PDF
          </a>
          <ButtonLink href="https://github.com/Akhyame" variant="secondary">
            GitHub
          </ButtonLink>
          <ButtonLink href="https://linkedin.com/in/siham-akhyame" variant="secondary">
            LinkedIn
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-base text-muted">
              <li>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  Email
                </span>
                <a
                  href="mailto:sihamakhyame33@gmail.com"
                  className="mt-1 inline-block text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  sihamakhyame33@gmail.com
                </a>
              </li>
              <li>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  Phone
                </span>
                <a
                  href="tel:+212728182517"
                  className="mt-1 inline-block text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  +212 728 182 517
                </a>
              </li>
              <li>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  Location
                </span>
                <span className="mt-1 block text-foreground">Fès, Morocco</span>
              </li>
              <li>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  LinkedIn
                </span>
                <a
                  href="https://linkedin.com/in/siham-akhyame"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  linkedin.com/in/siham-akhyame
                </a>
              </li>
              <li>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  GitHub
                </span>
                <a
                  href="https://github.com/Akhyame"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  github.com/Akhyame
                </a>
              </li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Education
            </h2>
            <div className="mt-5 space-y-5">
              {education.map((item) => (
                <div key={item.title} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                  {item.institution ? (
                    <p className="mt-1 text-sm leading-6 text-muted">{item.institution}</p>
                  ) : null}
                  <p className="mt-2 text-sm text-cyan-200">{item.period}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="EXPERIENCE"
          title="Professional Experience"
          description="Verified internship experience focused on identity, security operations, and secure infrastructure enforcement."
        />

        <div className="mt-8 space-y-6">
          {experience.map((item) => (
            <Card key={item.role} className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-base text-muted">{item.organization}</p>
                </div>
                <p className="text-sm uppercase tracking-[0.18em] text-cyan-300/90">{item.date}</p>
              </div>

              <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-7 text-muted">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="PROJECTS"
          title="Selected Projects"
          description="A focused mix of current platform work and academic projects spanning identity, cloud security, engineering, and digital forensics."
        />

        <div className="mt-8 space-y-6">
          {projectGroups.map((project) => (
            <Card key={project.name} className="p-6 sm:p-8">
              <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {project.name}
                  </h3>
                </div>
                {project.status ? (
                  <Badge tone={project.statusTone ?? "neutral"}>{project.status}</Badge>
                ) : null}
              </div>

              {project.technologies.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <Badge key={`${project.name}-${technology}`} tone="neutral">
                      {technology}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <p className="mt-4 text-base leading-7 text-muted">{project.description}</p>

              {project.link ? (
                <div className="mt-5">
                  <ButtonLink href={project.link} variant="secondary">
                    View project
                  </ButtonLink>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="SKILLS"
          title="Technical Skills"
          description="Evidence-oriented capabilities across security engineering, DevSecOps, forensics, cloud, infrastructure, and software development."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <Card key={group.title} className="h-full p-5">
              <h3 className="font-heading text-xl font-semibold text-foreground">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={`${group.title}-${item}`} tone="neutral">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="LANGUAGES"
          title="Languages"
          description="Professional communication skills across academic, technical, and practical environments."
        />

        <Card className="mt-8 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Badge key={language} tone="cyan">
                {language}
              </Badge>
            ))}
          </div>
        </Card>
      </Section>
    </>
  );
}
