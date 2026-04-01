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

const taskComplete = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }
    task.completed = !task.completed;
    await task.save();
    res.status(200).json({ message: "Task updated successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", success: false });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }
    task.title = title;
    await task.save();
    res.status(200).json({ message: "Task updated successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", success: false });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }
    res.status(200).json({ message: "Task deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};


module.exports = {
  getAllTasks,
  createTask,
  taskComplete,
  editTask,
  deleteTask
};