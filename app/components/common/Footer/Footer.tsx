import { Github, Linkedin, Twitter } from "lucide-react";

import styles from "./Footer.module.css";

import type { FC } from "react";

const socialLinks = [
  {
    href: "https://x.com/tonkotsuboy_com",
    icon: <Twitter className={styles.socialIcon} aria-hidden={true} />,
    label: "X",
  },
  {
    href: "https://github.com/tonkotsuboy",
    icon: <Github className={styles.socialIcon} aria-hidden={true} />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/tonkotsuboy/",
    icon: <Linkedin className={styles.socialIcon} aria-hidden={true} />,
    label: "LinkedIn",
  },
];

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>© 2025 Takeshi Kano. All rights reserved.</p>

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
