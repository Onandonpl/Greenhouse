import React from "react";
import Chart from "../components/Chart";

const Slider = (props) => {
  if (props.data === undefined) {
    return <span>Loading...</span>;
  }
  const {
    temp,
    wind_speed,
    humidity,
    feels_like,
    clouds,
    weather,
    dt,
  } = props.data;
  const time = new Date(dt * 1000).toLocaleTimeString();

  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  return (
    <div className="slider__box">
      <div className="box">
        <div className="box__top">
          <div className="box__time">
            <span>{time}</span>
          </div>
          <img src={icon} alt="weather icon" />
        </div>
        <div className="box__temps">
          <div className="box__temp">{temp.toFixed()} °C</div>
          <div className="box__feels">
            <span>Odczuwalna</span> {feels_like}
            °C
          </div>
        </div>

        <div className="box__bottom">
          <div className="box__left">
            <div className="box__wind">
              <span>Wiatr: {(wind_speed * 1.609344).toFixed(1)}km/h </span>
            </div>
            <div className="box__humidity">
              <span>Wilgotność: {humidity}%</span>
            </div>
          </div>

          <div className="box__right">
            <div className="box__clouds">
              <span>Chmurki: {clouds}% </span>
            </div>
          </div>
        </div>
        <input
          className="slider"
          type="range"
          min={0}
          max={47}
          name="time"
          value={props.value}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
      </div>
      <Chart hourly={props.hourly} />
    </div>
  );
};
export default Slider;
