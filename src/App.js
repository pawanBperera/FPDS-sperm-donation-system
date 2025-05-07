// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipientDashboard from "./pages/RecipientDashboard";
import RegistrationPage from "./pages/RegistrationPage";
import AdminDashboard from "./pages/AdminDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import AddDonorPage from "./pages/AddDonorPage";

// (Later we’ll add ForgotPasswordPage, ResetPasswordPage, RecipientDashboard, etc.)

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Sign-up (two-step) */}
      <Route path="/signup" element={<RegistrationPage />} />

      {/* Dashboards */}
      <Route path="/recipient/dashboard" element={<RecipientDashboard />} />
      {/* <Route path="/donor/dashboard" element={<DonorDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="donor/dashboard" element={<DonorDashboard />} />
        <Route path="admin/add-donor" element={<AddDonorPage />} />


      {/* Catch-all → back to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
  );
}

export default App;
