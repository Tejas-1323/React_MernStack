import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar"; // ✅ Import Navbar Component

const About = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e3f2fd", // ✅ Light Blue Background (Soothing & Professional)
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Navbar at the Top */}
      <Navbar />

      <div className="container mt-5 text-center">
        <h1 className="text-primary fw-bold">
          📚 About Student Management System
        </h1>
        <p className="mt-3 text-muted">
          The Student Management System is designed to efficiently handle
          student records, including enrollment, attendance, grades, and other
          essential details. This system helps institutions maintain organized
          student data while ensuring easy accessibility.
        </p>

        <div className="mt-4">
          <img
            src="/student-management.jpg"
            alt="Student Management System"
            className="img-fluid rounded shadow-lg"
            style={{ maxWidth: "80%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
