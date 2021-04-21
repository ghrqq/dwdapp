import { connectToDatabase } from "../../../configs/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { slug } = req.query;

  const stations = await db
    .collection("AnnualStations")
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: slug.map((i) => parseFloat(i)),
          },
          $minDistance: 1,
          $maxDistance: 20000,
        },
      },
    })
    .limit(5)
    .toArray();

  res.json(stations);
};
