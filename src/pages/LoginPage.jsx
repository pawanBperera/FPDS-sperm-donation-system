// File: src/pages/LoginPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { mockUserByUID } from "../utils/fakeApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);

    try {
      // 1) Firebase login
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUid = userCred.user.uid;

      // 2) MOCKED backend (comment out when real API is ready)
      const userData = mockUserByUID(firebaseUid);

      // 3) Save user
      localStorage.setItem("user", JSON.stringify(userData));

      // 4) Debug log to confirm we're here
      console.log("🚀 Logging in as", userData);

      // 5) Redirect based on role
      if (userData.role_id === 1) {
        navigate("/recipient/dashboard");
      } else if (userData.role_id === 2) {
        navigate("/donor/dashboard");
      } else if (userData.role_id === 3) {
        navigate("/admin/dashboard");
      } else {
        console.warn("Unknown role_id, staying on login.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Log In</h1>
        <label>Email</label>
        <br></br>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        <label>
          Password <Link to="/forgot-password">Forgot password?</Link> 
        </label>
        <div className="password-row">
          <input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="show-hide-btn"
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
        <p className="signup-link">
          Need an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
