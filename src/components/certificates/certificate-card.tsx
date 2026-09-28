import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import type { PortfolioCertificate } from "@/lib/notion/certificates";

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const parsed = new Date(`${value.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function isHttpUrl(value: string | null): value is string {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

export function CertificateCard({ certificate }: { certificate: PortfolioCertificate }) {
  const issueDate = formatDate(certificate.issueDate);

  return (
    <Card hoverable className="h-full">
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {certificate.type ? (
            <Badge tone={certificate.type === "Professional Certification" ? "cyan" : "blue"}>
              {certificate.type}
            </Badge>
          ) : <Badge tone="neutral">Certificate</Badge>}
          {issueDate ? <span className="text-xs text-muted">{issueDate}</span> : null}
        </div>

        <h3 className="mt-5 break-words font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {certificate.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-cyan-300">{certificate.issuer}</p>
        {certificate.description ? (
          <p className="mt-4 text-sm leading-6 text-muted">{certificate.description}</p>
        ) : null}
        {certificate.credentialId ? (
          <p className="mt-4 break-all text-xs text-muted">Credential ID: {certificate.credentialId}</p>
        ) : null}
        {certificate.skills.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {certificate.skills.slice(0, 5).map((skill) => (
              <Badge key={`${certificate.id}-${skill}`} tone="neutral">{skill}</Badge>
            ))}
          </div>
        ) : null}

        {isHttpUrl(certificate.credentialUrl) || certificate.certificateFile ? (
          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            {isHttpUrl(certificate.credentialUrl) ? (
              <ButtonLink href={certificate.credentialUrl} variant="primary">Verify credential</ButtonLink>
            ) : null}
            {certificate.certificateFile ? (
              <ButtonLink href={`/certificates/file?id=${encodeURIComponent(certificate.id)}`} variant="secondary">
                View certificate
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
