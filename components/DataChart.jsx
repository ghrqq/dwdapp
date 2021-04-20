import React, { useEffect, useState } from "react";
import { Line, Bar, Radar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";

export default function DataChart({ dataArr }) {
  const {
    parameters,

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
