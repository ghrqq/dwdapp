import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "counter",
  initialState: {
    data: {},
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
