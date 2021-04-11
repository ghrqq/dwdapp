import { connectToDatabase } from "../../configs/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const sample = await db
    .collection("sample")
    .find({})
    .sort()
    .limit(20)
    .toArray();

  res.json(sample);
};
