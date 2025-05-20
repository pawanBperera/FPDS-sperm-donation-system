// File: src/components/Sidebars/RecipientSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaCog,
  FaUser,
  FaCommentDots,
  FaInfoCircle
} from 'react-icons/fa';

export function RecipientSidebar() {
  return (
    <aside className="sidebar">

      <NavLink
        to="/recipient/dashboard"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
        <FaHome className="icon" /> Dashboard
      </NavLink>

      <NavLink
        to="/recipient/account-settings"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
      >
<br></br>
      <FaCog className="icon" /> Account Settings
                </NavLink>
                
                    <br></br>

                  <NavLink
            to="/recipient/profile"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
        <FaUser className="icon" /> Profile Manager
      </NavLink>

      <br></br>

      <NavLink
        to="/recipient/feedback"
        className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
        <FaCommentDots className="icon" /> Feedback
      </NavLink>
      
      <br></br>
      
      <hr />

      {/* Informational Links */}
      {[
        { to: '/recipient/guide', label: 'Guide for Intended Parents' },
        { to: '/recipient/ivf-info', label: 'IVF Information' },
        { to: '/recipient/cost-of-ivf', label: 'Cost of IVF' },
        { to: '/recipient/sperm-donation', label: 'Sperm Donation' },
        { to: '/recipient/gender-selection', label: 'Gender Selection' },
        { to: '/recipient/male-infertility', label: 'Male Infertility' },
        { to: '/recipient/female-infertility', label: 'Female Infertility' },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
            <br></br>
          <FaInfoCircle className="icon" /> {label}
        </NavLink>
      ))}

      <hr />

      <br></br>

      {/* Legal / Static Pages */}
      {[
        { to: '/about', label: 'About us' },
        { to: '/terms', label: 'Terms of Use' },
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/faq', label: 'F&Q' },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className="sidebar-link"
        >
            
          {label}
          <br></br>
        </NavLink>
      ))}
    </aside>
  );
}