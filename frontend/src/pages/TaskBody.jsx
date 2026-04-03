import { useState } from "react";
import axiosInstance from "../apis/axiosInstance.js";
import "./TaskBody.css";

export function TaskBody({ handleChange, handleDelete, tasks, setTasks }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  return (
    <div className="task-list">
      {tasks && tasks.map((task) => (
        <div key={task._id} className="task">

          {/* LEFT SIDE */}
          <div className="task-left">
            <input
              type="checkbox"
              disabled={editId === task._id}
              checked={task.completed}
              onChange={() => handleChange(task._id)}
            />

            {editId === task._id ? (
              <input
                className="edit-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="task-actions">
            {editId === task._id ? (
              <button
                className="btn save-btn"
                onClick={async () => {
                  try {
                    const response = await axiosInstance.put(`/tasks/edit/${editId}`, {
                      title: editTitle,
                    });
                    console.log("Task updated:", response.data);
                    setTasks((prev) =>
                      prev.map((t) =>
                        t._id === editId ? { ...t, title: editTitle } : t
                      )
                    );
                    setEditId(null);
                  } catch (error) {
                    console.error("Error updating task:", error);
                  }
                }}
              >
                Save
              </button>
            ) : (
              <button
                className="btn edit-btn"
                onClick={() => {
                  setEditTitle(task.title);
                  setEditId(task._id);
                }}
              >
                Edit
              </button>
            )}

            <button
              className="btn delete-btn"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}