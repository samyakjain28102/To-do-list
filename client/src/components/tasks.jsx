import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
    priority: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const userId = localStorage.getItem("usertoken"); // Get user ID from local storage
      console.log(task);
      const response = await axios.put(
        `http://localhost:8000/api/todo/tasks?userId=${userId}`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Task submitted successfully");
        // Add any additional logic you want to perform after a successful submission
      } else {
        console.error("Failed to submit task");
      }
    } catch (error) {
      console.error("Error submitting task:", error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formIsCompleted">
        <Form.Check
          type="checkbox"
          label="Is Completed"
          name="isCompleted"
          checked={task.isCompleted}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;
