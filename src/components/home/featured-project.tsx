import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { getHomepageFeaturedProject } from "@/lib/notion/projects";

const categoryTones = ["cyan", "blue", "violet"] as const;

function isSafeHttpUrl(value: string | null): value is string {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

export async function FeaturedProject() {
  const project = await getHomepageFeaturedProject();

  if (!project?.slug) {
    return null;
  }

  return (
    <Section>
      <SectionHeading
        eyebrow="FEATURED PROJECT"
        title={project.name}
        description={
          project.shortDescription ??
          "Featured cybersecurity project documented through architecture, implementation, validation, and evidence."
        }
      />

      <Card className="mt-8 overflow-hidden" hoverable>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            {project.categories.length > 0 ? (
              <div className="mb-6 flex flex-wrap gap-2">
                {project.categories.slice(0, 3).map((category, index) => (
                  <Badge
                    key={`${project.id}-category-${category}`}
                    tone={categoryTones[index] ?? "neutral"}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            ) : null}

            {project.technologies.length > 0 ? (
              <div className="mb-6 flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((technology) => (
                  <Badge
                    key={`${project.id}-technology-${technology}`}
                    tone="neutral"
                  >
                    {technology}
                  </Badge>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {project.difficulty ? (
                <Badge tone="blue">{project.difficulty}</Badge>
              ) : null}
              <Badge tone={project.status === "Published" ? "success" : "cyan"}>
                {project.status ?? "Featured"}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[220px] lg:items-end">
            <ButtonLink href={`/projects/${project.slug}`} variant="primary">
              View Project
            </ButtonLink>
            {isSafeHttpUrl(project.githubUrl) ? (
              <ButtonLink href={project.githubUrl} variant="secondary">
                GitHub
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Card>
    </Section>
  );
}
