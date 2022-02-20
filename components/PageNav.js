import React from "react";
import Link from "next/link";
import { STRAPI_URL } from "@config/index";
import styles from "@styles/PageNav.module.css";

export default function PageNav(q1) {
  const page = +q1["pagination[page]"] || 1;
  const pageSize = +q1["pagination[pageSize]"] || 8;
  const total = +q1["total"];

  const pageCount = Math.ceil(total / pageSize);
  return (
    <div className={styles.pageInfo}>
      {page > 1 && (
        <Link
          href={`movies?pagination[page]=${
            page - 1
          }&pagination[pageSize]=${pageSize}&pagination[withCount]=true&populate=bild`}
        >
          <a className={styles.pageInfoLink}>Zurück </a>
        </Link>
      )}
      <p className={styles.pageInfopp}>{`Seite ${page} von ${+pageCount}`}</p>
      {page < pageCount && (
        <Link
          className={styles.pageInfoLink}
          href={`movies?pagination[page]=${
            page + 1
          }&pagination[pageSize]=${pageSize}&pagination[withCount]=true&populate=bild`}
        >
          <a className={styles.pageInfoLink}> Weiter</a>
        </Link>
      )}
    </div>
  );
}
