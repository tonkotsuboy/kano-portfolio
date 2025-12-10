import { Linkedin } from "lucide-react";
import { siGithub, siX } from "simple-icons";

import { SimpleIcon } from "../../components/ui/icons/SimpleIcon";

import styles from "./Footer.module.css";

import type { FC } from "react";

const socialLinks = [
  {
    href: "https://x.com/tonkotsuboy_com",
    icon: (
      <SimpleIcon
        path={siX.path}
        className={styles.socialIcon}
        aria-hidden={true}
        title="X"
      />
    ),
    label: "X",
  },
  {
    href: "https://github.com/tonkotsuboy",
    icon: (
      <SimpleIcon
        path={siGithub.path}
        className={styles.socialIcon}
        aria-hidden={true}
        title="GitHub"
      />
    ),
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
