// File: src/layouts/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { DonorSidebar } from "../components/Sidebars/DonorSidebar";
import { AdminSidebar } from "../components/Sidebars/AdminSidebar";
import "../components/Sidebars/Sidebar.css";

export default function DashboardLayout({ roleId }) {
  return (
    <div className="dashboard-layout d-flex vh-100">
      {roleId === 2 && <DonorSidebar />}
      {roleId === 3 && <AdminSidebar />}
      <main className="page-content flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
