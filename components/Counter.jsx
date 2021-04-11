import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/features/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          className="bg-yellow-500 p-4"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="bg-gray-100 p-4">{count}</span>
        <button
          aria-label="Decrement value"
          className="bg-blue-400 p-4"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
