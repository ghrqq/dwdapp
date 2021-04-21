import axios from "axios";

export default async (req, res) => {
  const location = await axios({
    url: `http://geolocation-db.com/json/${process.env.NEXT_PUBLIC_geoLocKey}`,
  });

  res.json(location.data);
};
