import { ArrowUpRight, BookOpen, Linkedin, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siGithub, siQiita, siX, siZenn } from "simple-icons";

import { SimpleIcon } from "../components/ui/icons/SimpleIcon";
import { basicDescription, ogImageUrl, WithSiteTitle } from "../constants";
import { Footer } from "../features/layout/Footer";
import { Header } from "../features/layout/Header";

import styles from "./page.module.css";

import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  description: basicDescription,
  openGraph: {
    images: [{ alt: WithSiteTitle, height: 630, url: ogImageUrl, width: 1200 }],
  },
  title: `自己紹介${WithSiteTitle}`,
  twitter: {
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
    iconPath: undefined,
    label: "TechFeed",
  },
  {
    href: "https://codepen.io/tonkotsuboy",
    iconPath: "local-codepen",
    label: "CodePen",
  },
];

const books = [
  {
    description: "関数・非同期処理・型システム完全攻略。Software Design別冊。",
    href: "https://www.amazon.co.jp/dp/B0FQ13X48L",
    title: "JavaScript & TypeScript実力強化書",
    year: "2025年",
  },
  {
    description: "「よくある処理」の定番テクニック集。スニペットから実務パターンまで網羅。",
    href: "https://gihyo.jp/book/2019/978-4-297-10368-2",
    title: "JavaScript コードレシピ集",
    year: "2019年",
  },
];

const writings = [
  {
    href: "https://gihyo.jp/magazine/SD/archive/2024/202405",
    title: "Software Design 2024年5月号『もっとTypeScriptの力を引き出そう』",
  },
  {
    href: "https://info.nikkeibp.co.jp/media/NSW/atcl/mag/051600042/",
    title:
      "日経ソフトウェア 2022年7月号『表現力をアップするWebコーディング術』",
  },
  {
    href: "https://info.nikkeibp.co.jp/media/NSW/atcl/mag/071200037/",
    title: "日経ソフトウェア2021年9月号『最新CSS』",
  },
  {
    href: "https://info.nikkeibp.co.jp/media/NSW/atcl/mag/071700031/",
    title: "日経ソフトウェア2020年9月号『JavaScript最新仕様 -ECMAScript2020-』",
  },
];

const talks = [
  {
    href: "https://jp.linkedin.com/learning/learning-flexbox/646317",
    title: "LinkedIn Learning",
  },
  { href: "https://schoo.jp/class/3570", title: "Schoo" },
  {
    href: "https://cssnite.jp/",
    title: "CSS Nite 2017〜2019 ベストセッション受賞",
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
    href: "https://ascii.jp/elem/000/001/546/1546451/",
    title: "鹿野壮のWebデザイナーのためのiOSアプリ開発入門 - WPJ",
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
      <main className={styles.main}>
        <div className={styles.page}>
          {/* Profile Hero */}
          <div className={styles.profileHero}>
            <div className={styles.avatarWrapper}>
              <Image
                src="/ogimage.png"
                fill={true}
                alt="鹿野 壮"
                sizes="128px"
                className={styles.avatar}
                priority={true}
              />
              <div className={styles.avatarBadge}>
                <Zap size={14} aria-hidden={true} />
              </div>
            </div>
            <h1 className={styles.name}>鹿野 壮（たけし）</h1>
            <p className={styles.role}>Product Engineer @ Ubie</p>

            {/* Social Pills */}
            <div className={styles.socialPills}>
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  className={styles.socialPill}
                >
                  {social.iconPath === "local-codepen" ? (
                    <Image
                      src="/images/icons/codepen.svg"
                      alt="CodePen"
                      className={styles.socialPillIcon}
                      width={16}
                      height={16}
                      aria-hidden={true}
                    />
                  ) : social.iconType === "lucide-linkedin" ? (
                    <Linkedin className={styles.socialPillIcon} aria-hidden={true} />
                  ) : social.iconPath ? (
                    <SimpleIcon
                      path={social.iconPath}
                      title={social.label}
                      className={styles.socialPillIcon}
                      aria-hidden={true}
                    />
                  ) : null}
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bio */}
          <section className={styles.bioCard}>
            <h2 className={styles.sectionLabel}>Bio</h2>
            <p className={styles.bioText}>
              九州大学芸術工学部音響設計学科卒。TypeScript・CSSを軸に、プロダクト開発と執筆・講師・登壇でアウトプットを続けています。Appleのリキッドデザインに着想を得て、情報をやわらかく届けるUIづくりを探求中。
            </p>
            <p className={styles.bioText}>
              CSS Nite 2017〜2019ベストセッション受賞。TechFeed Proプロダクトアドバイザー・公認エキスパートとして最新フロントエンド知見を発信しています。
            </p>

          </section>

          {/* Books */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Books</h2>
            <div className={styles.booksList}>
              {books.map((book) => (
                <Link
                  key={book.href}
                  href={book.href}
                  target="_blank"
                  className={styles.bookCard}
                >
                  <div className={styles.bookCover}>
                    <BookOpen size={32} className={styles.bookCoverIcon} />
                  </div>
                  <div className={styles.bookInfo}>
                    <span className={styles.bookYear}>{book.year}</span>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.bookDesc}>{book.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Publications</h2>
            <ul className={styles.timelineList}>
              {writings.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} target="_blank" className={styles.timelineItem}>
                    <span className={styles.timelineTitle}>{item.title}</span>
                    <ArrowUpRight size={14} className={styles.timelineArrow} aria-hidden={true} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Speaking */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Speaking</h2>
            <ul className={styles.timelineList}>
              {talks.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} target="_blank" className={styles.timelineItem}>
                    <span className={styles.timelineTitle}>{item.title}</span>
                    <ArrowUpRight size={14} className={styles.timelineArrow} aria-hidden={true} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Interviews */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Interviews</h2>
            <ul className={styles.timelineList}>
              {interviews.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} target="_blank" className={styles.timelineItem}>
                    <span className={styles.timelineTitle}>{item.title}</span>
                    <ArrowUpRight size={14} className={styles.timelineArrow} aria-hidden={true} />
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
