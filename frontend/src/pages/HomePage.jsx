import { Link } from "react-router-dom";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to the Routine Tracker App</h1>
      <p>Track your daily tasks and routines efficiently.</p>
      <Link to="/login" className="cta-button">
        Get Started
      </Link>
    </div>
  );
}