import type { FC} from "react";
import { useContext } from "react";
import Link from "next/link";
import { EntryArticle } from "./EntryArticle";
import styles from "./EntryList.module.scss";
import { IndexContext } from "../../contexts/IndexContext";

type Props = {
  listTitle?: string;
};

export const EntryList: FC<Props> = ({ listTitle }) => {
  const { entryDataList } = useContext(IndexContext);

  if (entryDataList == null) {
    return null;
  }

  return (
    <div className={styles.entryList}>
      {listTitle && <h1 className={styles.listTitle}>{listTitle}</h1>}
      {entryDataList.map((entryData) => (
        <Link
          key={entryData.id}
          href={`/entry/${entryData.slug}`}
          aria-label={entryData.title}
        >
          <EntryArticle entryData={entryData} isLinkEntry />
        </Link>
      ))}
    </div>
  );
};
