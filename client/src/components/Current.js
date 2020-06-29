import React from "react";

const Current = (props) => {
  const {
    temp,
    wind_speed,
    humidity,
    feels_like,
    clouds,
    sunset,
    sunrise,
    weather,
    rain,
  } = props.data;
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();

  if (!weather || !rain["1h"]) {
    return <span>Loading...</span>;
  }
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  return (
    <div className="current__box">
      <div className="box">
        <div className="box__top">
          <div className="box__time">
            <span>AKTUALNA</span>
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
              <span>Wiatr:{(wind_speed * 1.609344).toFixed(1)}km/h </span>
            </div>
            <div className="box__humidity">
              <span>Wilgotność: {humidity}%</span>
            </div>
            <div className="box__rain">
              <span>Opady: {rain === undefined ? 0 : rain["1h"]} mm/h</span>
            </div>
          </div>

          <div className="box__right">
            <div className="box__clouds">
              <span>Chmurki: {clouds}% </span>
            </div>
            <div className="box__sunrise">
              <span>Wschód: {sunriseTime}</span>
            </div>
            <div className="box__sunset">
              <span>Zachód: {sunsetTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Current;
