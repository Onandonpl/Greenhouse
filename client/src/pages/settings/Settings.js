import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";
import UserPassword from "./UserPassword";
import UserLocalization from "./UserLocalization";
import UserSensor from "./UserSensor";

const Settings = () => {
  return (
    <UserSettingsContent>
      <Helmet>
        <title>Ustawienia</title>
      </Helmet>
      <UserSensor />
      <UserLocalization />
      <UserPassword />
    </UserSettingsContent>
  );
};

export default Settings;
const UserSettingsContent = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.7rem 10px;
  background-color: rgb(44, 44, 44);
`;
