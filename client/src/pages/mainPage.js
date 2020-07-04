import React, { Component } from "react";
import Temperature from "../components/Temperature";
import Humidity from "../components/Humidity";
import Daily from "../components/Daily";
import Current from "../components/Current";
import Slider from "../components/Slider";
import HistoryChart from "../components/HistoryChart";
const mqtt = require("mqtt");

var options = {
  protocol: "mqtts",
  qos: 0,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};
const client = mqtt.connect("mqtt://test.mosquitto.org:8081", options);

class mainPage extends Component {
  state = {
    temperature: "Loading",
    humidity: "Loading",
    sensors: [],
    value: 0,
    dataCurrent: [],
    dataHourly: [],
    dataDaily: [],
  };

  componentDidMount() {
    client.subscribe("esp/greenhouse/ONOF/back");
    client.subscribe("esp/greenhouse/DHT/temmperature");
    client.subscribe("esp/greenhouse/DHT/humidity");

    client.on("message", (topic, message) => {
      if (topic === "esp/greenhouse/DHT/temmperature")
        this.setState({
          temperature: message.toString(),
        });

      if (topic === "esp/greenhouse/DHT/humidity")
        this.setState({
          humidity: message.toString(),
        });
      if (topic === "esp/greenhouse/ONOF/back") console.log(message.toString());
    });
    const api = "84fa4b467e05b36efdb43de007e33ba1";

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=54.379283704009076&lon=18.388554336226687&exclude=minutely&units=metric&appid=${api}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataDaily: data.daily,
          dataCurrent: data.current,
          dataHourly: data.hourly,
        });
      });

    fetch(`https://onandon.herokuapp.com/sensors`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          sensors: data.slice(Math.max(data.length - 8640, 0)),
        });
      });
  }
  ///////////////////
  handleOn = () => {
    client.publish("esp/greenhouse/ONOF", "1");
  };
  handleOff = () => {
    client.publish("esp/greenhouse/ONOF", "0");
  };

  ///////////////////
  handleChange = (e) => {
    this.setState({
      value: parseInt(e.target.value),
    });
  };
  /////////////////
  render() {
    let renderDaily;
    if (this.state.dataDaily.length > 0) {
      renderDaily = this.state.dataDaily.map((daily) => (
        <Daily key={daily.dt} daily={daily} />
      ));
    }
    const {
      temperature,
      humidity,
      dataCurrent,
      dataHourly,
      value,
      sensors,
    } = this.state;
    return (
      <div className="dashboard">
        <div className="dashboard__controller ">
          <div className="dashboard__current ">
            <Current data={dataCurrent} />
          </div>
          <div className="dashboard__sensors box">
            <div className="dashboard__sensors--place">
              <div className="outdoor">Zewnętrzna</div>
              <div className="measurments">
                <Temperature temperature={temperature} />
                <Humidity humidity={humidity} />
              </div>
            </div>
            <div className="dashboard__sensors--place">
              <div className="indoor">Wewnętrzna</div>
              <div className="measurments">
                <Temperature temperature={temperature} />
                <Humidity humidity={humidity} />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__slider">
          <Slider
            data={dataHourly[value]}
            hourly={dataHourly}
            value={value}
            onChange={this.handleChange}
          ></Slider>
        </div>

        <div className="dashboard__daily">{renderDaily}</div>
        <div className="dashboard__history">
          <HistoryChart sensors={sensors} />
        </div>
      </div>
    );
  }
}

export default mainPage;
