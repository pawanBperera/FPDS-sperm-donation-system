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

import AdminAllDonors from "./pages/AdminAllDonors";
import AdminAllRecipients from "./pages/AdminAllRecipients";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AnalyticsPage from './pages/admin/AnalyticsPage';

import PredictionPage from "./pages/admin/PredictionPage";




// Static Pages (Info)
import GuideForIntendedParents from "./pages/static/GuideForIntendedParents";
import IVFInfo from "./pages/static/IVFInfo";
import CostOfIVF from "./pages/static/CostOfIVF";
import SpermDonation from "./pages/static/SpermDonation";
import GenderSelection from "./pages/static/GenderSelection";
import MaleInfertility from "./pages/static/MaleInfertility";
import FemaleInfertility from "./pages/static/FemaleInfertility";

// Static Pages (Legal)
import AboutUs from "./pages/static/AboutUs";
import TermsOfUse from "./pages/static/TermsOfUse";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import FAQ from "./pages/static/FAQ";

import AdminPrediction from "./pages/AdminPrediction";



// (Later weâ€™ll add ForgotPasswordPage, ResetPasswordPage, RecipientDashboard, etc.)

function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
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
<Route path="/admin/prediction" element={<AdminPrediction />} />

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

          <Route path="/admin/donors" element={<AdminAllDonors />} />
          <Route path="/admin/recipients" element={<AdminAllRecipients />} />

          {/*Donor Side */}

          <Route path="/donor/change-password" element={<DonorAccountSettings/>}/>
          <Route path="/donor/profile" element={<DonorProfileManager/>}/>

          {/* SEARCH */}
          
          <Route path="search" element={<SearchPage />} />
          <Route path="search-results" element={<SearchResultsPage />} />
           <Route path="/donors/:id" element={<DonorProfileView />} />
          
        
<Route path="/admin/analytics" element={<AnalyticsPage />} />

        
{/* your app routes/components */}
      
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />

      {/* Catch-all â†’ back to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />


      {/* Prediction part */}
      <Route path="/admin/predict" element={<PredictionPage />} />
      <Route path="/admin/predict/:donorId/:recipientId" element={<PredictionPage />} />


{/**STATIC */}
{/* Info Pages */}
<Route path="/recipient/guide" element={<GuideForIntendedParents />} />
<Route path="/recipient/ivf-info" element={<IVFInfo />} />
<Route path="/recipient/cost-of-ivf" element={<CostOfIVF />} />
<Route path="/recipient/sperm-donation" element={<SpermDonation />} />
<Route path="/recipient/gender-selection" element={<GenderSelection />} />
<Route path="/recipient/male-infertility" element={<MaleInfertility />} />
<Route path="/recipient/female-infertility" element={<FemaleInfertility />} />

{/* Legal Pages */}
<Route path="/about" element={<AboutUs />} />
<Route path="/terms" element={<TermsOfUse />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/faq" element={<FAQ />} />




      
    </Routes>
    </>
  );
}

export default App;