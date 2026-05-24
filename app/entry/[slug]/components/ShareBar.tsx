"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { siBluesky, siHatenabookmark, siReddit, siX } from "simple-icons";

import { SimpleIcon } from "../../../components/ui/icons/SimpleIcon";
import {
  buildBlueskyShareUrl,
  buildHatenaShareUrl,
  buildRedditShareUrl,
  buildXShareUrl,
} from "../lib/shareLinks";

import styles from "./ShareBar.module.css";

import type { FC } from "react";

type Props = {
  title: string;
  url: string;
}

// 記事末尾のシェア。各 SNS のインテント URL を新規タブで開き、加えてリンクコピーと
// Web Share API（対応環境のみ）を用意する。シェア用 URL は依存ライブラリを足さず lib/shareLinks で生成。
// いいね / ブックマークは静的サイトでは扱わない。
export const ShareBar: FC<Props> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const shareTargets = [
    { href: buildXShareUrl({ title, url }), icon: siX, label: "X で共有" },
    { href: buildHatenaShareUrl({ title, url }), icon: siHatenabookmark, label: "はてなブックマークに追加" },
    { href: buildBlueskyShareUrl({ title, url }), icon: siBluesky, label: "Bluesky で共有" },
    { href: buildRedditShareUrl({ title, url }), icon: siReddit, label: "Reddit で共有" },
  ];

  const handleCopy = () => {
    void navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }).catch(() => undefined);
  };

  const handleShare = () => {
    void navigator.share?.({ title, url }).catch(() => undefined);
  };

  return (
    <div className={styles.shareBar}>
      {shareTargets.map(({ href, icon, label }) => (
        <a key={href} className={styles.shareButton} href={href} target="_blank" aria-label={label}>
          <SimpleIcon path={icon.path} className={styles.icon} />
        </a>
      ))}
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
