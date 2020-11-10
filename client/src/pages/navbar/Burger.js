import React from "react";
import styled from "styled-components/macro";

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={setOpen}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
export default Burger;

const StyledBurger = styled.button`
  position: fixed;
  top: 5px;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) =>
      open ? "rgb(46, 48, 55)" : "rgb(239, 241, 245)"};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
