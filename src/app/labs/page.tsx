import type { Metadata } from "next";
import { LabCard } from "@/components/labs/lab-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { getPublishedLabs } from "@/lib/notion/labs";

export const metadata: Metadata = {
  title: "Security Labs",
  description: "Published cybersecurity labs documenting practical investigation, validation, and lessons learned.",
};

export const dynamic = "force-dynamic";

export default async function LabsPage() {
  const labs = await getPublishedLabs();

  return (
    <Section className="pt-10 sm:pt-12">
      <SectionHeading
        eyebrow="LABS"
        title="Hands-on Security Labs"
        level="h1"
        description="Focused security experiments and technical exercises documented through investigation, validation, and lessons learned."
      />

      {labs.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {labs.map((lab) => <LabCard key={lab.id} lab={lab} />)}
        </div>
      ) : (
        <Card className="mt-10 p-8 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            No published labs yet.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
            Lab investigations will appear here as they are completed, validated, and published.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/projects" variant="secondary">View Projects</ButtonLink>
          </div>
        </Card>
      )}
    </Section>
  );
}
