import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap"; // Import Bootstrap components
import axios from "axios";
import "../pages/styles.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (username && password) {
      try {
        const response = await axios.post("http://localhost:8000/api/auth/signin", {
          username: username,
          password: password,
        });

        const data = response.data;
        if (response.status >= 200 && response.status < 300) {
          if (data && data.user._id) {
            localStorage.setItem("usertoken", data.user._id);
            console.log(data.user._id);
            navigate("/");
          } else {
            console.error("Authentication successful, but _id is missing in the response data");
            alert("Unexpected response from the server. Please try again.");
          }
        } else {
          alert("Wrong Credentials!");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <Container>
      <h2 className="mt-3">Sign In</h2>
      <Form onSubmit={handleSignIn}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
