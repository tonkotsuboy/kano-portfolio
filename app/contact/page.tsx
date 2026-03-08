import { ChevronRight, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { siMessenger, siX } from "simple-icons";

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
    description: "hello@kano.codes",
    href: "mailto:hello@kano.codes",
    icon: <Mail size={20} />,
    iconStyle: "email" as const,
    label: "Email",
  },
  {
    description: "@tonkotsuboy_com",
    href: "https://x.com/tonkotsuboy_com",
    icon: <SimpleIcon path={siX.path} aria-hidden={true} title="X" />,
    iconStyle: "x" as const,
    label: "X (Twitter)",
  },
  {
    description: "m.me/tonkotsuboy",
    href: "https://m.me/tonkotsuboy",
    icon: <SimpleIcon path={siMessenger.path} aria-hidden={true} title="Messenger" />,
    iconStyle: "messenger" as const,
    label: "Messenger",
  },
  {
    description: "linkedin.com/in/tonkotsuboy",
    href: "https://www.linkedin.com/in/tonkotsuboy/",
    icon: <Linkedin size={20} />,
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
              お仕事のご依頼・取材・コラボレーションなど、
              <br />
              以下のいずれかの方法からお気軽にご連絡ください。
            </p>
          </div>

          <div className={styles.links}>
            {contacts.map((contact) => (
              <Link
                key={contact.href}
                href={contact.href}
                className={styles.card}
                target="_blank"
              >
                <div className={`${styles.icon} ${styles[contact.iconStyle]}`}>
                  {contact.icon}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.label}>{contact.label}</p>
                  <p className={styles.cardDescription}>{contact.description}</p>
                </div>
                <ChevronRight size={16} className={styles.arrow} aria-hidden={true} />
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
