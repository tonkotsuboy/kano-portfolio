import * as React from "react";
import { BlogType } from "../types/client/BlogType";
import styles from "./Entry.module.scss";
import Link from "next/link";

type Props = {
  entryData: BlogType;
};

/**
 * 各記事のエントリー
 */
export const Entry: React.FC<Props> = ({
         entryData: { id, published_date, title, url, medium, tags },
       }) => {
         return (
           <div className={styles.entry}>
             <header className={styles.header}>
               <a className={styles.medium} href={medium.slug}>
                 {medium.name}
               </a>
               <ul className={styles.taglist}>
                 {tags.map(({ name, slug }) => (
                   <li key={slug} className={styles.tag}>
                     <a href={`/tags/${slug}`}>#{name}</a>
                   </li>
                 ))}
               </ul>
             </header>
             <h2 className={styles.title}>{title}</h2>
             <Link href={`/entry/${id}`}>
               <a>{id}</a>
             </Link>
             <a className={styles.link} href={url}>
               {url}
             </a>
             <time dateTime={published_date} className={styles.published_date}>
               {published_date}
             </time>
           </div>
         );
       };
