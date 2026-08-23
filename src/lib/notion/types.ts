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
  demoVideo: NotionFileAsset | null;
  publishDemo: boolean;
  sortOrder: number | null;
  reportPdf: NotionFileAsset | null;
};

export type NotionLab = {
  id: string;
  name: string;
  status: string | null;
  slug: string | null;
  shortDescription: string | null;
  categories: string[];
  skills: string[];
  technologies: string[];
  difficulty: string | null;
  featured: boolean;
  githubUrl: string | null;
  demoUrl: string | null;
  demoVideo: NotionFileAsset | null;
  publishDemo: boolean;
  cover: NotionFileAsset | null;
  labDate: string | null;
  sortOrder: number | null;
};

export type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  children?: NotionBlock[];
  [key: string]: unknown;
};
