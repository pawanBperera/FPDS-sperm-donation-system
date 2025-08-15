import React from "react";
import "./static-pages.css"; 
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ivfDiagram from "../../assets/infogrph.png";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";



const IVFInfo = () => {
  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>IVF Information</h1>
          <p>
            A complete guide to In-Vitro Fertilization (IVF) for intended parents in Sri Lanka.
          </p>
        </div>

        {/* What is IVF */}
        <section className="medical-content">
          <h2 className="section-title"><FaInfoCircle />What is IVF?</h2>
          <p>
            In-Vitro Fertilization (IVF) is an advanced assisted reproductive technique where
            eggs and sperm are combined outside the body in a laboratory setting. The fertilized
            egg (embryo) is then implanted into the uterus. IVF is a widely used treatment for
            infertility and has helped millions achieve parenthood globally, including in Sri Lanka.
          </p>
        </section>

        {/* Why Choose IVF */}
        <section>
          <h2>Why Choose IVF?</h2>
          <ul>
            <li>Severe Male Infertility: Low sperm count or motility.</li>
            <li>Female Infertility: Blocked fallopian tubes, endometriosis.</li>
            <li>Unexplained Infertility when other treatments fail.</li>
            <li>Genetic Screening to avoid transmission of genetic diseases.</li>
          </ul>
        </section>

        {/* IVF Process */}
        <section>
          <h2 className="section-title">IVF Process: Step-by-Step</h2>
<div className="steps-grid">
  <div className="step-card">
    <h3>1. Ovarian Stimulation</h3>
    <p>Hormonal injections stimulate ovaries to produce eggs.</p>
  </div>
  <div className="step-card">
    <h3>2. Egg Retrieval</h3>
    <p>Mature eggs are collected via a minor procedure at the clinic.</p>
  </div>
  <div className="step-card">
    <h3>3. Sperm Collection</h3>
    <p>Fresh or frozen sperm from the partner or donor is prepared for fertilization.</p>
  </div>
  <div className="step-card">
    <h3>4. Fertilization</h3>
    <p>Eggs and sperm are combined in the lab; sometimes ICSI (Intracytoplasmic Sperm Injection) is used.</p>
  </div>
  <div className="step-card">
    <h3>5. Embryo Culture</h3>
    <p>The fertilized eggs develop into embryos over 3–5 days under lab monitoring.</p>
  </div>
  <div className="step-card">
    <h3>6. Embryo Transfer</h3>
    <p>One or two embryos are carefully placed in the uterus.</p>
  </div>
  <div className="step-card">
    <h3>7. Pregnancy Test</h3>
    <p>After about two weeks, a blood test confirms whether implantation was successful.</p>
  </div>
</div>


 {/* Infographic 
  <div className="ivf-diagram">
    <img src={ivfDiagram} alt="IVF Process Infographic" />
  </div>*/}

        </section>

        {/* Success Rates */}
        <section>
          <h2>Success Rates in Sri Lanka</h2>
          <p>
            Average success rate: <strong>35%–45% per cycle</strong> (varies by age and clinic).
            Clinics like <strong>Ninewells Care IVF</strong> and <strong>Asiri Fertility Centre</strong>
            offer competitive results comparable to global standards.
          </p>
        </section>

        {/* Risks */}
        <section>
          <h2>Risks & Considerations</h2>
          <ul>
            <li>Multiple pregnancy risk if more than one embryo is transferred.</li>
            <li>Mild side effects from hormonal medications.</li>
            <li>Emotional and financial stress during the process.</li>
          </ul>
        </section>

        {/* Cost */}
        <section>
          <h2>Cost of IVF in Sri Lanka</h2>
          <p>
            Average cost: <strong>LKR 500,000 – 1,000,000 per cycle</strong> (USD 1,500 – 3,000).
            Additional costs may apply for genetic testing and advanced procedures.
          </p>
        </section>

        {/* Resources */}
        <section>
          <h2>Helpful Resources</h2>
          <ul>
            <li>
              <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">
                WHO – Assisted Reproductive Technologies
              </a>
            </li>
            <li>
              <a href="https://ninewellscare.com" target="_blank" rel="noopener noreferrer">
                Ninewells IVF Clinic
              </a>
            </li>
            <li>
              <a href="https://asirihealth.com" target="_blank" rel="noopener noreferrer">
                Asiri Fertility Centre
              </a>
            </li>
          </ul>
        </section>

        <p className="bottom-line">
          <strong>Bottom Line:</strong> IVF is a safe and effective treatment for infertility when
          performed under professional medical supervision. Early intervention and proper planning
          improve success rates.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default IVFInfo;
