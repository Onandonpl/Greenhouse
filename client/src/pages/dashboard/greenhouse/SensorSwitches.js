import React from "react";
import styled from "styled-components/macro";
import { useUserData } from "../../../hooks/useUserData";
import { useDeviceConfigs } from "../../../hooks/useDeviceConfigs";
import { EatLoading } from "react-loadingg";
import LightSwitch from "./switches/LightSwitch";
import FanSwitch from "./switches/FanSwitch";
import WaterSwitch from "./switches/WaterSwitch";
import TempSwitch from "./switches/TempSwitch";

const SensorSwitches = () => {
  const [userData] = useUserData();
  const [deviceConfigs] = useDeviceConfigs();
  
  if (
    userData === null ||
    deviceConfigs === null ||
    userData === undefined ||
    deviceConfigs === undefined
  ) {
    return (
      <SensorSwitchesContainer>
        <EatLoading />
      </SensorSwitchesContainer>
    );
  }
  const { light, fan, water, maxTemp } = deviceConfigs.value;

  return (
    <SensorSwitchesContainer>
      <Title>Przełączniki</Title>
      <SwitchesContainer>
        <LightSwitch light={light} sensorID={userData.sensorID}></LightSwitch>
        <FanSwitch fan={fan} sensorID={userData.sensorID}></FanSwitch>
        <WaterSwitch water={water} sensorID={userData.sensorID}></WaterSwitch>
        <TempSwitch temp={maxTemp} sensorID={userData.sensorID}></TempSwitch>
      </SwitchesContainer>
    </SensorSwitchesContainer>
  );
};

export default SensorSwitches;
const SensorSwitchesContainer = styled.div`
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 5px 5px;
`;
const SwitchesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2`
  font-size: 20px;
  color: white;
`;
