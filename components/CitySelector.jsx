import React, { useState, useEffect } from "react";
import cities from "../legend/cities.json";
import axios from "axios";

export default function CitySelector({ finder }) {
  const [chosen, setchosen] = useState("");
  const [station, setstation] = useState("");
  const [search, setsearch] = useState("");
  const [recommendation, setrecommendation] = useState([]);

  useEffect(() => {
    if (!chosen) {
      return;
    }
    const temp = chosen.split(",");

    axios({
      url: `/api/neareststation/${temp[0]}/${temp[1]}`,
    }).then((res) => {
      if (res.status === 200) {
        setstation(res.data);
      }
    });
  }, [chosen]);

  const autoComplete = () => {
    if (search.length < 3) {
      return;
    }
    const rec = cities.filter(
      (i) =>
        i.city.slice(0, search.length).toLowerCase() === search.toLowerCase()
    );
    setrecommendation(rec.splice(0, 5));
  };

  useEffect(() => {
    autoComplete();
  }, [search]);

  const handleChosen = (e) => {
    const val = e.target.value;
    setchosen(val);
    console.log(val);
  };

  return (
    <div className="w-full mx-auto flex flex-row justify-evenly items-stretch">
      <div className="w-1/2">
        <input
          className="w-80 bg-gray-100 p-4"
          placeholder="Start typing"
          onChange={(e) => setsearch(e.target.value)}
        />
        {recommendation.length > 0 ? (
          <div className="flex flex-col items-center justify-center w-80">
            {recommendation.map((i) => (
              <button
                className="bg-yellow-400 my-2 hover:bg-gray-400 text-gray-50 w-2/3 rounded py-4 text-center"
                key={i.city}
                value={[i.lng, i.lat]}
                onClick={(e) => handleChosen(e)}
              >
                {i.city}
              </button>
            ))}
          </div>
        ) : search.length < 3 ? (
          <button className="bg-yellow-400 my-2 hover:bg-gray-400 text-gray-50 w-2/3 rounded py-4 text-center">
            You should write {3 - search.length} more letters.
          </button>
        ) : (
          <button className="bg-red-400 my-2 hover:bg-gray-400 text-gray-50 w-2/3 rounded py-4 text-center">
            No Result
          </button>
        )}
      </div>
      <div className="w-1/2">
        {station ? (
          <div className="flex flex-col items-center justify-center w-80">
            <span className="w-80 bg-gray-100 p-4">
              {" "}
              Closest stations to your selection:
            </span>
            {station.map((i) => (
              <button
                className="bg-gray-700 my-2 hover:bg-gray-400 text-gray-50 w-80 rounded py-4 text-center"
                key={i.Stations_id}
                value={i.Stations_id}
                onClick={(e) => finder(e)}
              >
                {i.Stationsname} - {i.Bundesland}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
