import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Nav.Item>
        <Nav.Link href="/">Movie Search</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/movieRatings">Movie Ratings</Nav.Link>
      </Nav.Item>
    </Navbar>
  );
};

export default NavBar;
