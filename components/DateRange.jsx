import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEntries,
  setEntryVal,
  setStart,
  setStartVal,
} from "../redux/features/dataSlice";

export default function DateRange({ lgt, rngMin, rngMax }) {
  const [date, setdate] = useState("");
  const [num, setnum] = useState("");
  const { entries, start, end, startVal, entryVal } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const [state, setstate] = useState({ date: start, num: entries });

  const handleChange = (e, type) => {
    let val = e.target.value;
    if (type === "date") {
      setdate(val);
      setStartVal(date);
    } else {
      setnum(val);
      setEntryVal(num);
    }
  };

  return (
    <div>
      <label htmlFor="date">Starting date</label>
      <input
        id="date"
        min={start}
        max={end}
        defaultValue={startVal}
        onChange={(e) => dispatch(setStartVal(e.target.value))}
      />
      {startVal}
      <label htmlFor="num">Entry number</label>
      <input
        id="num"
        min={startVal}
        max={end}
        defaultValue={end}
        onChange={(e) => dispatch(setEntryVal(e.target.value))}
      />
      {entryVal}
    </div>
  );
}
