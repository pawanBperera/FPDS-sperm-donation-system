// File: src/pages/LoginPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { mockUserByUID } from "../utils/fakeApi";
import logo from "../assets/Logo-1.gif";            // adjust path as needed
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
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUid = userCred.user.uid;
      const userData = mockUserByUID(firebaseUid);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("🚀 Logging in as", userData);
      if (userData.role_id === 1) navigate("/recipient/dashboard");
      else if (userData.role_id === 2) navigate("/donor/dashboard");
      else if (userData.role_id === 3) navigate("/admin/dashboard");
      else console.warn("Unknown role_id, staying on login.");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex flex-column">
      {/* Logo top-left */}
     <header className="login-header d-flex align-items-center px-4 pt-3">
       
          <img src={logo} alt="FPDS Logo" className="login-logo" />
          
      
       <span className="logo-text">FPDS</span>
      </header>

      

      {/* Centered form */}
    {/*  <div className="flex-fill d-flex align-items-center justify-content-center px-3">
        <form onSubmit={handleSubmit} className="login-form text-center">
          <h1 className="login-title mb-4">Log In</h1>
    */}

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
              {showPass
                ? <i className="bi bi-eye-slash-fill"></i>
                : <i className="bi bi-eye-fill"></i>}
            </button>
          </div>

          {error && <p className="error-text mb-3">{error}</p>}

          <button type="submit" disabled={loading} className="btn login-btn mb-3">
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