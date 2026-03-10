import { Linkedin, Rss } from "lucide-react";
import { siGithub, siX } from "simple-icons";

import { SimpleIcon } from "../../../components/ui/icons/SimpleIcon";

import styles from "./Footer.module.css";

import type { FC } from "react";

const socialLinks = [
  {
    href: "https://x.com/tonkotsuboy_com",
    icon: (
      <SimpleIcon
        path={siX.path}
        className={styles.socialIcon}
        aria-hidden
        title="X"
      />
    ),
    isExternal: true,
    label: "X",
  },
  {
    href: "https://github.com/tonkotsuboy",
    icon: (
      <SimpleIcon
        path={siGithub.path}
        className={styles.socialIcon}
        aria-hidden
        title="GitHub"
      />
    ),
    isExternal: true,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/tonkotsuboy/",
    icon: <Linkedin className={styles.socialIcon} aria-hidden />,
    isExternal: true,
    label: "LinkedIn",
  },
  {
    href: "/feed.xml",
    icon: <Rss className={styles.socialIcon} aria-hidden />,
    isExternal: false,
    label: "RSS",
  },
];

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>© 2026 Takeshi Kano. All rights reserved.</p>

          <nav className={styles.socialLinks} aria-label="ソーシャルリンク">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={styles.socialLink}
                aria-label={social.label}
                {...(social.isExternal && { rel: "noopener noreferrer", target: "_blank" })}
              >
                {social.icon}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
