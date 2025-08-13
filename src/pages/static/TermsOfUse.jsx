import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";


const TermsOfUse = () => {
  return (
    <>
      <NavBar />
      <div className="terms-container">
        <h1 className="terms-title">Terms of Use</h1>
        <p className="terms-intro">
          Welcome to FPDS (Fertility & Pregnancy Donation System). By accessing or
          using our platform, you agree to the following terms and conditions. Please
          read them carefully before proceeding.
        </p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using our services, you confirm that you have
            read, understood, and agreed to comply with these Terms of Use, along with
            our Privacy Policy.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            Our platform is intended for individuals who are legally eligible to
            participate in sperm donation processes within Sri Lanka. Users must be at
            least 18 years old to register.
          </p>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <p>
            Users agree to provide accurate, up-to-date information and maintain the
            confidentiality of their account. Misrepresentation or fraudulent activity
            will result in account termination.
          </p>
        </section>

        <section>
          <h2>4. Privacy and Data Protection</h2>
          <p>
            We are committed to protecting your privacy. All personal and medical
            information is handled in accordance with our Privacy Policy. Unauthorized
            sharing or misuse of platform data is strictly prohibited.
          </p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            FPDS is a platform to connect donors, recipients, and clinics. We do not
            guarantee the success of any medical procedure or outcome. Our liability is
            limited to providing a secure platform for communication and matching.
          </p>
        </section>

        <section>
          <h2>6. Governing Law</h2>
          <p>
            These Terms of Use are governed by the laws of Sri Lanka. Any disputes
            arising under these terms will be subject to Sri Lankan jurisdiction.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfUse;
