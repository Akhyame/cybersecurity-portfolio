import { Fragment, type ReactNode } from "react";
import type { NotionBlock, NotionRichText } from "@/lib/notion/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function renderInlineText(text: NotionRichText): ReactNode {
  const content = text.plainText || "";

  if (!content) {
    return null;
  }

  if (text.href && isSafeUrl(text.href)) {
    const anchor = (
      <a
        href={text.href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
      >
        {content}
      </a>
    );

    if (text.annotations.bold && text.annotations.italic) {
      return <strong><em>{anchor}</em></strong>;
    }
    if (text.annotations.bold) {
      return <strong>{anchor}</strong>;
    }
    if (text.annotations.italic) {
      return <em>{anchor}</em>;
    }
    if (text.annotations.underline) {
      return <span className="underline underline-offset-2">{anchor}</span>;
    }
    if (text.annotations.strikethrough) {
      return <span className="line-through">{anchor}</span>;
    }
    if (text.annotations.code) {
      return <code className="rounded bg-slate-800 px-1 py-0.5 text-cyan-200">{anchor}</code>;
    }
    return anchor;
  }

  if (text.annotations.bold && text.annotations.italic) {
    return <strong><em>{content}</em></strong>;
  }
  if (text.annotations.bold) {
    return <strong>{content}</strong>;
  }
  if (text.annotations.italic) {
    return <em>{content}</em>;
  }
  if (text.annotations.underline) {
    return <span className="underline underline-offset-2">{content}</span>;
  }
  if (text.annotations.strikethrough) {
    return <span className="line-through">{content}</span>;
  }
  if (text.annotations.code) {
    return <code className="rounded bg-slate-800 px-1 py-0.5 text-cyan-200">{content}</code>;
  }

  return <>{content}</>;
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

function renderBlock(block: NotionBlock): ReactNode {
  const blockData = isRecord(block[block.type]) ? (block[block.type] as Record<string, unknown>) : undefined;

  switch (block.type) {
    case "paragraph":
      return <p className="text-base leading-7 text-muted">{renderRichTextData(blockData?.["rich_text"])}</p>;
    case "heading_1":
      return <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">{renderRichTextData(blockData?.["rich_text"])}</h1>;
    case "heading_2":
      return <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">{renderRichTextData(blockData?.["rich_text"])}</h2>;
    case "heading_3":
      return <h3 className="font-heading text-xl font-semibold text-foreground">{renderRichTextData(blockData?.["rich_text"])}</h3>;
    case "quote":
      return <blockquote className="border-l border-primary/40 pl-4 italic text-muted">{renderRichTextData(blockData?.["rich_text"])}</blockquote>;
    case "callout":
      return <aside className="rounded-xl border border-border bg-surface/80 p-4 text-muted">{renderRichTextData(blockData?.["rich_text"])}</aside>;
    case "code": {
      const text = Array.isArray(blockData?.["rich_text"]) ? (blockData?.["rich_text"] as NotionRichText[]).map((item) => item.plainText).join("") : "";
      const language = typeof blockData?.["language"] === "string" ? (blockData["language"] as string) : "";
      const codeClassName = language ? `language-${language}` : "";
      return (
        <pre className="overflow-x-auto rounded-xl border border-border bg-slate-950 p-4 text-sm text-cyan-100">
          <code className={codeClassName}>{text}</code>
        </pre>
      );
    }
    case "divider":
      return <hr className="my-4 border-border" />;
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
          {renderRichText(caption) || url}
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
      if (!source) {
        return null;
      }
      const caption = Array.isArray(imageData?.["caption"]) ? (imageData["caption"] as NotionRichText[]) : [];
      const altText = caption.map((line) => line.plainText).join(" ") || "Notion image";
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <figure className="overflow-hidden rounded-xl border border-border bg-slate-950">
          <img src={source} alt={altText} loading="lazy" className="max-h-[420px] w-full object-contain" />
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

function renderList(blocks: NotionBlock[], type: "bulleted_list_item" | "numbered_list_item") {
  const items = blocks.filter((block) => block.type === type);

  if (items.length === 0) {
    return null;
  }

  const ListTag = type === "bulleted_list_item" ? "ul" : "ol";

  return (
    <ListTag className={type === "bulleted_list_item" ? "ml-6 list-disc space-y-2 text-muted" : "ml-6 list-decimal space-y-2 text-muted"}>
      {items.map((block) => {
        const blockData = isRecord(block[block.type]) ? (block[block.type] as Record<string, unknown>) : undefined;
        const richText = Array.isArray(blockData?.["rich_text"]) ? (blockData["rich_text"] as NotionRichText[]) : [];
        return (
          <li key={block.id}>
            {renderRichText(richText)}
            {Array.isArray(block.children) && block.children.length > 0 ? <div className="mt-2">{renderBlocks(block.children)}</div> : null}
          </li>
        );
      })}
    </ListTag>
  );
}

function renderBlocks(blocks: NotionBlock[]): ReactNode {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  const rendered: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const listType = block.type;
      const group: NotionBlock[] = [];
      while (index < blocks.length && blocks[index].type === listType) {
        group.push(blocks[index]);
        index += 1;
      }
      rendered.push(renderList(group, listType));
      continue;
    }

    rendered.push(
      <div key={block.id} className="space-y-3">
        {renderBlock(block)}
        {Array.isArray(block.children) && block.children.length > 0 ? renderBlocks(block.children) : null}
      </div>,
    );
    index += 1;
  }

  return <div className="space-y-4">{rendered}</div>;
}

export function NotionBlocks({ blocks }: { blocks: NotionBlock[] }) {
  return <div className="space-y-4">{renderBlocks(blocks)}</div>;
}
