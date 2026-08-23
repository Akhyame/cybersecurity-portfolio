import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";

const focusAreas = [
  "Identity and access management",
  "Zero Trust architecture",
  "Cloud security",
  "Secure delivery pipelines",
  "Digital forensics",
  "Practical security validation",
];

const workflow = ["Build", "Secure", "Test", "Validate", "Document"];

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

const objectives = [
  "Cybersecurity internships",
  "Junior cybersecurity or DevSecOps opportunities",
  "Technical collaboration",
  "Project discussions",
];

export function AboutContent() {
  return (
    <>
      <Section className="pt-10 sm:pt-12">
        <SectionHeading
          eyebrow="ABOUT"
          title="About Me"
          level="h1"
          description="My current focus, practical approach, education, and professional objective in cybersecurity."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Professional profile
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              I am a Cybersecurity and DevSecOps Engineering student focused on
              building and documenting practical security projects. My work
              connects identity and access management, Zero Trust architecture,
              cloud security, secure delivery pipelines, digital forensics, and
              practical security validation.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Current focus
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <Badge key={area} tone="cyan">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Practical approach
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              I approach security work as a documented engineering workflow:
              build a system, secure its components, test its controls, validate
              the results, and document the decisions and evidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {workflow.map((step, index) => (
                <Badge key={step} tone={index === workflow.length - 1 ? "success" : "neutral"}>
                  {index + 1}. {step}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Professional objective
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              I am open to opportunities and conversations involving:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
              {objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="EDUCATION"
          title="Education"
          description="Academic preparation in cybersecurity, digital engineering, and artificial intelligence."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {education.map((item) => (
            <Card key={item.title} className="h-full p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              {item.institution ? (
                <p className="mt-3 text-sm leading-6 text-muted">{item.institution}</p>
              ) : null}
              <p className="mt-4 text-sm font-medium text-cyan-200">{item.period}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="NEXT STEPS"
          title="Explore the portfolio"
          description="Review the documented work, read the resume, or get in touch to discuss a relevant opportunity."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/projects" variant="primary">
            View Projects
          </ButtonLink>
          <ButtonLink href="/resume" variant="secondary">
            View Resume
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Me
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
