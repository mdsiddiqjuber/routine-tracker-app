import axiosInstance from "../apis/axiosInstance.js";
import { useState, useEffect } from "react";
import { TaskBody } from "./TaskBody.jsx";
import { AddTask } from "./AddTask.jsx";
import "./ShowTasks.css";

export function ShowTasks() {

  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const fetchTasks = async () => {
    try {
      let url = "/task?";

      if (priority) url += `priority=${priority}&`;
      if (status) url += `status=${status}`;

      const response = await axiosInstance.get(url);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // 🔁 RUN WHEN FILTER CHANGES
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority, status]);

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
            <div className="filters">
              <select onChange={(e) => setPriority(e.target.value)}>
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="completed">Completed ✅</option>
                <option value="pending">Pending ⏳</option>
              </select>
              <button
                className="reset-btn"
                onClick={() => {
                  setPriority("");
                  setStatus("");
                }}>
                Reset Filters
              </button>
            </div>

            <TaskBody tasks={tasks} setTasks={setTasks} />
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
          onClick={() => setShowInput((prev) => !prev)}
        >
          {showInput ? "Cancel" : "Add Task"}
        </button>
      </div>
    </>
  );
}