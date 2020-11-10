import React, { useState } from "react";
import styled from "styled-components/macro";
import { AiOutlineLineChart, AiOutlineMore } from "react-icons/ai";
import WeatherChart from "./WeatherChart";

const WeatherHourly = ({ weatherData }) => {
  const [value, setValue] = useState(0);
  const {
    temp,
    wind_speed,
    humidity,
    feels_like,
    clouds,
    weather,
    dt,
    pressure,
    dew_point,
    pop,
    wind_deg,
    visibility,
  } = weatherData[value];

  const [isShownChart, setIsShownChart] = useState(false);
  const [moreBox, setMoreBox] = useState(false);

  const handleValue = (e) => {
    setValue(parseInt(e.target.value));
  };
  const handleChart = () => setIsShownChart((state) => !state);
  const handleMore = () => {
    setMoreBox((state) => !state);
  };

  const time = new Date(dt * 1000).toLocaleTimeString();
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <WeatherBox>
      <WeatherRange
        type="range"
        min={0}
        max={47}
        name="time"
        value={value}
        onChange={(e) => {
          handleValue(e);
        }}
      />
      <Top>
        <Time>
          <span>{time}</span>
        </Time>
        <img src={icon} alt="weather icon" />
      </Top>{" "}
      <Temps>
        <Temp>{temp.toFixed()} °C</Temp>
        <Feels>
          <span>Odczuwalna</span> {feels_like}
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
        </Left>
        <Right>
          <Clouds>
            <span>Chmury: {clouds}% </span>
          </Clouds>
          <ChartButton onClick={handleChart}>
            <p>Wykres:</p>
            <AiOutlineLineChart />
          </ChartButton>
        </Right>
        <More onClick={handleMore}>
          <AiOutlineMore />
        </More>
      </Bottom>
      {isShownChart && (
        <WeatherChartBox>
          <WeatherChart weatherData={weatherData} handleChart={handleChart} />
        </WeatherChartBox>
      )}
      {moreBox === true ? (
        <Box>
          <span>Ciśnienie: {pressure} hPa</span>
          <span>Widoczność: {visibility} m</span>
          <span>Punkt rosy: {dew_point} °C</span>
          <span>Prawdopodobieństwo opadów: {pop} %</span>
          <span>Kierunek wiatru: {wind_deg} °</span>
        </Box>
      ) : null}
    </WeatherBox>
  );
};

export default WeatherHourly;

const WeatherBox = styled.div`
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.75);
  padding: 5px;
  margin: 5px 0;
`;
const ChartButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin-right: 5px;
  }
`;
const WeatherRange = styled.input`
  width: 50%;
  cursor: pointer;
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
  font-size: 35px;
  margin: 0 0 3% 0;
`;
const Feels = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
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

const WeatherChartBox = styled.div`
  position: fixed;
  z-index: 10;
  top: 2.7rem;
  right: 0;
  width: 100%;
  background-color: rgb(30, 31, 33);
`;
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
