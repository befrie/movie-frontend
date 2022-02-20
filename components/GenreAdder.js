import React from "react";
import { useEffect, useState } from "react";
import { STRAPI_URL } from "@config/index";
import styles from "@styles/ActorAdder.module.css";

function GenreAdder() {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${STRAPI_URL}/genres?pagination[start]=1&pagination[limit]=20`)
      .then((response) => response.json())
      .then((data, meta) => {
        // const total = +data.meta.pagination.total;
        const genArr = data.data;
        const transformedGenres = [];
        // const upper = +total;
        genArr.forEach((element) => {
          transformedGenres.push({
            id: element.id,
            name: element.attributes.genre,
          });
        });
        setAllGenres(transformedGenres);
        // console.log("Actors: ", transformedActors);
      });
  }, []);

  return (
    <>
      <div className={styles.adder}>
        <ul>
          {allGenres.map((genre) => {
            return <li key={genre.id}>{genre.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default GenreAdder;
