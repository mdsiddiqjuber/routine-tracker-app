import axiosInstance from "../apis/taskApi.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ShowTasks() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

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

  const handleChange = async (id) => {
    try {
      await axiosInstance.put(`/tasks/complete/${id}`)
        .then((response) => {
          console.log(response.data.message);
        });
    }catch (error) {
      console.error("Error in updating task:", error.response);
    }
  }

  return (
    <div>
      <h2>Tasks</h2>
        {tasks && tasks.map((task) => (
          <div key={task._id}>
            <input
              type="checkbox"
              key={task._id} 
              disabled={editId === task._id}
              checked={task.completed}
              onChange={() => handleChange(task._id)}
              style={{ cursor: "pointer" }} />
            {
              editId === task._id ? (
                <>
                  <input 
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} />
                  <button onClick={async () => {
                    try {
                      await axiosInstance.put(`/tasks/edit/${editId}`, { title: editTitle });
                      setEditId(null);
                    } catch (error) {
                      console.error("Error updating task:", error.response.data);
                    }
                  }}>
                    Save
                  </button>
                </>
              ) : (
              <>
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title}
                </span>
                <button onClick = {() => {
                  setEditTitle(task.title);
                  setEditId(task._id);
                }}>
                  Edit the task
                </button>
              </>
            )}
          </div>
        ))}
      <button>
        <Link to="/add">Add Task</Link>
      </button>
    </div>
  );
}