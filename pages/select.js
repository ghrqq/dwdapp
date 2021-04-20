import { connectToDatabase } from "../configs/mongodb";
import React, { useState } from "react";
import SelectSecond from "../components/SelectSecond";

export default function Top({ stations, bundeslands }) {
  const [selectedBundesland, setselectedBundesland] = useState("");
  return (
    <div>
      <h2>Please choose a state.</h2>
      <select onChange={(e) => setselectedBundesland(e.target.value)}>
        <option value="Choose" key="initial">
          Choose
        </option>
        {bundeslands.map((i) => {
          return (
            <option value={i} key={i}>
              {i}
            </option>
          );
        })}
      </select>
      {selectedBundesland ? (
        <SelectSecond bundesland={selectedBundesland} />
      ) : null}
    </div>
  );
}
export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const stations = await db
    .collection("Annual_Stations")
    .find()
    .sort({ Bundesland: 1 })
    .toArray();

  const bundeslands = [...new Set(stations.map((i) => i.Bundesland))];
  return {
    props: {
      stations: JSON.parse(JSON.stringify(stations)),
      bundeslands,
    },
  };
}
