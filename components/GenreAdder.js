import React from "react";
import { useEffect, useState } from "react";
import { STRAPI_URL } from "@config/index";
import styles from "@styles/GenreAdder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function GenreAdder(props) {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${STRAPI_URL}/genres?sort=genre&pagination[start]=1&pagination[limit]=20`
    )
      .then((response) => response.json())
      .then((data, meta) => {
        // const total = +data.meta.pagination.total;
        console.log("Data: ", data.data);
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
        console.log("Genres: ", transformedGenres);
      });
  }, []);

  const addGenre = (evt) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      const selGen = allGenres.filter(
        (genre) => genre.id === +evt.currentTarget.id
      );
      console.log("Selected in ActorGenre: ", selGen);
      props.addGenre(selGen[0]);
    }
  };

  const removeGenre = (evt) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      props.removeGenre(+evt.currentTarget.id);
    }
  };

  return (
    <>
      <div className={styles.adder}>
        <ul>
          {allGenres.map((gen) => {
            return (
              <div className={styles.grid}>
                <li key={gen.id}>{gen.name}</li>

                {props.selectedGenres.indexOf(gen) >= 0 ? (
                  <button id={gen.id} disabled>
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ fontSize: 20, color: "lightgray" }}
                    />
                  </button>
                ) : (
                  <button id={gen.id} onClick={addGenre}>
                    <FontAwesomeIcon
                      onClick={addGenre}
                      icon={faCirclePlus}
                      style={{ fontSize: 20, color: "green" }}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default GenreAdder;
