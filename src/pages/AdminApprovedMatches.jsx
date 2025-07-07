// File: src/pages/AdminApprovedMatches.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBell } from "react-icons/fa";
import axios from "axios";
import "./AdminApprovedMatches.css";

export default function AdminApprovedMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApproved() {
      try {
        const res = await axios.get("/api/matches", {
          params: { status: "approved" },
        });
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
    try {
      await axios.put(`/api/matches/${matchId}`, { status: "pending" });
      setMatches((ms) => ms.filter((m) => m.id !== matchId));
    } catch (err) {
      console.error("Failed to undo match:", err);
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
              <th>Genetic Risk</th>
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
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUndo(m.id)}
                  >
                    Undo
                  </button>
                </td>
              </tr>
            ))}
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