import React from "react";
import { Line } from "react-chartjs-2";

const WeatherChart = ({ weatherData, handleChart }) => {
  const temperature = weatherData.map((data) => {
    return data.temp;
  });

  const temperatureFeels = weatherData.map((data) => {
    return data.feels_like;
  });

  const time = weatherData.map((data) => {
    const date = new Date(data.dt * 1000).toLocaleString();
    return date;
  });

  const state = {
    labels: time,
    datasets: [
      {
        label: "Właściwa",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(255, 51, 0,1)",
        fontColor: "rgba(255, 255, 255, 1)",

        borderWidth: 1,
        data: temperature,
      },
      {
        label: "Odczuwalna",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(255, 204, 0,1)",
        borderWidth: 1,
        data: temperatureFeels,
      },
    ],
  };
  return (
    <div style={{ cursor: "pointer" }} className="chart" onClick={handleChart}>
      <Line
        data={state}
        width={1000}
        height={320}
        options={{
          responsive: true,
          legend: {
            display: true,
            position: "right",
            labels: {
              fontColor: "white",
            },
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Prognoza na następne 48H",
                },
                ticks: {
                  display: false,
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "( °C )",
                },
                ticks: {
                  fontColor: "rgba(255, 255, 255, 1)",
                },
                gridLines: {
                  color: "rgba(255, 255, 255, 1)",
                },
              },
            ],
          },
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default WeatherChart;
