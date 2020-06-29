var mongoUtil = require("./db");

module.exports = {
  getSensors: mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDb();
    db.collection("Sensors")
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
        res.json(results);
      })
      .catch((error) => console.error(error));
  }),
};
