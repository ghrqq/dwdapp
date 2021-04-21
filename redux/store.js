import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import dataReducer from "./features/dataSlice";
import selectorReducer from "./features/selectorSlice";
import loaderReducer from "./features/loaderSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
    selector: selectorReducer,
    loader: loaderReducer,
  },
});
