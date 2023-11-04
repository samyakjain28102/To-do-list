// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');
const Todo = require("../models/user"); // Assuming your model is in a file named todo.js

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await Todo.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    const newUser = new Todo({
      name,
      email,
      username,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await newUser.save();

    req.session.userId = newUser._id;
    // You can generate a token here if you want to implement user authentication
    // const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Login route
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    // Check if the user exists
    const user = await Todo.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(user.password, password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }
    res.status(200).json({ user, msg: "Sign-in successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/checkAuth", async (req, res) => {
  try {
    // Assuming you have the user _id in req.body.userId
    const userIdToFind = req.query.userId;

    // Check if the userIdToFind is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userIdToFind)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    // Using the findById method to find a user by _id
    const user = await Todo.findById(userIdToFind);

    if (user) {
      return res.status(200).json({ msg: "User Found", user });
    } else {
      return res.status(404).json({ msg: "User Not Found" });
    }
  } catch (err) {
    console.error("Error checking authentication:", err);
    return res.status(500).json({ msg: "Server Error" });
  }
});


module.exports = router;
