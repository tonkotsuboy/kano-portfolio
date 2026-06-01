/**
 * Pickup セクションのカード1枚を表す正規化型。
 * 登壇（外部の参加申し込みリンク）と書籍（内部の詳細ページ）を
 * 同じカード実装で描画できるよう、リンク先・遷移種別・CTA 文言を吸収する。
 */
export type PickupItem = {
  ctaLabel: string;
  date: string;
  external: boolean;
  href: string;
  slug: string;
  thumbnail: string;
  title: string;
};
