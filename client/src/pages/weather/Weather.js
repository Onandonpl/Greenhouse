import React from "react";
import { Helmet } from "react-helmet";
import { useWeather } from "../../hooks/useWeather";
import styled from "styled-components/macro";
import WeatherHourly from "./WeatherHourly";
import WeatherDaily from "./WeatherDaily";
import { WindMillLoading } from "react-loadingg";

const Weather = () => {
  const [weatherData] = useWeather();

  if (weatherData === null) {
    return <WindMillLoading />;
  }
  if (weatherData.message) {
    return <ErrorMessage>{weatherData.message}</ErrorMessage>;
  }
  const renderDaily = weatherData.daily.map((daily) => (
    <WeatherDaily key={daily.dt} weatherData={daily} />
  ));
  return (
    <WeatherContainer>
      <Helmet>
        <title>Pogoda</title>
      </Helmet>
      <WeatherHourly weatherData={weatherData.hourly}></WeatherHourly>
      <DailyList>{renderDaily}</DailyList>
    </WeatherContainer>
  );
};

export default Weather;
const WeatherContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgb(63, 66, 75);
  padding: 2.7rem 10px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.55);
`;
const DailyList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const ErrorMessage = styled.div`
  color: rgb(249, 96, 62);
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;
