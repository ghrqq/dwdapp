// c StreamZip = require("node-stream-zip");
import StreamZip from "node-stream-zip";
import axios from "axios";
import fs from "fs";

const metaProvider = (str) => {
  if (str === "annual") {
    return { 0: "annual", 1: "jahreswerte", 2: "JA" };
  } else if (str === "monthly") {
    return { 0: "monthly", 1: "monatswerte", 2: "MO" }; //TODO check this one
  } else {
    return { 0: "daily", 1: "tageswerte", 2: "TG" }; // TODO check this one
  }
};

export default async (req, res) => {
  const { slug } = req.query;

  if (slug[0] === undefined || slug[1] === undefined || slug[2] === undefined) {
    res.json("No parametes given.");
  }

  const checkIfExists = fs.existsSync(
    `./tmp/extracted/${slug[0]}/produkt_klima_jahr_${slug[1]}_${slug[2]}_${slug[0]}.txt`
  );
  if (checkIfExists) {
    try {
      const rawData = fs.readFileSync(
        `./tmp/extracted/${slug[0]}/produkt_klima_jahr_${slug[1]}_${slug[2]}_${slug[0]}.txt`,
        "utf8"
      );

      const processedData = rawData
        .split("\n")
        .map((i) => i.split(/[\s,;]+/).filter((j) => j !== "" && j !== " "));

      res.json(processedData);
    } catch (error) {
      console.log(error.message);
    }

    return;
  }

  // TODO implement meta provider
  const fuck = await axios({
    url: `https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/annual/kl/historical/jahreswerte_KL_${slug[0]}_${slug[1]}_${slug[2]}_hist.zip`,

    headers: {
      Accept: "application/zip",
    },
    responseType: "arraybuffer",
  });

  const byteArray = new Uint8Array(fuck.data);

  var buffer = new Buffer.alloc(byteArray.length);

  for (var i = 0; i < byteArray.length; i++) {
    buffer.writeUInt8(byteArray[i], i);
  }

  fs.writeFileSync("test.zip", buffer);

  const zip = new StreamZip.async({ file: "./tmp/test.zip" });
  const entriesCount = await zip.entriesCount;

  const entries = await zip.entries();

  fs.mkdirSync(`../tmp/extracted/${slug[0]}`);
  await zip.extract(
    `produkt_klima_jahr_${slug[1]}_${slug[2]}_${slug[0]}.txt`,
    `./extracted/${slug[0]}`
  );

  const result =
    entries[`produkt_klima_jahr_${slug[1]}_${slug[2]}_${slug[0]}.txt`];

  // Do not forget to close the file once you're done
  await zip.close();
  fs.unlinkSync("./tmp/test.zip", buffer);

  try {
    const rawData = fs.readFileSync(
      `./tmp/extracted/${slug[0]}/produkt_klima_jahr_${slug[1]}_${slug[2]}_${slug[0]}.txt`,
      "utf8"
    );

    const processedData = rawData
      .split("\n")
      .map((i) => i.split(/[\s,;]+/).filter((j) => j !== "" && j !== " "));

    res.json(processedData);
  } catch (error) {
    console.log(error.message);
  }
};
