import { VFC } from "react";
import ExternalLink from "../common/ExternalLink";
import styles from "./AboutPageComponent.module.scss";

const AboutPageComponent: VFC = () => (
    <div className={styles.about}>
      <h1>自己紹介</h1>
      <img src="/ogimage.png" width="1200" height="630" alt="鹿野 壮" />
      <p>鹿野 壮（かの たけし）といいます。</p>
      <p>
        九州大学芸術工学部音響設計学科を卒業後、Money
        Forwardでフロントエンドの仕事をしています。とくにTypeScript・JavaScriptが好きで、暇があればコードを書いています。勉強会・技術SNS・ICS
        MEDIA・Twitterなどで積極的に技術情報を発信中。
      </p>
      <p>
        CSS Nite 2017〜2019ベストセッション受賞。TechFeed Pro公認エキスパート。
      </p>
      <h2>書籍</h2>
      <ul>
        <li>
          <ExternalLink
            url="https://shop.nikkeibp.co.jp/front/commodity/0000/SW1256/"
          linkText="日経ソフトウェア2021年9月号「最新CSS」"
          />
        </li>
        <li>
          <ExternalLink
            url="https://shop.nikkeibp.co.jp/front/commodity/0000/SW1250/"
            linkText="日経ソフトウェア2020年9月号「JavaScript最新仕様 -ECMAScript2020-」"
          />
        </li>
        <li>
          <ExternalLink
            url="https://ics.media/entry/19765/"
            linkText="JavaScriptコードレシピ集"
        />
      </li>
    </ul>
    <h2>技術発信</h2>
    <ul>
      <li>
        <ExternalLink
          url="https://twitter.com/tonkotsuboy_com"
          linkText="Twitter"
        />
      </li>
      <li>
        <ExternalLink
          url="https://qiita.com/tonkotsuboy_com"
          linkText="Qiita（13,500Contributionsで全体約40位）"
        />
      </li>
      <li>
        <ExternalLink url="https://github.com/tonkotsuboy" linkText="GitHub" />
      </li>
      <li>
        <ExternalLink
          url="https://github.com/ics-kano"
          linkText="GitHub（社用）"
        />
      </li>
    </ul>
    <h2>作品</h2>
    <ul>
      <li>
        <ExternalLink url="https://codepen.io/tonkotsuboy" linkText="codepen" />
      </li>
      <li>
        <ExternalLink
          url="https://qiita.com/tonkotsuboy_com/items/cb9e9254a888455b9f8b"
          linkText="#今日のスダクリエイト"
        />
      </li>
    </ul>
    <h2>講師</h2>
    <ul>
      <li>
        <ExternalLink
          url="https://jp.linkedin.com/learning/learning-flexbox/646317"
          linkText="LinkedIn Learning"
        />
      </li>
      <li>
        <ExternalLink url="https://schoo.jp/class/3570" linkText="Schoo" />
      </li>
    </ul>
    <h2>寄稿</h2>
    <ul>
      <li>
        <ExternalLink
          url="https://www.webprofessional.jp/lesson/swift4designers/"
          linkText="鹿野壮のWebデザイナーのためのiOSアプリ開発入門 - WPJ"
        />
      </li>
    </ul>
    <h2>使用可能なスキル</h2>
    <ul>
      <li>TypeScript</li>
      <li>JavaScript</li>
      <li>React</li>
      <li>Vue.js</li>
      <li>Angular</li>
      <li>NuxtJS</li>
      <li>Next.js</li>
      <li>HTML</li>
      <li>CSS</li>
      <li>git</li>
      <li>Open API</li>
      <li>ActionScript 3.0</li>
      <li>その他フロントエンド技術全般</li>
    </ul>
  </div>
);

export default AboutPageComponent;
