"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { siX } from "simple-icons";

import { SimpleIcon } from "../../../components/ui/icons/SimpleIcon";

import styles from "./ShareBar.module.css";

import type { FC } from "react";

type Props = {
  title: string;
  url: string;
}

// 記事末尾のシェア。モダンな正攻法として Web Share API を使い、非対応環境では X 共有 + リンクコピーへ
// フォールバックする（依存ライブラリは足さない）。いいね / ブックマークは静的サイトでは扱わない。
export const ShareBar: FC<Props> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const xShareUrl = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const handleCopy = () => {
    void navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }).catch(() => undefined);
  };

  const handleShare = () => {
    void navigator.share?.({ title, url }).catch(() => undefined);
  };

  return (
    <div className={styles.shareBar}>
      <a className={styles.shareButton} href={xShareUrl} target="_blank" aria-label="X で共有">
        <SimpleIcon path={siX.path} className={styles.icon} title="X" />
      </a>
      <button
        type="button"
        className={styles.shareButton}
        onClick={handleCopy}
        aria-label={copied ? "リンクをコピーしました" : "リンクをコピー"}
      >
        {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      </button>
      {canShare ? (
        <button type="button" className={styles.shareButton} onClick={handleShare} aria-label="共有">
          <Share2 size={16} aria-hidden />
        </button>
      ) : null}
    </div>
  );
};
