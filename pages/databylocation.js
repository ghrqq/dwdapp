import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import CitySelector from "../components/CitySelector";
import DataDisplayer from "../components/DataDisplayer";
import { connectToDatabase } from "../configs/mongodb";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedBundesland,
  setSelectedCity,
  setSelectedStationInfo,
  setIsQuery,
} from "../redux/features/selectorSlice";

export default function databylocation({ stations, bundeslands }) {
  const dispatch = useDispatch();
  const {
    selectedBundesland,
    selectedCity,
    selectedStationInfo,
    isQuery,
  } = useSelector((state) => state.selector);
  const [station, setstation] = useState("");
  const [component, setcomponent] = useState("byName");

  // useEffect(() => {
  //   if (!selectedCity) {
  //     return;
  //   }
  //   dispatch(
  //     setSelectedStationInfo(
  //       stations.filter(
  //         (i) =>
  //           i.Bundesland === selectedBundesland &&
  //           i.Stationsname === selectedCity
  //       )[0]
  //     )
  //   );
  //   dispatch(setIsQuery());
  // }, [selectedCity]);

  // useEffect(() => {
  //   axios({
  //     url: "/api/getloc",
  //   }).then((res) => {
  //     if (res.status === 200) {
  //       axios({
  //         url: `/api/neareststation/${res.data.longitude}/${res.data.latitude}`,
  //       }).then((res) => {
  //         if (res.status === 200) {
  //           setstation(res.data);
  //         }
  //       });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // This function will try to get user's location from browser.
    // If user does not allow us to get location, it will show Munich's forecast by default.
    // If user allows, but an error occurs, it will make an API Call to a Geoloc DB
    // Once we have the coordinates an API call will be made to OpenWeather API to get the closest city's name and country code.
    //

    const options = {
      // Options for navigator geolocation
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos) => {
      // This function will run in case of a successfull attempt to get coordinates.

      axios({
        url: `/api/neareststation/${pos.coords.longitude}/${pos.coords.latitude}`,
      }).then((res) => {
        if (res.status === 200) {
          setstation(res.data);
        }
      });

      return;
    };
    const error = (err) => {
      // This will be fired in case of error.
      // If user does not allow us to get the location, a custom data will be fetched.
      if (err.code === 1) {
        axios({
          url: `/api/neareststation/8.7116/50.1383`,
        }).then((res) => {
          if (res.status === 200) {
            setstation(res.data);
          }
        });
      } else {
        // If user consents but an error occurs, will try GeoLoc DB

        axios({
          url: "/api/getloc",
        }).then((res) => {
          if (res.status === 200) {
            axios({
              url: `/api/neareststation/${res.data.longitude}/${res.data.latitude}`,
            }).then((res) => {
              if (res.status === 200) {
                setstation(res.data);
              }
            });
          }
        });
      }
    };

    // To check if the navigator is defined.
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.onLine !== "undefined"
    ) {
      const res = navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
      );
    }
  }, []);

  const findStationInfo = (e) => {
    const station = stations.filter((i) => i.Stations_id === e.target.value)[0];
    console.log(station, "station");
    dispatch(setSelectedStationInfo(station));
    dispatch(setIsQuery());
  };

  const colorProvider = (val) => {
    if (component === val) {
      return "w-1/2 text-gray-50 p-4 bg-gray-400";
    } else {
      return "w-1/2 text-gray-50 p-4 bg-gray-700";
    }
  };

  return (
    <Layout>
      <div>
        <div className="w-full sm:w-2/3 mx-auto flex flex-row justify-center items-center">
          <button
            className={colorProvider("byLocation")}
            onClick={(e) => setcomponent(e.target.value)}
            value="byLocation"
          >
            Find by Location
          </button>
          <button
            className={colorProvider("byName")}
            onClick={(e) => setcomponent(e.target.value)}
            value="byName"
          >
            Find by City Name
          </button>
        </div>
        <div className="flex flex-row items-stretch justify-evenly ">
          {station ? (
            <div className={component !== "byName" ? null : "hidden"}>
              <div className="flex flex-col  items-center justify-center w-80 ">
                {station.map((i) => (
                  <button
                    className="bg-gray-700 my-2 hover:bg-gray-400 text-gray-50 w-80 rounded py-4 text-center"
                    key={i.Stations_id}
                    value={i.Stations_id}
                    onClick={(e) => findStationInfo(e)}
                    // value={JSON.parse(JSON.stringify(i))}
                  >
                    {i.Stationsname} - {i.Bundesland}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div className={component !== "byLocation" ? null : "hidden"}>
            <CitySelector finder={findStationInfo} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-items-center w-96 mx-auto">
          {isQuery ? <DataDisplayer station={selectedStationInfo} /> : null}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const stations = await db
    .collection("Annual_Stations")
    .find()
    .sort({ Bundesland: 1 })
    .toArray();

  const bundeslands = [...new Set(stations.map((i) => i.Bundesland))];
  return {
    props: {
      stations: JSON.parse(JSON.stringify(stations)),

      bundeslands,
    },
  };
}
