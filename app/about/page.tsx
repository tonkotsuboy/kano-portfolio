import clsx from "clsx";
import { ChevronRight, Codepen, Linkedin, Presentation, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siGithub, siQiita, siX, siZenn } from "simple-icons";

import { SimpleIcon } from "../components/ui/icons/SimpleIcon";
import { ogImageUrl, WithSiteTitle } from "../constants";
import { Footer } from "../features/layout/Footer";
import { Header } from "../features/layout/Header";
import hoverStyles from "../styles/card-hover.module.css";

import styles from "./page.module.css";

import type { Metadata, NextPage } from "next";

const aboutDescription = "鹿野壮（Takeshi Kano）のプロフィール。TypeScript・CSSを軸にプロダクト開発と執筆・登壇を行うフロントエンドエンジニア。著書・登壇・インタビュー情報を掲載。";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  description: aboutDescription,
  openGraph: {
    description: aboutDescription,
    images: [{ alt: WithSiteTitle, height: 630, url: ogImageUrl, width: 1200 }],
    title: `自己紹介${WithSiteTitle}`,
    type: "website",
  },
  title: `自己紹介${WithSiteTitle}`,
  twitter: {
    description: aboutDescription,
    images: [ogImageUrl],
    title: `自己紹介${WithSiteTitle}`,
  },
};

const socialLinks = [
  { href: "https://x.com/tonkotsuboy_com", iconPath: siX.path, label: "X" },
  { href: "https://github.com/tonkotsuboy", iconPath: siGithub.path, label: "GitHub" },
  { href: "https://zenn.dev/tonkotsuboy_com", iconPath: siZenn.path, label: "Zenn" },
  { href: "https://qiita.com/tonkotsuboy_com", iconPath: siQiita.path, label: "Qiita" },
  { href: "https://www.linkedin.com/in/tonkotsuboy/", iconType: "lucide-linkedin", label: "LinkedIn" },
  {
    href: "https://techfeed.io/people/@tonkotsuboy_com",
    iconType: "lucide-rss",
    label: "TechFeed",
  },
  {
    href: "https://codepen.io/tonkotsuboy",
    iconType: "lucide-codepen",
    label: "CodePen",
  },
  {
    href: "https://speakerdeck.com/tonkotsuboy_com",
    iconType: "lucide-presentation",
    label: "Speaker Deck",
  },
];

const publications = [
  {
    cover: "/images/books/js-ts-jitsuryoku.png",
    href: "https://gihyo.jp/book/2025/978-4-297-15194-2",
    publisher: "技術評論社",
    title: "JavaScript & TypeScript実力強化書",
  },
  {
    cover: "/images/books/js-code-recipe.jpg",
    href: "https://gihyo.jp/book/2019/978-4-297-10368-2",
    publisher: "技術評論社",
    title: "JavaScriptコードレシピ集",
  },
  {
    cover: "/images/books/sd-202405.jpg",
    href: "https://gihyo.jp/magazine/SD/archive/2024/202405",
    publisher: "技術評論社",
    title: "Software Design 2024年5月号「もっとTypeScriptの力を引き出そう」",
  },
  {
    cover: "/images/books/nikkei-202207.png",
    href: "https://info.nikkeibp.co.jp/media/NSW/atcl/mag/051600042/",
    publisher: "日経BP",
    title: "日経ソフトウエア 2022年7月号「表現力をアップするWebコーディング術」",
  },
  {
    cover: "/images/books/nikkei-202109.png",
    href: "https://info.nikkeibp.co.jp/media/NSW/atcl/mag/071200037/",
    publisher: "日経BP",
    title: "日経ソフトウェア2021年9月号「最新CSS」",
  },
  {
    cover: "/images/books/nikkei-202009.png",
    href: "https://info.nikkeibp.co.jp/media/NSW/atcl/mag/071700031/",
    publisher: "日経BP",
    title: "日経ソフトウェア2020年9月号「JavaScript最新仕様 -ECMAScript2020-」",
  },
];

const interviews = [
  {
    href: "https://levtech.jp/media/article/column/detail_329/",
    title: "アウトプットこそ最高のインプット - レバテックラボ",
  },
  {
    href: "https://findy-code.io/engineer-lab/tonkotsuboy-output",
    title:
      "アウトプットをするのが嫌だったエンジニアが登壇中毒になるまで - Findy Engineer Lab",
  },
  {
    href: "https://life.job-draft.jp/2025/04/30/801/",
    title: "エンジニア鹿野壮の物語 | LIFE DRAFT",
  },
];

