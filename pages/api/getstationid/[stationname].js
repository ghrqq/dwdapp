import { connectToDatabase } from "../../../configs/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const { stationname } = req.query;

  const station = await db
    .collection("Annual_Stations")
    .find({ Stationsname: stationname })
    .sort()
    .toArray();

  res.json(station);
};
