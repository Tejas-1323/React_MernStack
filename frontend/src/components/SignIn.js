import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("❌ Please fill all fields!", { autoClose: 2000 });
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, password }));
    toast.success("✅ Sign Up Successful! Redirecting to Login...", {
      autoClose: 2000,
    });

    // ✅ Delay navigation to Login after toast disappears
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div>
      <Navbar /> {/* ✅ Show Navbar with Home button */}
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow-lg p-4 text-center"
          style={{ width: "350px", borderRadius: "12px" }}
        >
          <h2 className="text-primary mb-3">Sign Up</h2>
          <form onSubmit={handleSignIn}>
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
              className="btn btn-primary w-100 rounded-pill"
            >
              Sign Up
            </button>
          </form>
          <button
            className="btn btn-outline-secondary mt-3 rounded-pill w-100"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
