// File: src/pages/RecipientMatches.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "./RecipientMatches.css"; // create for any tweaks

export default function RecipientMatches() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    async function fetchShortlist() {
      try {
        const res = await axios.get(`/api/recipients/${user.id}/shortlist`);
        // Expecting res.data = [ { donor_id, age, city, province, created_at, ethnicity }, ... ]
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching shortlist:", err);
        setError("Could not load your matches yet.");
      } finally {
        setLoading(false);
      }
    }
    fetchShortlist();
  }, [user.id]);

  const handleRemove = async (donorId) => {
    if (!window.confirm("Remove this donor from your matches?")) return;
    try {
      await axios.delete(
        `/api/recipients/${user.id}/shortlist/${donorId}`
      );
      setMatches(matches.filter((m) => m.donor_id !== donorId));
    } catch (err) {
      console.error("Remove error:", err);
      alert("Failed to remove. Try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex vh-100">
        <RecipientSidebar />

        <main className="flex-grow-1 p-4">
          <h1 className="d-flex align-items-center mb-4">
            <FaHeart className="me-2 text-primary" />
            Matched Donors
          </h1>

          {loading && <p>Loading your matches…</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && matches.length === 0 && (
            <p>You have no saved matches yet.</p>
          )}

          <div className="matches-list">
            {matches.map((donor) => (
              <div key={donor.donor_id} className="card mb-3 recipient-match-card">
                <div className="row g-0">
                  {/* Left info */}
                  <div className="col-md-4 p-3">
                    <h4>{donor.donor_id}</h4>
                    <p>{donor.ethnicity}, from {donor.city}</p>
                  </div>

                  {/* Detail box */}
                  <div className="col-md-5 p-3">
                    <div className="bg-light border rounded p-3 donor-detail-box">
                      <p><strong>Age:</strong> {donor.age}</p>
                      <p><strong>Location:</strong> {donor.city}, {donor.province}</p>
                      <p><strong>Date registered:</strong> {new Date(donor.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-end p-3">
                    <button
                      className="btn btn-outline-secondary mb-2"
                      onClick={() => navigate(`/donor/profile/${donor.donor_id}`)}
                    >
                      Profile
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(donor.donor_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
