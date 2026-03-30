import { useState } from "react";
import axiosInstance from "../apis/taskApi";
import { useNavigate } from "react-router-dom";

export function AddTask() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axiosInstance.post("/tasks/add", { title });
      console.log("Task added:", response.data);
      setTitle("");
      navigate("/");
    } catch (error) {
      console.error("Error in adding task:", error.response);
    }
  };
  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Task title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}