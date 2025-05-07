// File: src/pages/RecipientDashboard.jsx
import React from "react";
import NavBar from "../components/NavBar/NavBar";               
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";

export default function RecipientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* 1) Render NavBar */}
      <NavBar />

      {/* 2) Sidebar + Content */}
      <div className="d-flex vh-100">
        <RecipientSidebar />

        <div className="flex-grow-1 p-4">
          <h1>🎉 Welcome, {user.firstName || user.email}!</h1>
          <p>This is your recipient dashboard.</p>
        </div>
      </div>
    </>
  );
}
