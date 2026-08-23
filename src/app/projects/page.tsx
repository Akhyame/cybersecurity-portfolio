import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { getPublishedProjects } from "@/lib/notion/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <Section>
      <SectionHeading
        eyebrow="PROJECTS"
        title="Security Projects"
        level="h1"
        description="Larger hands-on projects documented through architecture, implementation decisions, security controls, testing, and evidence."
      />

      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="mt-10 p-8 sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/90">
              No published projects yet
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Current project work is in progress.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              The portfolio currently showcases the active Kubernetes security platform on a dedicated project page. Additional projects will be published as they are completed and validated.
            </p>
            <div className="mt-6 flex justify-center">
              <ButtonLink href="/projects/kubernetes-multi-tenant-security-platform" variant="primary">
                View Current In-Progress Project
              </ButtonLink>
            </div>
          </div>
        </Card>
      )}
    </Section>
  );
}
