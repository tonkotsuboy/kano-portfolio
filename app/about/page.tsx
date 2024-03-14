import Image from "next/image";
import Link from "next/link";

import { WithSiteTitle } from "../constants";

import * as styles from "./page.css";

import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: `自己紹介${WithSiteTitle}`,
  twitter: {
    title: `自己紹介${WithSiteTitle}`,
  },
};

const AboutPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>自己紹介</h1>
      <Image
        className={styles.mainVisual}
        src="/ogimage.png"
        width="1200"
        height="630"
        alt="鹿野 壮"
      />
      <p>鹿野 壮（かの たけし）といいます。</p>
      <p>
        九州大学芸術工学部音響設計学科を卒業後、<a href="https://ubie.life/">Ubie株式会社</a>でフロントエンドの仕事をしています。とくにTypeScript・CSSが好きで、暇があればコードを書いています。勉強会・技術SNS・Twitterなどで積極的に技術情報を発信中。
      </p>
      <p>
        CSS Nite 2017〜2019ベストセッション受賞。
        <Link
          href="https://techfeed.io/people/@tonkotsuboy_com"
          target="_blank"
        >
          TechFeed Pro公認エキスパート
        </Link>
      </p>
      <h2 className={styles.h2}>書籍</h2>
      <ul className={styles.list}>
        <li>
          <Link href="https://gihyo.jp/book/2019/978-4-297-10368-2" target="_blank">
            JavaScriptコードレシピ集
          </Link>
        </li>
        <li>
          <Link
            href="https://info.nikkeibp.co.jp/media/NSW/atcl/mag/051600042/"
            target="_blank"
          >
            日経ソフトウエア 2022年7月号「表現力をアップするWebコーディング術」
          </Link>
        </li>
        <li>
          <Link
            href="https://info.nikkeibp.co.jp/media/NSW/atcl/mag/071200037/"
            target="_blank"
          >
            日経ソフトウェア2021年9月号「最新CSS」
          </Link>
        </li>
        <li>
          <Link
            href="https://info.nikkeibp.co.jp/media/NSW/atcl/mag/071700031/"
            target="_blank"
          >
            日経ソフトウェア2020年9月号「JavaScript最新仕様 -ECMAScript2020-」
          </Link>
        </li>

      </ul>
      <h2 className={styles.h2}>技術発信</h2>
      <ul>
        <li>
          <Link href="https://twitter.com/tonkotsuboy_com" target="_blank">
            Twitter
          </Link>
        </li>
        <li>
          <Link href="https://github.com/tonkotsuboy" target="_blank">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="https://zenn.dev/tonkotsuboy_com" target="_blank">
            Zenn
          </Link>
        </li>
        <li>
          <Link href="https://qiita.com/tonkotsuboy_com" target="_blank">
            Qiita（21,374Contributionsで全体約40位）
          </Link>
        </li>
        <li>
          <Link
            href="https://techfeed.io/people/@tonkotsuboy_com"
            target="_blank"
          >
            TechFeed
          </Link>
        </li>
        <li>
          <Link href="https://codepen.io/tonkotsuboy" target="_blank">
            codepen
          </Link>
        </li>
      </ul>
      <h2 className={styles.h2}>講師</h2>
      <ul>
        <li>
          <Link
            href="https://jp.linkedin.com/learning/learning-flexbox/646317"
            target="_blank"
          >
            LinkedIn Learning
          </Link>
        </li>
        <li>
          <Link href="https://schoo.jp/class/3570" target="_blank">
            Schoo
          </Link>
        </li>
      </ul>
      <h2 className={styles.h2}>インタビュー・寄稿</h2>
      <ul>
        <li>
          <Link
            href="https://levtech.jp/media/article/column/detail_329/"
            target="_blank"
          >
            アウトプットこそ最高のインプット。鹿野壮が語る「自分が一番トクする」アウトプットの力
            - レバテックラボ
          </Link>
        </li>
        <li>
          <Link
            href="https://findy-code.io/engineer-lab/tonkotsuboy-output"
            target="_blank"
          >
            技術発信していますか？アウトプットをするのが嫌だったソフトウェアエンジニアが登壇中毒になるまでの話
            - Findy Engineer Lab
          </Link>
        </li>
        <li>
          <Link
            href="https://ascii.jp/elem/000/001/546/1546451/"
            target="_blank"
          >
            鹿野壮のWebデザイナーのためのiOSアプリ開発入門 - WPJ
          </Link>
        </li>
      </ul>
      <h2>使用可能なスキル</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript（〜ES2023）</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>Next.js</li>
        <li>GraphQL</li>
        <li>Recoil</li>
        <li>Redux</li>
        <li>Storybook</li>
        <li>msw</li>
        <li>NuxtJS</li>
        <li>Vue.js</li>
        <li>Angular</li>
        <li>Sass</li>
        <li>vanilla-extract CSS</li>
        <li>CSS Modules</li>
        <li>ActionScript 3.0</li>
        <li>git</li>
        <li>その他フロントエンド技術全般</li>
      </ul>
    </div>
  );
};

export default AboutPage;
