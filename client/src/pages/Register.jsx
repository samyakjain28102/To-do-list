// // Register.jsx
// import React from "react";
// import "../pages/styles.css";
// import { useNavigate } from "react-router-dom";
// function Register() {
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const data = {};
//     formData.forEach((value, key) => {
//       data[key] = value;
//     });

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       console.log(result);
//       // localStorage.setItem('usertoken', result._id);

//       // Redirect to the home page if registration is successful
//       if (response.status === 201) {
//         navigate('/signin'); // Change this to the correct route
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="signin_page">
//       <div className="box1">
//         <p className="form_heading justify-content-center">
//           Create a new account
//         </p>
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="Email"
//             placeholder="Email Id"
//             className="inptext"
//           />
//           <input
//             type="text"
//             name="Name"
//             placeholder="First Name"
//             className="inptext"
//           />
//           <input
//             type="text"
//             name="Username"
//             placeholder="Username"
//             className="inptext"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Your Password"
//             className="inptext"
//           />
//           {/* <input
//             type="password"
//             name="password"
//             placeholder="Re-enter Your Password"
//             className="inptext"
//           /> */}
//           {/* Updated Link to point to the correct route */}
//             <button type="submit" name="Submit" className="submitbutton"> Submit </button>
//         </form>
//         <br />
//       </div>
//     </div>
//   );
// }

// export default Register;

// Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log(response.data);
  
      if (response.status === 201) {
        navigate("/signin");
      } else {
        console.error("Registration failed:", response.data.msg || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error.message || "Unknown error");
    }
  };
  

  return (
    <div>
      <h2>Create a new account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
