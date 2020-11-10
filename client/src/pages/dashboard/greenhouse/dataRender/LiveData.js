import React from "react";
import styled from "styled-components/macro";
import { useLiveDeviceData } from "../../../../hooks/useLiveDeviceData";
import { EatLoading } from "react-loadingg";

const LiveData = () => {
  const [deviceLiveData] = useLiveDeviceData();

  if (deviceLiveData === null || deviceLiveData === undefined) {
    return (
      <LiveDataContainer>
        <EatLoading />
      </LiveDataContainer>
    );
  }

  const { temperature, humidity } = deviceLiveData.state;
  const { seconds } = deviceLiveData.timestamp;
  const dateObject = new Date(seconds * 1000);
  const hours = dateObject.getUTCHours() + 1;
  const minutes = dateObject.getUTCMinutes();

  return (
    <LiveDataContainer>
      <Title>Czujnik</Title>
      <DataContainer>
        <Hex color="rgb(252, 99, 73)">{temperature.toFixed(2)}°C</Hex>
        <Hex color=" rgb(94, 156, 242)">{humidity.toFixed(2)}%</Hex>
      </DataContainer>
      <Time>
        Ostatni odczyt - {hours}:{minutes}
      </Time>
    </LiveDataContainer>
  );
};

export default LiveData;

const LiveDataContainer = styled.div`
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 5px 5px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: white;
`;

const DataContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const Hex = styled.div`
  position: relative;
  width: 100px;
  height: 57.74px;
  background-color: rgb(33, 35, 47);
  margin: 28.87px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.75);
  color: ${(props) => props.color};
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
  }
  &:before {
    bottom: 100%;
    border-bottom: 28.87px solid rgb(33, 35, 47);
  }

  &:after {
    left: 0;
    top: 100%;
    width: 0;
    border-top: 28.87px solid rgb(33, 35, 47);
  }
`;

const Time = styled.div`
  color: white;
  font-size: 15px;
  letter-spacing: 1.5px;
`;
