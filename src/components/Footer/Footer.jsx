import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import "./Footer.css";



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
          </div>
          <h4 className="contact-title">Contact Us</h4>
        </div>





        {/* Middle Section */}
        <div className="footer-section">
          <ul>
            <li><Link to="/recipient/guide">Guide for Intended Parents</Link></li>
            <li><Link to="/recipient/ivf-info">IVF Information</Link></li>
            <li><Link to="/recipient/cost-of-ivf">Cost of IVF</Link></li>
            <li><Link to="/recipient/gender-selection">Gender Selection</Link></li>
            <li><Link to="/recipient/sperm-donation">Sperm Donation</Link></li>
            <li><Link to="/recipient/male-infertility">Male Infertility</Link></li>
            <li><Link to="/recipient/female-infertility">Female Infertility</Link></li>
          </ul>
        </div>





        {/* Right Section */}
        <div className="footer-section">
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/faq">F&Q</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};



export default Footer;
