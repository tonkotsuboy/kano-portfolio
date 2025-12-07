import { Mail, MessageCircle, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";
import { WithSiteTitle, basicDescription, ogImageUrl } from "../constants";

import styles from "./page.module.css";

import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: `Contact${WithSiteTitle}`,
  description: basicDescription,
  openGraph: {
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: WithSiteTitle }],
  },
  twitter: {
    title: `Contact${WithSiteTitle}`,
    images: [ogImageUrl],
  },
};

const contacts = [
  {
    label: "X (Twitter)",
    href: "https://x.com/tonkotsuboy_com",
    icon: <Twitter aria-hidden />,
    description: "最新の登壇・記事情報はこちらで流しています。DMも解放しています。",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tonkotsuboy/",
    icon: <Linkedin aria-hidden />,
    description: "お仕事のご相談・コラボレーションはLinkedInでもどうぞ。",
  },
  {
    label: "Messenger",
    href: "https://m.me/tonkotsuboy",
    icon: <MessageCircle aria-hidden />,
    description: "カジュアルなやりとりやイベント連絡に。",
  },
  {
    label: "Mail",
    href: "mailto:hello@kano.codes",
    icon: <Mail aria-hidden />,
    description: "長めのご相談・原稿依頼などはこちらへ。",
  },
];

const ContactPage: NextPage = () => {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        <div className={styles.page}>
          <section className={styles.hero}>
            <div className={styles.glow} />
            <div className={styles.heroCard}>
              <p className={styles.kicker}>Get in touch</p>
              <h1 className={styles.title}>次のアイデアを一緒に形にしましょう</h1>
              <p className={styles.description}>
                執筆・登壇・UI/UX相談など、お気軽にご連絡ください。レスポンスは24時間以内を心がけています。
              </p>
            </div>
          </section>

          <section className={styles.links}>
            {contacts.map((contact) => (
              <Link key={contact.href} href={contact.href} className={styles.card} target="_blank">
                <div className={styles.icon}>{contact.icon}</div>
                <div>
                  <p className={styles.label}>{contact.label}</p>
                  <p className={styles.cardDescription}>{contact.description}</p>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
