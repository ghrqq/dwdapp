import { connectToDatabase } from "../../configs/mongodb";
import axios from "axios";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  class Stations {
    constructor(...args) {
      (this.Stations_id = args[0]),
        (this.von_datum = args[1]),
        (this.bis_datum = args[2]),
        (this.Stationshoehe = args[3]),
        (this.geoBreite = args[4]),
        (this.geoLaenge = args[5]),
        (this.Stationsname = args[6]),
        (this.Bundesland = args[args.length - 1]);
    }
  }

  const shitty = await axios({
    url:
      "https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/annual/kl/historical/KL_Jahreswerte_Beschreibung_Stationen.txt",
    responseType: "arraybuffer",
    responseEncoding: "binary",
  });

  const fixed = shitty.data.toString("latin1");
  const param = fixed
    //   .slice(0, 1000)
    .split("\n")
    .map((i) => i.split(/[\s,]+/))
    .slice(2)
    .map((i) => i.filter((j) => j !== ""));

  console.table(param[2]);

  const resArr = param.map((i) => new Stations(...i));

  // const sample = await db.collection("Annual_Stations").insertMany(resArr);
  // console.log(sample);

  // .filter((j) => j[0] === "00071");
  //   .map((i) => i.split("s"))

  //   .filter((i) => i != " " && i != "")

  res.json(resArr);

  //
};
