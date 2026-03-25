import clsx from "clsx";
import { ChevronRight, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { siX } from "simple-icons";

import { SimpleIcon } from "../components/ui/icons/SimpleIcon";
import { ogImageUrl, WithSiteTitle } from "../constants";
import { Footer } from "../features/layout/Footer";
import { Header } from "../features/layout/Header";
import hoverStyles from "../styles/card-hover.module.css";

import styles from "./page.module.css";

import type { Metadata, NextPage } from "next";

const contactDescription = "鹿野壮へのお問い合わせ。登壇・執筆・企業研修・アドバイザーなど、メール・X・LinkedInからお気軽にご連絡ください。";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  description: contactDescription,
  openGraph: {
    description: contactDescription,
    images: [{ alt: WithSiteTitle, height: 630, url: ogImageUrl, width: 1200 }],
    title: `Contact${WithSiteTitle}`,
    type: "website",
  },
  title: `Contact${WithSiteTitle}`,
  twitter: {
    description: contactDescription,
    images: [ogImageUrl],
    title: `Contact${WithSiteTitle}`,
  },
};

const contacts = [
  {
    description: "t.kano.624@gmail.com",
    href: "mailto:t.kano.624@gmail.com",
    icon: <Mail size={20} aria-hidden />,
    iconStyle: "email" as const,
    label: "Email",
  },
  {
    description: "@tonkotsuboy_com",
    href: "https://x.com/tonkotsuboy_com",
    icon: <SimpleIcon path={siX.path} aria-hidden title="X" />,
    iconStyle: "x" as const,
    label: "X (Twitter)",
  },
  {
    description: "linkedin.com/in/tonkotsuboy",
    href: "https://www.linkedin.com/in/tonkotsuboy/",
    icon: <Linkedin size={20} aria-hidden />,
    iconStyle: "linkedin" as const,
    label: "LinkedIn",
  },
];

const ContactPage: NextPage = () => {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        <div className={styles.page}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Contact</h1>
            <p className={styles.description}>
              登壇・執筆・企業研修・アドバイザーなど、お気軽にお問い合わせください。
            </p>
          </div>

          <div className={styles.links}>
            {contacts.map((contact) => (
              <Link
                key={contact.href}
                href={contact.href}
                className={clsx(styles.card, hoverStyles.card)}
                target="_blank"
              >
                <div className={clsx(styles.icon, styles[contact.iconStyle])}>
                  {contact.icon}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.label}>{contact.label}</p>
                  <p className={clsx(styles.cardDescription, hoverStyles.title)}>{contact.description}</p>
                </div>
                <div className={hoverStyles.arrow}>
                  <ChevronRight size={20} aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
