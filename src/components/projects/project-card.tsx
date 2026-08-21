import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import type { PortfolioProject } from "@/lib/notion/types";

type ProjectCardProps = {
  project: PortfolioProject;
};

function formatProjectDate(dateValue: string | null): string | null {
  if (!dateValue) {
    return null;
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (!project.slug) {
    return null;
  }

  const projectDate = formatProjectDate(project.projectDate);

  return (
    <Card hoverable className="h-full">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Badge tone="cyan">Published</Badge>
          {projectDate ? (
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
              {projectDate}
            </span>
          ) : null}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.categories.slice(0, 3).map((category) => (
            <Badge key={`${project.id}-${category}`} tone="neutral">
              {category}
            </Badge>
          ))}
          {project.difficulty ? (
            <Badge tone="blue">{project.difficulty}</Badge>
          ) : null}
        </div>

        <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {project.name}
        </h3>

        <p className="mt-3 text-base leading-7 text-muted">
          {project.shortDescription || "Portfolio project details are available in the project detail view."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((technology) => (
            <Badge key={`${project.id}-${technology}`} tone="neutral">
              {technology}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 pt-2">
          <ButtonLink href={`/projects/${project.slug}`} variant="primary">
            View details
          </ButtonLink>
          {project.githubUrl ? (
            <ButtonLink href={project.githubUrl} variant="secondary">
              GitHub
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
