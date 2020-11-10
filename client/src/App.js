import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components/macro";
import GlobalStyle from "./utils/GlobalStyle";
import Routes from "./routes/Routes";
const App = () => {
  return (
    <>
      <Router>
        <AppContainer>
          <Routes></Routes>
        </AppContainer>
      </Router>
      <GlobalStyle />
    </>
  );
};

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(41, 42, 46);

`;
