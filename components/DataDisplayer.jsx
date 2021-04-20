import React, { useState, useEffect } from "react";
import axios from "axios";
import DataChart from "./DataChart";
import DateRange from "./DateRange";
import DataTypeChooser from "./DataTypeChooser";
import { useSelector, useDispatch } from "react-redux";
import { setData, setEnd, setStart } from "../redux/features/dataSlice";

export default function DataDisplayer({ station }) {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!station) {
      return;
    }
    axios({
      url: `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getdata/${station.Stations_id}/${station.von_datum}/${station.bis_datum}`,
    }).then((res) => {
      if (res.status === 200) {
        dispatch(setData(res.data));
        dispatch(setStart(res.data[1][1].slice(0, 4)));
        dispatch(setEnd(res.data[res.data.length - 2][1].slice(0, 4)));
      }
    });
  }, [station]);

  return (
    <div>
      <h5>Number of entries: {data.length} </h5>
      {data.length > 0 ? (
        <>
          <h5>
            Date Range: {data[1][1].slice(0, 4)} -{" "}
            {data[data.length - 2][1].slice(0, 4)}{" "}
          </h5>
          <DateRange
            lgt={data.length}
            rngMin={data[1][1].slice(0, 4)}
            rngMax={data[data.length - 2][1].slice(0, 4)}
          />
        </>
      ) : null}
      <DataTypeChooser />

      {data.length > 0 ? <DataChart dataArr={data} /> : null}
    </div>
  );
}
