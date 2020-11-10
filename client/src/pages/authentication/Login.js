import React from "react";
import styled from "styled-components/macro";
import HandleLogin from "./HandleLogin";
import bg from "../../assets/bgc.jpg";

const Login = () => {
  return (
    <LoginContainer>
      <HandleLogin/>
    </LoginContainer>
  );
};

export default Login;
const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url("${bg}") no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
