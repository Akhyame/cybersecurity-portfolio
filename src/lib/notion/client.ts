import "server-only";

const NOTION_VERSION = "2026-03-11";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Server configuration error: missing required environment variable ${name}.`);
  }

  return value;
}

export const notionApiKey = getRequiredEnv("NOTION_API_KEY");
export const notionDataSourceId = getRequiredEnv("NOTION_PROJECTS_DATA_SOURCE_ID");

export type NotionRequestInit = {
  method?: "GET" | "POST";
  headers?: HeadersInit;
  body?: unknown;
};

export async function notionRequest<T>(
  path: string,
  init: NotionRequestInit = {},
): Promise<T> {
  const method = init.method ?? "GET";
  const headers = new Headers({
    Authorization: `Bearer ${notionApiKey}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  });

  const response = await fetch(`https://api.notion.com${path}`, {
    method,
    cache: "no-store",
    headers,
    body:
      method === "POST" && init.body !== undefined
        ? JSON.stringify(init.body)
        : undefined,
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;
    const safeMessage =
      typeof errorPayload?.error?.message === "string"
        ? errorPayload.error.message
        : "Notion API request failed";

    throw new Error(`Notion API request failed (${response.status}): ${safeMessage}`);
  }

  return (await response.json()) as T;
}
