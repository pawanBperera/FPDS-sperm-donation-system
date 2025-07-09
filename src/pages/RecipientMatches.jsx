// File: src/pages/RecipientMatches.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import DonorProfileCard from "../components/DonorProfileCard";  // ADDED import
import { getDonors } from "../services/donorApi";                // ADDED import
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "./RecipientMatches.css";

export default function RecipientMatches() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    async function fetchShortlist() {
      try {
        setLoading(true);                                  // UPDATED: show loading
        // FETCH donor profiles instead of raw shortlist data
        const res = await getDonors();                     // UPDATED: use donorApi
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
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
              <DonorProfileCard key={donor.userId} donor={donor} /> // UPDATED: use donor shape
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
