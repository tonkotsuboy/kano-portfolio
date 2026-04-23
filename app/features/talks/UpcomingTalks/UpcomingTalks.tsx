import Image from "next/image";

import styles from "./UpcomingTalks.module.css";

import type { Talk } from "@/.velite";
import type { FC } from "react";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

function formatDateTile(dateStr: string): { day: string; mon: string; year: number } {
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    mon: MONTHS[d.getMonth()] ?? "",
    year: d.getFullYear(),
  };
}

type CardProps = {
  talk: Talk;
}

const TalkCard: FC<CardProps> = ({ talk }) => {
  const tile = formatDateTile(talk.date);
  const hasThumbnail = talk.thumbnail.length > 0;

  return (
    <a
      href={talk.registerUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`${talk.title}（${talk.eventName}）の申し込みページを開く`}
    >
      {/* Row 1: Thumbnail */}
      <div className={styles.thumb}>
        {hasThumbnail ? (
          <Image
            src={talk.thumbnail}
            alt={talk.title}
            fill
            className={styles.thumbImg}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className={styles.thumbPlaceholder} />
        )}
      </div>

      {/* Row 2: Date header (prominent, above title) */}
      <time className={styles.dateHeader} dateTime={talk.date}>
        <span className={styles.dateMon}>{tile.mon}</span>
        <span className={styles.dateDay}>{tile.day}</span>
        <span className={styles.dateYear}>{tile.year}</span>
      </time>

      {/* Row 3: Title */}
      <h3 className={styles.title}>{talk.title}</h3>

      {/* Row 4: Footer */}
      <div className={styles.footRow}>
        <span className={styles.registerBtn}>
          参加申し込み
          <svg
            aria-hidden="true"
            fill="none"
            height={12}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            width={12}
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </span>
      </div>
    </a>
  );
};

type Props = {
  talks: Talk[];
}

export const UpcomingTalks: FC<Props> = ({ talks }) => {
  if (talks.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="直近の登壇予定">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span className={styles.eyebrow}>Upcoming</span>
          </div>
          <h2 className={styles.sectionTitle}>直近の登壇予定</h2>
        </div>

        <div className={styles.grid}>
          {talks.map((talk) => (
            <TalkCard key={talk.slug} talk={talk} />
          ))}
        </div>
      </div>
    </section>
  );
};
