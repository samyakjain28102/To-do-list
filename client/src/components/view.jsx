import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const userId = localStorage.getItem("usertoken");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/todo/tasks?userId=${userId}`
        );

        if (response.status === 200) {
          setAllTasks(response.data);
          setLoading(false);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/todo/tasks/${userId}/${taskId}`
      );

      if (response.status === 200) {
        // Task deleted successfully, update the state to reflect the change
        const updatedTasks = allTasks.filter((task) => task._id !== taskId);
        setAllTasks(updatedTasks);

        // If showing incomplete tasks, update filtered tasks
        if (showIncomplete) {
          const updatedFilteredTasks = filteredTasks.filter((task) => task._id !== taskId);
          setFilteredTasks(updatedFilteredTasks);
        }

        console.log("Successfully deleted!");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const sortTasksByDueDate = (tasksToSort) => {
    return tasksToSort.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const sortTasksByPriority = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const filterIncompleteTasks = () => {
    const incompleteTasks = allTasks.filter((task) => !task.isCompleted);
    setFilteredTasks(incompleteTasks);
    setShowIncomplete(true);
  };

  const resetTasks = () => {
    setShowIncomplete(false);
    // Reset filtered tasks to all tasks
    setFilteredTasks([]);
  };

  const tasksToDisplay = showIncomplete ? filteredTasks : allTasks;

  return (
    <div>
      <h1>Task List</h1>
      <div>
        <button onClick={() => setFilteredTasks(sortTasksByDueDate([...tasksToDisplay]))}>
          Sort by Due Date
        </button>
        <button onClick={() => setFilteredTasks(sortTasksByPriority([...tasksToDisplay]))}>
          Sort by Priority
        </button>
        <button onClick={filterIncompleteTasks}>Show Incomplete Tasks</button>
        {showIncomplete && (
          <button onClick={resetTasks}>Show All Tasks</button>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : tasksToDisplay.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="card-container">
          {tasksToDisplay.map((task) => (
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
