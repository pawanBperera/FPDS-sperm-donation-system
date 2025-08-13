import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaBalanceScale, FaClipboardList, FaInfoCircle, FaCheckCircle } from "react-icons/fa";


const CostOfIVF = () => {
  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Cost of IVF in Sri Lanka</h1>
          <p>
            Understand the financial aspects of IVF treatment, average costs, and factors that influence pricing.
          </p>
        </div>

        {/* Intro */}
        <section className="info-section">
  <h2 className="section-title">
    <i className="fas fa-balance-scale"></i>  <FaBalanceScale /> Why Does IVF Cost Vary?
  </h2>
  <div className="info-card">
    <p>
      The cost of IVF depends on multiple factors including clinic reputation, technology used,
      and additional procedures such as <strong>ICSI</strong> or <strong>genetic testing</strong>.
      In Sri Lanka, IVF is relatively affordable compared to Western countries, but it remains
      a significant investment for intended parents.
    </p>
  </div>
</section>


        {/* Cost Table */}
       <section className="info-section">
  <h2 className="section-title">
    <FaClipboardList /> Average IVF Costs in Sri Lanka
  </h2>

  <div className="info-card">
    <table className="cost-table">
      <thead>
        <tr>
          <th>Procedure</th>
          <th>Cost (LKR)</th>
          <th>Cost (USD approx.)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><i className="fas fa-vial"></i> IVF Basic Cycle</td>
          <td>LKR 500,000 – 1,000,000</td>
          <td>$1,500 – $3,000</td>
        </tr>
        <tr>
          <td><i className="fas fa-syringe"></i> ICSI (Intracytoplasmic Sperm Injection)</td>
          <td>LKR 150,000 – 250,000</td>
          <td>$450 – $750</td>
        </tr>
        <tr>
          <td><i className="fas fa-snowflake"></i> Embryo Freezing & Storage (per year)</td>
          <td>LKR 75,000 – 150,000</td>
          <td>$225 – $450</td>
        </tr>
        <tr>
          <td><i className="fas fa-dna"></i> Preimplantation Genetic Testing (PGT)</td>
          <td>LKR 200,000 – 400,000</td>
          <td>$600 – $1,200</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>


     {/* What Affects Price */}
<section className="info-section">
  <h2 className="section-title">
    <FaInfoCircle /> What Affects Price?
  </h2>
  <div className="info-card">
    <ul>
      <li><i className="fas fa-redo"></i> Number of cycles required for success</li>
      <li><i className="fas fa-vials"></i> Need for advanced procedures like ICSI or PGT</li>
      <li><i className="fas fa-hospital"></i> Clinic reputation and technology used</li>
      <li><i className="fas fa-pills"></i> Medication costs (hormonal injections)</li>
    </ul>
  </div>
</section>

{/* Tips for Financial Planning */}
<section className="info-section">
  <h2 className="section-title">
    <FaCheckCircle /> Tips for Financial Planning
  </h2>
  <div className="info-card">
    <ul>
      <li><i className="fas fa-hand-holding-usd"></i> Ask clinics for package deals or installment plans</li>
      <li><i className="fas fa-layer-group"></i> Plan for at least two cycles to improve success chances</li>
      <li><i className="fas fa-wallet"></i> Budget for additional costs such as freezing and genetic testing</li>
    </ul>
  </div>
</section>

{/* Clinics */}
<section className="info-section">
  <h2 className="section-title">
    <i className="fas fa-clinic-medical"></i> Leading IVF Clinics in Sri Lanka
  </h2>
  <div className="info-card clinic-links">
    <a href="https://ninewellscare.com" target="_blank" rel="noopener noreferrer" className="clinic-btn">
      Ninewells Care IVF Centre
    </a>
    <a href="https://asirihealth.com" target="_blank" rel="noopener noreferrer" className="clinic-btn">
      Asiri Fertility Centre
    </a>
    <a href="https://nawaloka.com" target="_blank" rel="noopener noreferrer" className="clinic-btn">
      Nawaloka Hospital Fertility Unit
    </a>
  </div>
</section>


        <p className="bottom-line">
          <strong>Bottom Line:</strong> IVF is a financial commitment, but careful planning and selecting
          the right clinic can help you manage costs effectively.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default CostOfIVF;
