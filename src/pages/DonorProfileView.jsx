// File: src/pages/DonorProfileView.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import { getDonorProfile, shortlistDonor } from "../services/donorApi";
import "./DonorProfileView.css";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";


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
        const data = res.data;
const mappedProfile = {
  userId: data.user_id,
  willingToHelp: data.willing_to_help,
  numberOfChildren: data.number_of_children || "N/A",
  city: data.city,
  district: data.district,
  race: data.race,
  nationality: data.nationality,
  religion: data.religion,
  education: data.education,
  spokenLanguages: data.spoken_languages || "Not specified",
  smoker: data.smoker,
  bloodType: data.blood_type || "Unknown",
  heightCm: data.height_cm || "—",
  weightKg: data.weight_kg || "—",
  hairColor: data.hair_color,
  eyeColor: data.eye_color,
  maritalStatus: data.marital_status,
  hadBeenDonor: data.had_been_donor,
  age: data.age || "N/A"
};
setProfile(mappedProfile);


        console.log("👤 Donor Profile loaded:", res.data);

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
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
      toast.error("Unable to identify recipient. Please login again.");
      return;
    }

      console.log("💾 Saving donor: recipientId =", user.id, ", donorUserId =", profile.userId);


      await shortlistDonor(user.id, profile.userId);


     toast.success("Donor successfully shortlisted!", {
  className: "my-toast-class"
});


  } catch (err) {
    console.error("Error shortlisting donor:", err);
    toast.error("Failed to save donor.");
  }
  }

  if (loading) return <p className="loading">Loading profile…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
<>
  <NavBar />
  <RecipientSidebar />

  <div
    className="profile-view"
    style={{
      marginLeft: "240px",
      paddingTop: "64px",
      minHeight: "100vh",
      position: "relative",
      zIndex: 0,
    }}
  >
    <main
      className="profile-content"
      style={{
        padding: "2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
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
</>
  );
}
