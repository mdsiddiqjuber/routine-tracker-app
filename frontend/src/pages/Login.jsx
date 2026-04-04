import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/toast.js";
import "./Login.css";
import axiosInstance from "../apis/axiosInstance.js";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", formData,{
        skipAuthInterceptor: true
      });
      const { success, message, accessToken, refreshToken, email, name } = response.data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else if (!success) {
        setError(message);
      }
    } catch (error) {
      if (error.response?.data?.error?.details[0]?.message) {
        setError(error.response?.data?.error?.details[0]?.message);
      }
      else {
        setError(error.response?.data.message);
      }
    }
  }

  return (
    <div className="container-login">
      <div className="card-login">
        <h3 className="title-login">Log In</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group-login">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-login">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Log In
          </button>

          <Link to="/signup" className="signup-link-login">
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}