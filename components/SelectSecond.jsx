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
  const [isLoading, setisLoading] = useState(true);
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
      url: `/api/stationnames/${selectedBundesland}`,
    }).then((res) => {
      if (res.status === 200) {
        dispatch(setCities(res.data));
        setisLoading(false);
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
    <div className="w-full flex flex-col justify-center items-center justify-items-start">
      {isLoading ? null : (
        <select
          className="mx-auto p-4 my-4 w-full rounded bg-gray-600 text-gray-50"
          onChange={(e) => dispatch(setSelectedCity(e.target.value))}
        >
          <option value="Choose" key="initial">
            Choose a Station
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
      )}
    </div>
  );
}
