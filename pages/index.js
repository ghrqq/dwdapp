import { connectToDatabase } from "../configs/mongodb";
import React, { useEffect } from "react";
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

  // On render or on selectedCity change update the store
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
    <div className=" w-full mx-auto flex flex-col items-center justify-items-center">
      <div className="mx-auto w-96  flex flex-col items-center justify-items-center">
        <select
          className="mx-auto mt-8 p-4 w-full rounded bg-gray-600 text-gray-50"
          onChange={(e) => dispatch(setSelectedBundesland(e.target.value))}
        >
          <option value="Choose" key="initial">
            Choose a State
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
      <div className="flex flex-col items-center justify-items-center w-96  mx-auto">
        {selectedBundesland ? (
          <SelectSecond bundesland={selectedBundesland} />
        ) : null}
      </div>
      <div className="flex flex-col items-center justify-items-center w-96 mx-auto">
        {isQuery ? <DataDisplayer station={selectedStationInfo} /> : null}
      </div>
    </div>
  );
}

// To increase loading speed, getStaticProps from database before render.
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
