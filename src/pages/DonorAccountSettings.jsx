
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { DonorSidebar } from "../components/Sidebars/DonorSidebar";
import "./DonorAccountSettings.css";

export default function DonorAccountSettings() {
  const navigate = useNavigate();
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigate("/donor/dashboard");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentPwd || !newPwd || !confirmPwd) {
      return setError("Please fill in all fields.");
    }
    if (newPwd !== confirmPwd) {
      return setError("New passwords do not match.");
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      // Re-authenticate with current password
      const cred = EmailAuthProvider.credential(user.email, currentPwd);
      await reauthenticateWithCredential(user, cred);

      // Update to new password
      await updatePassword(user, newPwd);

      alert("Password updated successfully!");
      navigate("/donor/dashboard");
    } catch (err) {
      console.error("Password change error:", err);
      setError(
        err.code === "auth/wrong-password"
          ? "Current password is incorrect."
          : "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };






  

  return (
    <div
  className="donor-page"
  style={{ marginLeft: "240px", minHeight: "100vh" }}
>
      <DonorSidebar />

      <main className="flex-grow-1 p-4">
        <h1 className="mb-4">Change Password</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleUpdate} className="password-form" style={{ maxWidth: "500px" }}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password again</label>
            <input
              type="password"
              className="form-control"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
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
  );
}