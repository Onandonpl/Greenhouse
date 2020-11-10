const functions = require("firebase-functions");
const { firestore, admin } = require("../admin");

module.exports = functions.pubsub.topic("iot-topic").onPublish((message) => {
  const deviceId = message.attributes.deviceId;
  const deviceRef = firestore.doc(`devices-history/${deviceId}`);
  let list = [];
  deviceRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const statesData = doc.data();

        list = statesData.state;
        console.log("lista", list);
        console.log("data", statesData);

        deviceRef.update({
          state: [
            ...list,
            { state: message.json, timestamp: admin.firestore.Timestamp.now() },
          ],
        });
      } else {
        deviceRef.set({
          state: [message.json],
          timestamp: admin.firestore.Timestamp.now(),
        });
      }
      return null;
    })
    .catch((error) => console.log("Document error:", error));
});
