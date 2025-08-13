// File: src/components/NavBar/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebook, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../assets/logoidea1.1B.png";
import "./NavBar.css";
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(true);
  const { i18n } = useTranslation();

  // Persist selected language
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <nav className="navbar recipient-navbar">
      {/* Branding */}
      <div className="navbar-brand">
        <img
          src={logo}
          alt="FPDS Logo"
          className="logo img-fluid"
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

        {/* Social Icons */}
        <a href="https://twitter.com/YourFPDS" target="_blank" rel="noopener noreferrer" className="nav-icon pe-1">
          <FaTwitter />
        </a>
        <a href="https://instagram.com/YourFPDS" target="_blank" rel="noopener noreferrer" className="nav-icon pe-1">
          <FaInstagram />
        </a>
        <a href="https://facebook.com/YourFPDS" target="_blank" rel="noopener noreferrer" className="nav-icon pe-4">
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

        {/* Language Switcher */}
        <select
  onChange={handleLanguageChange}
  value={i18n.language}
  className="language-switcher"
>
  <option value="en">English</option>
  <option value="si">සිංහල</option>
  <option value="ta">தமிழ்</option>
</select>

      </div>

      <hr className="navbar-separator" />
    </nav>
  );
}
