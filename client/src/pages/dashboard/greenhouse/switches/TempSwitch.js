import React from "react";
import styled from "styled-components/macro";
import { useForm } from "react-hook-form";
import { firestore } from "../../../../firebaseHelpers/FirebaseConnector";

const TempSwitch = ({ temp, sensorID }) => {
  const { register, handleSubmit, reset } = useForm();
  const handleTemp = (data) => {
    firestore
      .collection("device-configs")
      .doc(sensorID)
      .update({
        "value.maxTemp": parseInt(data.temp),
      });
    reset();
  };
  return (
    <Switch>
      <Form onSubmit={handleSubmit(handleTemp)}>
        <Input
          name="temp"
          type="text"
          placeholder={`${temp}°C`}
          pattern="\d*"
          ref={register({ required: "Pole Temp jest wymagane." })}
        />
        <ButtonSubmit type="submit" value=""></ButtonSubmit>
      </Form>
    </Switch>
  );
};

export default TempSwitch;
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
  font-size: 8px;
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

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
  background-color: transparent;
`;
const Input = styled.input`
  width: 100%;
  color: white;
  text-align: center;
  border: none;
  background-color: transparent;
  ::placeholder {
    color: rgb(252, 99, 73);
  }
`;
const ButtonSubmit = styled.input`
  visibility: hidden;
  position: fixed;
  top: -9000px;
`;
