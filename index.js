const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoUtil = require("./db");
/////////////////////////////////////////////////////////
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.listen(port);
/////////////////////////////////////////////////////////////////////
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");
////////////////////////////////////
onConnected = () => {
  client.subscribe("esp/greenhouse/DHT/temmperature");
  client.subscribe("esp/greenhouse/DHT/humidity");
};
client.on("connect", onConnected);
//////////////////////
client.on("message", (topic, message) => {
  if (topic === "esp/greenhouse/DHT/temmperature") {
    temperature = message.toString();
  }
  if (topic === "esp/greenhouse/DHT/humidity") {
    humidity = message.toString();
  }
  mongoUtil.connectToServer(() => {
    const db = mongoUtil.getDb().collection("Sensors");
    db.insertOne({
      data: new Date().toLocaleString("pl-PL", {
        hour12: false,
        timeZone: "Europe/warsaw",
      }),
      temperature,
      humidity,
    });
  });
});
//////////////////////////////////
app.get("/sensors", (req, res) => {
  mongoUtil.connectToServer((err) => {
    if (err) console.log(err);
    const db = mongoUtil.getDb();
    db.collection("Sensors")
      .find()
      .toArray()
      .then((results) => {
        res.json(results);
      })
      .catch((error) => console.error(error));
  });
});
////////////////////////////////////////////////////////////////////////////////
