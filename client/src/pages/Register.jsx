// Register.jsx
import React from "react";
import "../pages/styles.css";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      // localStorage.setItem('usertoken', result._id);


      // Redirect to the home page if registration is successful
      if (response.status === 201) {
        window.location.href = '/home'; // Change this to the correct route
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signin_page">
      <div className="box1">
        <p className="form_heading justify-content-center">
          Create a new account
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="url"
            name="Email"
            placeholder="Email Id"
            className="inptext"
          />
          <input
            type="text"
            name="Name"
            placeholder="First Name"
            className="inptext"
          />
          <input
            type="text"
            name="Username"
            placeholder="Username"
            className="inptext"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            className="inptext"
          />
          {/* <input
            type="password"
            name="password"
            placeholder="Re-enter Your Password"
            className="inptext"
          /> */}
          {/* Updated Link to point to the correct route */}
          <Link to="/home">
            <input type="submit" name="Submit" className="submitbutton" />
          </Link>
        </form>
        <br />
      </div>
    </div>
  );
}

export default Register;
