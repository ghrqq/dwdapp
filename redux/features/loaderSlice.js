import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    color: "bg-green-400",
    msg: "Welcome! We are preparing the data. This may take a while.",
    isLoading: true,
  },
  reducers: {
    update: (state, action) => {
      state.msg = action.payload.msg;
      state.color =
        action.payload.color === "fail" ? "bg-red-400" : "bg-green-400";
    },
  },
});

export const { update } = loaderSlice.actions;

export default loaderSlice.reducer;
