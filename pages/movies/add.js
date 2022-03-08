import Layout from "@components/Layout";
import RelationLister from "@components/RelationLister";
import Link from "next/link";
import styles from "@styles/add.module.css";
import { STRAPI_URL } from "@config/index";
import { useState, useEffect } from "react";
import ActorAdder from "@components/ActorAdder";
import GenreAdder from "@components/GenreAdder";
import Modal from "@components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserNinja,
  faCircleMinus,
  faCirclePlus,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import ActorForm from "@components/ActorForm";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

export default function AddMoviePage(props) {
  const myGenres = props.genreListe;
  const myActors = props.actorsList;
  const [showModal, setShowModal] = useState(false);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
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

  // const addGenre = (evt) => {
  //   console.log("Selected Genre: ", evt.target.value);
  //   evt.target.value = "";
  // };

  const handleDarstellerListe = (e) => {
    e.preventDefault();
    setShowModal(true);
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

  const handleAddGenre = (genre) => {
    setSelectedGenres((prevSelectedGenres) => [...selectedGenres, genre]);
    // console.log("ID in parent: ", actor.id);
  };

  const handleNewActor = async (v) => {
    // e.preventDefault();
    setShowModal(false);
    // console.log("neuer Darsteller: ", v);
    // neuen Darsteller in Strapi speichern, falls Name bereits existiert Fehlermeldung!
    const response = await fetch(`${STRAPI_URL}/actors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"data": {"name": "${v.vorname} ${v.nachname}"}}`,
    });
    // console.log(response);
    if (response.ok) {
      let res = await response.json();
      console.log(res);
      let newActor = {
        id: res.data.id,
        name: res.data.attributes.name,
      };
      handleAddActor(newActor);
      // console.log(newActor);
    }
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

  const handleRemoveGenre = (evt) => {
    const lid = evt.target.parentNode.id;
    console.log("remove in parent: ", lid);
    setSelectedGenres((prevSelectedGenres) =>
      selectedGenres.filter((genre) => lid != genre.id)
    );
  };

  // const handleAddActorToList = (evt) => {
  //   evt.preventDefault();
  //   console.log("called handleAddActorToList");
  // };

  // const actorID = null;

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
          <div>
            <h4>Besetzung:</h4>
            {selectedActors.map((actor) => {
              return (
                <div className={styles.grid1}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: "20px", marginRight: "10px" }}
                  />
                  {actor.name}
                  <FontAwesomeIcon
                    id={actor.id}
                    icon={faCircleMinus}
                    onClick={handleRemoveActor}
                    style={{
                      fontSize: "20px",
                      marginLeft: "10px",
                      color: "red",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <div>
              <h4 style={{ display: "inline-block" }}>Darstellerliste:</h4>
              <button
                onClick={handleDarstellerListe}
                style={{ marginLeft: "30px" }}
              >
                Darsteller hinzufügen
              </button>
            </div>
            <ActorAdder
              addActor={handleAddActor}
              selectedActors={selectedActors}
            />
          </div>

          <div>
            <h4>zugeordnete Genres:</h4>
            {selectedGenres.map((genre) => {
              return (
                <div className={styles.grid1}>
                  <FontAwesomeIcon
                    icon={faStore}
                    style={{ fontSize: "20px", marginRight: "10px" }}
                  />
                  {genre.name}
                  <FontAwesomeIcon
                    id={genre.id}
                    icon={faCircleMinus}
                    onClick={handleRemoveGenre}
                    style={{
                      fontSize: "20px",
                      marginLeft: "10px",
                      color: "red",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <h4>verfügbare Genres:</h4>
            <GenreAdder
              addGenre={handleAddGenre}
              selectedGenres={selectedGenres}
            />
          </div>
        </div>
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Schauspieler"
      >
        <ActorForm
          onCancel={() => setShowModal(false)}
          onSave={handleNewActor}
        ></ActorForm>
      </Modal>
    </Layout>
  );
}

// export async function getStaticProps() {
//   // const res2 = await fetch(
//   //   `${STRAPI_URL}/genres?sort=genre&pagination[page]=1&pagination[pageSize]=20&pagination[withCount]=true`
//   // );
//   // const data2 = await res2.json();
//   // const genres = data2.data;
//   // // console.log("Actors found: ", actors.length);
//   // return {
//   //   props: {
//   //     genreListe: genres,
//   //   },
//   // };
//   return null;
// }
