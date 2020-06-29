import React from "react";
import { Line } from "react-chartjs-2";

const HistoryChart = (props) => {
  if (props.sensors.length === 0) {
    return <span>Loading...</span>;
  }
  let temperature = props.sensors.map(function (e) {
    return e.temperature;
  });
  let humidity = props.sensors.map(function (e) {
    return e.humidity;
  });

  let time = props.sensors.map(function (e) {
    return e.data;
  });

  const state = {
    labels: time,
    datasets: [
      {
        label: "Temperatura °C",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(255, 51, 0,1)",
        borderWidth: 1,
        data: temperature,
      },
      {
        label: "Wilgotność %",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(255, 204, 0,1)",
        borderWidth: 1,
        data: humidity,
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
          elements: {
            point: {
              radius: 1,
            },
          },
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
                  labelString: "Odczyt ostatnie 24/H",
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
                ticks: {
                  max: 100,
                  min: -30,
                  stepSize: 0.1,
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

export default HistoryChart;
