import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const taskId = searchParams.get("taskId");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "", // Note: Initialize as a string
    priority: "low",
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/todo/gettaskdetails`,
          {
            params: { userId, taskId },
          }
        );

        if (response.status === 200) {
          setTaskData(response.data);
        } else {
          console.error("Failed to fetch task data");
        }
      } catch (error) {
        console.error("Error fetching task data:", error.message);
      }
    };

    fetchTaskData();
  }, [userId, taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(taskData);
      const response = await axios.put(
        `http://localhost:8000/api/todo/tasks/${userId}/${taskId}`,
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Task updated successfully");
        navigate("/");
        // Add any additional logic you want to perform after a successful update
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter due date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formIsCompleted">
              <Form.Check
                type="checkbox"
                label="Is Completed"
                name="isCompleted"
                checked={taskData.isCompleted}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group controlId="formPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTask;
