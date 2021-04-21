import { connectToDatabase } from "../../configs/mongodb";
import axios from "axios";

// This module is entirely for development purposes.
// It processes and saves the initial data to DB should not be called in production.
// DB connection removed for development purposes.
export default async (req, res) => {
  const { db } = await connectToDatabase();

  class Stations {
    constructor(args) {
      (this.Stations_id = args.Stations_id),
        (this.von_datum = args.von_datum),
        (this.bis_datum = args.bis_datum),
        (this.Stationshoehe = args.Stationshoehe),
        // (this.geoBreite = args[4]), // Latitute second
        // (this.loc = [args[5], args[4]].map((i) => parseInt(i))), //Longitude first
        // (this.loc = {
        //   type: "Point",
        //   coordinates: [parseInt(args[5]), parseInt(args[4])],
        // }),
        // { type: "Point", coordinates: [ 40, 5 ] }

        (this.location = {
          type: "Point",
          coordinates: [args.geoLaenge, args.geoBreite].map((i) =>
            parseFloat(i)
          ),
          // coordinates: [args[5], args[4]],
        }), //Longitude first
        (this.Stationsname = args.Stationsname),
        (this.Bundesland = args.Bundesland);
    }
  }
  // class Stations {
  //   constructor(...args) {
  //     (this.Stations_id = args[0]),
  //       (this.von_datum = args[1]),
  //       (this.bis_datum = args[2]),
  //       (this.Stationshoehe = args[3]),
  //       // (this.geoBreite = args[4]), // Latitute second
  //       // (this.loc = [args[5], args[4]].map((i) => parseInt(i))), //Longitude first
  //       // (this.loc = {
  //       //   type: "Point",
  //       //   coordinates: [parseInt(args[5]), parseInt(args[4])],
  //       // }),
  //       // { type: "Point", coordinates: [ 40, 5 ] }

  //       (this.location = {
  //         type: "Point",
  //         coordinates: [args[5], args[4]].map((i) => parseInt(i)),
  //         // coordinates: [args[5], args[4]],
  //       }), //Longitude first
  //       (this.Stationsname = args[6]),
  //       (this.Bundesland = args[args.length - 1]);
  //   }
  // }

  // const shitty = await axios({
  //   url:
  //     "https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/annual/kl/historical/KL_Jahreswerte_Beschreibung_Stationen.txt",
  //   responseType: "arraybuffer",
  //   responseEncoding: "binary",
  // });

  // const fixed = shitty.data.toString("latin1");
  // const param = fixed
  //   //   .slice(0, 1000)
  //   .split("\n")
  //   .map((i) => i.split(/[\s,]+/))
  //   .slice(2)
  //   .map((i) => i.filter((j) => j !== ""));

  const shitty = await db.collection("Annual_Stations").find().toArray();

  console.log(shitty, "shitty");

  // const resArr = param.map((i) => new Stations(...i));
  const resArr = shitty.map((i) => new Stations(i));
  console.log(resArr, "resArr");

  const sample = await db
    .collection("AnnualStations")
    // .insertMany(resArr);
    .createIndex({ location: "2dsphere" });
  // .insertMany([
  //   {
  //     name: "Central Park",
  //     location: { type: "Point", coordinates: [-73.97, 40.77] },
  //     category: "Parks",
  //   },
  //   {
  //     name: "Sara D. Roosevelt Park",
  //     location: { type: "Point", coordinates: [-73.9928, 40.7193] },
  //     category: "Parks",
  //   },
  //   {
  //     name: "Polo Grounds",
  //     location: { type: "Point", coordinates: [-73.9375, 40.8303] },
  //     category: "Stadiums",
  //   },
  // ]);

  // .collection("AnnualStations6")
  // .insertMany(resArr);
  // .createIndex(
  //   { loc: "2dsphere" },
  //   { min: -10000000, max: 630000000, bits: 24 }
  // );

  // console.log(sample);

  // .filter((j) => j[0] === "00071");
  //   .map((i) => i.split("s"))

  //   .filter((i) => i != " " && i != "")

  res.json(resArr);

  //
};
