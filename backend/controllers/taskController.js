const Task = require("../models/taskModel.js");

const getAllTasks = async (req, res) => {
  try {
    const { priority, status } = req.query;
    let filter = { userId: req.userId };
    if (priority) {
      filter.priority = priority;
    }
    if (status) {
      filter.completed = status === "completed";
    }
    const tasks = await Task.find(filter);
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found",
        success: false
      });
    }
    res.status(200).json({ tasks, success: true });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      success: false
    });
  }
};

const createTask = async (req, res) => {
  const { title, priority } = req.body;
  try {
    const newTask = new Task({ title, priority, userId: req.userId });
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
    if (!task || task.userId.toString() !== req.userId) {
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
    if (!task || task.userId.toString() !== req.userId) {
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
    if (!task || task.userId.toString() !== req.userId) {
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