const AboutPage: NextPage = () => {
  return (
    <div className={styles.shell}>
      <Header />
      <main id="main-content" className={styles.main}>
        <div className={styles.page}>
          {/* Profile Hero */}
          <div className={styles.profileHero}>
            <h1 className={styles.name}>鹿野 壮（たけし）</h1>
            <p className={styles.role}>Staff Product Engineer @ Ubie</p>
            <div className={styles.photoGrid}>
              <div className={styles.photoGridTop}>
                <div className={styles.photoCell}>
                  <Image
                    src="/images/about/speaking.jpg"
                    alt="登壇中の鹿野 壮"
                    fill
                    sizes="(max-width: 768px) 60vw, 384px"
                    className={styles.photo}
                    priority
                  />
                </div>
                <div className={styles.photoCell}>
                  <Image
                    src="/images/about/streaming.jpg"
                    alt="朝までマークアップに出演中の鹿野 壮"
                    fill
                    sizes="(max-width: 768px) 40vw, 256px"
                    className={styles.photo}
                    priority
                  />
                </div>
              </div>
              <div className={styles.photoGridBottom}>
                <div className={styles.photoCell}>
                  <Image
                    src="/images/about/lecture-hall.jpg"
                    alt="大規模勉強会で登壇中の様子"
                    fill
                    sizes="(max-width: 768px) 33vw, 213px"
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoCell}>
                  <Image
                    src="/images/about/cssnite-osaka.jpg"
                    alt="CSS Nite in Osaka vol.59 集合写真"
                    fill
                    sizes="(max-width: 768px) 33vw, 213px"
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoCell}>
                  <Image
                    src="/images/about/full-throttle.jpg"
                    alt="Full Throttle but Safe イベントでの鹿野 壮"
                    fill
                    sizes="(max-width: 768px) 33vw, 213px"
                    className={styles.photo}
                  />
                </div>
              </div>
            </div>

            {/* Social Pills */}
            <div className={styles.socialPills}>
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  className={styles.socialPill}
                >
                  {social.iconType === "lucide-linkedin" ? (
                    <Linkedin className={styles.socialPillIcon} aria-hidden />
                  ) : social.iconType === "lucide-rss" ? (
                    <Rss className={styles.socialPillIcon} aria-hidden />
                  ) : social.iconType === "lucide-codepen" ? (
                    <Codepen className={styles.socialPillIcon} aria-hidden />
                  ) : social.iconType === "lucide-presentation" ? (
                    <Presentation className={styles.socialPillIcon} aria-hidden />
                  ) : social.iconPath ? (
                    <SimpleIcon
                      path={social.iconPath}
                      title={social.label}
                      className={styles.socialPillIcon}
                      aria-hidden
                    />
                  ) : null}
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bio */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>自己紹介</h2>
            <div className={styles.bioCard}>
              <p className={styles.bioText}>
                鹿野 壮（かの たけし）といいます。
              </p>
              <p className={styles.bioText}>
                九州大学芸術工学部音響設計学科を卒業後、Ubie株式会社でStaff Product Engineerとして働いています。とくにTypeScript・CSSが好きで、暇があればコードを書いています。2025年5月にClaude Codeにタスク丸投げおじさんとして転生しました。勉強会・技術SNS・Xなどで積極的に技術情報を発信中。
              </p>
              <p className={styles.bioText}>
                CSS Niteベストセッション受賞。「JavaScriptコードレシピ集」著者。TechFeed Proプロダクトアドバイザー・公認エキスパート。
              </p>
            </div>
          </section>

          {/* 著書 */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>著書</h2>
            <div className={styles.publicationsList}>
              {publications.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  className={clsx(styles.bookCard, hoverStyles.card)}
                >
                  <div className={styles.bookCover}>
                    <Image
                      src={item.cover}
                      alt={item.title}
                      width={120}
                      height={170}
                      className={styles.bookCoverImage}
                    />
                  </div>
                  <div className={styles.bookInfo}>
                    <h3 className={clsx(styles.bookTitle, hoverStyles.title)}>{item.title}</h3>
                    <p className={styles.bookPublisher}>{item.publisher}</p>
                  </div>
                  <div className={hoverStyles.arrow}>
                    <ChevronRight size={20} aria-hidden />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* インタビュー */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>インタビュー</h2>
            <ul className={styles.timelineList}>
              {interviews.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} target="_blank" className={clsx(styles.timelineItem, hoverStyles.card)}>
                    <span className={clsx(styles.timelineTitle, hoverStyles.title)}>{item.title}</span>
                    <div className={clsx(styles.timelineArrow, hoverStyles.arrow)}>
                      <ChevronRight size={20} aria-hidden />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
