import { formatWithValidation } from "next/dist/next-server/lib/utils";
import React, { useEffect, useState } from "react";
import { Line, Bar, Radar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import DataParameterChooser from "./DataParameterChooser";
import { setChosenParameters } from "../redux/features/dataSlice";

// const data = {
//   labels: ["January", "February", "March"],
//   datasets: [
//     {
//       label: "My First dataset",
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "butt",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [{ y: 18 }, { y: 10 }, { y: 12 }],
//     },
//     {
//       label: "My Second dataset",
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "butt",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [12, 13, 18],
//     },
//     {
//       label: "My Third dataset",
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "butt",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [-4, -8, 0],
//     },
//   ],
// };

// const response = [
//   [
//     "STATIONS_ID",
//     "MESS_DATUM_BEGINN",
//     "MESS_DATUM_ENDE",
//     "QN_4",
//     "JA_N",
//     "JA_TT",
//     "JA_TX",
//     "JA_TN",
//     "JA_FK",
//     "JA_SD_S",
//     "JA_MX_FX",
//     "JA_MX_TX",
//     "JA_MX_TN",
//     "QN_6",
//     "JA_RR",
//     "JA_MX_RS",
//     "eor",
//   ],
//   [
//     "1762",
//     "19450101",
//     "19451231",
//     "-999",
//     "-999",
//     "-999",
//     "-999",
//     "-999",
//     "-999",
//     "-999",
//     "-999",
//     "-999",
//     "-999",
//     "1",
//     "591.8",
//     "-999",
//     "eor",
//   ],
//   [
//     "1762",
//     "19460101",
//     "19461231",
//     "1",
//     "5.59",
//     "8.48",
//     "13.31",
//     "4.07",
//     "2.23",
//     "-999",
//     "-999",
//     "37.1",
//     "-22.7",
//     "1",
//     "606.5",
//     "77.3",
//     "eor",
//   ],
// ];

export default function DataChart({ dataArr }) {
  const {
    parameters,
    entries,
    start,
    startVal,
    entryVal,
    chosenParameters,
  } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [state, setstate] = useState([]);
  const [chartType, setChartType] = useState("Line");

  const dataProvider = () => {
    if (!dataArr) {
      return;
    }

    const choice = parameters.params.filter(
      (i) => chosenParameters.indexOf(i) < 0
    );

    const search = dataArr[0];

    const slicedData = dataArr.filter(
      (i) =>
        parseInt(i[1].slice(0, 4)) > startVal &&
        parseInt(i[1].slice(0, 4)) < entryVal
    );

    const labels = slicedData.map((i) => i[1]);

    const readyDataSets = choice.map((i) => {
      const colors = [
        "#9bf6ff",
        "#ffadad",
        "#ffd6a5",
        "#bdb2ff",
        "#caffbf",
        "#faff5c",
        "#ffc6ff",
        "#a0c4ff",
        "#1B264F",
        "#9bf6ff",
        "#ffadad",
        "#ffd6a5",
        "#bdb2ff",
        "#caffbf",
        "#faff5c",
        "#ffc6ff",
        "#a0c4ff",
        "#1B264F",
      ];
      let index = search.indexOf(i.code);
      let data = slicedData.map((j) => (j[index] < -900 ? "-" : j[index]));
      let label = i.description;
      return {
        label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors[index],
        // backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: colors[index],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.9,
        borderJoinStyle: "miter",
        pointBorderColor: colors[index],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors[index],
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 4,
        pointRadius: 2,
        pointHitRadius: 10,
        data,
      };
    });

    let data = {
      labels: labels.map((i) => i.slice(0, 4)),

      datasets: readyDataSets,
    };
    setstate(data);
  };
  useEffect(() => {
    if (dataArr === undefined) {
      window.alert("dataArr undefined");
      return;
    }
    dataProvider();
  }, [dataArr, parameters.params, startVal, entryVal, chosenParameters]);

  const colorProvider = (val) => {
    if (chartType === val) {
      return "w-1/3  bg-gray-400 ";
    } else {
      return "w-1/3  hover:bg-gray-400 ";
    }
  };

  return (
    <div>
      <DataParameterChooser />
      <div className="bg-gray-600 text-gray-50 rounded w-96 flex flex-row items-stretch justify-evenly">
        <button
          className={colorProvider("Line")}
          onClick={() => setChartType("Line")}
        >
          Line
        </button>
        <button
          className={colorProvider("Bar")}
          onClick={() => setChartType("Bar")}
        >
          Bar
        </button>
        <button
          className={colorProvider("Radar")}
          onClick={() => setChartType("Radar")}
        >
          Radar
        </button>
      </div>
      {dataArr ? (
        chartType === "Line" ? (
          <Line data={state} />
        ) : chartType === "Bar" ? (
          <Bar data={state} />
        ) : chartType === "Radar" ? (
          <Radar data={state} />
        ) : null
      ) : null}
    </div>
  );
}
