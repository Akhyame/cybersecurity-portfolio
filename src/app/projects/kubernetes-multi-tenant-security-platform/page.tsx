import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionProjectDetail } from "@/components/projects/notion-project-detail";
import {
  getProjectBlocks,
  getVisibleFeaturedProjectBySlug,
} from "@/lib/notion/projects";

const projectSlug = "kubernetes-multi-tenant-security-platform";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const project = await getVisibleFeaturedProjectBySlug(projectSlug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.name,
    description: project.shortDescription ?? undefined,
    alternates: {
      canonical: `/projects/${projectSlug}`,
    },
  };
}

export default async function Page() {
  const project = await getVisibleFeaturedProjectBySlug(projectSlug);

  if (!project) {
    notFound();
  }

  const blocks = await getProjectBlocks(project.id);

  return <NotionProjectDetail project={project} blocks={blocks} />;
}