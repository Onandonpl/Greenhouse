import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components/macro";
import { useForm } from "react-hook-form";

const UserPassword = () => {
  const { currentUser } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const { register, errors, handleSubmit, reset } = useForm();

  const updatePassword = (data) => {
    currentUser
      .updatePassword(data.userPassword)
      .then(() => {
        setPasswordError("Successful");
      })
      .catch((error) => {
        setPasswordError(error.message);
      });
    reset();
  };
  return (
    <UserPasswordContent>
      <UserPasswordTitle>Zmień hasło</UserPasswordTitle>
      <Form onSubmit={handleSubmit(updatePassword)}>
        <Input
          name="userPassword"
          type="password"
          placeholder="Nowe hasło"
          ref={register({ required: "Pole Stare hasło jest wymagane." })}
        />
        <ButtonSubmit type="submit" value="Zmień"></ButtonSubmit>{" "}
        {passwordError.message && (
          <ErrorBox>Błąd podczas zmiany hasła</ErrorBox>
        )}
        {errors.userPassword && (
          <ErrorBox>{errors.userPassword.message}</ErrorBox>
        )}
      </Form>
      <ErrorBox>{passwordError}</ErrorBox>
    </UserPasswordContent>
  );
};

export default UserPassword;
const UserPasswordContent = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgb(30, 31, 33);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;
const UserPasswordTitle = styled.p`
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
