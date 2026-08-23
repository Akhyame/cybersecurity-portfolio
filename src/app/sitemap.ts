import type { MetadataRoute } from "next";
import { getPublishedLabs } from "@/lib/notion/labs";
import { getPublishedProjects } from "@/lib/notion/projects";

export const dynamic = "force-dynamic";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectsResult, labsResult] = await Promise.allSettled([
    getPublishedProjects(),
    getPublishedLabs(),
  ]);

  const projects =
    projectsResult.status === "fulfilled" ? projectsResult.value : [];

  const labs = labsResult.status === "fulfilled" ? labsResult.value : [];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects/kubernetes-multi-tenant-security-platform`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/labs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/skills`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/resume`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => project.slug)
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const labRoutes: MetadataRoute.Sitemap = labs
    .filter((lab) => lab.slug)
    .map((lab) => ({
      url: `${siteUrl}/labs/${lab.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const routes = [...staticRoutes, ...projectRoutes, ...labRoutes];
  const seenUrls = new Set<string>();

  return routes.filter((route) => {
    if (seenUrls.has(route.url)) {
      return false;
    }

    seenUrls.add(route.url);
    return true;
  });
}