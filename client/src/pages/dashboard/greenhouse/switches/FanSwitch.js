import React from "react";
import styled from "styled-components/macro";
import { firestore } from "../../../../firebaseHelpers/FirebaseConnector";

const FanSwitch = ({ fan, sensorID }) => {
  const handleFan = () => {
    if (fan === 1) {
      firestore.collection("device-configs").doc(sensorID).update({
        "value.fan": 0,
      });
    }
    if (fan === 0) {
      firestore.collection("device-configs").doc(sensorID).update({
        "value.fan": 1,
      });
    }
  };
  return (
    <Switch color="white" onClick={handleFan} state={fan}>
      Wentylacja
    </Switch>
  );
};

export default FanSwitch;
const Switch = styled.div`
  position: relative;
  width: 70px; 
  height: 40.41px;
  background-color: ${({ state }) =>
    state === 0 ? "green" : "rgb(33, 35, 47)"};

  margin: 28.87px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 12px -1px ${({ state }) => (state === 0 ? "green" : "rgb(33, 35, 47)")};
  cursor: pointer;
  font-size: 10px;
  color: ${(props) => props.color};

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
      ${({ state }) => (state === 0 ? "green" : "rgb(33, 35, 47)")};
  }

  &:after {
    left: 0;
    top: 100%;
    width: 0;
    border-top: 20.21px solid
      ${({ state }) => (state === 0 ? "green" : "rgb(33, 35, 47)")};
  }
`;

