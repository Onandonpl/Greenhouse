const MongoClient = require("mongodb").MongoClient;
const dbConnect =
  "mongodb+srv://mechu:mechu@greenhouse-082is.mongodb.net/greenhouse?retryWrites=true&w=majority";

let _db;

const connectToServer = (callback) => {
  MongoClient.connect(
    dbConnect,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      _db = client.db("esp");
      return callback(err);
    }
  );
};
const getDb = () => {
  return _db;
};

module.exports = { connectToServer, getDb };
