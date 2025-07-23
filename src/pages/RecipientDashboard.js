// File: src/pages/RecipientDashboard.jsx
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import {
  FaHeart,
  FaUser,
  FaVial,
  FaCheckCircle,
  //FaClock,
} from "react-icons/fa";
import "./RecipientDashboard.css";


export default function RecipientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [matchesSaved, setMatchesSaved] = useState(0);
  const [profileComplete, setProfileComplete] = useState(false);
  const [screeningComplete, setScreeningComplete] = useState(false);
  //const [approvedExists, setApprovedExists] = useState(false);
  //const [lastLogin, setLastLogin] = useState("");
  //const [lastPwdChange, setLastPwdChange] = useState("");

 /* useEffect(() => {
    async function fetchStats() {
      const currentUser = auth.currentUser;
      if (!currentUser) return; // nobody’s signed in

      // 1) Grab a fresh Firebase JWT
      const token = await currentUser.getIdToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // 2) Matches saved count
      const shortlistRes = await axios.get(
        `/api/recipients/${user.id}/shortlist`,
        config
      );
      setMatchesSaved(shortlistRes.data.length);

      // 3) Profile completeness
      const profileRes = await axios.get(
        `/api/recipients/${user.id}/profile`,
        config
      );
      const p = profileRes.data;
      
      setProfileComplete(
        (p.first_name || p.firstName) && 
        (p.last_name || p.lastName) &&
        (p.date_of_birth || p.dateOfBirth) &&
        p.ethnicity 
      );

      // 4) Screening completeness
      const medRes = await axios.get(
        `/api/recipients/${user.id}/medical`,
        config
      );
      setScreeningComplete(
        medRes.data.medical_consent && medRes.data.diseases_json?.length > 0
      );

      // 5) Timestamps (removed per request)
      // setLastLogin(currentUser.metadata.lastSignInTime);
      // setLastPwdChange("10d ago");
    }

    fetchStats();
  }, [user.id]);*/

  useEffect(() => {
  async function fetchStats() {
    // grab token if we have a signed-in user, otherwise leave headers empty
    let config = {};
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers = { Authorization: `Bearer ${token}` };
    }

    // 2) Matches saved count
    try {
      const shortlistRes = await axios.get(
        `/api/recipients/${user.id}/shortlist`,
        config
      );
      setMatchesSaved(shortlistRes.data.length);
    } catch (e) {
      console.error("Error fetching matches:", e);
    }

    // 3) Profile completeness
    try {
      const profileRes = await axios.get(
        `/api/recipients/${user.id}/profile`,
        config
      );
      const p = profileRes.data;
      console.log("🔥 PROFILE PAYLOAD:", p);
      setProfileComplete(
        (p.first_name || p.firstName) &&
        (p.last_name  || p.lastName)  &&
        (p.date_of_birth || p.dateOfBirth) &&
        p.ethnicity
      );
    } catch (e) {
      console.error("Error fetching profile:", e);
    }

    // 4) Screening completeness
    try {
      const medRes = await axios.get(
        `/api/recipients/${user.id}/medical`,
        config
      );
      setScreeningComplete(
        medRes.data.medical_consent && medRes.data.diseases_json?.length > 0
      );
    } catch (e) {
      console.error("Error fetching medical:", e);
    }
  }

  fetchStats();
}, [user.id]);


  const displayName = user.firstName || user.username ;

  return (
    <>
      <NavBar />
  
 <div
  className="recipient-dashboard"
  style={{ marginLeft: "240px", paddingTop: "64px", minHeight: "100vh" }}
>




        <RecipientSidebar />
        
        <main className="flex-grow-1 p-4">
          <h1 className="mb-3">
            Welcome back, {displayName}{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="lead">
            Your intended parent profile can connect you with donors that wish
            to give the gift of parenthood to a deserving person like yourself.
          </p>

          {/* Notification Sections */}
          {!profileComplete && (
            <div className="alert alert-warning" role="alert">
              Please complete your profile to improve matching.
            </div>
          )}
          {!screeningComplete && (
            <div className="alert alert-info" role="alert">
              Please complete your medical screening to see all matches.
            </div>
          )}

          <div className="row g-4 mt-4">
            {/* Matches Saved */}
            <div className="col-md-6 col-lg-4">
              <div
                className="dash-card dash-card-primary"
                onClick={() => navigate("/recipient/matches")}
              >
                <FaHeart className="dash-icon dash-icon-heart" />
                <div>
                  Matches: <strong>{matchesSaved}</strong> Saved
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="col-md-6 col-lg-4">
              <div
                className={
                  "dash-card " +
                  (profileComplete ? "dash-card-success" : "dash-card-warning")
                }
                onClick={() => navigate("/recipient/profile")}
              >
                <FaUser className="dash-icon dash-icon-user" />
                <div>
                  Your Profile Info: {profileComplete ? "✔️" : "Not Completed ❌"}
                </div>
              </div>
            </div>

            {/* Screening */}
            <div className="col-md-6 col-lg-4">
              <div
                className={
                  "dash-card " +
                  (screeningComplete ? "dash-card-success" : "dash-card-warning")
                }
                onClick={() => navigate("/recipient/medical")}
              >
                <FaVial className="dash-icon dash-icon-vial" />
                <div>
                  Screening: {screeningComplete ? "✔️" : "Not Completed ❌"}
                </div>
              </div>
            </div>

            {/* Approved Match */}
            <div className="col-md-6 col-lg-4">
              <div
                className="dash-card dash-card-success"
                onClick={() => navigate("/recipient/approved-match")}
              >
                <FaCheckCircle className="dash-icon dash-icon-check" />
                <div>Your Approved Match</div>
              </div>
            </div>

            {/* Last Login / Password Change (removed) */}
            {/*
            <div className="col-md-6 col-lg-8">
              <div className="dash-card dash-card-info">
                <FaClock className="dash-icon dash-icon-clock" />
                <div>
                  Last login: {lastLogin}
                  <br />
                  Last password change: {lastPwdChange}
                </div>
              </div>
            </div>
            */}
          </div>

          <button
            className="btn btn-danger mt-4"
            onClick={() => {
              auth.signOut();
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </main>
      </div>
    </>
  );
}
