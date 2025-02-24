import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Define API Base URL
export const BASE_URL = "http://localhost:5000/api/students/signup"; // Change if using a different backend URL

const SignIn = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Sign-Up API Request
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      toast.error("❌ Please fill all fields!", { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.post(BASE_URL, userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        toast.success("✅ Sign Up Successful! Redirecting to Login...", {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(
        `❌ Sign Up Failed! ${error.response?.data?.message || "Try Again"}`,
        {
          autoClose: 2000,
        }
      );
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
          <h2 className="text-primary mb-3">Sign Up</h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
              />
            </div>
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
