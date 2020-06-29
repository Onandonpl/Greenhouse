import React from "react";
import { Line } from "react-chartjs-2";

const Chart = (props) => {
  let temperature = props.hourly.map(function (e) {
    return e.temp;
  });
  let temperatureFeels = props.hourly.map(function (e) {
    return e.feels_like;
  });

  let time = props.hourly.map(function (e) {
    let date = new Date(e.dt * 1000).toLocaleString();
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
    <div className="chart">
      <Line
        data={state}
        width={1000}
        height={270}
        options={{
          responsive: true,
          legend: {
            display: true,
            position: "right",
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
                gridLines: {
                  color: "rgba(255, 255, 255, 0.2)",
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

export default Chart;
