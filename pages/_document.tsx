import Document, { Html, Head, Main, NextScript } from "next/document";
import { NextPageContext } from "next";
import { RenderPage } from "next/dist/next-server/lib/utils";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: NextPageContext & { renderPage: RenderPage }
  ) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
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
