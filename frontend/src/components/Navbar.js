import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand fw-bold text-light" href="/">
          🎓 Student Management
        </a>

        {/* Home Button */}
        <button
          className="btn btn-outline-light ms-auto rounded-pill px-4 fw-semibold"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
