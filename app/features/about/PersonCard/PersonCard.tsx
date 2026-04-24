import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import styles from "./PersonCard.module.css";

import type { FC } from "react";

type Variant = "horizontal" | "overlap" | "stacked";

type Props = {
  buttonHref?: string;
  buttonLabel?: string;
  imageAlt?: string;
  imageSrc?: string;
  tagline: string;
  variant?: Variant;
};

const AvatarPlaceholder: FC = () => (
  <svg
    aria-hidden="true"
    className={styles.placeholderSvg}
    preserveAspectRatio="xMidYMax meet"
    viewBox="0 0 100 100"
  >
    <defs>
      <linearGradient id="avatarPlaceholderGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#FFE066" />
        <stop offset="1" stopColor="#F5B400" />
      </linearGradient>
    </defs>
    <rect fill="url(#avatarPlaceholderGrad)" height="100" width="100" />
    <circle cx="50" cy="40" fill="rgba(255,255,255,0.55)" r="16" />
    <path d="M18 100 C 22 74, 38 62, 50 62 C 62 62, 78 74, 82 100 Z" fill="rgba(255,255,255,0.55)" />
  </svg>
);

const CardButton: FC<{ href: string; label: string }> = ({ href, label }) => (
  <Link className={styles.btn} href={href}>
    <span>{label}</span>
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  </Link>
);

type AvatarProps = {
  alt: string;
  shape: "circle" | "portrait" | "rounded";
  src?: string | undefined;
};

const Avatar: FC<AvatarProps> = ({ alt, shape, src }) => (
  <div
    className={clsx(styles.portrait, {
      [styles.portraitCircle]: shape === "circle",
      [styles.portraitPortrait]: shape === "portrait",
      [styles.portraitRounded]: shape === "rounded",
    })}
  >
    {src ? (
      <Image
        alt={alt}
        className={styles.portraitImg}
        fill
        sizes="(max-width: 768px) 128px, 170px"
        src={src}
      />
    ) : (
      <AvatarPlaceholder />
    )}
  </div>
);

export const PersonCard: FC<Props> = ({
  buttonHref,
  buttonLabel = "詳しく見る",
  imageAlt = "",
  imageSrc,
  tagline,
  variant = "horizontal",
}) => {
  if (variant === "stacked") {
    return (
      <article className={clsx(styles.card, styles.stacked)}>
        <div className={styles.stackedMedia}>
          <Avatar alt={imageAlt} shape="circle" src={imageSrc} />
        </div>
        <p className={styles.eyebrow}>PROFILE</p>
        <h3 className={clsx(styles.headline, styles.headlineCenter)}>{tagline}</h3>
        {buttonHref && <CardButton href={buttonHref} label={buttonLabel} />}
      </article>
    );
  }

  if (variant === "overlap") {
    return (
      <article className={styles.overlapRoot}>
        <div className={styles.overlapMedia}>
          <Avatar alt={imageAlt} shape="rounded" src={imageSrc} />
        </div>
        <div className={styles.overlapPanel}>
          <p className={styles.eyebrow}>PROFILE</p>
          <h3 className={styles.headline}>{tagline}</h3>
          {buttonHref && (
            <div className={styles.overlapActions}>
              <CardButton href={buttonHref} label={buttonLabel} />
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className={clsx(styles.card, styles.horizontal)}>
      <div className={styles.horizontalMedia}>
        <Avatar alt={imageAlt} shape="portrait" src={imageSrc} />
      </div>
      <div className={styles.horizontalBody}>
        <p className={styles.eyebrow}>PROFILE</p>
        <h3 className={styles.headline}>{tagline}</h3>
        {buttonHref && (
          <div className={styles.actions}>
            <CardButton href={buttonHref} label={buttonLabel} />
          </div>
        )}
      </div>
    </article>
  );
};
