import Link from "next/link";
import Layout from "@components/Layout";
import { STRAPI_URL, NEXT_PUBLIC_API_URL } from "@config/index";
import Image from "next/image";
import { stringify } from "qs";
import styles from "@styles/Movies.module.css";
import PageNav from "@components/PageNav";

export default function MoviesPage({ query, filme }) {
  console.log(filme);
  const myFilms = filme;
  return (
    <Layout>
      <h1>Liste aller Filme</h1>
      <PageNav {...query} />
      {myFilms.map((f) => {
        let bild = f.attributes.bild;
        return (
          <>
            <div className={styles.mvcontainer}>
              <div className={styles.movieImage}>
                {bild.data && bild.data.attributes ? (
                  <Image
                    className={styles.movieImage}
                    src={
                      bild.data.attributes.formats
                        ? bild.data.attributes.formats.thumbnail.url
                        : bild.data.attributes.url
                    }
                    width="90"
                    height="120"
                  ></Image>
                ) : (
                  ""
                )}
              </div>
              <h4>
                {f.attributes.titel} ( {f.attributes.land} /{" "}
                {f.attributes.erscheinungsjahr})
              </h4>
              <p> {f.attributes.regie}</p>
            </div>
          </>
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const qpage = +context.query["pagination[page]"] || 1;
  const qpageSize = +context.query["pagination[pageSize]"] || 8;
  const res = await fetch(
    `${STRAPI_URL}/movies?pagination[page]=${qpage}&pagination[pageSize]=${qpageSize}&pagination[withCount]=true&populate=bild`
  );

  const data = await res.json();
  const filme = data.data;
  const qparam = { ...context.query };
  if (data.meta) {
    qparam.total = data.meta.pagination.total;
  }
  return {
    props: {
      query: qparam,
      filme: filme,
    },
  };
}
