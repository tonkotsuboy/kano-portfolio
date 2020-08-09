export type PortfolioModel = {
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
  slide?: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
};
