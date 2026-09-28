import { CertificateCard } from "@/components/certificates/certificate-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { getPublishedCertificates, type PortfolioCertificate } from "@/lib/notion/certificates";

export async function FeaturedCertificates() {
  let certificates: PortfolioCertificate[];
  try {
    certificates = (await getPublishedCertificates())
      .filter((certificate) => certificate.featured)
      .slice(0, 3);
  } catch (error) {
    console.error("Unable to load featured certificates from Notion", error);
    return null;
  }

  if (certificates.length === 0) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow="CERTIFICATES"
        title="Certifications & Training"
        description="Selected credentials and completed training, backed by available evidence."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/certificates" variant="secondary">View all certificates</ButtonLink>
      </div>
    </Section>
  );
}
