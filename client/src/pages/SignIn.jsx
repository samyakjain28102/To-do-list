// SignIn.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/styles.css";
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (username && password) {
      // Successful sign-in (you can redirect or perform other actions here)
      setError("");
      console.log("Signed in successfully!");
    } else {
      alert("Please enter both username and password.");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signin",
        {
          username: username,
          password: password,
        }
      );

      // Parse the JSON response
      const data = response.data;
        console.log(data);
        if (response.status >= 200 && response.status < 300) {
        if (data && data.user._id) {
          // Store the user token in localStorage
          localStorage.setItem("usertoken", data.user._id);
          console.log(data.user._id);
          navigate("/");
        } else {
          // Handle the case where _id is not present in the response data
          console.error("Authentication successful, but _id is missing in the response data");
          alert("Unexpected response from the server. Please try again.");
        }
      } else {
        // Handle authentication failure
        alert("Wrong Credentials!");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error checking authentication:", error);
    }
  };
  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
    // <div>
    //   <div className="signin_page">
    //     <div className="box">
    //       <p className="form_heading">Sign-in to get your best interests!</p>
    //       <form onSubmit={handleSignIn}>
    //         <input
    //           type="text"
    //           name="Username"
    //           placeholder="Username"
    //           className="inptext"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //         <input
    //           type="password"
    //           name="Password"
    //           placeholder="Password"
    //           className="inptext"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button type="submit" name="Submit" className="submitbutton"> Submit</button>
    //         {/* <p className="or">or</p>
    //         <p className="siwg">
    //           Sign-in with{" "}
    //           <img
    //             src="/images/google.png"
    //             className="google"
    //             alt="google"
    //           ></img>
    //         </p> */}
    //         <p className="or">or</p>
    //         <Link to="/Register">
    //           <p className="or">Create new account</p>
    //         </Link>
    //       </form>
    //     </div>
    //   </div>
    //   {/* <h2>Sign In</h2>
    //   <form>
    //     <div>
    //       <label htmlFor="username">Username:</label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //     <button type="button" onClick={handleSignIn}>
    //       Sign In
    //     </button>
    //   </form> */}
    // </div>
  );
};

export default SignIn;
