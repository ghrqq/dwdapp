import { connectToDatabase } from "../configs/mongodb";
import React, { useState, useEffect } from "react";
import SelectSecond from "../components/SelectSecond";
import DataDisplayer from "../components/DataDisplayer";

import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedBundesland,
  setSelectedCity,
  setSelectedStationInfo,
  setIsQuery,
} from "../redux/features/selectorSlice";

export default function Top({ stations, bundeslands }) {
  const {
    selectedBundesland,
    selectedCity,
    selectedStationInfo,
    isQuery,
  } = useSelector((state) => state.selector);
  const dispatch = useDispatch();
  // const [selectedBundesland, setselectedBundesland] = useState("");

  useEffect(() => {
    if (!selectedCity) {
      return;
    }
    dispatch(
      setSelectedStationInfo(
        stations.filter(
          (i) =>
            i.Bundesland === selectedBundesland &&
            i.Stationsname === selectedCity
        )[0]
      )
    );
    dispatch(setIsQuery());
  }, [selectedCity]);

  return (
    <div className="bg-gray-300 mx-auto flex flex-col">
      <div className="mx-auto block border-black border-2">
        <h2 className="mx-auto text-gray-900 p-4">Please choose a state.</h2>
        <select
          className="mx-auto p-4"
          onChange={(e) => dispatch(setSelectedBundesland(e.target.value))}
        >
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
      </div>
      <div className="block mx-auto">
        {selectedBundesland ? (
          <SelectSecond bundesland={selectedBundesland} />
        ) : null}
      </div>
      <div className="block mx-auto">
        {isQuery ? <DataDisplayer station={selectedStationInfo} /> : null}
      </div>
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
