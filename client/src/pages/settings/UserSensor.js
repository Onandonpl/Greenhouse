import React, { useContext } from "react";
import styled from "styled-components/macro";
import { AuthContext } from "../../context/AuthContext";
import { firestore } from "../../firebaseHelpers/FirebaseConnector";
import { useForm } from "react-hook-form";

const UserSensor = () => {
  const { currentUser } = useContext(AuthContext);
  const { register, errors, handleSubmit, reset } = useForm();

  const addSensor = (data) => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .update({ sensorID: data.sensorID });

    firestore
      .collection("devices")
      .doc(data.sensorID)
      .set({
        state: { humidity: 1, temperature: 1 },
        timestamp: 1,
      });

    firestore
      .collection("devices-history")
      .doc(data.sensorID)
      .set({
        state: [{ state: { humidity: 1, temperature: 1 }, timestamp: 1 }],
      });

    firestore
      .collection("device-configs")
      .doc(data.sensorID)
      .set({
        value: { fan: 1, light: 1, water: 1, maxTemp: 25 },
      });
    reset();
  };

  return (
    <UserSensorContent>
      <UserSensorTitle>ID czujnika</UserSensorTitle>
      <Form onSubmit={handleSubmit(addSensor)}>
        <Input
          name="sensorID"
          type="text"
          placeholder="SensorID"
          ref={register({ required: "Pole SensorID jest wymagane." })}
        />
        <ButtonSubmit type="submit" value="Aktualizuj"></ButtonSubmit>{" "}
        {errors.sensorID && <ErrorBox>{errors.sensorID.message}</ErrorBox>}
      </Form>
    </UserSensorContent>
  );
};

export default UserSensor;
const UserSensorContent = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgb(30, 31, 33);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;
const UserSensorTitle = styled.p`
  text-transform: uppercase;
  margin: 5px;
  color: white;
`;
const Form = styled.form`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
`;
const Input = styled.input`
  width: 80%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid rgb(22, 38, 51);
`;
const ButtonSubmit = styled.input`
  width: 60%;
  padding: 10px;
  margin: 10px;

  border-radius: 10px;
  background-color: rgb(0, 153, 70);
  border: none;
  color: white;
  cursor: pointer;
  transition: linear 0.1s;
  &:hover {
    background-color: rgb(15, 138, 119);
  }
  &:focus {
    background-color: rgb(15, 138, 119);
  }
`;
const ErrorBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: red;
`;
