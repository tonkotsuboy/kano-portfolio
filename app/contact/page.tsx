import { Linkedin } from "lucide-react";
import Link from "next/link";
import { siGmail, siMessenger, siX } from "simple-icons";

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
  title: `Contact${WithSiteTitle}`,
  twitter: {
    images: [ogImageUrl],
    title: `Contact${WithSiteTitle}`,
  },
};

const contacts = [
  {
    description: "最新の登壇・記事情報はこちらで流しています。DMも解放しています。",
    href: "https://x.com/tonkotsuboy_com",
    icon: <SimpleIcon path={siX.path} aria-hidden={true} title="X" />,
    label: "X (Twitter)",
  },
  {
    description: "お仕事のご相談・コラボレーションはLinkedInでもどうぞ。",
    href: "https://www.linkedin.com/in/tonkotsuboy/",
    icon: <Linkedin aria-hidden={true} />,
    label: "LinkedIn",
  },
  {
    description: "カジュアルなやりとりやイベント連絡に。",
    href: "https://m.me/tonkotsuboy",
    icon: <SimpleIcon path={siMessenger.path} aria-hidden={true} title="Messenger" />,
    label: "Messenger",
  },
  {
    description: "長めのご相談・原稿依頼などはこちらへ。",
    href: "mailto:hello@kano.codes",
    icon: <SimpleIcon path={siGmail.path} aria-hidden={true} title="Mail" />,
    label: "Mail",
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
