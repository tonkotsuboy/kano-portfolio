import * as React from "react";
import { HTMLAttributes, useContext, useState } from "react";
import Link from "next/link";
import styles from "./AppNavigation.module.scss";
import { IndexContext } from "../../contexts/IndexContext";
import MediumTagList from "./components/MediumTagList";

type Props = Pick<HTMLAttributes<HTMLElement>, "className">;

export const AppNavigation: React.FC<Props> = ({ className }) => {
  const { mediumDataList, tagDataList } = useContext(IndexContext);
  const [isOpen, setIsOpen] = useState(false);

  if (mediumDataList == null || tagDataList == null) {
    return null;
  }

  return (
    <nav
      className={[className, styles.navigation]
        .filter((value) => value != null)
        .join(" ")}
    >
      <svg
        className={styles.menubutton}
        width="40px"
        height="40px"
        viewBox="0 0 500 500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <path
          className={`border1 ${styles.menuborder}`}
          d="M44.6,151.6h409.9c18.9,0,34.2-15.2,34.2-34.1c0-18.8-15.3-34-34.2-34H44.6c-18.8,0-34.1,15.2-34.1,34 C10.4,136.4,25.7,151.6,44.6,151.6z"
        />
        <path
          className={`border2 ${styles.menuborder}`}
          d="M454.5,219.9H44.5c-18.8,0-34.1,15.3-34.1,34.1c0,18.9,15.3,34.2,34.1,34.2h409.9c18.9,0,34.2-15.3,34.2-34.2 C488.7,235.2,473.3,219.9,454.5,219.9z"
        />
        <path
          className={`border3 ${styles.menuborder}`}
          d="M454.5,356.7H44.5c-18.8,0-34.1,15.2-34.1,34.1c0,18.8,15.3,34.1,34.1,34.1h409.9c18.9,0,34.2-15.3,34.2-34.1 S473.3,356.7,454.5,356.7z"
        />
      </svg>
      <h1 className={styles.author}>
        <Link href="/">
          <a>Takeshi Kano</a>
        </Link>
      </h1>
      <p className={styles.job}>Frontend Developer</p>
      <div className={styles.largeListWrapper}>
        <MediumTagList
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
        />
      </div>
      <div
        className={[
          styles.smallListWrapper,
          isOpen ? styles.smallListWrapperIsOpen : null,
        ]
          .filter((value) => value != null)
          .join(" ")}
      >
        <MediumTagList
          mediumDataList={mediumDataList}
          tagDataList={tagDataList}
        />
      </div>
    </nav>
  );
};
