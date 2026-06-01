import clsx from "clsx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Temporal } from "temporal-polyfill-lite";

import hoverStyles from "../../styles/card-hover.module.css";

import styles from "./Pickup.module.css";

import type { PickupItem } from "./PickupItem";
import type { FC, ReactNode } from "react";

function formatDate(dateStr: string): string {
  const zdt = Temporal.Instant.from(dateStr).toZonedDateTimeISO("Asia/Tokyo");
  return `${zdt.year}年${zdt.month}月${zdt.day}日`;
}

type CardProps = {
  item: PickupItem;
  priority?: boolean;
}

const PickupCard: FC<CardProps> = ({ item, priority = false }) => {
  const hasThumbnail = item.thumbnail.length > 0;
  const className = clsx(styles.card, hoverStyles.card);

  const content: ReactNode = (
    <>
      {/* Row 1: Thumbnail */}
      <div className={styles.thumb}>
        {hasThumbnail ? (
          <Image
            src={item.thumbnail}
            alt=""
            fill
            className={styles.thumbImg}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        ) : (
          <div className={styles.thumbPlaceholder} />
        )}
      </div>

      {/* Row 2: Date chip */}
      <time className={styles.date} dateTime={item.date}>
        {formatDate(item.date)}
      </time>

      {/* Row 3: Title */}
      <h3 className={clsx(styles.title, hoverStyles.title)}>{item.title}</h3>

      {/* Row 4: Footer */}
      <div className={styles.footRow}>
        <span className={styles.ctaBtn}>
          {item.ctaLabel}
          {item.external ? (
            <ArrowUpRight aria-hidden size={12} />
          ) : (
            <ArrowRight aria-hidden size={12} />
          )}
        </span>
      </div>
    </>
  );

  // 外部（登壇の参加申し込み）は別タブ、内部（書籍の詳細ページ）は Link で遷移する
  return item.external ? (
    <a href={item.href} target="_blank" className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
};

type Props = {
  items: PickupItem[];
}

export const Pickup: FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="pickup-heading">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span className={styles.eyebrow}>Pickup</span>
          </div>
          <h2 id="pickup-heading" className={styles.sectionTitle}>ピックアップ</h2>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <PickupCard key={item.slug} item={item} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
