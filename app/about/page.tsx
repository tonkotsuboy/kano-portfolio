import type { Metadata, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "自己紹介 - 鹿野ポートフォリオ",
  twitter: {
    title: "自己紹介 -鹿野ポートフォリオ",
  },
};

const AboutPage: NextPage = () => {
  return (
    <main>
      <h1>自己紹介</h1>
      <Image src="/ogimage.png" width="1200" height="630" alt="鹿野 壮" />
      <p>鹿野 壮（かの たけし）といいます。</p>
      <p>
        九州大学芸術工学部音響設計学科を卒業後、Money
        Forwardでフロントエンドの仕事をしています。とくにTypeScript・JavaScriptが好きで、暇があればコードを書いています。勉強会・技術SNS・ICS
        MEDIA・Twitterなどで積極的に技術情報を発信中。
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
      <h2>書籍</h2>
      <ul>
        <li>
          <Link
            href="https://shop.nikkeibp.co.jp/front/commodity/0000/SW1256/"
            target="_blank"
          >
            日経ソフトウェア2021年9月号「最新CSS」
          </Link>
          <Link
            href="https://shop.nikkeibp.co.jp/front/commodity/0000/SW1256/"
            target="_blank"
          >
            日経ソフトウェア2021年9月号「最新CSS」
          </Link>
        </li>
        <li>
          <Link
            href="https://shop.nikkeibp.co.jp/front/commodity/0000/SW1250/"
            target="_blank"
          >
            日経ソフトウェア2020年9月号「JavaScript最新仕様 -ECMAScript2020-」
          </Link>
        </li>
        <li>
          <Link href="https://ics.media/entry/19765/" target="_blank">
            JavaScriptコードレシピ集
          </Link>
        </li>
      </ul>
      <h2>技術発信</h2>
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
          <Link
            href="https://techfeed.io/people/@tonkotsuboy_com"
            target="_blank"
          >
            TechFeed Pro
          </Link>
        </li>
        <li>
          <Link href="https://zenn.dev/tonkotsuboy_com" target="_blank">
            Zenn
          </Link>
        </li>
        <li>
          <Link href="https://qiita.com/tonkotsuboy_com" target="_blank">
            Qiita（13,500Contributionsで全体約40位）
          </Link>
        </li>
      </ul>
      <h2>作品</h2>
      <ul>
        <li>
          <Link href="https://codepen.io/tonkotsuboy" target="_blank">
            codepen
          </Link>
        </li>
        <li>
          <Link
            href="https://qiita.com/tonkotsuboy_com/items/cb9e9254a888455b9f8b"
            target="_blank"
          >
            #今日のスダクリエイト
          </Link>
        </li>
      </ul>
      <h2>講師</h2>
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
      <h2>寄稿</h2>
      <ul>
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
        <li>TypeScript</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Next.js</li>
        <li>Angular</li>
        <li>NuxtJS</li>
        <li>Vue.js</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>git</li>
        <li>Open API</li>
        <li>ActionScript 3.0</li>
        <li>その他フロントエンド技術全般</li>
      </ul>
    </main>
  );
};

export default AboutPage;
