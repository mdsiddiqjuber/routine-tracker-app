import { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/taskApi.js";
import { handleError, handleSuccess } from "../utils/toast.js";
import "./Signup.css";

export function Signup() {
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      const { success, message } = response.data;
      if (success) {
        handleSuccess(message);
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000);
      }
    } catch (err) {
      if (err.response.data?.error?.details) {
        const details = err.response.data.error.details;

        let formattedErrors = {};

        details.forEach((e) => {
          const field = e.path[0]; // name, email, password
          formattedErrors[field] = e.message;
        });

        setErrors(formattedErrors);
      } else {
        handleError(err.response.data.message || "An error occurred during signup.");
      }
    }
  }

  return (
    <div className="container-signup">
      <div className="card-signup">
        <h3 className="title-signup">Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group-signup">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error-text-signup">{errors.name}</p>}
          </div>

          <div className="form-group-signup">
            <label>Email address</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-text-signup">{errors.email}</p>}
          </div>

          <div className="form-group-signup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-text-signup">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-signup">
            Create Account
          </button>

          <Link to="/login" className="link-signup">
            Already have an account? Log in
          </Link>
        </form>
      </div>
    </div>
  );
}