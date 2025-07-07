// File: src/pages/LoginPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Logo-1.gif";
import "./LoginPage.css";

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
      // 1) Firebase sign-in
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCred.user;

      // 2) Get Firebase ID token (JWT)
      const token = await fbUser.getIdToken();
      // set default auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.baseURL = "http://localhost:8080";


      // 3) Fetch real app-user by Firebase UID
      const res = await axios.get(
        `/api/users/by-uid/${fbUser.uid}`
      );
      const appUser = res.data;

      // 4) Store in localStorage
      localStorage.setItem("user", JSON.stringify(appUser));
      console.log("🚀 Logging in as", appUser);

      // 5) Redirect by role
      if (appUser.role_id === 1) navigate("/recipient/dashboard");
else if (appUser.role_id === 2) navigate("/donor/dashboard");
else if (appUser.role_id === 3) navigate("/admin/dashboard");
else {
  console.warn("Unknown role, staying on login.");
}

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex flex-column">
      <header className="login-header d-flex align-items-center px-4 pt-3">
        <img src={logo} alt="FPDS Logo" className="login-logo" />
        <span className="logo-text">FPDS</span>
      </header>
      <div className="login-form-wrapper">
        <h1 className="login-title text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="login-form text-center">
          <div className="mb-4 text-start">
            <label htmlFor="email" className="form-label label-text">Email</label>
            <input
              id="email"
              type="email"
              className="form-control input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 position-relative text-start">
            <label htmlFor="password" className="form-label label-text">
              Password
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </label>
            <input
              id="password"
              type={showPass ? "text" : "password"}
              className="form-control input-field pe-5"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="show-hide-btn"
            >
              {showPass ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
            </button>
          </div>

          {error && <p className="error-text mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn login-btn mb-3 d-flex align-items-center justify-content-center mx-auto"
          >
            {loading && <span className="spinner-border spinner-border-sm me-2 text-light" role="status" aria-hidden="true"></span>}
            {loading ? "Logging in…" : "Log in"}
          </button>

          <p className="signup-text">
            Need an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
