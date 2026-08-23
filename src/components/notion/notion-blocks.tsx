import { Fragment, type ReactNode } from "react";
import type { NotionBlock, NotionRichText } from "@/lib/notion/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSafeUrl(url: string): boolean {
  const trimmedUrl = url.trim();

  if (trimmedUrl.startsWith("/") && !trimmedUrl.startsWith("//")) {
    return true;
  }

  if (trimmedUrl.startsWith("#")) {
    return true;
  }

  try {
    const parsed = new URL(trimmedUrl);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

const notionColorClasses: Record<string, string> = {
  gray: "text-slate-400",
  brown: "text-amber-300",
  orange: "text-orange-300",
  yellow: "text-yellow-200",
  green: "text-emerald-300",
  blue: "text-blue-300",
  purple: "text-violet-300",
  pink: "text-pink-300",
  red: "text-red-300",
};

function renderInlineText(text: NotionRichText): ReactNode {
  const content = text.plainText || text.text?.content || "";
  const href = text.href || text.text?.link?.url || null;
  const colorClass = notionColorClasses[text.annotations.color] || "";

  if (!content) {
    return null;
  }

  let formattedContent: ReactNode = content;
  if (text.annotations.bold && text.annotations.italic) {
    formattedContent = <strong><em>{formattedContent}</em></strong>;
  } else if (text.annotations.bold) {
    formattedContent = <strong>{formattedContent}</strong>;
  } else if (text.annotations.italic) {
    formattedContent = <em>{formattedContent}</em>;
  }
  if (text.annotations.underline) {
    formattedContent = <span className="underline underline-offset-2">{formattedContent}</span>;
  }
  if (text.annotations.strikethrough) {
    formattedContent = <span className="line-through">{formattedContent}</span>;
  }
  if (text.annotations.code) {
    formattedContent = <code className="rounded bg-slate-800 px-1 py-0.5 text-cyan-200">{formattedContent}</code>;
  }
  if (colorClass) {
    formattedContent = <span className={colorClass}>{formattedContent}</span>;
  }

  if (!href || !isSafeUrl(href)) {
    return formattedContent;
  }

  const isExternal = /^https?:\/\//i.test(href.trim());
  return (
    <a
      href={href.trim()}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {formattedContent}
    </a>
  );
}

function renderRichText(richText: NotionRichText[]): ReactNode {
  if (richText.length === 0) {
    return null;
  }

  return richText.map((text, index) => (
    <Fragment key={`${text.plainText}-${index}`}>{renderInlineText(text)}</Fragment>
  ));
}

function renderRichTextData(data: unknown): ReactNode {
  if (!Array.isArray(data)) {
    return null;
  }
  return renderRichText(data as NotionRichText[]);
}

function richTextValue(data: unknown): NotionRichText[] {
  return Array.isArray(data) ? (data as NotionRichText[]) : [];
}

function readableText(data: unknown): string {
  return richTextValue(data)
    .map((text) => text.plainText || text.text?.content || "")
    .join("")
    .trim();
}

type HeadingEntry = {
  blockId: string;
  text: string;
  id: string;
};

type RenderContext = {
  headings: HeadingEntry[];
  headingIds: Map<string, string>;
};

function headingText(block: NotionBlock): string {
  const blockData = isRecord(block[block.type]) ? (block[block.type] as Record<string, unknown>) : undefined;
  return readableText(blockData?.["rich_text"]);
}

function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug;
}

function collectHeadings(blocks: NotionBlock[], counts = new Map<string, number>(), headings: HeadingEntry[] = []): HeadingEntry[] {
  for (const block of blocks) {
    if (block.type.match(/^heading_[123]$/)) {
      const text = headingText(block);
      if (text) {
        const base = slugifyHeading(text) || "heading";
        const count = (counts.get(base) ?? 0) + 1;
        counts.set(base, count);
        headings.push({
          blockId: block.id,
          text,
          id: `notion-${base}-${count}-${block.id.replace(/[^a-zA-Z0-9-]/g, "")}`,
        });
      }
    }

    if (Array.isArray(block.children)) {
      collectHeadings(block.children, counts, headings);
    }
  }

  return headings;
}

function createRenderContext(blocks: NotionBlock[]): RenderContext {
  const headings = collectHeadings(blocks);
  return {
    headings,
    headingIds: new Map(headings.map((heading) => [heading.blockId, heading.id])),
  };
}

