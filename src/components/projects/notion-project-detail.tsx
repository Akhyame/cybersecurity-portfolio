import { NotionBlocks } from "@/components/notion/notion-blocks";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { NotionBlock, PortfolioProject } from "@/lib/notion/types";

type NotionProjectDetailProps = {
  project: PortfolioProject;
  blocks: NotionBlock[];
};

function isSafeExternalUrl(url: string | null): url is string {
  return typeof url === "string" && /^https?:\/\//i.test(url);
}

export function NotionProjectDetail({ project, blocks }: NotionProjectDetailProps) {
  const coverUrl = project.cover && /^https?:\/\//i.test(project.cover.url) ? project.cover.url : null;
  const demoVideoCandidate = project.publishDemo ? project.demoVideo?.url ?? null : null;
  const demoVideoUrl = isSafeExternalUrl(demoVideoCandidate) ? demoVideoCandidate : null;

  return (
    <Section>
      <div className="mb-8">
        <ButtonLink href="/projects" variant="secondary" className="mb-6">
          ← Back to projects
        </ButtonLink>

        <div className="mb-5 flex flex-wrap gap-2">
          <Badge tone={project.status === "Published" ? "success" : "blue"}>
            {project.status ?? "Not provided"}
          </Badge>
          {project.difficulty ? <Badge tone="blue">{project.difficulty}</Badge> : null}
          {project.categories.map((category) => (
            <Badge key={`${project.id}-${category}`} tone="neutral">
              {category}
            </Badge>
          ))}
        </div>

        <h1 className="font-heading text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
          {project.name}
        </h1>

        {project.shortDescription ? (
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{project.shortDescription}</p>
        ) : null}
      </div>

      {coverUrl ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-[0_18px_45px_rgba(2,6,23,0.45)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={`${project.name} cover`}
            className="max-h-[480px] w-full object-cover"
          />
        </div>
      ) : null}

      {demoVideoUrl ? (
        <section aria-labelledby="video-demo-heading" className="mt-8">
          <h2 id="video-demo-heading" className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Video Demo
          </h2>
          <video
            className="mt-4 aspect-video w-full rounded-xl border border-border bg-slate-950 object-contain"
            src={demoVideoUrl}
            controls
            controlsList="nodownload"
            playsInline
            preload="metadata"
          />
        </section>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <Card className="p-6 sm:p-8">
          {blocks.length > 0 ? (
            <NotionBlocks blocks={blocks} enableImageLinks={project.slug === "mini-soc-wazuh-threat-detection"} />
          ) : (
            <p className="text-base leading-7 text-muted">
              Project content is not currently available in the CMS.
            </p>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-heading text-xl font-semibold text-foreground">Project links</h3>
            <div className="mt-4 space-y-3">
              {project.demoUrl ? (
                <ButtonLink href={project.demoUrl} variant="primary" className="w-full">
                  Live demo
                </ButtonLink>
              ) : null}
              {project.githubUrl ? (
                <ButtonLink href={project.githubUrl} variant="secondary" className="w-full">
                  GitHub repository
                </ButtonLink>
              ) : null}
              {project.reportUrl ? (
                <ButtonLink href={project.reportUrl} variant="secondary" className="w-full">
                  Technical documentation
                </ButtonLink>
              ) : null}
              {project.reportPdf && isSafeExternalUrl(project.reportPdf.url) ? (
                <ButtonLink href={project.reportPdf.url} variant="secondary" className="w-full">
                  Academic report PDF
                </ButtonLink>
              ) : null}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-heading text-xl font-semibold text-foreground">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.length > 0 ? (
                project.technologies.map((technology) => (
                  <Badge key={`${project.id}-tech-${technology}`} tone="neutral">
                    {technology}
                  </Badge>
                ))
              ) : null}
            </div>
          </Card>

          {project.skills.length > 0 ? (
            <Card className="p-5">
              <h3 className="font-heading text-xl font-semibold text-foreground">Skills</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={`${project.id}-skill-${skill}`} tone="violet">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
