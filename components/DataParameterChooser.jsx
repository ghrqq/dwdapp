import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  setEntries,
  setStart,
  setParameters,
} from "../redux/features/dataSlice";

export default function DataParameterChooser() {
  const { parameters, chosenParameters } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <div onChange={(e) => dispatch(setParameters({ type: e.target.value }))}>
      {/* {parameters.params.map((i) => (
        <label>
          {i.description}
          <input
            name="isGoing"
            type="checkbox"
            key={i.code}
            checked={true}
            onChange={() => console.log(i)}
          />
        </label>
      ))} */}
    </div>
  );
}
