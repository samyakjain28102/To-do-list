// src/Navbar.js
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({ userId, setUserId }) => {
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
      <Navbar.Brand href="./" className="mx-3">
        <i className="las la-home fs-4 me-3"></i>Let's complete the tasks!
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        className="mx-3 justify-content-end"
        id="basic-navbar-nav"
      >
        {userId == null ? (
          <Nav>
            <Link to="/Signin">
              <Button variant="outline-light" className="me-2">
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
