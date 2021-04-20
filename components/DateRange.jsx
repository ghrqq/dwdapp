import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEntryVal, setStartVal } from "../redux/features/dataSlice";

export default function DateRange() {
  const { start, end, startVal, entryVal } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor="date">From</label> {startVal}
      <br />
      <input
        type="range"
        className="w-96 bg-gray-600 px-8"
        id="date"
        min={start}
        max={end}
        defaultValue={startVal}
        onChange={(e) => dispatch(setStartVal(e.target.value))}
      />
      <br />
      <label htmlFor="num">To</label> {entryVal}
      <br />
      <input
        type="range"
        className="w-96 bg-gray-600 px-8"
        id="num"
        min={startVal}
        max={end}
        defaultValue={end}
        onChange={(e) => dispatch(setEntryVal(e.target.value))}
      />
    </div>
  );
}
