import React, { useState } from "react";
import styled from "styled-components/macro";
import { AiOutlineMore } from "react-icons/ai";

const WeatherDaily = ({
  weatherData: {
    temp,
    wind_speed,
    humidity,
    feels_like,
    clouds,
    sunset,
    sunrise,
    dt,
    weather,
    rain,
    pressure,
    uvi,
    dew_point,
    pop,
    wind_deg,
  },
}) => {
  const [temperatureBox, setTemperatureBox] = useState(false);
  const [feelsLikeBox, setFeelsLikeBox] = useState(false);
  const [moreBox, setMoreBox] = useState(false);

  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const dailyTime = new Date(dt * 1000).toLocaleDateString();
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const handleMore = () => {
    setMoreBox((state) => !state);
  };

  return (
    <WeatherBox>
      <Top>
        <Time>
          <span>{dailyTime}</span>
        </Time>
        <img src={icon} alt="weather icon" />
      </Top>
      <Temps>
        <Temp
          onMouseEnter={() => setTemperatureBox(true)}
          onMouseLeave={() => setTemperatureBox(false)}
        >
          {temp.day.toFixed(2)} °C
        </Temp>
        <Feels
          onMouseEnter={() => setFeelsLikeBox(true)}
          onMouseLeave={() => setFeelsLikeBox(false)}
        >
          <span>Odczuwalna</span> {feels_like.day}
          °C
        </Feels>
      </Temps>
      <Bottom>
        <Left>
          <Wind>
            <span>Wiatr: {(wind_speed * 1.609344).toFixed(1)}km/h </span>
          </Wind>
          <Humidity>
            <span>Wilgotność: {humidity}%</span>
          </Humidity>
          <Rain>
            <span>Opady: {rain === undefined ? 0 : rain}mm/12h</span>
          </Rain>
        </Left>

        <Right>
          <Clouds>
            <span>Chmury: {clouds}% </span>
          </Clouds>
          <Sunrise>
            <span>Wschód: {sunriseTime}</span>
          </Sunrise>
          <Sunset>
            <span>Zachód: {sunsetTime}</span>
          </Sunset>
        </Right>
        <More onClick={handleMore}>
          <AiOutlineMore />
        </More>
      </Bottom>
      {temperatureBox === true ? (
        <Box>
          <span>Max: {temp.max} °C</span>
          <span>Min: {temp.min} °C</span>
          <span>Poranek: {temp.morn} °C</span>
          <span>Dzień: {temp.day} °C</span>
          <span>Wieczór: {temp.eve} °C</span>
          <span>Noc: {temp.night} °C</span>
        </Box>
      ) : null}
      {feelsLikeBox === true ? (
        <Box>
          <span>Poranek: {feels_like.morn} °C</span>
          <span>Dzień: {feels_like.day} °C</span>
          <span>Wieczór: {feels_like.eve} °C</span>
          <span>Noc: {feels_like.night} °C</span>
        </Box>
      ) : null}
      {moreBox === true ? (
        <Box>
          <span>Ciśnienie: {pressure} hPa</span>
          <span>Uvi: {uvi} </span>
          <span>Punkt rosy: {dew_point} °C</span>
          <span>Prawdopodobieństwo opadów: {pop} %</span>
          <span>Kierunek wiatru: {wind_deg} °</span>
        </Box>
      ) : null}
    </WeatherBox>
  );
};

export default WeatherDaily;

const WeatherBox = styled.div`
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.75);
  padding: 5px;
  margin: 5px;
  overflow: hidden;
`;

const Top = styled.div`
  text-align: center;
`;
const Time = styled.div``;
const Temps = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1% 0;
`;
const Temp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  margin: 0 0 3% 0;
  cursor: default;
`;
const Feels = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: default;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 13px;
`;
const Left = styled.div``;
const Wind = styled.div``;
const Humidity = styled.div``;
const Right = styled.div``;
const Clouds = styled.div``;

const Rain = styled.div``;
const Sunrise = styled.div``;
const Sunset = styled.div``;
const More = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
`;

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background-color: rgb(239, 241, 245);
  font-size: 15px;
`;
