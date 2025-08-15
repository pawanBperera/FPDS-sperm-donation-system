
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { AdminSidebar } from "../components/Sidebars/AdminSidebar";
import { FaUser, FaUserFriends, FaHeart } from "react-icons/fa";
import "../components/Sidebars/Sidebar.css"; 
import "./AdminDashboard.css"; 
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const stored = localStorage.getItem("user");
if (stored) {
  const { token } = JSON.parse(stored);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [totals, setTotals] = useState({
    recipients: 0,
    donors: 0,
    matches: 0,
  });




 useEffect(() => {
    const fetchTotals = async () => {
      try {
        const [rRes, dRes, mRes] = await Promise.all([
          axios.get("http://localhost:8080/api/admin/analytics/total-recipients"),
          axios.get("http://localhost:8080/api/admin/analytics/total-donors"),
          axios.get("http://localhost:8080/api/admin/analytics/total-matches"),
        ]);
        setTotals({
          recipients: rRes.data.count,
          donors:      dRes.data.count,
          matches:     mRes.data.count,
        });
      } catch (err) {
        console.error("Error fetching analytics totals:", err);
      }
    };
    fetchTotals();
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




<div className="ana">
  <div
    className="dash-card dash-card-info"
    onClick={() => navigate("/admin/predict")}
    style={{ cursor: "pointer" }}
  >
    <i className="fas fa-brain dash-icon"></i>
    <div>AI Compatibility Predictor</div>
  </div>
</div>
</div>



<div className="ana"></div>
 <div className="col-md-6 col-lg-4">
  <div
    className="dash-card"
    onClick={() => navigate("/admin/prediction")}
    style={{ cursor: "pointer" }}
  >
    <div className="dash-icon">📈</div>
    <div>Prediction</div>
  </div>
</div>







        {/* Logout */}
        <button className="btn btn-logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
