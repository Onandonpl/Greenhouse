import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../firebaseHelpers/FirebaseConnector";

const Login = () => {
  const { register, errors, handleSubmit } = useForm();
  const [signUpError, setSignUpError] = useState("");

  const onSubmit = (data) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) =>
        firestore.collection("users").doc(resp.user.uid).set({
          sensorID: "none",
          longitude: 17.75012,
          latitude: 54.53921,
        })
      )
      .catch((error) => {
        setSignUpError(error);
      });
  };

  return (
    <SignUpContainer>
      <Helmet>
        <title>Rejestracja</title>
      </Helmet>

      <SignUpTitle>Onandoniot</SignUpTitle>
      <SignUpSubTitle>Rejestracja</SignUpSubTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          placeholder="Email"
          ref={register({
            required: "Pole Email jest wymagane.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Błędny email.",
            },
          })}
        />
        <Input
          name="password"
          type="password"
          placeholder="Hasło"
          ref={register({
            required: "Pole Hasło jest wymagane.",
            minLength: {
              value: 6,
              message: "Hasło musi mieć conajmniej 6 znaków.",
            },
          })}
        />
        <ButtonSubmit type="submit" value="Zarejestruj"></ButtonSubmit>{" "}
        {signUpError.message && (
          <ErrorBox>Błąd podczas rejestracji, użytkownik istnieje</ErrorBox>
        )}
        {errors.email && <ErrorBox>{errors.email.message}</ErrorBox>}
        {errors.password && <ErrorBox>{errors.password.message}</ErrorBox>}
      </Form>
      <RedirectedButton to="/login">Masz konto ?</RedirectedButton>
    </SignUpContainer>
  );
};

export default Login;

const SignUpContainer = styled.div`
  min-height: 400px;
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgb(30, 31, 33);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;
const SignUpTitle = styled.h1`
  text-transform: uppercase;
  margin: 30px 0 60px 0;
  color: white;
`;
const SignUpSubTitle = styled.p`
  text-transform: uppercase;
  color: white;
`;

const RedirectedButton = styled(Link)`
  text-transform: uppercase;
  margin: 30px;
  font-size: 12px;
  color: gray;
  text-decoration: none;
  transition: linear 0.1s;

  &:hover {
    color: lightgray;
  }
  &:focus {
    color: lightgray;
  }
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
