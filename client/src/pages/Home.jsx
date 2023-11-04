import React, { useState, useEffect } from "react";
import TaskForm from "../components/tasks";
import NavBar from "../components/navbar";
import View from "../components/view";
import axios from "axios";
export default function Home() {
  const [isValid, setIsValid] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("usertoken"));
  

  useEffect(() => {
    // Fetch authentication status from the server

    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/checkAuth",
          {
            params: { userId },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    if (userId) {
      checkAuthentication();
    }
  }, [userId]); // Dependency array includes userId to run the effect when userId changes

  return (
    <>
      <NavBar userId={userId} setUserId = {setUserId}/>
      <TaskForm />
      {isValid && <View />}
    </>
  );
}
