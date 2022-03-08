import React from "react";
import { useState, useEffect } from "react";

import styles from "@styles/ActorForm.module.css";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";

export default function ({ onCancel, onSave }) {
  const handleSave = (e) => {
    e.preventDefault();
    onSave(values);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [values, setValues] = useState({
    vorname: "",
    nachname: "",
  });

  return (
    <div className={styles.grid}>
      <form>
        <label className={styles.label} for="vorname">
          Vorname
        </label>
        <input type="text" name="vorname" onChange={handleInputChange} />
        <label className={styles.label} for="nachname">
          Nachname
        </label>
        <input type="text" name="nachname" onChange={handleInputChange} />
        <button className={styles.button} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.button} onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
