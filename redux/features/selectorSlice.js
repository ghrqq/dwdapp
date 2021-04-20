import { createSlice } from "@reduxjs/toolkit";

export const selectorSlice = createSlice({
  name: "selector",
  initialState: {
    bundeslands: [],
    cities: [],
    selectedBundesland: "",
    selectedCity: "",
    selectedStationInfo: [],
    isQuery: false,
  },
  reducers: {
    setBundeslands: (state, action) => {
      state.bundeslands = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setSelectedBundesland: (state, action) => {
      state.selectedBundesland = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setSelectedStationInfo: (state, action) => {
      state.selectedStationInfo = action.payload;
    },
    setIsQuery: (state) => {
      state.isQuery = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBundeslands,
  setCities,
  setSelectedBundesland,
  setSelectedCity,
  setSelectedStationInfo,
  setIsQuery,
} = selectorSlice.actions;

export default selectorSlice.reducer;
