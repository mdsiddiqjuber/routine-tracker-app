import axiosInstance from "../apis/taskApi.js";
import { useState, useEffect } from "react";
import { TaskBody } from "./TaskBody.jsx";
import { AddTask } from "./AddTask.jsx";
import "./ShowTasks.css";

export function ShowTasks() {
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);

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
  }, []);

  const handleChange = async (id) => {
    try {
      await axiosInstance.put(`/tasks/complete/${id}`)
        .then((response) => {
          console.log(response.data.message);
        });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error in updating task:", error.response);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/delete/${id}`)
        .then((response) => {
          console.log(response.data.message);
        });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error in deleting task:", error.response.data);
    }
  }
  return (
    <div className="container-showtasks">
      <h2>Tasks</h2>
      <TaskBody
        handleChange={handleChange}
        handleDelete={handleDelete}
        tasks={tasks} />
      {showInput && (
        <AddTask
          onTaskAdded={(newTask) => {
            setTasks((prev) => [...prev, newTask]);
            setShowInput(false);
          }}
        />
      )}
      <button
        className="add-btn"
        onClick={() => setShowInput((prev) => !prev)}>
        {showInput ? "Cancel" : "Add Task"}
      </button>
    </div>
  );
}