import React, { useContext } from "react";
import styled from "styled-components/macro";
import { AuthContext } from "../../context/AuthContext";
import { firestore } from "../../firebaseHelpers/FirebaseConnector";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const AddPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { register, errors, handleSubmit, reset } = useForm();

  const sendPost = (data) => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("Observations")
      .add({ id: uuidv4(), title: data.title, content: data.content });
    reset();
  };

  return (
    <PostContent>
      <Title>Zapisz obserwacje</Title>
      <Form onSubmit={handleSubmit(sendPost)}>
        <Input
          name="title"
          type="text"
          placeholder="Tytuł"
          ref={register({ required: "Pole Tytuł jest wymagane." })}
        />
        <Textarea
          name="content"
          type="text"
          placeholder="Treść"
          ref={register({ required: "Pole Treść jest wymagane." })}
        />
        <ButtonSubmit type="submit" value="Zapisz"></ButtonSubmit>{" "}
        {errors.title && <ErrorBox>{errors.title.message}</ErrorBox>}{" "}
        {errors.content && <ErrorBox>{errors.content.message}</ErrorBox>}
      </Form>
    </PostContent>
  );
};

export default AddPost;
const PostContent = styled.div`
  min-width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgb(30, 31, 33);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;
const Title = styled.p`
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
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid rgb(22, 38, 51);
`;
const Textarea = styled.textarea`
  width: 60%;
  min-height: 100px;

  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid rgb(22, 38, 51);
`;
const ButtonSubmit = styled.input`
  width: 180px;
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
