import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  setEntries,
  setStart,
  setParameters,
  setChosenParameters,
} from "../redux/features/dataSlice";

export default function DataTypeChooser() {
  const { parameters, chosenParameters } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const handleChange = (code) => {
    dispatch(setChosenParameters(code));
  };
  const colors = [
    "#9bf6ff",
    "#ffadad",
    "#ffd6a5",
    "#bdb2ff",
    "#caffbf",
    "#faff5c",
    "#ffc6ff",
    "#a0c4ff",
    "#1B264F",
    "#9bf6ff",
    "#ffadad",
    "#ffd6a5",
    "#bdb2ff",
    "#caffbf",
    "#faff5c",
    "#ffc6ff",
    "#a0c4ff",
    "#1B264F",
  ];

  const colorProvider = (val) => {
    console.log(parameters.type);
    if (val === "temperature") {
      if (parameters.type === val) {
        return "rounded w-2/4 text-sm py-4 bg-gray-400";
      } else {
        return "rounded w-2/4 text-sm py-4 bg-gray-700 hover:bg-gray-400";
      }
    } else {
      if (parameters.type === val) {
        return "rounded w-1/4 text-sm py-4 bg-gray-400";
      } else {
        return "rounded w-1/4 text-sm py-4 bg-gray-700 hover:bg-gray-400";
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      // onChange={(e) => dispatch(setParameters({ type: e.target.value }))}
    >
      <div className="flex flex-row bg-gray-800 text-gray-50 rounded w-full">
        {/* <label htmlFor="temperature">Temprature</label>
        <input
          id="temperature"
          type="radio"
          value="temperature"
          name="Relation"
        />
        <label htmlFor="rain">Rain</label>
        <input id="rain" type="radio" value="rain" name="Relation" />
        <label htmlFor="wind">Wind</label>
        <input id="wind" type="radio" value="wind" name="Relation" /> Wind */}
        <button
          value="rain"
          onClick={(e) => dispatch(setParameters({ type: e.target.value }))}
          className={colorProvider("rain")}
        >
          Rain
        </button>
        <button
          value="temperature"
          onClick={(e) => dispatch(setParameters({ type: e.target.value }))}
          className={colorProvider("temperature")}
        >
          Temperature
        </button>
        <button
          value="wind"
          onClick={(e) => dispatch(setParameters({ type: e.target.value }))}
          className={colorProvider("wind")}
        >
          Wind
        </button>
      </div>
      <div className="w-full text-center">
        <ul className="">
          {parameters.params.map((i) => (
            <li
              key={i.code}
              className="text-xs bg-gray-400 px-4 text-gray-50 rounded-full my-2 cursor-pointer hover:bg-gray-600"
              // style={{ backgroundColor: "blue" }}
              onClick={() => handleChange(i)}
            >
              {i.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
