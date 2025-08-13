import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";


const GuideForIntendedParents = () => {
  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Guide for Intended Parents</h1>
          <p>
            A step-by-step guide to starting your journey with our sperm donation system in Sri Lanka.
          </p>
        </div>

        {/* Intro */}
        <section>
          <h2>Why This Guide?</h2>
          <p>
            Becoming a parent through sperm donation is a big decision that requires medical,
            legal, and emotional preparation. This guide will walk you through every step of the
            process to make your experience smooth and stress-free.
          </p>
        </section>

        {/* Steps */}
        <section>
          <h2>Your Journey in 5 Simple Steps</h2>
          <ol>
            <li>
              <strong>Register and Set Up Your Profile:</strong> Create an account on our platform,
              fill in personal details, and complete the required medical questionnaire.
            </li>
            <li>
              <strong>Submit Medical Screening:</strong> Upload your medical report or answer health
              questions to help us ensure safe and compatible matches.
            </li>
            <li>
              <strong>Search and Shortlist Donors:</strong> Use our advanced search filters to find
              donors based on physical traits, education, and health status. Save your favorites
              for later review.
            </li>
            <li>
              <strong>Admin Approval of Matches:</strong> Our certified medical team will review your
              shortlist for genetic compatibility and safety before approving the match.
            </li>
            <li>
              <strong>Clinic and Legal Process:</strong> After approval, you will work with a
              partnered fertility clinic and, if necessary, a legal consultant to finalize the
              procedure in compliance with Sri Lankan laws.
            </li>
          </ol>
        </section>

        {/* Tips */}
        <section>
          <h2>Tips for Intended Parents</h2>
          <ul>
            <li>Start early to allow time for medical evaluations and approvals.</li>
            <li>Be honest in your medical history for safe and accurate matching.</li>
            <li>Consult a fertility specialist for personalized advice.</li>
            <li>Understand legal implications of sperm donation in Sri Lanka.</li>
          </ul>
        </section>

        {/* Clinics */}
        <section>
          <h2>Trusted Fertility Clinics in Sri Lanka</h2>
          <ul>
            <li><a href="https://ninewellscare.com" target="_blank" rel="noopener noreferrer">Ninewells Care IVF Centre</a></li>
            <li><a href="https://asirihealth.com" target="_blank" rel="noopener noreferrer">Asiri Fertility Centre</a></li>
            <li><a href="https://nawaloka.com" target="_blank" rel="noopener noreferrer">Nawaloka Hospital Fertility Unit</a></li>
          </ul>
        </section>

        {/* Helpful Links */}
        <section>
          <h2>Helpful Resources</h2>
          <ul>
            <li><a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO – Reproductive Health</a></li>
            <li><a href="https://slcog.lk" target="_blank" rel="noopener noreferrer">Sri Lanka College of Obstetricians and Gynaecologists</a></li>
          </ul>
        </section>

        <p className="bottom-line">
          <strong>Bottom Line:</strong> Planning and preparation make this journey easier. Use our
          platform to find the right donor and work with certified clinics for the best outcome.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default GuideForIntendedParents;
