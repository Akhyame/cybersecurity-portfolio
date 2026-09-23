import type { NotionBlock, NotionRichText } from "@/lib/notion/types";

function headingLabel(block: NotionBlock): string {
  if (!/^heading_[123]$/.test(block.type)) return "";
  const value = block[block.type] as { rich_text?: NotionRichText[] } | undefined;
  return value?.rich_text?.map((part) => part.plainText ?? part.text?.content ?? "").join("") ?? "";
}

// Move the evidence section below the sidebar; other content retains its original layout.
export function splitNotionBlocksAtMedia(blocks: NotionBlock[]): {
  overviewBlocks: NotionBlock[];
  mediaBlocks: NotionBlock[];
} {
  const evidenceIndex = blocks.findIndex((block) => /^evidence\b|screenshots|image gallery/i.test(headingLabel(block)));
  if (evidenceIndex >= 0 && blocks.slice(evidenceIndex + 1).some((block) => block.type === "image")) {
    return { overviewBlocks: blocks.slice(0, evidenceIndex), mediaBlocks: blocks.slice(evidenceIndex) };
  }

  const firstImageIndex = blocks.findIndex((block) => block.type === "image");
  if (firstImageIndex < 0) return { overviewBlocks: blocks, mediaBlocks: [] };

  let splitIndex = firstImageIndex;
  for (let index = firstImageIndex - 1; index >= 0; index -= 1) {
    if (blocks[index].type === "heading_1" || blocks[index].type === "heading_2") {
      splitIndex = index;
      break;
    }
  }
  return { overviewBlocks: blocks.slice(0, splitIndex), mediaBlocks: blocks.slice(splitIndex) };
}
