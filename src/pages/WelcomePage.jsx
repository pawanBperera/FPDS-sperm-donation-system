
import React from "react";
import "./WelcomePage.css";
import logo from "../assets/Logo-1.gif";
import parentsImg from "../assets/parents.png";
import backgroundImg from "../assets/welcomBack.png";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="welcome-container"
      style={{ backgroundImage: `url(${backgroundImg})`,
     backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center" }}
    >
      <img src={logo} alt="FPDS Logo" className="logo" />
      
      <div className="welcome-content">
        <div className="image-side">
          <img src={parentsImg} alt="Parents" className="parents-img" />
        </div>

        <div className="text-side">
          <h1>Family Planner Donor System</h1>
          <p>Your trusted partner in finding the perfect donor.</p>
          <button className="view-btn" onClick={() => navigate("/home")}>
            View
          </button>
        </div>
      </div>
    </div>
  );
}
