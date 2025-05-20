// File: src/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!email) {
      return setError("Please enter your email.");
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>Forgot Your Password?</h1>
      <p>Enter your email and we’ll send you a reset link.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send Email"}
        </button>
      </form>

      <p>
        <Link to="/login">Back to Log in</Link>
      </p>
    </div>
  );
}