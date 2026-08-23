import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";

const availabilityItems = [
  "cybersecurity internships",
  "junior cybersecurity or DevSecOps opportunities",
  "technical collaboration",
  "project discussions",
];

export function ContactContent() {
  return (
    <>
      <Section className="pt-10 sm:pt-12">
        <SectionHeading
          eyebrow="CONTACT"
          title="Let’s Connect"
          description="I'm open to cybersecurity internships, junior opportunities, technical collaboration, and project discussions."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Contact details
            </h2>

            <ul className="mt-5 space-y-5 text-base text-muted">
              <li>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                  Email
                </span>
                <a
                  href="mailto:sihamakhyame33@gmail.com"
                  className="mt-1 inline-block text-slate-100 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  className="mt-1 inline-block text-slate-100 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-slate-100 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-slate-100 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  github.com/Akhyame
                </a>
              </li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Availability
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Siham is open to:
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {availabilityItems.map((item) => (
                <Badge key={item} tone="cyan">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="https://github.com/Akhyame" variant="secondary">
                GitHub
              </ButtonLink>
              <ButtonLink href="https://linkedin.com/in/siham-akhyame" variant="secondary">
                LinkedIn
              </ButtonLink>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
