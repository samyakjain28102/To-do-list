import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const TaskForm = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
    priority: "low",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input type is checkbox, handle it separately
    if (type === "checkbox") {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: checked, // Set the value to the checked state of the checkbox
      }));
    } else {
      // For other input types, handle normally
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    try {
      // Get user ID from local storage
      const userId = localStorage.getItem("usertoken");
  
      // Check if userId exists
      if (userId) {
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
      } else {
        // If userId does not exist, navigate to the signing page
        console.log("User ID not found. Redirecting to signing page...");
        navigate("./signin");
      }
    } catch (error) {
      console.error("Error submitting task:", error.message);
    }
  };
  

  return (
    <Form className="row m-4 border p-3 shadow-lg" onSubmit={handleSubmit}>
      <Form.Group className="mb-2" controlId="formTitle">
        <Form.Label className="mb-1">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formDescription">
        <Form.Label className="mb-1">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formIsCompleted">
        <Form.Check
          type="checkbox"
          label="Is Completed"
          name="isCompleted"
          checked={task.isCompleted}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formDueDate">
        <Form.Label className="mb-1">Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formPriority">
        <Form.Label className="mb-1">Priority</Form.Label>
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

      <Button className="col-4 mx-auto mt-3" variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;
