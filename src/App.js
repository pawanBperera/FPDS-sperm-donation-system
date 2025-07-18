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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RecipientAccountSettings from "./pages/RecipientAccountSettings";
import RecipientChangePassword from "./pages/RecipientChangePassword";
import RecipientFeedback from "./pages/RecipientFeedback";
import RecipientProfileManager from "./pages/RecipientProfileManager";
import RecipientMatches from "./pages/RecipientMatches";
import RecipientApprovedMatches from "./pages/RecipientApprovedMatches";
import DonorAccountSettings from "./pages/DonorAccountSettings";
import DonorProfileManager from "./pages/DonorProfileManager";
import AdminTotalMatches from "./pages/AdminTotalMatches";
import AdminMatchDetail from "./pages/AdminMatchDetail";
import AdminApprovedMatches from "./pages/AdminApprovedMatches";
import AdminRejectedMatches from "./pages/AdminRejectedMatches";

import SearchPage from "./pages/SearchPage";
import SearchResultsPage from "./pages/SearchResultsPage";

import DonorProfileView from "./pages/DonorProfileView";


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
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="donor/dashboard" element={<DonorDashboard />} />
    

        {/*Admin Account Settings*/}
        <Route path="admin/add-donor" element={<AddDonorPage />} />
        <Route path="admin/matches" element={<AdminTotalMatches />} />
        <Route path="admin/matches/:matchId" element={<AdminMatchDetail />} />
        <Route path="/admin/matches/approved" element={<AdminApprovedMatches />} />
        <Route path="/admin/matches/rejected"element={<AdminRejectedMatches />}/>


        {/*Log in Settings*/}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/*Recipient Account Settings*/}
          <Route path="/recipient/account-settings" element={<RecipientAccountSettings/>}/>
          <Route path="/recipient/change-password" element={<RecipientChangePassword />} />
          <Route path="/recipient/feedback" element={<RecipientFeedback/>}/>
          <Route path="/recipient/profile" element={<RecipientProfileManager/>}/>
          <Route path="/recipient/matches" element={<RecipientMatches />} />
          <Route path="/recipient/approved-match" element={<RecipientApprovedMatches />} />

          {/*Donor Side */}

          <Route path="/donor/change-password" element={<DonorAccountSettings/>}/>
          <Route path="/donor/profile" element={<DonorProfileManager/>}/>

          {/* SEARCH */}
          
          <Route path="search" element={<SearchPage />} />
          <Route path="search-results" element={<SearchResultsPage />} />
           <Route path="/donors/:id" element={<DonorProfileView />} />
          
        


      {/* Catch-all → back to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
  );
}

export default App;
