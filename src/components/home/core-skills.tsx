import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";

const skillGroups = [
  {
    title: "Identity, Access & Zero Trust",
    items: ["IAM", "Keycloak", "SSO", "MFA", "RBAC", "Active Directory", "Zero Trust"],
  },
  {
    title: "Cloud & DevSecOps",
    items: ["Docker", "Kubernetes", "Terraform", "GitLab CI/CD", "SAST / DAST", "AWS", "Azure"],
  },
  {
    title: "Network & Infrastructure Security",
    items: ["pfSense", "VLAN", "VPN", "Firewall", "Linux", "Windows Server", "DNS / DHCP"],
  },
  {
    title: "Digital Forensics & Pentest",
    items: ["Autopsy", "Volatility", "FTK Imager", "KAPE", "Wireshark", "Nmap", "Metasploit", "Kali Linux"],
  },
  {
    title: "Security Monitoring & Defense",
    items: ["Splunk", "SIEM", "WAF", "IDS / IPS", "Malware Analysis", "Incident Response", "OpenSSH"],
  },
  {
    title: "Programming, AI & Web3",
    items: ["Python", "Bash", "SQL", "Java", "Solidity", "Node.js", "RAG"],
  },
];

export function CoreSkills() {
  return (
    <Section>
      <SectionHeading
        eyebrow="SKILLS"
        title="Evidence-Backed Security Skills"
        description="Selected capabilities developed through academic projects, practical labs, and hands-on security work."
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.title} className="h-full">
            <h3 className="font-heading text-xl font-semibold text-foreground">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border border-border bg-surface/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <ButtonLink href="/skills" variant="secondary">
          Explore Skills
        </ButtonLink>
      </div>
    </Section>
  );
}
