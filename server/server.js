
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const app = express();

// routes
const todo = require("./routes/todo"); // added

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/todo", todo); // added
app.use('/api/auth', require('./routes/auth'));

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});