import "server-only";

import { notionRequest, notionDataSourceId } from "./client";
import { mapNotionPageToProject } from "./properties";
import type { NotionBlock, PortfolioProject } from "./types";

const PAGE_SIZE = 100;

type NotionQueryResponse = {
  results: unknown[];
  has_more: boolean;
  next_cursor: string | null;
};

type NotionBlocksResponse = {
  results: unknown[];
  has_more: boolean;
  next_cursor: string | null;
};

function isQueryResponse(value: unknown): value is NotionQueryResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { results?: unknown[] }).results)
  );
}

function isBlocksResponse(value: unknown): value is NotionBlocksResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { results?: unknown[] }).results)
  );
}

function sortProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return [...projects].sort((left, right) => {
    const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.name.localeCompare(right.name);
  });
}

async function queryAllProjects(): Promise<PortfolioProject[]> {
  const allProjects: PortfolioProject[] = [];
  let cursor: string | null = null;
  let hasMore = true;

  while (hasMore) {
    const response: NotionQueryResponse = await notionRequest<NotionQueryResponse>(
      `/v1/data_sources/${encodeURIComponent(notionDataSourceId)}/query`,
      {
        method: "POST",
        body: {
          page_size: PAGE_SIZE,
          start_cursor: cursor ?? undefined,
        },
      },
    );

    if (!isQueryResponse(response)) {
      throw new Error("Notion query response is malformed.");
    }

    const mappedResults = response.results.map((page) => mapNotionPageToProject(page));
    allProjects.push(...mappedResults);

    hasMore = response.has_more;
    cursor = response.next_cursor ?? null;
  }

  return sortProjects(allProjects);
}

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  const projects = await queryAllProjects();

  return projects.filter((project) => project.status === "Published");
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  return (await getPublishedProjects()).filter((project) => project.featured === true);
}

export async function getPublishedProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const trimmedSlug = slug.trim();

  if (!trimmedSlug || !/^[a-z0-9-]+$/i.test(trimmedSlug)) {
    return null;
  }

  const response: NotionQueryResponse = await notionRequest<NotionQueryResponse>(
    `/v1/data_sources/${encodeURIComponent(notionDataSourceId)}/query`,
    {
      method: "POST",
      body: {
        filter: {
          property: "Slug",
          rich_text: {
            equals: trimmedSlug,
          },
        },
        page_size: PAGE_SIZE,
      },
    },
  );

  if (!isQueryResponse(response)) {
    throw new Error("Notion slug query response is malformed.");
  }

  const matched = response.results
    .map((page) => mapNotionPageToProject(page))
    .find((project) => project.slug?.trim().toLowerCase() === trimmedSlug.toLowerCase());

  if (!matched) {
    return null;
  }

  if (matched.status !== "Published") {
    return null;
  }

  return matched;
}

export async function getVisibleFeaturedProjectBySlug(
  slug: string,
): Promise<PortfolioProject | null> {
  const trimmedSlug = slug.trim();

  if (!trimmedSlug || !/^[a-z0-9-]+$/i.test(trimmedSlug)) {
    return null;
  }

  const projects = await queryAllProjects();

  return (
    projects.find(
      (project) =>
        project.slug?.trim().toLowerCase() === trimmedSlug.toLowerCase() &&
        project.featured === true &&
        (project.status === "In Progress" || project.status === "Published"),
    ) ?? null
  );
}

async function fetchBlocksRecursively(
  blockId: string,
  cursor: string | null = null,
): Promise<NotionBlock[]> {
  const response: NotionBlocksResponse = await notionRequest<NotionBlocksResponse>(
    `/v1/blocks/${encodeURIComponent(blockId)}/children${cursor ? `?start_cursor=${encodeURIComponent(cursor)}` : ""}`,
    {
      method: "GET",
    },
  );

  if (!isBlocksResponse(response)) {
    throw new Error("Notion block response is malformed.");
  }

  const results: NotionBlock[] = response.results.map((block) => {
    const record = block as Record<string, unknown>;
    const normalizedBlock: NotionBlock = {
      id: typeof record["id"] === "string" ? record["id"] : "",
      type: typeof record["type"] === "string" ? record["type"] : "unsupported",
      has_children: typeof record["has_children"] === "boolean" ? record["has_children"] : false,
      ...record,
    };

    if (!normalizedBlock.has_children) {
      return normalizedBlock;
    }

    return {
      ...normalizedBlock,
      children: [],
    };
  });

  const withChildren = await Promise.all(
    results.map(async (block) => {
      if (!block.has_children || !block.id) {
        return block;
      }

      const nestedChildren = await fetchBlocksRecursively(block.id);
      return {
        ...block,
        children: nestedChildren,
      };
    }),
  );

  if (!response.has_more || !response.next_cursor) {
    return withChildren;
  }

  const nextPage = await fetchBlocksRecursively(blockId, response.next_cursor);
  return [...withChildren, ...nextPage];
}

export async function getProjectBlocks(pageId: string): Promise<NotionBlock[]> {
  if (!pageId.trim()) {
    return [];
  }

  return await fetchBlocksRecursively(pageId);
}
