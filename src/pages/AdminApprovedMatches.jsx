
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBell } from "react-icons/fa";
import axios from "axios";
import "./AdminApprovedMatches.css";


axios.defaults.baseURL = "http://localhost:8080";
const stored = localStorage.getItem("user");
if (stored) {
  const { token } = JSON.parse(stored);
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}



export default function AdminApprovedMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApproved() {
      try {
        const res = await axios.get("/api/matches/status/approved");


        setMatches(res.data);
      } catch (err) {
        console.error("Failed to load approved matches:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchApproved();
  }, []);

  const handleUndo = async (matchId) => {
  if (!window.confirm("Move this match back to pending?")) return;
  try {
    await axios.put(`/api/matches/${matchId}/status?status=pending&adminId=1`);
    setMatches(matches.filter((m) => m.matchId !== matchId));
  } catch (err) {
    console.error("Failed to undo match:", err);
    alert("Failed to update status.");
  }
};

  if (loading) return <div className="p-4">Loading approved matches…</div>;

  return (
    <div className="d-flex admin-matches-page">
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Approved Matches</h1>
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
          className="btn btn-warning btn-sm ms-1"
          onClick={() => handleUndo(m.matchId)}
        >
          Undo The action
        </button>

        <button
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={() => navigate(`/admin/matches/${m.matchId}`)}
        >
          Details of this match
        </button>


      </td>
    </tr>
  ))}
  {matches.length === 0 && (
    <tr>
      <td colSpan="3">No approved matches.</td>
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