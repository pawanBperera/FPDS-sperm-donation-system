// File: src/components/Sidebars/DonorSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCog, FaUser } from 'react-icons/fa';

export function DonorSidebar() {
  return (
    <aside className="sidebar">
      <NavLink
        to="/donor/dashboard"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      ><br></br><br></br>
        <FaHome className="icon" /> Dashboard
      </NavLink>
      <br></br>
      <NavLink
        to="/donor/change-password"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      ><br></br>
        <FaCog className="icon" /> Account Settings
      </NavLink>
      <br></br>
      <NavLink
        to="/donor/profile"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      ><br></br>
        <FaUser className="icon" /> Profile Manager
      </NavLink>
    </aside>
  );
}

