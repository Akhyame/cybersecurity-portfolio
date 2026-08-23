import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionLabDetail } from "@/components/labs/notion-lab-detail";
import { getLabBlocks, getPublishedLabBySlug } from "@/lib/notion/labs";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = await getPublishedLabBySlug(slug);

  if (!lab) {
    return {
      title: "Lab not found",
    };
  }

  return {
    title: lab.name,
    description: lab.shortDescription ?? undefined,
    alternates: {
      canonical: `/labs/${encodeURIComponent(slug)}`,
    },
  };
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = await getPublishedLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  const blocks = await getLabBlocks(lab.id);

  return <NotionLabDetail lab={lab} blocks={blocks} />;
}