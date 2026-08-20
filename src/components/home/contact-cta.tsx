import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";

export function ContactCta() {
  return (
    <Section>
      <div className="rounded-3xl border border-border bg-surface/70 p-6 shadow-[0_12px_35px_rgba(2,6,23,0.28)] sm:p-8">
        <SectionHeading
          eyebrow="CONTACT"
          title="Let’s Connect"
          description="I'm open to cybersecurity internships, junior opportunities, technical collaboration, and project discussions."
          className="max-w-3xl"
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="primary">
            Contact Me
          </ButtonLink>
          <ButtonLink href="https://github.com/Akhyame" variant="secondary">
            GitHub
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
