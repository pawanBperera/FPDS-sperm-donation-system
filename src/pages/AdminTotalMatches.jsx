// File: src/pages/AdminTotalMatches.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell, FaHome } from "react-icons/fa";
// import AdminSidebar from "../components/Sidebars/AdminSidebar"; // Uncomment if needed
import "./AdminTotalMatches.css";

export default function AdminTotalMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get("/api/matches/status/pending");
      setMatches(res.data);
    } catch (err) {
      console.error("Failed to load matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (matchId, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this match?`)) return;

    try {
      await axios.put(`/api/matches/${matchId}/status`, null, {
        params: {
          status: newStatus,
          adminId: user.id,
        },
      });
      // Remove the updated match from current list
      setMatches((prev) => prev.filter((m) => m.id !== matchId));
    } catch (err) {
      console.error(`Failed to ${newStatus} match`, err);
      alert("Failed to update match status.");
    }
  };

  if (loading) return <div className="p-4">Loading matches…</div>;

  return (
    <div className="d-flex admin-matches-page">
      {/* <AdminSidebar /> */}

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
              <th>Genetic Risk</th>
              <th>Match Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id}>
                <td>{m.recipient_id}</td>
                <td>{m.donor_id}</td>
                <td>
                  {m.genetic_risk === "compatible" ? (
                    <span className="text-success">Compatible</span>
                  ) : (
                    <span className="text-danger">
                      <FaBell /> Risk
                    </span>
                  )}
                </td>
                <td>{m.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(m.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction(m.id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
