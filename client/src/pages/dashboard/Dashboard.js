import React from "react";
import styled from "styled-components/macro";
import Greenhouse from "./greenhouse/Greenhouse";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Greenhouse></Greenhouse>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: rgb(44, 44, 44);
  color: rgb(0, 153, 70);
  padding: 2.7rem 10px;
  display: flex;
  flex-direction: column;
`;
