const functions = require("firebase-functions");
const { google } = require("googleapis");

updateConfig = (client, deviceId, config) => {
  const projectId = process.env.GCLOUD_PROJECT;
  const parentName = `projects/${projectId}/locations/europe-west1`;
  const registryName = `${parentName}/registries/iot-registry`;
  const request = {
    name: `${registryName}/devices/${deviceId}`,
    binaryData: Buffer.from(JSON.stringify(config)).toString("base64"),
  };
  return client.projects.locations.registries.devices.modifyCloudToDeviceConfig(
    request,
    (err, data) => {
      if (err) {
        console.log(`sendDataToDevice ERR ${deviceId} : ${err}`);
      } else {
        console.log(`Configured device ${deviceId} : ${data}`);
      }
    }
  );
};

module.exports = functions.firestore
  .document("device-configs/{device}")
  .onWrite(async (change, context) => {
    const deviceId = context.params.device;

    if (!change.after.exists) {
      console.log(`Device configuration removed for ${deviceId}`);
      return;
    }
    const config = change.after.data();

    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const client = google.cloudiot({
      version: "v1",
      auth: auth,
    });

    console.log(`Sending configuration for ${deviceId}`);
    try {
      const result = await updateConfig(client, deviceId, config.value);
    } catch (error) {
      console.error(
        `Unable to send IoT Core configuration for ${deviceId}`,
        error
      );
    }
  });
