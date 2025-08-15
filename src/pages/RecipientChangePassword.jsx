 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import { auth } from "../firebase/firebaseConfig";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
//import "./RecipientChangePassword.css"; 

export default function RecipientChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigate("/recipient/account-settings");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("All fields are required.");
    }
    if (newPassword !== confirmPassword) {
      return setError("New passwords do not match.");
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      // Reauthenticate with current password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update to new password
      await updatePassword(user, newPassword);

      alert("Password changed successfully!");
      navigate("/recipient/account-settings");
    } catch (err) {
      console.error("Change password error:", err);
      if (err.code === "auth/wrong-password") {
        setError("Current password is incorrect.");
      } else {
        setError("Failed to change password. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top navbar */}
      <NavBar />

      {/* Sidebar + main */}
    <div
  className="recipient-dashboard"
  style={{ marginLeft: "240px", paddingTop: "64px", minHeight: "100vh" }}
>


        <RecipientSidebar />

        <main className="flex-grow-1 p-4">
          <h1>Change Password</h1>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit} className="change-password-form">
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password Again</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating…" : "Update"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}