import { ArrowUpRight, BookOpen, Linkedin, Mic2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siGithub, siQiita, siX, siZenn } from "simple-icons";

import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";
import { SimpleIcon } from "../components/icons/SimpleIcon";
import { basicDescription, ogImageUrl, WithSiteTitle } from "../constants";

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

const writings = [
  {
    href: "https://gihyo.jp/book/2019/978-4-297-10368-2",
    title: "JavaScriptコードレシピ集",
  },
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

const skills = [
  "TypeScript",
  "React / Next.js",
  "CSS / CSS Modules",
  "Design Systems",
  "GraphQL",
  "Node.js",
  "Storybook",
  "Testing (Jest / msw)",
];

const AboutPage: NextPage = () => {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        <div className={styles.page}>
          <section className={styles.hero}>
            <div className={styles.glow} />
            <div className={styles.profileCard}>
              <div className={styles.visual}>
                <Image
                  src="/ogimage.png"
                  fill={true}
                  alt="鹿野 壮"
                  sizes="320px"
                  priority={true}
                />
              </div>
              <div className={styles.profileContent}>
                <p className={styles.badge}>Product Engineer @ Ubie</p>
                <h1 className={styles.title}>鹿野 壮（たけし）</h1>
                <p className={styles.summary}>
                  九州大学芸術工学部音響設計学科卒。TypeScript・CSSを軸に、プロダクト開発と執筆・講師・登壇でアウトプットを続けています。Appleのリキッドデザインに着想を得て、情報をやわらかく届けるUIづくりを探求中。
                </p>
                <div className={styles.socialRow}>
                  {socialLinks.map((social) => (
                    <Link
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      className={styles.socialLink}
                    >
                      {social.iconPath === "local-codepen" ? (
                        <Image
                          src="/images/icons/codepen.svg"
                          alt="CodePen"
                          className={styles.socialIcon}
                          width={16}
                          height={16}
                          aria-hidden={true}
                        />
                      ) : social.iconType === "lucide-linkedin" ? (
                        <Linkedin className={styles.socialIcon} aria-hidden={true} />
                      ) : social.iconPath ? (
                        <SimpleIcon
                          path={social.iconPath}
                          title={social.label}
                          className={styles.socialIcon}
                          aria-hidden={true}
                        />
                      ) : null}
                      <span className={styles.socialLabel}>{social.label}</span>
                      <ArrowUpRight size={14} aria-hidden={true} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <Sparkles size={18} />
                <h2>近況</h2>
              </div>
              <p className={styles.cardBody}>
                CSS Nite 2017〜2019ベストセッション受賞。TechFeed
                Proプロダクトアドバイザー・公認エキスパートとして最新フロントエンド知見を発信しています。
              </p>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <BookOpen size={18} />
                <h2>書籍・寄稿</h2>
              </div>
              <ul className={styles.linkList}>
                {writings.map((book) => (
                  <li key={book.title}>
                    <Link href={book.href} target="_blank">
                      {book.title}
                      <ArrowUpRight size={14} aria-hidden={true} />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <Mic2 size={18} />
                <h2>講師・登壇</h2>
              </div>
              <ul className={styles.linkList}>
                {talks.map((talk) => (
                  <li key={talk.title}>
                    <Link href={talk.href} target="_blank">
                      {talk.title}
                      <ArrowUpRight size={14} aria-hidden={true} />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <Sparkles size={18} />
                <h2>インタビュー・掲載</h2>
              </div>
              <ul className={styles.linkList}>
                {interviews.map((interview) => (
                  <li key={interview.title}>
                    <Link href={interview.href} target="_blank">
                      {interview.title}
                      <ArrowUpRight size={14} aria-hidden={true} />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className={styles.skills}>
            <h2>Skills</h2>
            <div className={styles.skillPills}>
              {skills.map((skill) => (
                <span key={skill} className={styles.skillPill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
