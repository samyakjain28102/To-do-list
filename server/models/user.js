const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dateCreated: {
        type: Date,
    },
    dueDate: {
        type: Date,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
    },
});

const UserSchema = new mongoose.Schema({
    name:{
        type: "String",
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type: "String",
        required: true,
        unique: true, 
    },
    password:{
        type: "String",
        required: true,
    },
    tasks: [TaskSchema],
});

const Todo = mongoose.model("todo", UserSchema);

module.exports = Todo;