import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components/macro";
import { EatLoading } from "react-loadingg";

const HistoryChart = ({ deviceData, handleChart }) => {
  if (deviceData === null || deviceData === undefined) {
    return (
      <ChartContainer>
        <EatLoading />
      </ChartContainer>
    );
  }
  const temperature = deviceData.state.map((item) => {
    return item.state.temperature.toFixed(2);
  });
  const humidity = deviceData.state.map((item) => {
    return item.state.humidity.toFixed(2);
  });

  const time = deviceData.state.map((data) => {
    const date = new Date(data.timestamp.seconds * 1000).toLocaleString();
    return date;
  });

  const state = {
    labels: time,
    datasets: [
      {
        label: "Temperatura °C",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(252, 99, 73)",
        borderColor: "rgb(252, 99, 73)",
        fontColor: "rgba(255, 255, 255, 1)",

        borderWidth: 1,
        data: temperature,
      },
      {
        label: "Wilgotność %",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgb(94, 156, 242)",
        borderWidth: 1,
        data: humidity,
      },
    ],
  };
  return (
    <ChartContainer
      style={{ cursor: "pointer" }}
      className="chart"
      onClick={handleChart}
    >
      <Line
        data={state}
        width={1000}
        height={320}
        options={{
          responsive: true,
          legend: {
            display: false,
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
    </ChartContainer>
  );
};

export default HistoryChart;
const ChartContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: 300px;
  min-width: 290px;
  width: 100%;
  max-width: 1000px;
  background-color: rgb(57, 58, 62);
  padding: 5px 10px;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 5px 5px;
`;
