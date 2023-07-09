import type { Asset } from "contentful";

/**
 * @deprecated
 * 自動生成されるため、不要
 */
export type PortfolioModel = {
  slug: string;
  title: string;
  published_date: string;
  url: string;
  medium: {
    fields: {
      name: string;
      slug: string;
    };
  };
  tags: {
    fields: {
      name: string;
      slug: string;
      order: number;
    };
  }[];
  keyvisual: Asset;
  slide?: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
};
