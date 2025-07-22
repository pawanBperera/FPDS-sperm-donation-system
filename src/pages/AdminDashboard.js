// File: src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import { AdminSidebar } from "../components/Sidebars/AdminSidebar";
import { FaUser, FaUserFriends, FaHeart } from "react-icons/fa";
//import "../components/Sidebars/Sidebar.css"; // ensure sidebar CSS
import "./AdminDashboard.css"; // create for custom styles as needed


export default function AdminDashboard() {
  const navigate = useNavigate();
 // const user = JSON.parse(localStorage.getItem("user")) || {};
  const [totals, setTotals] = useState({
    recipients: 0,
    donors: 0,
    matches: 0,
  });





 useEffect(() => {
  const fetchSummary = async () => {
    try {
      const res = await axios.get("/api/analytics/summary");
      setTotals({
        recipients: res.data.total_recipients,
        donors: res.data.total_donors,
        matches: res.data.total_matches,
      });
    } catch (err) {
      console.error("Error fetching admin summary:", err);
    }
  };
  fetchSummary();
}, []);







  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
      <div className="admin-page" style={{ marginLeft: "240px", minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        {/* Analytics Cards */}
        <div className="d-flex gap-3 mb-4">
          <div
            className="analytics-card"
            onClick={() => navigate("/admin/recipients")}
          >
            <FaUser className="analytics-icon" />
            <span>Total Recipients: {totals.recipients}</span>
          </div>
          <div
            className="analytics-card"
            onClick={() => navigate("/admin/donors")}
          >
            <FaUserFriends className="analytics-icon" />
            <span>Total Donors: {totals.donors}</span>
          </div>
          <div
            className="analytics-card"
            onClick={() => navigate("/admin/matches")}
          >
            <FaHeart className="analytics-icon" />
            <span>Total Matches: {totals.matches}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-3 mb-4">
          <button
            className="btn btn-add-donor"
            onClick={() => navigate("/admin/add-donor")}
          >
            Add Donor
          </button>
          <button
            className="btn btn-approved"
            onClick={() => navigate("/admin/matches/approved")}
          >
            Approved
          </button>
          <button
            className="btn btn-rejected"
            onClick={() => navigate("/admin/matches/rejected")}
          >
            Rejected
          </button>
        </div>

        {/* Logout */}
        <button className="btn btn-logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
