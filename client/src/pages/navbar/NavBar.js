import React, { useState } from "react";
import styled from "styled-components/macro";
import Burger from "./Burger";
import Menu from "./Menu";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleNavBar = () => setOpen((state) => !state);

  return (
    <NavBarContainer>
      <Burger open={open} setOpen={handleNavBar} />
      <Menu open={open} setOpen={handleNavBar} />
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div``;
