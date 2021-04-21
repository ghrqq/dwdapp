import { connectToDatabase } from "../../configs/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const shitty = await db
    .collection("AnnualStations")
    .find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [11.25, 51.35] },
          $minDistance: 1000,
          $maxDistance: 5000,
        },
      },
    })
    .toArray();

  res.json(shitty);
};
