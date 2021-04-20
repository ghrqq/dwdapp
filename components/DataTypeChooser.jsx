import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  setEntries,
  setStart,
  setParameters,
} from "../redux/features/dataSlice";

export default function DataTypeChooser() {
  const { parameters, chosenParameters } = useSelector(
    (state) => state.selector
  );
  const dispatch = useDispatch();

  return (
    <div onChange={(e) => dispatch(setParameters({ type: e.target.value }))}>
      <input type="radio" value="temprature" name="Relation" /> Temprature
      <input type="radio" value="rain" name="Relation" /> Rain
      <input type="radio" value="wind" name="Relation" /> Wind
    </div>
  );
}
