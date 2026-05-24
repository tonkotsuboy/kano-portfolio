// リンク先の og:image URL をビルド時に best-effort で取得する。
// 失敗（ボット遮断 / OG なし / タイムアウト / ネットワークエラー）時は null を返し、
// 呼び出し側でプレースホルダーへフォールバックする。SSG なので閲覧者リクエストごとには叩かない。

const OG_IMAGE_TAG = /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]*>/i;
const CONTENT_ATTR = /content=["']([^"']+)["']/i;

// og:* は <head> 内（先頭数 KB）にあるため、</head> までを上限付きで読む。
// 巨大な HTML（数 MB）を全読み込みしてメモリを浪費しないようにする。
const MAX_HEAD_BYTES = 512 * 1024;

const readUntilHead = async (body: ReadableStream<Uint8Array>): Promise<string> => {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  let bytes = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      bytes += value.byteLength;
      html += decoder.decode(value, { stream: true });
      if (html.includes("</head>") || bytes >= MAX_HEAD_BYTES) {
        break;
      }
    }
  } finally {
    await reader.cancel();
  }

  return html;
};

export const fetchOgImage = async (url: string): Promise<null | string> => {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; kano.codes link preview; +https://kano.codes)",
      },
      next: { revalidate: 604800 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok || !response.body) {
      return null;
    }
    const html = await readUntilHead(response.body);
    const tag = (OG_IMAGE_TAG.exec(html))?.[0];
    const image = tag?.match(CONTENT_ATTR)?.[1];
    if (!image || !/^https?:\/\//.test(image)) {
      return null;
    }

    return image;
  } catch (error) {
    // タイムアウト・ボット遮断は想定内だが、予期しないエラー（fetch 実装差異など）も
    // ここで握りつぶされるため、ビルドログで追跡できるよう記録する（SSG 時のみ実行）。
    console.error(`[ogImage] failed to fetch og:image from ${url}`, error);

    return null;
  }
};
