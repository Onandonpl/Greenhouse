import React from "react";
import styled from "styled-components/macro";
import LiveData from "./dataRender/LiveData";
import HistoryData from "./dataRender/HistoryData";
import SensorSwitches from "./SensorSwitches";
import { useDeviceData } from "../../../hooks/useDeviceData";
import HistoryChart from "./charts/HistoryChart";

const Greenhouse = () => {
  const [deviceData] = useDeviceData();

  return (
    <GreenhouseContainer>
      <LiveData />
      <SensorSwitches />
      <HistoryData deviceData={deviceData}></HistoryData>
      <HistoryChart deviceData={deviceData} />
    </GreenhouseContainer>
  );
};

export default Greenhouse;
const GreenhouseContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(57, 58, 62);
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2.7rem 0;
`;
