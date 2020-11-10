load("api_aws.js");
load("api_azure.js");
load("api_dash.js");
load("api_events.js");
load("api_gcp.js");
load("api_gpio.js");
load("api_shadow.js");
load("api_sys.js");
load("api_watson.js");
load("api_config.js");
load("api_dht.js");
load("api_timer.js");
load("api_mqtt.js");

let topicEvents = "/devices/" + Cfg.get("device.id") + "/events";
let pin = 22;
let dht = DHT.create(pin, DHT.DHT22);

Timer.set(
  600000,
  true,
  function () {
    let msg = JSON.stringify({
      temperature: dht.getTemp(),
      humidity: dht.getHumidity(),
    });
    print("send", msg);
    MQTT.pub(topicEvents, msg, 1);
  },
  null
);

let topicConfig = "/devices/" + Cfg.get("device.id") + "/config";

let fan = 33;
GPIO.set_mode(fan, GPIO.MODE_OUTPUT);
GPIO.setup_output(fan, 1);

let light = 25;
GPIO.set_mode(light, GPIO.MODE_OUTPUT);
GPIO.setup_output(light, 1);

let water = 26;
GPIO.set_mode(water, GPIO.MODE_OUTPUT);
GPIO.setup_output(water, 1);

let maxTemp = 25;
let fanState = 1;

MQTT.sub(
  topicConfig,
  function (conn, topicConfig, msg) {
    let obj = JSON.parse(msg);
    maxTemp = obj.maxTemp;
    fanState = obj.fan;

    GPIO.write(fan, obj.fan);
    GPIO.write(light, obj.light);
    GPIO.write(water, obj.water);
  },
  null
);

Timer.set(
  10000,
  true,
  function () {
    if (dht.getTemp() > maxTemp || fanState === 0) {
      GPIO.write(fan, 0);
    } else {
      GPIO.write(fan, 1);
    }
    print("temp", dht.getTemp());
  },
  null
);
