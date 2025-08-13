import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";


const SpermDonation = () => {
  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Sperm Donation</h1>
          <p>
            Learn how sperm donation works, the medical and legal aspects in Sri Lanka, and why it helps families achieve parenthood.
          </p>
        </div>

        {/* Introduction */}
        <section>
          <h2>What is Sperm Donation?</h2>
          <p>
            Sperm donation is the process where a healthy male donates his sperm to assist individuals or couples in conceiving a child through assisted reproductive technologies such as IVF or IUI.
          </p>
        </section>

        {/* Why People Choose Sperm Donation */}
        <section>
          <h2>Why Do People Choose Sperm Donation?</h2>
          <ul>
            <li>Couples facing male infertility issues (low sperm count, poor motility).</li>
            <li>Single women who wish to become mothers.</li>
            <li>Same-sex couples looking to start a family.</li>
          </ul>
        </section>

        {/* Process */}
        <section>
          <h2>Sperm Donation Process in Sri Lanka</h2>
          <ol>
            <li><strong>Donor Registration:</strong> The donor registers at a certified fertility clinic or through a verified platform like ours.</li>
            <li><strong>Medical Screening:</strong> Donor undergoes extensive health checks and genetic screening.</li>
            <li><strong>Sperm Collection:</strong> Done in a controlled clinical setting.</li>
            <li><strong>Freezing and Storage:</strong> Collected sperm is frozen and stored in a sperm bank for future use.</li>
          </ol>
        </section>

        {/* Screening */}
        <section>
          <h2>Medical Screening & Genetic Tests</h2>
          <p>
            Donors must pass tests for:
          </p>
          <ul>
            <li>HIV, Hepatitis B & C</li>
            <li>Syphilis and other STDs</li>
            <li>Genetic conditions like Thalassemia</li>
            <li>General health and semen quality analysis</li>
          </ul>
        </section>

        {/* Legal and Ethical Aspects */}
        <section>
          <h2>Legal and Ethical Aspects in Sri Lanka</h2>
          <p>
            Sri Lanka does not have a fully comprehensive law on sperm donation, but fertility clinics follow ethical guidelines set by the Sri Lanka Medical Council and global best practices:
          </p>
          <ul>
            <li>Donor identity is typically kept anonymous unless legally required.</li>
            <li>Payment to donors is regulated to avoid commercialization.</li>
            <li>Consent forms are mandatory for both donors and recipients.</li>
          </ul>
        </section>

        {/* Benefits and Challenges */}
        <section>
          <h2>Benefits & Challenges</h2>
          <ul>
            <li><strong>Benefits:</strong> Helps couples and individuals achieve parenthood.</li>
            <li><strong>Challenges:</strong> Emotional concerns, ethical debates, and legal limitations.</li>
          </ul>
        </section>

        {/* Helpful Resources */}
        <section>
          <h2>Helpful Resources</h2>
          <ul>
            <li><a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO – Assisted Reproductive Technologies</a></li>
            <li><a href="https://slcog.lk" target="_blank" rel="noopener noreferrer">Sri Lanka College of Obstetricians and Gynaecologists</a></li>
            <li><a href="https://ninewellscare.com" target="_blank" rel="noopener noreferrer">Ninewells IVF Centre</a></li>
          </ul>
        </section>

        <p className="bottom-line">
          <strong>Bottom Line:</strong> Sperm donation is a life-changing process that requires trust, medical safety, and ethical practice. Always choose certified clinics and platforms for security and confidentiality.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SpermDonation;
