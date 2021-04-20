import React, { useEffect } from "react";
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
      url: `/api/getdata/${station.Stations_id}/${station.von_datum}/${station.bis_datum}`,
    }).then((res) => {
      if (res.status === 200) {
        dispatch(setData(res.data));
        dispatch(setStart(res.data[1][1].slice(0, 4)));
        dispatch(setEnd(res.data[res.data.length - 2][1].slice(0, 4)));
      }
    });
  }, [station]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="bg-gray-600 rounded w-96 text-gray-50 flex flex-row items-center justify-evenly justify-items-center">
        <div>
          Entries:
          <br /> {data.length}{" "}
        </div>
        {data.length > 0 ? (
          <div>
            Date Range: <br /> {data[1][1].slice(0, 4)} -{" "}
            {data[data.length - 1][1].slice(0, 4)}{" "}
          </div>
        ) : null}
      </div>
      <DateRange />
      <div className="w-screen flex flex-col lg:flex-row items-center justify-evenly mx-10 px-10 space-x-4">
        <div className="sm:w-1/4">
          <DataTypeChooser />
        </div>
        <div className=" w-full sm:w-3/4 mx-10 px-10">
          {data.length > 0 ? <DataChart dataArr={data} /> : null}
        </div>
      </div>
    </div>
  );
}
