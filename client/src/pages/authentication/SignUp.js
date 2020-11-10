import React from "react";
import styled from "styled-components/macro";
import HandleSignUp from "./HandleSignUp";
import bg from "../../assets/bgc.jpg";

const SignUp = () => {
  return (
    <SignUpContainer>
      <HandleSignUp />
    </SignUpContainer>
  );
};

export default SignUp;
const SignUpContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url("${bg}") no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
