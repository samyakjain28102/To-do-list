import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("usertoken");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem("usertoken"); // Assuming you store the userId in local storage
        const response = await axios.get(
          `http://localhost:8000/api/todo/tasks?userId=${userId}`
        );

        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const userId = localStorage.getItem("usertoken");
      const response = await axios.delete(
        `http://localhost:8000/api/todo/tasks/${userId}/${taskId}`
      );

      if (response.status === 200) {
        // Task deleted successfully, update the state to reflect the change
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        console.log("Successfully deleted!");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="card-container">
          {tasks.map((task) => (
            <div key={task._id} className="card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
               <Link to={`/edit?userId=${userId}&taskId=${task._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default View;
