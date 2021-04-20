import { createSlice } from "@reduxjs/toolkit";
import codes from "../../legend/annualDataCodes.json";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    entries: 2,
    start: 2000,
    end: 2021,
    startVal: 0,
    entryVal: 2021,

    parameters: {
      params: [
        {
          code: "JA_MX_TN",
          description: "absolute minimum air temprature (height: 2 meters)",
          unit: "C",
          relation: "temprature",
        },
        {
          code: "JA_MX_TX",
          description: "absolute maximum air temprature (height: 2 meters)",
          unit: "C",
          relation: "temprature",
        },
        {
          code: "JA_N",
          description: "coverage",
          unit: "",
          relation: "temprature",
        },
        {
          code: "JA_TN",
          description: "minimum air temprature",
          unit: "C",
          relation: "temprature",
        },
        {
          code: "JA_TX",
          description: "maximum air temprature",
          unit: "C",
          relation: "temprature",
        },
        {
          code: "JA_TT",
          description: "average air temprature",
          unit: "C",
          relation: "temprature",
        },
      ],
      type: "temprature",
    },
    chosenParameters: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.filter(
        (i) => i !== undefined && i.length > 0
      );
    },
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    setStart: (state, action) => {
      state.start = action.payload;
      state.startVal = action.payload;
    },
    setEnd: (state, action) => {
      state.end = action.payload;
    },
    setStartVal: (state, action) => {
      state.startVal = action.payload;
    },
    setEntryVal: (state, action) => {
      state.entryVal = action.payload;
    },
    setParameters: (state, action) => {
      state.parameters.type = action.payload.type
        ? action.payload.type
        : state.parameters.type;

      state.parameters.params = codes.codes.filter(
        (i) => i.relation === state.parameters.type
      );
    },
    setChosenParameters: (state, action) => {
      let index = state.chosenParameters.filter(
        (i) => i.code === action.payload.code
      );

      if (index.length > 0) {
        state.chosenParameters = state.chosenParameters.filter(
          (i) => i.code !== action.payload.code
        );
      } else {
        state.chosenParameters.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setData,
  setEntries,
  setStart,
  setParameters,
  setEnd,
  setEntryVal,
  setStartVal,
  setChosenParameters,
} = dataSlice.actions;

export default dataSlice.reducer;
