import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedCity, setCities } from "../redux/features/selectorSlice";

export default function SelectSecond() {
  const [isLoading, setisLoading] = useState(true);
  const {
    selectedBundesland,

    cities,
  } = useSelector((state) => state.selector);
  const dispatch = useDispatch();

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
