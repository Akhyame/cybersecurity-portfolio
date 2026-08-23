import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionProjectDetail } from "@/components/projects/notion-project-detail";
import {
  getProjectBlocks,
  getPublishedProjectBySlug,
  getPublishedProjects,
} from "@/lib/notion/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  const publishedProjects = await getPublishedProjects();

  return publishedProjects
    .map((project) => project.slug)
    .filter(
      (slug): slug is string =>
        typeof slug === "string" &&
        slug.trim().length > 0 &&
        /^[a-z0-9-]+$/i.test(slug.trim()),
    )
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

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
  const project = await getPublishedProjectBySlug(slug);

  if (!project || !project.slug) {
    notFound();
  }

  const blocks = await getProjectBlocks(project.id);

  return <NotionProjectDetail project={project} blocks={blocks} />;
}