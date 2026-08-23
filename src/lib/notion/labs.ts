import "server-only";

import { notionRequest } from "./client";
import {
  checkbox,
  date,
  firstFile,
  multiSelect,
  number,
  richText,
  select,
  status,
  title,
  url,
} from "./properties";
import type { NotionBlock, NotionLab } from "./types";

const PAGE_SIZE = 100;

function getLabsDataSourceId(): string {
  const value = process.env.NOTION_LABS_DATA_SOURCE_ID?.trim();
  if (!value) {
    throw new Error("Server configuration error: missing NOTION_LABS_DATA_SOURCE_ID.");
  }
  return value;
}

type NotionQueryResponse = {
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

function mapNotionPageToLab(page: unknown): NotionLab {
  if (typeof page !== "object" || page === null || typeof (page as { properties?: unknown }).properties !== "object") {
    throw new Error("Notion lab page is missing a valid properties object.");
  }

  const record = page as { id?: unknown; properties: Record<string, unknown> };
  const properties = record.properties;

  return {
    id: typeof record.id === "string" ? record.id : "",
    name: title(properties["Name"]),
    status: status(properties["Status"]),
    slug: richText(properties["Slug"]) || null,
    shortDescription: richText(properties["Short Description"]) || null,
    categories: multiSelect(properties["Category"]),
    skills: multiSelect(properties["Skills"]),
    technologies: multiSelect(properties["Technologies"]),
    difficulty: select(properties["Difficulty"]),
    featured: checkbox(properties["Featured"]),
    githubUrl: url(properties["GitHub URL"]),
    demoUrl: url(properties["Demo URL"]),
    demoVideo: firstFile(properties["Demo Video"]),
    publishDemo: checkbox(properties["Publish Demo"]),
    cover: firstFile(properties["Cover"]),
    labDate: date(properties["Lab Date"]),
    sortOrder: number(properties["Sort Order"]),
  };
}

async function queryAllLabs(): Promise<NotionLab[]> {
  const results: NotionLab[] = [];
  let cursor: string | null = null;
  const dataSourceId = getLabsDataSourceId();

  do {
    const body: { page_size: number; start_cursor?: string } = {
      page_size: PAGE_SIZE,
      ...(cursor ? { start_cursor: cursor } : {}),
    };
    const response: NotionQueryResponse = await notionRequest<NotionQueryResponse>(
      `/v1/data_sources/${encodeURIComponent(dataSourceId)}/query`,
      { method: "POST", body },
    );

    if (!isQueryResponse(response)) {
      throw new Error("Notion Labs query response is malformed.");
    }

    results.push(...response.results.map(mapNotionPageToLab));
    cursor = response.next_cursor;
  } while (cursor);

  return results;
}

function sortLabs(labs: NotionLab[]): NotionLab[] {
  return [...labs].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.name.localeCompare(right.name);
  });
}

export async function getPublishedLabs(): Promise<NotionLab[]> {
  return sortLabs((await queryAllLabs()).filter((lab) => lab.status === "Published"));
}

export async function getPublishedLabBySlug(slug: string): Promise<NotionLab | null> {
  const trimmedSlug = slug.trim();
  if (!trimmedSlug || !/^[a-z0-9-]+$/i.test(trimmedSlug)) {
    return null;
  }

  const dataSourceId = getLabsDataSourceId();
  const response = await notionRequest<NotionQueryResponse>(
    `/v1/data_sources/${encodeURIComponent(dataSourceId)}/query`,
    {
      method: "POST",
      body: {
        filter: { property: "Slug", rich_text: { equals: trimmedSlug } },
        page_size: PAGE_SIZE,
      },
    },
  );

  if (!isQueryResponse(response)) {
    throw new Error("Notion Lab slug query response is malformed.");
  }

  const lab = response.results
    .map(mapNotionPageToLab)
    .find((entry) => entry.slug?.toLowerCase() === trimmedSlug.toLowerCase());

  return lab?.status === "Published" ? lab : null;
}

export async function getLabBlocks(pageId: string): Promise<NotionBlock[]> {
  if (!pageId.trim()) {
    return [];
  }

  const response = await notionRequest<{ results?: NotionBlock[]; has_more?: boolean; next_cursor?: string | null }>(
    `/v1/blocks/${encodeURIComponent(pageId)}/children?page_size=${PAGE_SIZE}`,
    { method: "GET" },
  );

  if (!Array.isArray(response.results)) {
    throw new Error("Notion Lab block response is malformed.");
  }

  const blocks = response.results.map((block) => ({ ...block }));
  if (response.has_more && response.next_cursor) {
    const nextBlocks = await getLabBlocksPage(pageId, response.next_cursor);
    blocks.push(...nextBlocks);
  }

  return Promise.all(
    blocks.map(async (block) => {
      if (!block.has_children || !block.id) {
        return block;
      }
      return { ...block, children: await getLabBlocks(block.id) };
    }),
  );
}

async function getLabBlocksPage(pageId: string, cursor: string): Promise<NotionBlock[]> {
  const response = await notionRequest<{ results?: NotionBlock[]; has_more?: boolean; next_cursor?: string | null }>(
    `/v1/blocks/${encodeURIComponent(pageId)}/children?page_size=${PAGE_SIZE}&start_cursor=${encodeURIComponent(cursor)}`,
    { method: "GET" },
  );

  if (!Array.isArray(response.results)) {
    throw new Error("Notion Lab block response is malformed.");
  }

  const blocks = [...response.results];
  if (response.has_more && response.next_cursor) {
    blocks.push(...(await getLabBlocksPage(pageId, response.next_cursor)));
  }
  return blocks;
}
