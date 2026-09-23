import type { NotionBlock } from "@/lib/notion/types";

// Give the first media-rich section the full page width after the project/lab sidebar.
// Prefer starting at its preceding major heading so the image keeps its context.
export function splitNotionBlocksAtMedia(blocks: NotionBlock[]): {
  overviewBlocks: NotionBlock[];
  mediaBlocks: NotionBlock[];
} {
  const firstImageIndex = blocks.findIndex((block) => block.type === "image");

  if (firstImageIndex < 0) {
    return { overviewBlocks: blocks, mediaBlocks: [] };
  }

  let splitIndex = firstImageIndex;

  for (let index = firstImageIndex - 1; index >= 0; index -= 1) {
    if (blocks[index].type === "heading_1" || blocks[index].type === "heading_2") {
      splitIndex = index;
      break;
    }
  }

  return {
    overviewBlocks: blocks.slice(0, splitIndex),
    mediaBlocks: blocks.slice(splitIndex),
  };
}
