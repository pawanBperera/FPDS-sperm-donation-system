// File: src/pages/RecipientAccountSettings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import { auth } from "../firebase/firebaseConfig";
import {
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser as firebaseDeleteUser,
} from "firebase/auth";
import axios from "axios";
import "./RecipientAccountSettings.css";

export default function RecipientAccountSettings() {
  const navigate = useNavigate();
  const rawUser = JSON.parse(localStorage.getItem("user")) || {};
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(rawUser.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch current username & email
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        // Grab Firebase ID token for backend auth
        const token = await currentUser.getIdToken();
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { firebase_uid: rawUser.firebase_uid },
        };

        const res = await axios.get("/api/users/me", config);
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
      } catch (err) {
        console.error("Error fetching account data:", err);
        setError("Failed to load account settings. Please try again.");
      }
    }
    fetchUser();
  }, [rawUser.firebase_uid]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const token = await currentUser.getIdToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params:  { firebase_uid: rawUser.firebase_uid }
      };

      // 1) Update username in backend
      await axios.put(
        "/api/users/me",
        { username },
        config
      );

      // 2) If email changed, reauthenticate & update Firebase
      if (email !== rawUser.email) {
        const password = prompt(
          "Enter your current password to confirm email change:"
        );
        if (!password) throw new Error("Password is required.");
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updateEmail(currentUser, email);
      }

      // 3) Persist updated user data locally
      const updatedUser = { ...rawUser, username, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Account settings updated.");
      navigate("/recipient/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message || "Failed to update account settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;
    setLoading(true);

    try {
      // Delete from backend
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { firebase_uid: rawUser.firebase_uid },
      };
      await axios.delete("/api/users/me", config);

      // Delete from Firebase
      await firebaseDeleteUser(currentUser);
      localStorage.removeItem("user");
      navigate("/signup");
    } catch (err) {
      console.error("Delete account error:", err);
      setError("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div
  className="recipient-dashboard"
  style={{ marginLeft: "240px", paddingTop: "64px", minHeight: "110vh" }}
>


        <RecipientSidebar />
        <main className="flex-grow-1 p-4">
          <h1>Account Settings</h1>

          {error && <p className="text-danger">{error}</p>}

          <form onSubmit={handleUpdate} className="account-form">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Password {" "}
                <button
                  type="button"
                  className="btn btn-link p-0 align-baseline"
                  onClick={() => navigate("/recipient/change-password")}
                >
                  Change Password
                </button>
              </label>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete My Account
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
