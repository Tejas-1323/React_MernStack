import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* ✅ Logo */}
        <a className="navbar-brand fw-bold text-light" href="/">
          🎓 Student Portal
        </a>

        <div className="ms-auto">
          {/* ✅ About Button */}
          <button
            className="btn btn-outline-light mx-2 rounded-pill px-4 fw-semibold"
            onClick={() => navigate("/about")}
          >
            ℹ️ About
          </button>

          {/* ✅ Sign In Button */}
          <button
            className="btn btn-outline-light mx-2 rounded-pill px-4 fw-semibold"
            onClick={() => navigate("/signin")}
          >
            ✍️ Sign In
          </button>

          {/* ✅ Login Button */}
          <button
            className="btn btn-light text-dark rounded-pill px-4 fw-semibold"
            onClick={() => navigate("/login")}
          >
            🔐 Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
