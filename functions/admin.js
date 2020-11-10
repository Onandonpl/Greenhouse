const admin = require("firebase-admin");
const app = admin.initializeApp();

const firestore = app.firestore();
const auth = app.auth();

firestore.settings({ timestampsInSnapshots: true });

module.exports = {
  auth,
  firestore,
  admin,
};
