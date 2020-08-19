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
      <button
        type="button"
        className={styles.menubutton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="12"
          viewBox="0 0 20 12"
        >
          <g transform="translate(-108.5 -160.5)">
            <line
              x2="20"
              transform="translate(108.5 161.5)"
              fill="none"
              stroke="#3f3f9d"
              strokeWidth="2"
            />
            <line
              x2="20"
              transform="translate(108.5 166.5)"
              fill="none"
              stroke="#3f3f9d"
              strokeWidth="2"
            />
            <line
              x2="20"
              transform="translate(108.5 171.5)"
              fill="none"
              stroke="#3f3f9d"
              strokeWidth="2"
            />
          </g>
        </svg>
      </button>

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
