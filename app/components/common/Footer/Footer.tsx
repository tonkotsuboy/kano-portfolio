import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import styles from "./Footer.module.css";

const socialLinks = [
  {
    href: "https://x.com/tonkotsuboy_com",
    label: "X",
    icon: <Twitter className={styles.socialIcon} aria-hidden={true} />,
  },
  {
    href: "https://github.com/tonkotsuboy",
    label: "GitHub",
    icon: <Github className={styles.socialIcon} aria-hidden={true} />,
  },
  {
    href: "https://www.linkedin.com/in/tonkotsuboy/",
    label: "LinkedIn",
    icon: <Linkedin className={styles.socialIcon} aria-hidden={true} />,
  },
];

const navLinks = [
  { href: "/", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>© 2025 Takeshi Kano. All rights reserved.</p>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={styles.socialLink}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
