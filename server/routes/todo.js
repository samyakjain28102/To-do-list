// routes/todo.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/user");

router.get("/tasks", async (req, res) => {
  try {
    const userId = req.query.userId;

    const user = await Todo.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out null values from the tasks array
    const tasks = user.tasks.filter((task) => task !== null);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/gettaskdetails", async (req, res) => {
  try {
    const userId = req.query.userId; // Change from req.body.userId to req.query.userId
    const taskId = req.query.taskId; // Change from req.body.taskId to req.query.taskId
    console.log(userId, taskId);
    
    const user = await Todo.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const taskIndex = user.tasks.findIndex((task) => task._id.toString() === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log(user.tasks[taskIndex]);
    return res.status(200).json(user.tasks[taskIndex]); // Change from user.tasks[0] to user.tasks[taskIndex]
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/tasks", async (req, res) => {
  try {
    const userId = req.query.userId;
    const taskData = req.body;
    console.log(req.body.task);

    const user = await Todo.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.tasks.push(taskData);

    await user.save();

    return res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/tasks/:userId/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;
    console.log(updatedTaskData);
    const user = await Todo.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const taskIndex = user.tasks.findIndex((task) => task._id.toString() === taskId);
    console.log(taskIndex);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    user.tasks[taskIndex] = updatedTaskData;
    await user.save();

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/tasks/:userId/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    const user = await Todo.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user.tasks is an array and not null or undefined
    if (!user.tasks || !Array.isArray(user.tasks)) {
      return res
        .status(404)
        .json({ error: "User tasks not found or not an array" });
    }

    // Find the index of the task with the specified taskId
    const taskIndex = user.tasks.findIndex(
      (task) => task && task._id && task._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Remove the task from the tasks array
    user.tasks.splice(taskIndex, 1);

    await user.save();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
