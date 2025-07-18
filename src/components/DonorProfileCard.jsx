// File: src/components/DonorProfileCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./DonorProfileCard.css";

export default function DonorProfileCard({ donor }) {
  const navigate = useNavigate();

  // Confirmed backend sends `user_id`, not `userId` or `id`
  const donorId = donor.user_id;

  if (!donorId) {
    console.error("❌ donorId is missing for donor:", donor);
    return null;
  }

  const { race, city, district, age, createdAt } = donor;

  const registeredDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "";

  return (
    <div className="donor-profile-card">
      <div className="card-left">
        <div className="donor-id">D-{donorId}</div>
        <div className="donor-subtext">
          {race}, from {city}
        </div>
      </div>

      <div className="card-right">
        <div className="info-box">
          <p>
            <strong>Age:</strong> {age ?? "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {city}, {district}
          </p>
          <p>
            <strong>Date registered:</strong> {registeredDate}
          </p>
        </div>

        <button
          className="btn-profile"
          onClick={() => navigate(`/donors/${donorId}`)}
        >
          Profile
        </button>
      </div>
    </div>
  );
}
