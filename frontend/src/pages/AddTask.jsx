import { useState } from "react";
import axiosInstance from "../apis/axiosInstance.js";
import "./AddTask.css";

export function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axiosInstance.post("/tasks/add", { title });
      console.log("Task added:", response.data);
      onTaskAdded(response.data.task);
      setTitle("");
    } catch (error) {
      console.error("Error in adding task:", error.response);
    }
  };
  return (
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Task title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
  );
}