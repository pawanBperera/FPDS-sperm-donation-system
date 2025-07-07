// File: src/pages/AdminMatchDetail.jsx


// line-> 6, 12, 31 to 32, 48 need changes, un comments the once thats been comment

import React, { useState, useEffect } from "react";
//import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
//import AdminSidebar from "../components/Sidebars/AdminSidebar";
import "./AdminMatchDetail.css";

//';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
import { mockMatchDetail } from "../utils/fakeApi";
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

export default function AdminMatchDetail() {
  const { matchId } = useParams();
  const navigate    = useNavigate();

  const [match, setMatch]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    async function fetchMatch() {
      try {
        //const res = await axios.get(`/api/matches/${matchId}`);
        //setMatch(res.data);

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

const data = await mockMatchDetail(matchId);
setMatch(data)

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

      } catch (err) {
        console.error("Failed to load match:", err);
        setError("Could not load match details.");
      } finally {
        setLoading(false);
      }
    }
    fetchMatch();
  }, [matchId]);

  const handleAction = async (newStatus) => {
    try {
     // await axios.put(`/api/matches/${matchId}`, { status: newStatus });
      navigate("/admin/matches"); // go back to list after action
    } catch (err) {
      console.error(`Failed to ${newStatus}:`, err);
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;
  if (error)   return <div className="p-4 text-danger">{error}</div>;
  if (!match)  return <div className="p-4">Match not found.</div>;

  const { recipient, donor, genetic_risk, summary } = match;

  return (
    <div className="d-flex admin-match-detail-page">
      

      <main className="flex-grow-1 p-4">
        {/* Back & Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Match Detail</h1>
          <button
            className="btn btn-light"
            onClick={() => navigate("/admin/matches")}
          >
            ← Back to Matches
          </button>
        </div>

        {/* Detail Card */}
        <div className="match-detail-card p-4 mb-4">
          {/* Recipient Info */}
          <section className="mb-3">
            <h2>Recipient Info</h2>
            <p><strong>Age:</strong> {recipient.age}</p>
            <p><strong>Province:</strong> {recipient.province || "—"}</p>
            <p><strong>Genetic Condition:</strong> {recipient.genetic_condition}</p>
          </section>

          {/* Donor Info */}
          <section className="mb-3">
            <h2>Donor Info</h2>
            <p><strong>Age:</strong> {donor.age}</p>
            <p><strong>Province:</strong> {donor.province || "—"}</p>
            <p><strong>Genetic Screening:</strong> {donor.genetic_screening}</p>
          </section>

          {/* Summary & Actions */}
          <section>
            <h2>Summary</h2>
            <p className="mb-4">{summary}</p>
            <button
              className="btn btn-success me-3"
              onClick={() => handleAction("approved")}
            >
              Approve Match
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleAction("rejected")}
            >
              Reject Match
            </button>
          </section>
        </div>

        {/* Footer Buttons */}
        <div className="d-flex gap-3">

         {/* <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/admin/matches")}
          >
            Matches
          </button>*/} 

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}