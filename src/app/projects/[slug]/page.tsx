import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionProjectDetail } from "@/components/projects/notion-project-detail";
import {
  getProjectBlocks,
  getVisibleProjectBySlug,
} from "@/lib/notion/projects";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getVisibleProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.name,
    description: project.shortDescription ?? undefined,
    alternates: {
      canonical: `/projects/${encodeURIComponent(slug)}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getVisibleProjectBySlug(slug);

  if (!project || !project.slug) {
    notFound();
  }

  const blocks = await getProjectBlocks(project.id);

  return <NotionProjectDetail project={project} blocks={blocks} />;
}
