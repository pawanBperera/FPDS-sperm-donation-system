// File: src/pages/RecipientApprovedMatches.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import axios from "axios";
import { FaHeart, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import "./RecipientApprovedMatches.css";

export default function RecipientApprovedMatches() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [approvedMatches, setApprovedMatches] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    async function fetchApproved() {
      try {
        const res = await axios.get(
          `/api/recipients/${user.id}/matches`,
          { params: { status: "approved" } }
        );
        setApprovedMatches(res.data);
      } catch (err) {
        console.error("Error fetching approved matches:", err);
        setError("Unable to load approved matches.");
      } finally {
        setLoading(false);
      }
    }
    fetchApproved();
  }, [user.id]);

  return (
    <>
      <NavBar />
      <div className="d-flex vh-100">
        <RecipientSidebar />
        <main className="flex-grow-1 p-4">
          <h1 className="d-flex align-items-center mb-4">
            <FaHeart className="me-2 text-primary" />
            Your Approved Matches
          </h1>

          {loading && <p>Loading approved matches…</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && approvedMatches.length === 0 && (
            <p>You have no approved matches yet.</p>
          )}

          <div className="approved-list">
            {approvedMatches.map((donor) => (
              <div
                key={donor.donor_id}
                className="card mb-3 recipient-match-card"
              >
                <div className="row g-0">
                  <div className="col-md-4 p-3">
                    <h4>{donor.donor_id}</h4>
                    <p>
                      {donor.ethnicity}, from {donor.city}
                    </p>
                  </div>
                  <div className="col-md-5 p-3">
                    <div className="bg-light border rounded p-3 donor-detail-box">
                      <p>
                        <strong>Age:</strong> {donor.age}
                      </p>
                      <p>
                        <strong>Location:</strong> {donor.city},{" "}
                        {donor.province}
                      </p>
                      <p>
                        <strong>Date registered:</strong>{" "}
                        {new Date(donor.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-end p-3">
                    <button
                      className="btn btn-outline-secondary mb-2"
                      onClick={() =>
                        navigate(`/donor/profile/${donor.donor_id}`)
                      }
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {approvedMatches.length > 0 && (
            <>
              <div className="alert alert-secondary d-flex align-items-start mt-4 approved-msg-box">
                <FaCheckCircle className="me-2 text-success" />
                <div>
                  Your match has been approved by the clinic. Please contact
                  the clinic to proceed with the next steps. You will be
                  informed of appointment dates and further instructions
                  soon.
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 appointment-pending">
                <FaCalendarAlt className="me-2 text-secondary" />
                <span>Appointment Pending</span>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}