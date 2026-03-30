const Task = require("../models/taskModel.js");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if(!tasks) {
      return res.status(404).json({ message: "No tasks found", success: false });
    }
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", success: false });
  }
};

const createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json({ task: newTask, message: "Task created successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", success: false });
  }
};

module.exports = {
  getAllTasks,
  createTask
};