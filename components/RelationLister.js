import React from "react";
import { useEffect, useState } from "react";
import { STRAPI_URL } from "@config/index";

export default function RelationLister(props) {
  const values = props.values;
  const what2show = props.what2show;
  // console.log("Values: ", values);
  return (
    <datalist id={props.forwhat}>
      {values.map((v) => {
        return <option value={v.id}>{v.attributes[what2show]}</option>;
      })}
    </datalist>
  );
}
