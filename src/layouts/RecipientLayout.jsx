
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import Footer from "../components/Footer/Footer";
import "../components/Sidebars/Sidebar.css"; 

export default function RecipientLayout() {
  return (
    <div className="recipient-layout d-flex flex-column vh-100">
      <NavBar />
      <div className="d-flex flex-grow-1">
        <RecipientSidebar />
        <main className="page-content flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
