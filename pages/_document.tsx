import Document, { Head, Html, Main, NextScript } from "next/document";
import { NextPageContext } from "next";
import {
  DocumentInitialProps,
  RenderPage,
} from "next/dist/next-server/lib/utils";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: NextPageContext & { renderPage: RenderPage }
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
