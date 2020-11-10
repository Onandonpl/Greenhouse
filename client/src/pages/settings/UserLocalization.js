import React, { useContext } from "react";
import styled from "styled-components/macro";
import { AuthContext } from "../../context/AuthContext";
import { firestore } from "../../firebaseHelpers/FirebaseConnector";
import { useForm } from "react-hook-form";

const UserLocalization = () => {
  const { currentUser } = useContext(AuthContext);
  const { register, errors, handleSubmit, reset } = useForm();

  const updateUserLocalization = (data) => {
    firestore.collection("users").doc(currentUser.uid).update({
      longitude: data.longitude,
      latitude: data.latitude,
    });
    reset();
  };

  return (
    <UserLocalizationContainer>
      <UserLocalizationTitle>Lokalizacja</UserLocalizationTitle>
      <Form onSubmit={handleSubmit(updateUserLocalization)}>
        <Input
          name="longitude"
          type="number"
          placeholder="Długość geograficzna"
          step="0.1"
          ref={register({
            required: "Pole Długość geograficzna jest wymagane.",
            pattern: {
              message: "Błędna długość geograficzna.",
            },
          })}
        />
        <Input
          name="latitude"
          type="number"
          placeholder="Szerokość geograficzna"
          step="0.1"
          ref={register({
            required: "Pole Szerokość geograficzna jest wymagane.",
            pattern: {
              message: "Błędna szerokość geograficzna.",
            },
          })}
        />
        <ButtonSubmit type="submit" value="Aktualizuj"></ButtonSubmit>
        {errors.longitude && <ErrorBox>{errors.longitude.message}</ErrorBox>}
        {errors.latitude && <ErrorBox>{errors.latitude.message}</ErrorBox>}
      </Form>
    </UserLocalizationContainer>
  );
};

export default UserLocalization;
const UserLocalizationContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgb(30, 31, 33);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  margin: 2vh 0;
`;
const UserLocalizationTitle = styled.p`
  text-transform: uppercase;
  margin: 5px;
  color: white;
`;
const Form = styled.form`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
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
