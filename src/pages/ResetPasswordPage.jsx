
import React, { useState, useEffect } from "react";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("oobCode") || "";
  const [validCode, setValidCode] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Verify the reset code on mount
  useEffect(() => {
    if (!code) {
      setError("No reset code provided.");
      return;
    }
    verifyPasswordResetCode(auth, code)
      .then(() => setValidCode(true))
      .catch(() => setError("Invalid or expired code."));
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!newPass || newPass !== confirmPass) {
      return setError("Passwords must match and not be empty.");
    }
    setLoading(true);
    try {
      await confirmPasswordReset(auth, code, newPass);
      alert("Password updated! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error && !validCode) {
    return (
      <div className="auth-page">
        <h1>Reset Password</h1>
        <p className="error-text">{error}</p>
        <p>
          <a href="/forgot-password">Request a new link</a>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>New Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <label>Re-enter New Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Updating…" : "Update"}
        </button>
      </form>
    </div>
  );
}