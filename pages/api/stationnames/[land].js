import { connectToDatabase } from "../../../configs/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const { land } = req.query;

  const stations = await db
    .collection("Annual_Stations")
    .find({ Bundesland: land })
    .sort({ Stationsname: 1 })
    .toArray();

  const stationnames = [...new Set(stations.map((i) => i.Stationsname))];

  res.json(stationnames);
};
