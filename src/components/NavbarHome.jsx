// src/components/NavbarHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-1.gif';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import './NavbarHome.css';

const NavbarHome = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-home">
      <img src={logo} alt="Logo" className="logo-home" />
      <div className="socials-home">
        <FaTwitter />
        <FaInstagram />
        <FaFacebook />
      </div>
      <div className="auth-buttons-home">
        <button className="btn-login" onClick={() => navigate('/login')}>
          Log In
        </button>
        <button className="btn-signup" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavbarHome;
