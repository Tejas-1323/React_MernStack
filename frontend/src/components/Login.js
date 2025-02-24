import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      !storedUser ||
      storedUser.username !== username ||
      storedUser.password !== password
    ) {
      toast.error("❌ Invalid Credentials!", { autoClose: 2000 });

      // ✅ Reset input fields after invalid login attempt
      setUsername("");
      setPassword("");
      return;
    }

    toast.success("✅ Login Successful!", { autoClose: 2000 });

    // ✅ Delay navigation to Home after toast disappears
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8c6e7", // ✅ Light Magenta Background (Same as Sign-In)
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar /> {/* ✅ Show Navbar with Home button */}
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card shadow-lg p-4 text-center"
          style={{
            width: "350px",
            borderRadius: "12px",
            backgroundColor: "#f2f2f2", // ✅ Light Gray Card (Same as Sign-In)
          }}
        >
          <h2 className="text-success mb-3">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 rounded-pill"
            >
              Login
            </button>
          </form>
          <button
            className="btn btn-outline-secondary mt-3 rounded-pill w-100"
            onClick={() => navigate("/signin")}
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
