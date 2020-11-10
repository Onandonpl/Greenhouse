import React from "react";
import styled from "styled-components/macro";
import { AiOutlineHome, AiOutlineLogout, AiOutlineBook } from "react-icons/ai";
import { FiSettings, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import HandleLogOut from "../../firebaseHelpers/HandleLogOut";

const Menu = ({ open, setOpen }) => {
  return (
    <StyledMenu open={open} onClick={setOpen}>
      <NavLink to="/">
        <AiOutlineHome />
        <LinktText>Home</LinktText>
      </NavLink>
      <NavLink to="/observations">
        <AiOutlineBook />
        <LinktText>Obserwacje</LinktText>
      </NavLink>
      <NavLink to="/weather">
        <FiSun />
        <LinktText>Pogoda</LinktText>
      </NavLink>
      <NavLink to="/settings">
        <FiSettings />
        <LinktText>Ustawienia</LinktText>
      </NavLink>
      <LogOutButton onClick={HandleLogOut}>
        <AiOutlineLogout />
        <LinktText>Wyloguj</LinktText>
      </LogOutButton>
    </StyledMenu>
  );
};
export default Menu;
const StyledMenu = styled.nav`
  display: flex;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(239, 241, 245);
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100%;
  padding: 1.5rem;

  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

  @media (max-width: 576px) {
    width: 100%;
  }
`;
const NavLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  font-size: 25px;
  color: rgb(46, 48, 55);
  margin: 15px 0;
  transition: linear 0.1s;
  &:hover {
    color: rgb(0, 153, 70);
  }
  &:focus {
    color: rgb(0, 153, 70);
  }
`;
const LinktText = styled.div`
  margin: 0 5px;
`;
const LogOutButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  font-size: 25px;
  color: rgb(46, 48, 55);
  margin: 15px 0;
  border: none;
  cursor: pointer;
  transition: linear 0.1s;

  &:hover {
    color: rgb(249, 96, 62);
  }
  &:focus {
    color: rgb(249, 96, 62);
  }
`;
