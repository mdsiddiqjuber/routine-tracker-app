import axiosInstance from "../apis/axiosInstance.js";
import { useState, useEffect } from "react";
import { TaskBody } from "./TaskBody.jsx";
import { AddTask } from "./AddTask.jsx";
import "./ShowTasks.css";
import { handleSuccess } from "../utils/toast.js";
import { useNavigate } from "react-router-dom";

export function ShowTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/task");
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = async (id) => {
    try {
      const response = await axiosInstance.put(`/task/complete/${id}`)
      console.log(response.data.message);
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
      const response = await axiosInstance.delete(`/task/delete/${id}`)
      console.log(response.data.message);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error in deleting task:", error.response.data);
    }
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      handleSuccess("Logged out successfully!");
      localStorage.clear();
    } catch (error) {
      console.error("Error in logging out:", error);
    }
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <div className="container-showtasks">
        {tasks.length === 0 ? (
          <h2 className="no-tasks">
            No tasks available. Please add some tasks.
          </h2>
        ) : (
          <>
            <h2>Tasks</h2>
            <TaskBody
              handleChange={handleChange}
              handleDelete={handleDelete}
              tasks={tasks}
              setTasks={setTasks}
            />
          </>
        )}
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
      <div className="logout">
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>

  );
}