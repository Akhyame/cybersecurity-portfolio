import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";

export function ShortAbout() {
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="ABOUT"
          title="Practical security, documented with evidence."
          description="I focus on cloud and Kubernetes security, network security, DevSecOps and GitOps, and security monitoring. My approach is practical: build, secure, test, validate, and document."
          className="lg:max-w-3xl"
        />

        <div className="lg:ml-auto">
          <ButtonLink href="/about" variant="primary">
            More About Me
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
