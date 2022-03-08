import React from "react";
import { useEffect, useState } from "react";
import { STRAPI_URL } from "@config/index";
import styles from "@styles/ActorAdder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function ActorAdder(props) {
  const [allActors, setAllActors] = useState([]);
  const [filteredActors, setFilteredActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addActor = (evt) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      const selAct = allActors.filter(
        (actor) => actor.id === +evt.currentTarget.id
      );
      console.log("Selected in ActorAdder: ", selAct);
      props.addActor(selAct[0]);
    }
  };

  const handleFilter = (evt) => {
    console.log(evt.target.value);
    setFilteredActors(
      allActors.filter(function (a) {
        console.log(a);
        return a.name.indexOf(evt.target.value) > -1;
      })
    );
  };

  function isIn(v) {
    return actor.name.indexOf(v) > -1;
  }
  const removeActor = (evt) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      props.removeActor(+evt.currentTarget.id);
    }
  };

  function already_selected(id) {
    for (let i = 0; i < props.selectedActors.length; i++) {
      if (props.selectedActors[i].id === id) {
        // console.log("Match!!!!!");
        return true;
      }
    }
    // console.log("No Match!!!!!");
    return false;
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${STRAPI_URL}/actors?sort=name&pagination[start]=1&pagination[limit]=800`
    )
      .then((response) => response.json())
      .then((data, meta) => {
        const actArr = data.data;
        const transformedActors = [];
        // const upper = +total;
        actArr.forEach((element) => {
          transformedActors.push({
            id: element.id,
            name: element.attributes.name,
          });
        });
        setAllActors(transformedActors);
        setFilteredActors(transformedActors);

        // console.log("Actors: ", props.selectedActors);
      });
  }, [props.selectedActors]);

  return (
    <div className={styles.adder}>
      <input type="text" onChange={handleFilter} />
      <ul>
        {filteredActors.map((act) => {
          return (
            <div className={styles.grid}>
              <li key={act.id}>{act.name}</li>

              {already_selected(act.id) ? (
                <button id={act.id} disabled>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ fontSize: 20, color: "lightgray" }}
                  />
                </button>
              ) : (
                <button id={act.id} onClick={addActor}>
                  <FontAwesomeIcon
                    onClick={addActor}
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
  );
}

export default ActorAdder;
