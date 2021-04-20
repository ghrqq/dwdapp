import { connectToDatabase } from "../../configs/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  // DB Query to easily get initial values.
  const stations = await db
    .collection("Annual_Stations")
    .find()
    .sort({ Bundesland: 1 })
    .toArray();

  const bundeslands = [...new Set(stations.map((i) => i.Bundesland))];

  res.json(bundeslands);
};
