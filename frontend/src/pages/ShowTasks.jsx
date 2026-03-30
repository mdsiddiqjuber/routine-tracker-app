import axiosInstance from "../apis/taskApi.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ShowTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [tasks]);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks && tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
      <button>
        <Link to="/add">Add Task</Link>
      </button>
    </div>
  );
}