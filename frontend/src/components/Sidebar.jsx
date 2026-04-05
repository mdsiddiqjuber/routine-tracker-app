import { NavLink } from "react-router-dom";
import { handleSuccess } from "../utils/toast.js";
import axiosInstance from "../apis/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  const navigate = useNavigate();
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
    <div className="sidebar">
      <h2 className="logo">RoutineTracker</h2>

      <nav className="menu">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/routine">Routine</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </nav>

      <div className="bottom-menu">
        <NavLink to="/profile">Profile</NavLink>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};