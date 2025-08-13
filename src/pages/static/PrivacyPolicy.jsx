import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";


const PrivacyPolicy = () => {
  return (
    <>
      <NavBar />
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-intro">
          Your privacy is our top priority. This policy explains how we collect,
          use, and protect your personal information while you use our platform.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>
            We collect basic personal details during registration such as name,
            email, and contact information. For intended parents and donors, we
            may also collect medical history and genetic screening reports
            necessary for compatibility checks.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used solely for providing and improving our
            services. This includes donor-recipient matching, medical
            compatibility checks, and communication related to the sperm donation
            process.
          </p>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>
            We implement strict technical and organizational measures to protect
            your data against unauthorized access, misuse, or disclosure. All
            sensitive data is encrypted and stored securely.
          </p>
        </section>

        <section>
          <h2>4. Sharing of Information</h2>
          <p>
            We do not sell or share your personal information with third parties
            except where required by law or to facilitate services with verified
            medical clinics and legal professionals.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information at any time. For account deletion or data-related queries,
            please contact our support team.
          </p>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can reach us
            at: <strong>support@fpds.com</strong>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
