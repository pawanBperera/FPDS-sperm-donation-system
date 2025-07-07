// File: src/components/NavBar/NavBar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebook, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../assets/fpds-logo.png";
import "./NavBar.css";

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav className="navbar recipient-navbar">
      {/* Branding */}
      <div className="navbar-brand">
        <img
          src={logo}
          alt="FPDS Logo"
          className="logo img-fluid w-25"
        />
        <span className="brand-text">FPDS</span>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="navbar-toggler d-md-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FaBars /> : <FaTimes />}
      </button>

      {/* Links (collapsed on mobile) */}
      <div className={`navbar-links ${collapsed ? 'collapsed' : ''}`}>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            'btn nav-btn' + (isActive ? ' active' : '')
          }
        >
          Home
        </NavLink>

        <a
          href="https://twitter.com/YourFPDS"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-icon pe-1"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/YourFPDS"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-icon pe-1"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com/YourFPDS"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-icon pe-4"
        >
          <FaFacebook />
        </a>

        <NavLink
          to="/recipient/dashboard"
          className={({ isActive }) =>
            'btn nav-btn account-btn' + (isActive ? ' active' : '')
          }
        >
          My Account
        </NavLink>
      </div>

      <hr className="navbar-separator" />
    </nav>
  );
}
