const functions = require("firebase-functions");
const { firestore, admin } = require("../admin");

module.exports = functions.pubsub.topic("iot-topic").onPublish((message) => {
  const deviceId = message.attributes.deviceId;
  const deviceRef = firestore.doc(`devices/${deviceId}`);

  deviceRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        deviceRef.update({
          state: message.json,
          timestamp: admin.firestore.Timestamp.now(),
        });
      } else {
        deviceRef.set(
          {
            state: message.json,
            timestamp: admin.firestore.Timestamp.now(),
          },
          { merge: true }
        );
      }
      return null;
    })
    .catch((error) => console.log("Document error:", error));
});
