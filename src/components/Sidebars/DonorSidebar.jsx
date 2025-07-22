// File: src/components/Sidebars/DonorSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCog, FaUser } from 'react-icons/fa';
import './DonorSidebar.css';

export function DonorSidebar() {


  return (
    <aside className="sidebar">



      <NavLink
        to="/donor/dashboard"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        <FaHome className="icon" /> Dashboard
      </NavLink>


    

        <NavLink
        to="/donor/profile"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        <FaUser className="icon" /> Profile Manager
      </NavLink>

    
      
      <NavLink
        to="/donor/change-password"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        <FaCog className="icon" /> Account Settings
      </NavLink>
    </aside>
  );
}

