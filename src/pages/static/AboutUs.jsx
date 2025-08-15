import React from "react";
import "./static-pages.css"; 
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";


const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About Us</h1>
          <p>
            Building trust and hope – connecting families, donors, and experts
            through a secure and reliable sperm donation system in Sri Lanka.
          </p>
        </div>

        {/* Content Section */}
     <div className="about-content">
        <section className="info-section">

    <h2 className="section-title">
      <span className="icon">👥</span> Who We Are
    </h2>
    <div className="info-card">
      <p>
        We are a dedicated platform created to assist families and individuals on their journey to parenthood. 
        Our system was built with the highest standards of confidentiality, security, and transparency. 
        Our goal is to simplify the sperm donation process while ensuring the safety and well-being of all parties involved.
      </p>
    </div>
  </section>

          <section className="info-section">
  <h2 className="section-title">
    <i className="fas fa-bullseye"></i> Our Mission
  </h2>
  <div className="info-card">
    <p>
      Our mission is to provide an ethical and medically secure sperm donation service in Sri Lanka. 
      We aim to bridge the gap between intended parents, donors, clinics, and legal professionals by 
      offering a streamlined platform that handles everything from donor-recipient matching to legal 
      and health compliance.
    </p>
  </div>
</section>

          <section className="info-section">
  <h2 className="section-title">
    <i className="fas fa-cogs"></i> How We Work
  </h2>
  <div className="info-card">
    <p>
      Our platform uses a structured workflow where intended parents can
      create profiles, search for verified donors, and request matches.
      Donors are thoroughly screened through medical and legal checks
      before being added to our system. An admin team verifies every
      match to ensure compatibility and safety, particularly considering
      genetic conditions such as thalassemia and other inheritable
      diseases.
    </p>
  </div>
</section>


         <section className="info-section">
  <h2 className="section-title">
    <i className="fas fa-check-circle"></i> Why Choose Us?
  </h2>
  <div className="info-card">
    <ul>
      <li><i className="fas fa-shield-alt"></i> Strict medical and legal compliance for all donors.</li>
      <li><i className="fas fa-lock"></i> Advanced privacy and data protection standards.</li>
      <li><i className="fas fa-user-md"></i> Professional support throughout the entire process.</li>
      <li><i className="fas fa-search"></i> Clear and transparent matching system.</li>
    </ul>
  </div>
</section>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
