// src/Navbar.js
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({userId, setUserId}) => {
  const navigate = useNavigate();
  console.log(userId);
  const handleLogOut = () => {
    localStorage.removeItem("usertoken");
    setUserId(null);
    navigate("./");
    window.location.reload();
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Your Brand</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {userId == null ? (
          <Nav>
            <Link to="/Signin">
              <Button variant="outline-light" className="mr-2">
                Sign In
              </Button>
            </Link>
            <Link to="/Register">
              <Button variant="light">Register</Button>
            </Link>
          </Nav>
        ) : (
          <Nav>
            <Button
              variant="outline-light"
              className="mr-2"
              onClick={handleLogOut}
            >
              LogOut
            </Button>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
