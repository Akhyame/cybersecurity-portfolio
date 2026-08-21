export type NotionFileAsset = {
  name: string;
  url: string;
  expiryTime: string | null;
};

export type NotionRichText = {
  type: "text" | "mention" | "equation";
  plainText: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
    color: string;
  };
  text?: {
    content: string;
    link: { url: string } | null;
  };
};

export type PortfolioProject = {
  id: string;
  name: string;
  status: string | null;
  categories: string[];
  featured: boolean;
  shortDescription: string | null;
  technologies: string[];
  skills: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  reportUrl: string | null;
  projectDate: string | null;
  difficulty: string | null;
  slug: string | null;
  cover: NotionFileAsset | null;
  sortOrder: number | null;
  reportPdf: NotionFileAsset | null;
};

export type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  children?: NotionBlock[];
  [key: string]: unknown;
};
