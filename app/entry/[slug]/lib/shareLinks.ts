// 記事シェア用の各 SNS インテント URL を生成する純粋関数群。
// URL 仕様は react-share (https://github.com/nygardk/react-share) の各 ShareButton 実装に準拠。
// ただし title / url は全サービスで encodeURIComponent に統一する
// （react-share の Hatena 実装は生値を埋め込むが、こちらは安全側に倒す）。

type ShareParams = {
  title: string;
  url: string;
};

export const buildXShareUrl = ({ title, url }: ShareParams): string =>
  `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

export const buildHatenaShareUrl = ({ title, url }: ShareParams): string =>
  `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

// Bluesky の compose インテントは text 一本のみ。タイトルと URL を半角スペースで連結する
// （react-share の separator デフォルトと同じ）。
export const buildBlueskyShareUrl = ({ title, url }: ShareParams): string =>
  `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`;

export const buildRedditShareUrl = ({ title, url }: ShareParams): string =>
  `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
