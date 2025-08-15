
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import axios from "axios";
import { FaHeart, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import "./RecipientApprovedMatches.css";
//import "./DonorDashboard.css";

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
          `/api/matches/recipients/${user.id}`,
          { params: { status: "approved" } }
        );
        setApprovedMatches(res.data);
        console.log("API Response for Approved Matches:", res.data);
      } catch (err) {
        console.error("Error fetching approved matches:", err);
        setError("Unable to load approved matches.");
      } finally {
        setLoading(false);
      }
    }
    fetchApproved();
  }, [user.id]);

  console.log("Current approvedMatches state:", approvedMatches);


  return (
    
    <>
      <NavBar />
      <div className="d-flex vh-100">
        <RecipientSidebar />
        <main className="flex-grow-1 p-4 p-1">
          <h1 className="d-flex align-items-center mb-4">
            <FaHeart className="me-2 text-primary" />
             Approved Matches Details
          </h1>

          {loading && <p>Loading approved matches…</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && approvedMatches.length === 0 && (
            <p>You have no approved matches yet.</p>
          )}

          {approvedMatches.length > 0 && (
  <>
    <div className="alert alert-light border shadow-sm p-3 d-flex align-items-start mb-3" style={{ maxWidth: "600px" }}>
      <FaCheckCircle className="me-2 text-success" size={22} />
      <div>
        The match you requested has been approved. Kindly reach out to the clinic for more information.
      </div>
    </div>

    <div className="d-flex align-items-center mt-2">
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