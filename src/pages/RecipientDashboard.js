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
  FaClock,
} from "react-icons/fa";
import "./RecipientDashboard.css";

export default function RecipientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [matchesSaved, setMatchesSaved] = useState(0);
  const [profileComplete, setProfileComplete] = useState(false);
  const [screeningComplete, setScreeningComplete] = useState(false);
  //const [approvedExists, setApprovedExists] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [lastPwdChange, setLastPwdChange] = useState("");

  useEffect(() => {
    async function fetchStats() {
      // 1) Matches saved count
      const shortlistRes = await axios.get(
        `/api/recipients/${user.id}/shortlist`
      );
      setMatchesSaved(shortlistRes.data.length);

      // 2) Profile completeness
      const profileRes = await axios.get(
        `/api/recipients/${user.id}/profile`
      );
      const p = profileRes.data;
      setProfileComplete(
        p.first_name && p.last_name && p.date_of_birth && p.ethnicity
      );

      // 3) Screening completeness
      const medRes = await axios.get(
        `/api/recipients/${user.id}/medical`
      );
      setScreeningComplete(
        medRes.data.medical_consent && medRes.data.diseases_json?.length > 0
      );

      // 4) Approved match exists?
   /*   const matchRes = await axios.get(
        `/api/recipients/${user.id}/matches`,
        { params: { status: "approved" } }
      );
      setApprovedExists(matchRes.data.length > 0);*/

      // 5) Last login & password change times
      const currentUser = auth.currentUser;
      setLastLogin(currentUser.metadata.lastSignInTime);
      // password change timestamp not in metadata; placeholder:
      setLastPwdChange("10d ago");
    }
    fetchStats();
  }, [user.id]);

  const displayName = user.firstName || user.email.split("@")[0];

  return (
    <>
      <NavBar />
      <div className="d-flex vh-100">
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
                  Your Profile Info:{" "}
                  {profileComplete ? "✔️" : "Not Completed ❌"}
                </div>
              </div>
            </div>

            {/* Screening */}
            <div className="col-md-6 col-lg-4">
              <div
                className={
                  "dash-card " +
                  (screeningComplete
                    ? "dash-card-success"
                    : "dash-card-warning")
                }
                onClick={() => navigate("/recipient/medical")}
              >
                <FaVial className="dash-icon dash-icon-vial" />
                <div>
                  Screening:{" "}
                  {screeningComplete ? "✔️" : "Not Completed ❌" } 
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

            {/* Last Login / Password Change */}
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
