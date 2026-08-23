import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import type { NotionLab } from "@/lib/notion/types";

type LabCardProps = {
  lab: NotionLab;
};

function isSafeHttpUrl(url: string | null): url is string {
  return typeof url === "string" && /^https?:\/\//i.test(url);
}

export function LabCard({ lab }: LabCardProps) {
  if (!lab.slug) {
    return null;
  }

  return (
    <Card hoverable className="h-full">
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success">Published</Badge>
          {lab.difficulty ? <Badge tone="blue">{lab.difficulty}</Badge> : null}
        </div>

        <h2 className="mt-5 break-words font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {lab.name}
        </h2>
        {lab.shortDescription ? (
          <p className="mt-3 text-base leading-7 text-muted">{lab.shortDescription}</p>
        ) : null}

        {lab.categories.length > 0 || lab.technologies.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {[...lab.categories, ...lab.technologies].map((item, index) => (
              <Badge key={`${lab.id}-${item}-${index}`} tone="neutral">
                {item}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3 pt-2">
          <ButtonLink href={`/labs/${lab.slug}`} variant="primary">
            View lab
          </ButtonLink>
          {isSafeHttpUrl(lab.githubUrl) ? (
            <ButtonLink href={lab.githubUrl} variant="secondary">
              GitHub
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
