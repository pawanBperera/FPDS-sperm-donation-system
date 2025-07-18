// File: src/pages/DonorProfileView.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import { getDonorProfile, shortlistDonor } from "../services/donorApi";
import { getAuth } from "firebase/auth";
import "./DonorProfileView.css";
import { FaUserCircle } from "react-icons/fa";

export default function DonorProfileView() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await getDonorProfile(id);
        setProfile(res.data);
      } catch (err) {
        console.error("Error loading donor profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [id]);

  async function handleSave() {
    try {
      const user = getAuth().currentUser;
      const token = await user.getIdTokenResult();
      const recipientId = token.claims?.db_id;

      if (!recipientId) {
        alert("Unable to identify recipient.");
        return;
      }

      await shortlistDonor(recipientId, profile.userId);
      alert("Donor successfully shortlisted!");
    } catch (err) {
      console.error("Error shortlisting donor:", err);
      alert("Failed to save donor.");
    }
  }

  if (loading) return <p className="loading">Loading profile…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div className="profile-view">
      <NavBar />
      <div className="layout-container">
        <RecipientSidebar />
        <main className="profile-content">
          <div className="profile-header">
            <FaUserCircle className="profile-avatar-icon" />

            <div className="profile-info">
              <h1>
                ID: D-{profile.userId}, From {profile.district}
              </h1>
              <p><strong>Age:</strong> {profile.age || "N/A"}</p>
              <p><strong>Location:</strong> {profile.city}, Sri Lanka</p>
            </div>
          </div>

          <div className="more-about">More About Me</div>

          <div className="profile-details">
            <p><strong>I'm Willing to Help couples of:</strong> {profile.willingToHelp}</p>
            <p><strong>Number of Children:</strong> {profile.numberOfChildren}</p>
            <p><strong>Nationality:</strong> {profile.nationality}</p>
            <p><strong>City:</strong> {profile.city}</p>
            <p><strong>District:</strong> {profile.district}</p>
            <p><strong>Race:</strong> {profile.race}</p>
            <p><strong>Religion:</strong> {profile.religion}</p>
            <p><strong>Education:</strong> {profile.education}</p>
            <p><strong>Spoken Languages:</strong> {profile.spokenLanguages}</p>
            <p><strong>Smoker:</strong> {profile.smoker ? "Yes" : "No"}</p>
            <p><strong>Blood Type:</strong> {profile.bloodType}</p>
            <p><strong>Height:</strong> {profile.heightCm} cm</p>
            <p><strong>Weight:</strong> {profile.weightKg} kg</p>
            <p><strong>Hair Color:</strong> {profile.hairColor}</p>
            <p><strong>Eye Color:</strong> {profile.eyeColor}</p>
            <p><strong>Has been a sperm donor before:</strong> {profile.hadBeenDonor ? "Yes" : "No"}</p>
            <p><strong>Marital Status:</strong> {profile.maritalStatus}</p>
          </div>

          <button className="btn-save" onClick={handleSave}>Save</button>
        </main>
      </div>
    </div>
  );
}
