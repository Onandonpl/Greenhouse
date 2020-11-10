import React from "react";
import styled from "styled-components/macro";
import { EatLoading } from "react-loadingg";

const HistoryData = ({ deviceData }) => {
  if (deviceData === null || deviceData === undefined) {
    return (
      <HistoryDataContainer>
        <EatLoading />
      </HistoryDataContainer>
    );
  }
  const tempArr = deviceData.state.map((item) => item.state.temperature);
  const humidArr = deviceData.state.map((item) => item.state.humidity);

  const arrayMin = (data) =>
    data.reduce((prev, curr) => (prev < curr ? prev : curr));

  const arrayMax = (data) =>
    data.reduce((prev, curr) => (prev > curr ? prev : curr));

  const average = (data) =>
    data.reduce((prev, curr) => prev + curr) / data.length;

  return (
    <HistoryDataContainer>
      <Switch color="rgb(252, 99, 73)">
        <p>MinTemp</p>
        {arrayMin(tempArr).toFixed(2)}°C
      </Switch>
      <Switch color="rgb(252, 99, 73)">
        <p>MaxTemp</p>
        {arrayMax(tempArr).toFixed(2)}°C
      </Switch>{" "}
      <Switch color="rgb(252, 99, 73)">
        <p>ŚredTemp</p>
        {average(tempArr).toFixed(2)}°C
      </Switch>
      <Switch color=" rgb(94, 156, 242)">
        <p>MinWilg</p>
        {arrayMin(humidArr).toFixed(2)}%
      </Switch>
      <Switch color=" rgb(94, 156, 242)">
        <p>MaxWilg</p>
        {arrayMax(humidArr).toFixed(2)}%
      </Switch>
      <Switch color=" rgb(94, 156, 242)">
        <p>ŚredWilg</p>
        {average(humidArr).toFixed(2)}%
      </Switch>
    </HistoryDataContainer>
  );
};

export default HistoryData;
const HistoryDataContainer = styled.div`
  position: relative;
  min-height: 240px;
  height: 100%;
  min-width: 100px;
  width: 100%;
  max-width: 300px;
  background-color: rgb(57, 58, 62);
  padding: 5px 10px;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 5px 5px;
`;
const Switch = styled.div`
  position: relative;
  width: 70px;
  height: 40.41px;
  background-color: ${({ state }) =>
    state === 1 ? "green" : "rgb(33, 35, 47)"};

  margin: 28.87px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 12px -1px ${({ state }) => (state === 1 ? "green" : "rgb(33, 35, 47)")};
  cursor: pointer;
  font-size: 10px;
  color: ${(props) => props.color};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    border-left: 35px solid transparent;
    border-right: 35px solid transparent;
  }
  &:before {
    bottom: 100%;
    border-bottom: 20.21px solid
      ${({ state }) => (state === 1 ? "green" : "rgb(33, 35, 47)")};
  }

  &:after {
    left: 0;
    top: 100%;
    width: 0;
    border-top: 20.21px solid
      ${({ state }) => (state === 1 ? "green" : "rgb(33, 35, 47)")};
  }
`;
