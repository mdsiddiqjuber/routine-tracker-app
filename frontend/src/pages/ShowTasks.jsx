import axiosInstance from "../apis/taskApi.js";
import { useState, useEffect } from "react";

export function ShowTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosInstance.get("/tasks")
      .then(response => setTasks(response.data.tasks))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks && tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}