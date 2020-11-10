import React, { useContext } from "react";
import EdiText from "react-editext";
import styled from "styled-components/macro";
import { firestore } from "../../firebaseHelpers/FirebaseConnector";
import { AuthContext } from "../../context/AuthContext";

import { AiOutlineDelete } from "react-icons/ai";
const Post = ({ title, content, id }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSaveTitle = (val) => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("Observations")
      .doc(id)
      .update({ title: val });
  };

  const handleSaveContent = (val) => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("Observations")
      .doc(id)
      .update({ content: val });
  };
  const handleDelete = () => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("Observations")
      .doc(id)
      .delete();
  };
  return (
    <PostContainer>
      <Delete onClick={handleDelete}></Delete>
      <Title
        showButtonsOnHover
        type="text"
        value={title}
        onSave={handleSaveTitle}
      />
      <Content
        showButtonsOnHover
        type="textarea"
        editButtonContent="Edytuj"
        value={content}
        onSave={handleSaveContent}
      />
    </PostContainer>
  );
};

export default Post;
const PostContainer = styled.div`
  min-width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  background-color: rgb(57, 58, 62);

  padding: 10px;
  margin: 10px 0 0 0;
`;

const Title = styled(EdiText)`
  margin: 0 0 10px 0;
  button {
    border-radius: 5px;
  }
  button[editext="edit-button"] {
    color: #000;
    width: 50px;
  }
  button[editext="save-button"] {
    width: 50px;
    &:hover {
      background: greenyellow;
    }
  }
  button[editext="cancel-button"] {
    &:hover {
      background: crimson;
      color: #fff;
    }
  }
  input {
    background: #1d2225;
    color: #f4c361;
    font-weight: bold;
    border-radius: 5px;
  }
  div[editext="view-container"] {
    background: #6293c3;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
  }
`;

const Content = styled(EdiText)`
  height: 100%;
  max-width: 1000px;
  min-width: 100%;

  .styles_Editext__input__1534X {
    min-width: 300px;
    min-height: 100px;
  }

  button {
    border-radius: 5px;
    margin: 10px 0;
  }
  button[editext="edit-button"] {
    color: #000;
  }
  button[editext="save-button"] {
    width: 50px;
    &:hover {
      background: greenyellow;
    }
  }
  button[editext="cancel-button"] {
    &:hover {
      background: crimson;
      color: #fff;
    }
  }

  textarea {
    background: #1d2225;
    color: #f4c361;
    font-weight: bold;
    border-radius: 5px;
  }
  div[editext="view-container"],
  div[editext="edit-container"] {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    background: #6293c3;
    color: #fff;
    padding: 5px;
    border-radius: 5px;

    word-break: break-all;
  }
  div {
    width: 100%;
    text-align: left;
  }
`;
const Delete = styled(AiOutlineDelete)`
  margin: 0 0 10px 0;
  cursor: pointer;
  color: #b13636;
`;