function renderTableOfContents(context: RenderContext): ReactNode {
  if (context.headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-border bg-surface/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Table of contents</p>
      <ol className="mt-3 space-y-2 text-sm text-muted">
        {context.headings.map((heading) => (
          <li key={heading.blockId}>
            <a
              href={`#${heading.id}`}
              className="underline-offset-2 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function renderBlock(block: NotionBlock, context: RenderContext, nearestHeading: string | null): ReactNode {
  const blockData = isRecord(block[block.type]) ? (block[block.type] as Record<string, unknown>) : undefined;

  switch (block.type) {
    case "paragraph":
      return readableText(blockData?.["rich_text"]) ? <p className="text-base leading-7 text-muted">{renderRichTextData(blockData?.["rich_text"])}</p> : null;
    case "heading_1":
      return headingText(block) ? <h1 id={context.headingIds.get(block.id)} className="font-heading text-3xl font-semibold tracking-tight text-foreground">{renderRichTextData(blockData?.["rich_text"])}</h1> : null;
    case "heading_2":
      return headingText(block) ? <h2 id={context.headingIds.get(block.id)} className="font-heading text-2xl font-semibold tracking-tight text-foreground">{renderRichTextData(blockData?.["rich_text"])}</h2> : null;
    case "heading_3":
      return headingText(block) ? <h3 id={context.headingIds.get(block.id)} className="font-heading text-xl font-semibold text-foreground">{renderRichTextData(blockData?.["rich_text"])}</h3> : null;
    case "quote":
      return readableText(blockData?.["rich_text"]) ? <blockquote className="border-l border-primary/40 pl-4 italic text-muted">{renderRichTextData(blockData?.["rich_text"])}</blockquote> : null;
    case "callout":
      return readableText(blockData?.["rich_text"]) ? <aside className="rounded-xl border border-border bg-surface/80 p-4 text-muted">{renderRichTextData(blockData?.["rich_text"])}</aside> : null;
    case "code": {
      const text = readableText(blockData?.["rich_text"]);
      const language = typeof blockData?.["language"] === "string" ? (blockData["language"] as string) : "";
      const codeClassName = language ? `language-${language}` : "";
      return text ? (
        <pre className="overflow-x-auto rounded-xl border border-border bg-slate-950 p-4 text-sm text-cyan-100">
          <code className={codeClassName}>{text}</code>
        </pre>
      ) : null;
    }
    case "divider":
      return <hr className="my-4 border-border" />;
    case "table": {
      const rows = Array.isArray(block.children) ? block.children.filter((child) => child.type === "table_row") : [];
      const hasColumnHeader = blockData?.["has_column_header"] === true;
      const hasRowHeader = blockData?.["has_row_header"] === true;

      if (rows.length === 0) {
        return null;
      }

      const renderRow = (row: NotionBlock, rowIndex: number, header: boolean) => {
        const rowData = isRecord(row["table_row"]) ? (row["table_row"] as Record<string, unknown>) : {};
        const cells = Array.isArray(rowData["cells"]) ? rowData["cells"] : [];
        return (
          <tr key={row.id || rowIndex}>
            {cells.map((cell, cellIndex) => {
              const isRowHeader = hasRowHeader && cellIndex === 0;
              const Cell = header || isRowHeader ? "th" : "td";
              return (
                <Cell
                  key={`${row.id}-${cellIndex}`}
                  scope={header ? "col" : isRowHeader ? "row" : undefined}
                  className="border border-border px-3 py-2 text-left align-top text-sm leading-6 text-muted"
                >
                  {renderRichTextData(cell)}
                </Cell>
              );
            })}
          </tr>
        );
      };

      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full border-collapse bg-surface/60">
            {hasColumnHeader ? <thead>{renderRow(rows[0], 0, true)}</thead> : null}
            <tbody>{(hasColumnHeader ? rows.slice(1) : rows).map((row, index) => renderRow(row, index, false))}</tbody>
          </table>
        </div>
      );
    }
    case "table_of_contents":
      return renderTableOfContents(context);
    case "bookmark": {
      const url = typeof blockData?.["url"] === "string" ? blockData["url"] : "";
      const caption = Array.isArray(blockData?.["caption"]) ? (blockData["caption"] as NotionRichText[]) : [];
      if (!url || !isSafeUrl(url)) {
        return null;
      }
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="block rounded-xl border border-border bg-surface/80 p-4 text-cyan-300 underline-offset-2 hover:text-cyan-200"
        >
          {caption.length > 0 ? renderRichText(caption) : url}
        </a>
      );
    }
    case "image": {
      const imageData = isRecord(blockData) ? blockData : null;
      const externalEntry = isRecord(imageData?.["external"]) ? (imageData["external"] as Record<string, unknown>) : null;
      const fileEntry = isRecord(imageData?.["file"]) ? (imageData["file"] as Record<string, unknown>) : null;
      const externalUrl = typeof externalEntry?.["url"] === "string" ? externalEntry["url"] : "";
      const fileUrl = typeof fileEntry?.["url"] === "string" ? fileEntry["url"] : "";
      const source = externalUrl || fileUrl;
      if (!source || !isSafeUrl(source)) {
        return null;
      }
      const caption = Array.isArray(imageData?.["caption"]) ? (imageData["caption"] as NotionRichText[]) : [];
      const captionText = caption.map((line) => line.plainText).join(" ").trim();
      const altText = captionText || (nearestHeading ? `${nearestHeading} image` : "Project evidence image");
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <figure className="overflow-hidden rounded-xl border border-border bg-slate-950">
          <img src={source} alt={altText} loading="lazy" className="h-auto w-full max-w-full object-contain" />
          {caption.length > 0 ? <figcaption className="px-3 py-2 text-sm text-muted">{renderRichText(caption)}</figcaption> : null}
        </figure>
      );
    }
    case "file": {
      const fileData = isRecord(blockData) ? blockData : null;
      const fileEntry = isRecord(fileData?.["file"]) ? (fileData["file"] as Record<string, unknown>) : null;
      const externalEntry = isRecord(fileData?.["external"]) ? (fileData["external"] as Record<string, unknown>) : null;
      const fileSource = typeof fileEntry?.["url"] === "string" ? fileEntry["url"] : typeof externalEntry?.["url"] === "string" ? externalEntry["url"] : "";
      const caption = Array.isArray(fileData?.["caption"]) ? (fileData["caption"] as NotionRichText[]) : [];
      if (!fileSource) {
        return null;
      }
      return (
        <a href={fileSource} target="_blank" rel="noreferrer noopener" className="inline-flex rounded-full border border-border bg-surface px-3 py-2 text-sm text-cyan-300 hover:text-cyan-200">
          {renderRichText(caption) || "Open file"}
        </a>
      );
    }
    case "pdf": {
      const fileData = isRecord(blockData) ? blockData : null;
      const fileEntry = isRecord(fileData?.["file"]) ? (fileData["file"] as Record<string, unknown>) : null;
      const externalEntry = isRecord(fileData?.["external"]) ? (fileData["external"] as Record<string, unknown>) : null;
      const fileSource = typeof fileEntry?.["url"] === "string" ? fileEntry["url"] : typeof externalEntry?.["url"] === "string" ? externalEntry["url"] : "";
      if (!fileSource) {
        return null;
      }
      return (
        <a href={fileSource} target="_blank" rel="noreferrer noopener" className="inline-flex rounded-full border border-border bg-surface px-3 py-2 text-sm text-cyan-300 hover:text-cyan-200">
          Open PDF
        </a>
      );
    }
    default:
      return null;
  }
}

function renderList(
  blocks: NotionBlock[],
  type: "bulleted_list_item" | "numbered_list_item",
  context: RenderContext,
  nearestHeading: string | null,
) {
  const items = blocks.filter((block) => {
    const blockData = isRecord(block[block.type]) ? (block[block.type] as Record<string, unknown>) : undefined;
    return readableText(blockData?.["rich_text"]) || (Array.isArray(block.children) && block.children.length > 0);
  });

  if (items.length === 0) {
    return null;
  }

  const ListTag = type === "bulleted_list_item" ? "ul" : "ol";
  const listKey = `${type}-${items[0].id || "list"}`;

  return (
    <ListTag key={listKey} className={type === "bulleted_list_item" ? "ml-6 list-disc space-y-2 text-muted" : "ml-6 list-decimal space-y-2 text-muted"}>
      {items.map((block) => {
        const blockData = isRecord(block[block.type]) ? (block[block.type] as Record<string, unknown>) : undefined;
        const richText = Array.isArray(blockData?.["rich_text"]) ? (blockData["rich_text"] as NotionRichText[]) : [];
        const itemText = readableText(richText);
        const hasChildren = Array.isArray(block.children) && block.children.length > 0;
        if (!itemText && !hasChildren) {
          return null;
        }
        return (
          <li key={block.id}>
            {itemText ? renderRichText(richText) : null}
            {hasChildren ? <div className="mt-2">{renderBlocks(block.children ?? [], context, nearestHeading)}</div> : null}
          </li>
        );
      })}
    </ListTag>
  );
}

function renderBlocks(
  blocks: NotionBlock[],
  context: RenderContext,
  inheritedHeading: string | null = null,
): ReactNode {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  const rendered: ReactNode[] = [];
  let index = 0;
  let nearestHeading = inheritedHeading;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const listType = block.type;
      const group: NotionBlock[] = [];
      while (index < blocks.length && blocks[index].type === listType) {
        group.push(blocks[index]);
        index += 1;
      }
      rendered.push(renderList(group, listType, context, nearestHeading));
      continue;
    }

    const renderedBlock = renderBlock(block, context, nearestHeading);
    const renderedChildren = block.type !== "table" && Array.isArray(block.children) && block.children.length > 0
      ? renderBlocks(block.children, context, nearestHeading)
      : null;
    if (renderedBlock || renderedChildren) {
      rendered.push(
        <div key={block.id} className="space-y-3">
          {renderedBlock}
          {renderedChildren}
        </div>,
      );
    }
    if (block.type.match(/^heading_[123]$/)) {
      nearestHeading = headingText(block) || nearestHeading;
    }
    index += 1;
  }

  return <div className="space-y-4">{rendered}</div>;
}

export function NotionBlocks({ blocks }: { blocks: NotionBlock[] }) {
  const context = createRenderContext(blocks);
  return <div className="space-y-4">{renderBlocks(blocks, context)}</div>;
}
