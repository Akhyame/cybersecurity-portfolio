import { splitNotionBlocksAtMedia } from "@/lib/notion/evidence-layout";
import { NotionBlocks } from "@/components/notion/notion-blocks";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { NotionBlock, NotionLab } from "@/lib/notion/types";

type NotionLabDetailProps = {
  lab: NotionLab;
  blocks: NotionBlock[];
};

function isSafeHttpUrl(url: string | null): url is string {
  return typeof url === "string" && /^https?:\/\//i.test(url);
}

export function NotionLabDetail({ lab, blocks }: NotionLabDetailProps) {
  const coverUrl = isSafeHttpUrl(lab.cover?.url ?? null) ? lab.cover?.url ?? null : null;
  const { overviewBlocks, mediaBlocks } = splitNotionBlocksAtMedia(blocks);
  const demoVideoUrl = lab.publishDemo && isSafeHttpUrl(lab.demoVideo?.url ?? null)
    ? lab.demoVideo?.url ?? null
    : null;
  const demoUrl = lab.publishDemo && isSafeHttpUrl(lab.demoUrl) ? lab.demoUrl : null;

  return (
    <Section className="pt-10 sm:pt-12">
      <div className="mb-8">
        <ButtonLink href="/labs" variant="secondary" className="mb-6">
          ← Back to labs
        </ButtonLink>
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge tone="success">Published</Badge>
          {lab.difficulty ? <Badge tone="blue">{lab.difficulty}</Badge> : null}
          {lab.categories.map((category) => (
            <Badge key={`${lab.id}-${category}`} tone="neutral">
              {category}
            </Badge>
          ))}
        </div>
        <h1 className="break-words font-heading text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
          {lab.name}
        </h1>
        {lab.shortDescription ? (
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{lab.shortDescription}</p>
        ) : null}
      </div>

      {coverUrl ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-slate-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt={`${lab.name} cover`} className="h-auto w-full object-contain" />
        </div>
      ) : null}

      {demoVideoUrl ? (
        <section aria-labelledby="lab-video-demo-heading" className="mt-8">
          <h2 id="lab-video-demo-heading" className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Video Demo
          </h2>
          <video
            className="mt-4 aspect-video w-full rounded-xl border border-border bg-slate-950 object-contain"
            src={demoVideoUrl}
            controls
            playsInline
            preload="metadata"
            controlsList="nodownload"
          />
        </section>
      ) : null}

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
        <Card className="min-w-0 p-6 sm:p-8">
          {overviewBlocks.length > 0 ? <NotionBlocks blocks={overviewBlocks} /> : mediaBlocks.length === 0 ? <p className="text-base leading-7 text-muted">Lab content is not currently available in the CMS.</p> : null}
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-heading text-xl font-semibold text-foreground">Lab links</h2>
            <div className="mt-4 space-y-3">
              {isSafeHttpUrl(lab.githubUrl) ? <ButtonLink href={lab.githubUrl} variant="secondary" className="w-full">GitHub repository</ButtonLink> : null}
              {demoUrl ? <ButtonLink href={demoUrl} variant="secondary" className="w-full">Demo</ButtonLink> : null}
            </div>
          </Card>
          {lab.technologies.length > 0 ? (
            <Card className="p-5">
              <h2 className="font-heading text-xl font-semibold text-foreground">Tools and technologies</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {lab.technologies.map((technology) => <Badge key={`${lab.id}-technology-${technology}`}>{technology}</Badge>)}
              </div>
            </Card>
          ) : null}
          {lab.skills.length > 0 ? (
            <Card className="p-5">
              <h2 className="font-heading text-xl font-semibold text-foreground">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {lab.skills.map((skill) => <Badge key={`${lab.id}-skill-${skill}`} tone="violet">{skill}</Badge>)}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
      {mediaBlocks.length > 0 ? (
        <Card className="mt-8 min-w-0 p-6 sm:p-8">
          <NotionBlocks blocks={mediaBlocks} />
        </Card>
      ) : null}
    </Section>
  );
}
