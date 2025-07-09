// File: src/components/DonorProfileCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./DonorProfileCard.css";

/**
 * DonorProfileCard
 * Props:
 *  - donor: { userId, race, city, district, age, createdAt }
 */
export default function DonorProfileCard({ donor }) {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/donors/${donor.userId}`);
  };
  
  // Format registration date
  const registeredDate = new Date(donor.createdAt).toLocaleDateString();
  
  return (
    <div className="donor-profile-card">
      {/* Left side: ID and subtext */}
      <div className="card-left">
        <div className="donor-id">D-{donor.userId}</div>
        <div className="donor-subtext">{donor.race}, from {donor.city}</div>
      </div>

      {/* Right side: info box and button */}
      <div className="card-right">
        <div className="info-box">
          <p><strong>Age:</strong> {donor.age}</p>
          <p><strong>Location:</strong> {donor.city}, {donor.district}</p>
          <p><strong>Date registered:</strong> {registeredDate}</p>
        </div>
        <button className="btn-profile" onClick={handleViewProfile}>
          Profile
        </button>
      </div>
    </div>
  );
}
