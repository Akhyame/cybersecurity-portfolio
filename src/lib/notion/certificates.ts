import "server-only";

import { notionRequest } from "./client";
import { checkbox, date, firstFile, multiSelect, number, richText, select, title, url } from "./properties";
import type { NotionFileAsset } from "./types";

// The data source ID is an identifier, not a credential. The API key stays server-side.
const CERTIFICATES_DATA_SOURCE_ID = "a9a518a2-3d5d-4a05-855d-f040e072d064";

export type PortfolioCertificate = {
  id: string;
  name: string;
  issuer: string;
  issueDate: string | null;
  type: string | null;
  skills: string[];
  credentialUrl: string | null;
  certificateFile: NotionFileAsset | null;
  credentialId: string | null;
  description: string | null;
  status: string | null;
  featured: boolean;
  sortOrder: number | null;
};

type NotionQueryResponse = {
  results: unknown[];
  has_more: boolean;
  next_cursor: string | null;
};

function mapCertificate(page: unknown): PortfolioCertificate {
  if (typeof page !== "object" || page === null) {
    throw new Error("Notion certificate page is malformed.");
  }

  const record = page as { id?: unknown; properties?: Record<string, unknown> };
  if (!record.properties || typeof record.properties !== "object") {
    throw new Error("Notion certificate properties are missing.");
  }

  const properties = record.properties;

  return {
    id: typeof record.id === "string" ? record.id : "",
    name: title(properties["Name"]),
    issuer: richText(properties["Issuer"]),
    issueDate: date(properties["Issue Date"]),
    type: select(properties["Type"]),
    skills: multiSelect(properties["Skills"]),
    credentialUrl: url(properties["Credential URL"]),
    certificateFile: firstFile(properties["Certificate File"]),
    credentialId: richText(properties["Credential ID"]) || null,
    description: richText(properties["Description"]) || null,
    status: select(properties["Status"]),
    featured: checkbox(properties["Featured"]),
    sortOrder: number(properties["Sort Order"]),
  };
}

function isQueryResponse(value: unknown): value is NotionQueryResponse {
  return typeof value === "object" && value !== null &&
    Array.isArray((value as { results?: unknown }).results);
}

function sortCertificates(certificates: PortfolioCertificate[]): PortfolioCertificate[] {
  return [...certificates].sort((left, right) => {
    const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;
    if (leftOrder !== rightOrder) return leftOrder - rightOrder;

    const dateOrder = (right.issueDate ?? "").localeCompare(left.issueDate ?? "");
    return dateOrder || left.name.localeCompare(right.name);
  });
}

export async function getPublishedCertificates(): Promise<PortfolioCertificate[]> {
  const certificates: PortfolioCertificate[] = [];
  let cursor: string | null = null;

  do {
    const response: NotionQueryResponse = await notionRequest<NotionQueryResponse>(
      `/v1/data_sources/${CERTIFICATES_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          filter: { property: "Status", select: { equals: "Published" } },
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        },
      },
    );

    if (!isQueryResponse(response)) {
      throw new Error("Notion certificates query response is malformed.");
    }

    certificates.push(...response.results.map(mapCertificate));
    cursor = response.next_cursor;
  } while (cursor);

  return sortCertificates(certificates.filter((certificate) =>
    certificate.status === "Published" && certificate.name && certificate.issuer,
  ));
}

export async function getPublishedCertificateFile(pageId: string): Promise<string | null> {
  if (!/^[a-f0-9-]{32,36}$/i.test(pageId)) return null;

  const page = await notionRequest<unknown>(`/v1/pages/${encodeURIComponent(pageId)}`);
  const certificate = mapCertificate(page);
  if (certificate.status !== "Published") return null;

  const fileUrl = certificate.certificateFile?.url;
  return fileUrl && /^https:\/\//i.test(fileUrl) ? fileUrl : null;
}
