import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Define API Base URL
const BASE_URL = "http://localhost:5000/api/students/login"; // Change if needed

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Login API Request
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      toast.error("❌ Please fill all fields!", { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.post(BASE_URL, userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        // ✅ Store token (if provided)
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isAuthenticated", "true");

        toast.success("✅ Login Successful! Redirecting...", {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/home"); // Redirect to Home Page
        }, 2000);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(
        `❌ Login Failed! ${error.response?.data?.message || "Try Again"}`,
        {
          autoClose: 2000,
        }
      );

      // ✅ Reset Fields on Invalid Login
      setUserData({ email: "", password: "" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8c6e7",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card shadow-lg p-4 text-center"
          style={{
            width: "350px",
            borderRadius: "12px",
            backgroundColor: "#f2f2f2",
          }}
        >
          <h2 className="text-success mb-3">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
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
