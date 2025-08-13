// File: src/pages/AdminRejectedMatches.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import "./AdminRejectedMatches.css";

axios.defaults.baseURL = "http://localhost:8080";
const stored = localStorage.getItem("user");
if (stored) {
  const { token } = JSON.parse(stored);
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : {};

export default function AdminRejectedMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRejected() {
      try {
        const res = await axios.get("/api/matches/status/rejected");
       setMatches(res.data);
        setMatches(res.data);
      } catch (err) {
        console.error("Failed to load rejected matches:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRejected();
  }, []);



  const handleUndo = async (matchId) => {
  try {
    // 1) Call the status‐update endpoint with query params
    await axios.put(`/api/matches/${matchId}/status?status=pending&adminId=${user.id}`);





    // 2) Re‐fetch the “rejected” list so the UI stays in sync
    const res = await axios.get("/api/matches/status/rejected");
    setMatches(res.data);

  } catch (err) {
    console.error("Failed to undo rejection:", err);
  }
};




  if (loading) return <div className="p-4">Loading rejected matches…</div>;

  return (
    <div className="d-flex admin-matches-page">
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Rejected Matches</h1>
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
              <th>Actions</th>

            </tr>
          </thead>

         <tbody>
  {matches.map((m, index) => (
    <tr key={`${m.matchId}-${index}`}>
      <td>{m.recipientId}</td>
      <td>{m.donorId}</td>
      <td>
        <button
          className="btn btn-warning btn-sm"
          onClick={() => handleUndo(m.matchId)}
        >
          Undo
        </button>
        <button
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={() => navigate(`/admin/matches/${m.matchId}`)}
        >
          Details
        </button>
      </td>
    </tr>
  ))}
  {matches.length === 0 && (
    <tr>
      <td colSpan="3">No rejected matches.</td>
    </tr>
  )}
</tbody>


        </table>

        <button
          className="btn btn-pink mt-4"
          onClick={() => navigate("/admin/matches")}
        >
          Back to All Matches
        </button>
      </main>
    </div>
  );
}