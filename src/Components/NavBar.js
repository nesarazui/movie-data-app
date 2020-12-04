import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Nav.Item>
        <Nav.Link href="/">Movie Search</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/movieRatings">Movie Ratings</Nav.Link>
      </Nav.Item>
      {/* <Link to="/">Search Movie</Link>
      <Link to="/movieRatings">Movie Ratings</Link> */}
    </Navbar>
  );
};

export default NavBar;
