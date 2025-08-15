
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import DonorProfileCard from "../components/DonorProfileCard";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "./RecipientMatches.css";

export default function RecipientMatches() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShortlist() {
      try {
        setLoading(true);

        

        const res = await axios.get(`/api/recipients/${user.id}/shortlisted-donors`);
        console.log("🔥 Shortlisted raw:", res.data);

const donorIds = res.data
  .map(item => item.id?.donor_id)
  .filter(id => id !== undefined && id !== null);


console.log("✅ Donor IDs to fetch:", donorIds);

        const donorProfiles = await Promise.all(
          
          donorIds.map(async id => {
            try {
              const res = await axios.get(`/api/donors/${id}`);
              return res.data;
            } catch (err) {
              console.warn("Failed to fetch donor:", id, err);
              return null;
            }
            
          })
          
        );
console.log("📦 Donor profiles loaded:", donorProfiles);
        

console.log("🎯 Final matched profiles:", donorProfiles.filter(profile => profile !== null));

        setMatches(donorProfiles.filter(profile => profile !== null));
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
      await axios.delete(`/api/recipients/${user.id}/shortlist/${donorId}`);
      setMatches(matches.filter((m) => m.user_id !== donorId));
    } catch (err) {
      console.error("Remove error:", err);
      alert("Failed to remove. Try again.");
    }
  };

  return (
    <>
      <NavBar />

      
    
        <RecipientSidebar />
<div className="matches-wrapper">
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
    <div key={donor.user_id} className="donor-card-wrapper mb-3">
      <DonorProfileCard donor={donor} />
      <button
        className="btn btn-outline-danger mt-2"
        onClick={() => handleRemove(donor.user_id)}
      >
        Remove this donor
      </button>
    </div>
  ))}
</div>
          
        </main>
      </div>
    </>
  );
}
