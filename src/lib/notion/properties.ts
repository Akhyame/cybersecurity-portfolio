import type { NotionFileAsset, NotionRichText, PortfolioProject } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function coerceString(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return null;
}

function toPlainText(textEntry: unknown): string {
  if (!isRecord(textEntry)) {
    return "";
  }

  if (typeof textEntry["plain_text"] === "string") {
    return textEntry["plain_text"] as string;
  }

  if (typeof textEntry["text"] === "object" && textEntry["text"] !== null) {
    const text = textEntry["text"] as Record<string, unknown>;
    if (typeof text["content"] === "string") {
      return text["content"] as string;
    }
  }

  if (typeof textEntry["content"] === "string") {
    return textEntry["content"] as string;
  }

  return "";
}

function normalizeInternalFile(value: unknown): NotionFileAsset | null {
  if (!isRecord(value)) {
    return null;
  }

  const fileValue = isRecord(value["file"]) ? value["file"] : null;
  const externalValue = isRecord(value["external"]) ? value["external"] : null;

  const url =
    typeof value["url"] === "string"
      ? value["url"]
      : typeof fileValue?.["url"] === "string"
        ? fileValue["url"]
        : typeof externalValue?.["url"] === "string"
          ? externalValue["url"]
          : null;

  const name =
    typeof value["name"] === "string"
      ? value["name"]
      : typeof fileValue?.["name"] === "string"
        ? fileValue["name"]
        : typeof externalValue?.["name"] === "string"
          ? externalValue["name"]
          : "untitled";

  const expiryTime =
    typeof fileValue?.["expiry_time"] === "string" ? fileValue["expiry_time"] : null;

  if (!url) {
    return null;
  }

  return {
    name,
    url,
    expiryTime,
  };
}

export function title(property: unknown): string {
  if (!isRecord(property) || property.type !== "title") {
    return "";
  }

  const values = Array.isArray(property["title"]) ? property["title"] : [];
  return values.map((entry) => toPlainText(entry)).join("").trim();
}

export function richText(property: unknown): string {
  if (!isRecord(property) || property.type !== "rich_text") {
    return "";
  }

  const values = Array.isArray(property["rich_text"]) ? property["rich_text"] : [];
  return values.map((entry) => toPlainText(entry)).join("").trim();
}

export function checkbox(property: unknown): boolean {
  return isRecord(property) && property.type === "checkbox" && typeof property["checkbox"] === "boolean"
    ? property["checkbox"]
    : false;
}

export function select(property: unknown): string | null {
  if (!isRecord(property) || property.type !== "select") {
    return null;
  }

  const selectValue = isRecord(property["select"]) ? property["select"] : null;
  return typeof selectValue?.["name"] === "string" ? (selectValue["name"] as string) : null;
}

export function status(property: unknown): string | null {
  if (!isRecord(property)) {
    return null;
  }

  if (property.type === "status" && isRecord(property["status"])) {
    const statusValue = property["status"] as Record<string, unknown>;
    return typeof statusValue["name"] === "string" ? (statusValue["name"] as string) : null;
  }

  return select(property);
}

export function multiSelect(property: unknown): string[] {
  if (!isRecord(property) || property.type !== "multi_select") {
    return [];
  }

  return (Array.isArray(property["multi_select"]) ? property["multi_select"] : [])
    .map((entry) => {
      if (!isRecord(entry)) {
        return null;
      }

      return typeof entry["name"] === "string" ? (entry["name"] as string) : null;
    })
    .filter((value): value is string => typeof value === "string" && value.length > 0);
}

export function url(property: unknown): string | null {
  if (!isRecord(property)) {
    return null;
  }

  if (property.type === "url") {
    return coerceString(property["url"]);
  }

  return null;
}

export function date(property: unknown): string | null {
  if (!isRecord(property) || property.type !== "date") {
    return null;
  }

  const dateValue = isRecord(property["date"]) ? property["date"] : null;
  return typeof dateValue?.["start"] === "string" ? (dateValue["start"] as string) : null;
}

export function number(property: unknown): number | null {
  if (!isRecord(property) || property.type !== "number") {
    return null;
  }

  const value = property["number"];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function files(property: unknown): NotionFileAsset[] {
  if (!isRecord(property) || property.type !== "files") {
    return [];
  }

  const values = Array.isArray(property["files"]) ? property["files"] : [];

  return values
    .map((entry) => normalizeInternalFile(entry))
    .filter((entry): entry is NotionFileAsset => entry !== null);
}

export function firstFile(property: unknown): NotionFileAsset | null {
  const fileList = files(property);
  return fileList[0] ?? null;
}

export function getStatusValue(property: unknown): string | null {
  const statusValue = status(property);
  if (statusValue) {
    return statusValue;
  }

  return select(property);
}

export function getNotionRichTextValue(value: unknown): NotionRichText[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (!isRecord(entry)) {
        return null;
      }

      const annotations = isRecord(entry["annotations"]) ? entry["annotations"] : {};
      const textValue = isRecord(entry["text"]) ? entry["text"] : null;
      const plainText = toPlainText(entry);
      const href = typeof entry["href"] === "string" ? (entry["href"] as string) : null;

      const richText: NotionRichText = {
        type: typeof entry["type"] === "string" ? (entry["type"] as "text" | "mention" | "equation") : "text",
        plainText,
        href,
        annotations: {
          bold: Boolean(annotations["bold"]),
          italic: Boolean(annotations["italic"]),
          underline: Boolean(annotations["underline"]),
          strikethrough: Boolean(annotations["strikethrough"]),
          code: Boolean(annotations["code"]),
          color: typeof annotations["color"] === "string" ? (annotations["color"] as string) : "default",
        },
      };

      if (textValue) {
        richText.text = {
          content: typeof textValue["content"] === "string" ? (textValue["content"] as string) : "",
          link:
            isRecord(textValue["link"]) && typeof textValue["link"]["url"] === "string"
              ? { url: textValue["link"]["url"] as string }
              : null,
        };
      }

      return richText;
    })
    .filter((value): value is NotionRichText => value !== null);
}

export function mapNotionPageToProject(page: unknown): PortfolioProject {
  if (!isRecord(page) || !isRecord(page["properties"])) {
    throw new Error("Notion page is missing a valid properties object.");
  }

  const properties = page["properties"] as Record<string, unknown>;
  const statusValue = getStatusValue(properties["Status"] ?? null);

  return {
    id: typeof page["id"] === "string" ? page["id"] : "",
    name: title(properties["Name"] ?? null),
    status: statusValue,
    categories: multiSelect(properties["Category"] ?? null),
    featured: checkbox(properties["Featured"] ?? null),
    shortDescription: richText(properties["Short Description"] ?? null) || null,
    technologies: multiSelect(properties["Technologies"] ?? null),
    skills: multiSelect(properties["Skills"] ?? null),
    githubUrl: url(properties["GitHub URL"] ?? null),
    demoUrl: url(properties["Demo URL"] ?? null),
    reportUrl: url(properties["Report URL"] ?? null),
    projectDate: date(properties["Project Date"] ?? null),
    difficulty: select(properties["Difficulty"] ?? null),
    slug: richText(properties["Slug"] ?? null) || null,
    cover: firstFile(properties["Cover"] ?? null),
    sortOrder: number(properties["Sort Order"] ?? null),
    reportPdf: firstFile(properties["Report PDF"] ?? null),
  };
}
