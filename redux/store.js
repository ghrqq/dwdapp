import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import dataReducer from "./features/dataSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
  },
});
