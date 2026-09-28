import type { Metadata } from "next";
import { CertificateCard } from "@/components/certificates/certificate-card";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { getPublishedCertificates, type PortfolioCertificate } from "@/lib/notion/certificates";

export const metadata: Metadata = {
  alternates: { canonical: "/certificates" },
  title: "Certificates",
  description: "Professional certifications and completed cybersecurity training earned by Siham Akhyame.",
};

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  let certificates: PortfolioCertificate[];
  let isUnavailable = false;
  try {
    certificates = await getPublishedCertificates();
  } catch (error) {
    console.error("Unable to load certificates from Notion", error);
    certificates = [];
    isUnavailable = true;
  }

  return (
    <Section className="pt-10 sm:pt-12">
      <SectionHeading
        eyebrow="CERTIFICATES"
        title="Certifications & Training"
        level="h1"
        description="Professional credentials and completed training, with links to evidence where available."
      />

      {isUnavailable ? (
        <Card className="mt-10 p-8 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground">Certificates temporarily unavailable</h2>
          <p className="mt-4 text-muted">Please try again later.</p>
        </Card>
      ) : certificates.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      ) : (
        <Card className="mt-10 p-8 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground">Certificates coming soon</h2>
          <p className="mt-4 text-muted">Verified certificates will appear here as they are published.</p>
        </Card>
      )}
    </Section>
  );
}
