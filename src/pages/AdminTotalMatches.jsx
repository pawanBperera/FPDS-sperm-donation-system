
// File: src/pages/AdminTotalMatches.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import axios from "axios";

/*
import {
  fetchAdminShortlists,
  updateShortlistStatus,
} from "../services/adminApi";
*/

import "./AdminTotalMatches.css";

// Configure axios base URL and auth header
axios.defaults.baseURL = "http://localhost:8080/api";
const stored = localStorage.getItem("user");
if (stored) {
  const { token } = JSON.parse(stored);
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default function AdminTotalMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};


//**************************************************************** */


  useEffect(() => {
  fetchPendingMatches();
}, []);

const fetchPendingMatches = async () => {
  try {
   // const res = await axios.get("/matches/status/pending");
   const res = await axios.get("/api/matches/status/pending");

    setMatches(res.data);
  } catch (err) {
    console.error("Error fetching matches:", err);
    setError("Could not load matches, Try refreshing the page");
  } finally {


    
    setLoading(false);
  }
};

const updateMatchStatus = async (matchId, newStatus) => {
  if (!window.confirm(`Are you sure you want to ${newStatus} this match?`)) return;
  try {
  //  await axios.put(`/matches/${matchId}/status?status=${newStatus}&adminId=${user.id}`);
await axios.put(`/api/matches/${matchId}/status?status=${newStatus}&adminId=${user.id}`);
    setMatches(matches.filter((m) => m.matchId !== matchId)); // remove from list after update
  } catch (err) {
    console.error(`Failed to ${newStatus}:`, err);
    alert("Failed to update status.");
  }
};




  if (loading) return <div className="p-4">Loading matches…</div>;
  if (error) return <div className="p-4 text-danger">{error}</div>;

  return (
    <div className="d-flex admin-matches-page">
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Total Matches</h1>
          <button
            className="btn btn-light btn-lg"
            onClick={() => navigate("/admin/dashboard")}
          >
            <FaHome className="icon" /> Dashboard
          </button>
        </div>

        <table className="table table-bordered matches-table">
          <thead className="table-light">
            <tr>
              <th>Recipient ID</th>
              <th>Donor ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>


         <tbody>
  {matches.map((m, index) => (
    <tr key={`${m.matchId}-${index}`}>
      <td>{m.recipientUserId}</td>
<td>{m.donorUserId}</td>

      <td>
        <span className="text-warning">{m.status}</span>
      </td>
      <td>
        <button
          className="btn btn-success btn-sm me-2"
          onClick={() => updateMatchStatus(m.matchId, "approved")}
        >
          Approve
        </button>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => updateMatchStatus(m.matchId, "rejected")}
        >
          Reject
        </button>
        <button
          className="btn btn-outline-primary btn-sm" style={{
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "6px 14px",
    background: "rgba(212, 134, 206, 1)",
    color: "white"
  }}
          onClick={() => navigate(`/admin/matches/${m.matchId}`)}
        >
          Details
        </button>
      </td>
    </tr>
  ))}
  {matches.length === 0 && (
    <tr>
      <td colSpan="4">No pending matches.</td>
    </tr>
  )}
</tbody>



        </table>
      </main>
    </div>
  );
}

