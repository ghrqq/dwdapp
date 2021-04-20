import React, { useEffect, useState } from "react";
import axios from "axios";
import DataDisplayer from "./DataDisplayer";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedBundesland,
  setSelectedCity,
  setSelectedStationInfo,
  setCities,
} from "../redux/features/selectorSlice";

export default function SelectSecond() {
  const {
    selectedBundesland,
    selectedCity,
    selectedStationInfo,
    cities,
  } = useSelector((state) => state.selector);
  const dispatch = useDispatch();

  // const [names, setnames] = useState([]);
  // const [selectedName, setselectedName] = useState("");
  // const [stationId, setstationId] = useState("");

  useEffect(() => {
    axios({
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/stationnames/${selectedBundesland}`,
    }).then((res) => {
      if (res.status === 200) {
        dispatch(setCities(res.data));
      } else {
        window.alert("Errorr"); //TODO: clean.
      }
    });
  }, [selectedBundesland]);

  // useEffect(() => {
  //   if (!selectedCity) {
  //     return;
  //   }
  //   axios({
  //     url: `http://localhost:3000/api/getstationid/${selectedCity}`,
  //   }).then((res) => {
  //     if (res.status === 200) {
  //       dispatch(setSelectedStationInfo(res.data[0]));
  //     }
  //   });
  // }, [selectedCity]);

  return (
    <div>
      <h2>Please choose a station.</h2>
      <select onChange={(e) => dispatch(setSelectedCity(e.target.value))}>
        <option value="Choose" key="initial">
          Choose
        </option>
        {cities.length > 0
          ? cities.map((i) => {
              return (
                <option value={i} key={i}>
                  {i}
                </option>
              );
            })
          : null}
      </select>

      {/* {selectedName ? <DataDisplayer station={stationId} /> : null} */}
    </div>
  );
}
