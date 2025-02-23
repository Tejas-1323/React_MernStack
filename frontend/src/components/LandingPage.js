import React from "react";
import AuthNavbar from "./AuthNavbar"; // ✅ Import Navbar
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  return (
    <div className="vh-100 d-flex flex-column">
      {/* ✅ Navbar at the Top */}
      <AuthNavbar />

      {/* ✅ Centered Content with Background Image */}
      <div
        className="d-flex justify-content-center align-items-center flex-grow-1"
        style={{
          backgroundImage: 'url("/student-management.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default LandingPage;
