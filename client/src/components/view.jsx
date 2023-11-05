import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

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
        const updatedTasks = allTasks.filter((task) => task._id !== taskId);
        setAllTasks(updatedTasks);

        if (showIncomplete) {
          const updatedFilteredTasks = filteredTasks.filter(
            (task) => task._id !== taskId
          );
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
    const sortedTasks = [...tasksToSort].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    return sortedTasks;
  };

  const sortTasksByPriority = (tasksToSort) => {
    console.log("clicked")
    const sortedTasks = [...tasksToSort].sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    return sortedTasks;
  };

  const filterIncompleteTasks = () => {
    const incompleteTasks = allTasks.filter((task) => !task.isCompleted);
    setFilteredTasks(incompleteTasks);
    setShowIncomplete(true);
  };

  const resetTasks = () => {
    setShowIncomplete(false);
    setFilteredTasks([]);
  };

  const tasksToDisplay = showIncomplete ? filteredTasks : allTasks;

  return (
    <Container>
      <h1>Task List</h1>
      <div className="d-flex mb-3">
        <Button
          // variant="info"
          className="me-2"
          onClick={() => setAllTasks(sortTasksByDueDate(tasksToDisplay))}
        >
          Sort by Due Date
        </Button>
        <Button
          // variant="info"
          className="me-2"
          onClick={() => setAllTasks(sortTasksByPriority(tasksToDisplay))}
        >
          Sort by Priority
        </Button>
        
        <Button
          variant="warning"
          className="me-2"
          onClick={filterIncompleteTasks}
        >
          Show Incomplete Tasks
        </Button>
        {showIncomplete && (
          <Button variant="secondary" onClick={resetTasks}>
            Show All Tasks
          </Button>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : tasksToDisplay.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <Row>
          {tasksToDisplay.map((task) => (
            <Col key={task._id} className="col-12 mb-4">
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>{task.title}</Card.Title>
                    <div>
                      <Link
                        to={`/edit?userId=${userId}&taskId=${task._id}`}
                        className="btn btn-primary mr-2 mx-2"
                      >
                        <i className="las la-pencil-alt fs-4"></i>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(task._id)}
                      >
                        <i className="lar la-trash-alt fs-4"></i>
                      </Button>
                    </div>
                  </div>
                  <Card.Text className="mb-0">{task.description}</Card.Text>
                  <Card.Text className="mb-0">
                    Due Date:{" "}
                    {new Date(task.dueDate).toLocaleDateString("en-GB")}
                  </Card.Text>
                  <Card.Text className="mb-0">
                    Priority: {task.priority}
                  </Card.Text>
                  <Card.Text className="mb-0">
                    Completed: {task.isCompleted ? "Yes" : "No"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default View;
