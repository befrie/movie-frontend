import Layout from "@components/Layout";
import RelationLister from "@components/RelationLister";
import Link from "next/link";
import styles from "@styles/add.module.css";
import { STRAPI_URL } from "@config/index";
import { useState, useEffect } from "react";
import ActorAdder from "@components/ActorAdder";
import GenreAdder from "@components/GenreAdder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNinja, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function AddMoviePage(props) {
  const myGenres = props.genreListe;
  const myActors = props.actorsList;
  const [selectedActors, setSelectedActors] = useState([]);
  const selectedGenres = [];
  const [values, setValues] = useState({
    titel: "",
    regie: "",
    erscheinungsjahr: 0,
    medium: "DVD",
    land: "",
    aufbewahrungsort: "",
    beschreibung: "",
    actors: [],
    genres: [],
    bild: null,
  });

  // const addActor = (evt) => {
  //   console.log("Selected Actor: ", evt.target.value);
  //   const act = myActors.find((act) => act.id === +evt.target.value);
  //   console.log("Actor: ....", act);
  //   evt.target.value = act.attributes.name;
  // };

  const addGenre = (evt) => {
    console.log("Selected Genre: ", evt.target.value);
    evt.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit ...");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleAddActor = (actor) => {
    setSelectedActors((prevSelectedActors) => [...selectedActors, actor]);
    // console.log("ID in parent: ", actor.id);
  };

  const getName = (id) => {
    console.log("Selected: ", selectedActors, id);
    const resName = selectedActors.filter((actor) => actor.id === id)[0];
    return resName;
  };

  const handleRemoveActor = (evt) => {
    const lid = evt.target.parentNode.id;
    console.log("remove in parent: ", lid);
    setSelectedActors((prevSelectedActors) =>
      selectedActors.filter((actor) => lid != actor.id)
    );
  };

  const actorID = null;

  return (
    <Layout title="Film erfassen">
      <Link href="/movies">zurück zur Liste</Link>
      <h1>Neuen Film erfassen</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="titel">Filmtitel</label>
            <input
              type="text"
              id="titel"
              name="titel"
              value={values.titel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="regie">Regie</label>
            <input
              type="text"
              id="regie"
              name="regie"
              value={values.regie}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="land">Land</label>
            <input
              type="text"
              id="aufbewahrungsort"
              name="aufbewahrungsort"
              value={values.aufbewahrungsort}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="medium">Medium</label>
            <input
              type="text"
              id="medium"
              name="medium"
              value={values.medium}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="aufbewahrungsort">Aufbewahrungsort</label>
            <input
              type="text"
              id="land"
              name="land"
              value={values.land}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="erscheinungsjahr">Jahr</label>
            <input
              type="date"
              id="erscheinungsjahr"
              name="erscheinungsjahr"
              value={values.erscheinungsjahr}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.description}>
          <label htmlFor="beschreibung">Inhalt</label>
          <textarea
            type="text"
            name="beschreibung"
            id="beschreibung"
            value={values.beschreibung}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className={styles.grid}>
          <h4>Mitwirkende:</h4>

          <h4>Darsteller:</h4>

          <div>
            {selectedActors.map((actor) => {
              return (
                <div>
                  <FontAwesomeIcon
                    icon={faUserNinja}
                    style={{ fontSize: "20px", marginRight: "10px" }}
                  />
                  {actor.name}
                  <FontAwesomeIcon
                    id={actor.id}
                    icon={faCircleMinus}
                    onClick={handleRemoveActor}
                    style={{ fontSize: "20px", marginLeft: "10px" }}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <ActorAdder
              addActor={handleAddActor}
              selectedActors={selectedActors}
            />
          </div>
        </div>
      </form>
      <div className={styles.grid}>
        <div>Genres</div>
        <div>
          <h4>Genres</h4>
          <div>
            <GenreAdder />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res2 = await fetch(
    `${STRAPI_URL}/genres?pagination[page]=1&pagination[pageSize]=20&pagination[withCount]=true`
  );
  const data2 = await res2.json();
  const genres = data2.data;
  // console.log("Actors found: ", actors.length);
  return {
    props: {
      genreListe: genres,
    },
  };
}
