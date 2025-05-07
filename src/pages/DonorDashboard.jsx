// File: src/pages/DonorDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { DonorSidebar } from "../components/Sidebars/DonorSidebar";
import { FaHeart, FaBell } from "react-icons/fa";

export default function DonorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Mocked notification data for now
  const notifications = [
    {
      id: 1,
      icon: <FaHeart className="text-success me-2" />,
      text: "A recipient match with your donation has been approved by the clinic",
      date: "April 28",
    },
    {
      id: 2,
      icon: <FaHeart className="text-primary me-2" />,
      text: "Your donation was shortlisted by a recipient.",
      date: "April 28",
    },
    {
      id: 3,
      icon: <FaHeart className="text-primary me-2" />,
      text: "Your donation was shortlisted by a recipient.",
      date: "April 26",
    },
    {
      id: 4,
      icon: <FaBell className="me-2" />,
      text: "New health screening update completed.",
      date: "April 20",
    },
    {
      id: 5,
      icon: <FaBell className="me-2" />,
      text: "No new matches at this time.",
      date: "April 15",
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <DonorSidebar />

      {/* Main dashboard content */}
      <div className="flex-grow-1 p-4 d-flex flex-column">
        <header className="mb-4">
          <h1 className="mb-1">Welcome back, 👋</h1>
          <p className="text-secondary">
            Your donor profile will connect you with couples and singles that
            wish to be parents and seek the need of =======.
          </p>
        </header>

        {/* Last login / password change card */}
        <div className="bg-light p-3 rounded mb-4" style={{ maxWidth: "400px" }}>
          <p className="mb-1">
            <FaBell className="me-2 text-warning" />
            Last login: April 27, 2025
          </p>
          <p className="mb-0">
            <FaBell className="me-2 text-warning" />
            Last Password Change: 10d ago
          </p>
        </div>

        {/* Notifications list */}
        <div className="flex-grow-1 overflow-auto">
          {notifications.map(({ id, icon, text, date }) => (
            <div
              key={id}
              className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
            >
              <div className="d-flex align-items-center">{icon}
                <span>{text}</span>
              </div>
              <small className="text-muted">({date})</small>
            </div>
          ))}
        </div>

        {/* Logout button */}
        <div className="mt-3">
          <button
            className="btn btn-danger"
            style={{ width: "200px" }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
