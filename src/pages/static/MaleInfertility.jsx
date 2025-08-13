import React from "react";
import "./static-pages.css"; // shared CSS for static pages
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";


const MaleInfertility = () => {
  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Male Infertility</h1>
          <p>
            Understand the causes, treatments, and resources for male infertility in Sri Lanka.
          </p>
        </div>

        {/* Content Sections */}
        <div className="medical-content">
          <section>
            <h2>Overview</h2>
            <p>
              Male infertility refers to a man's inability to cause pregnancy in a fertile female
              partner. It accounts for nearly <strong>40-50% of all infertility cases worldwide</strong>.
              In Sri Lanka, lifestyle changes, environmental factors, and untreated medical conditions
              have made male infertility an increasing concern.
            </p>
          </section>

          <section>
            <h2>What is Male Infertility?</h2>
            <p>
              Infertility in men usually occurs due to low sperm production, abnormal sperm function,
              or blockages that prevent sperm delivery. Other factors include hormonal imbalances and
              chronic health issues.
            </p>
          </section>

          <section>
            <h2>Common Causes</h2>
            <ul>
              <li><strong>Low Sperm Count (Oligospermia):</strong> Most common in Sri Lanka, linked to smoking and poor diet.</li>
              <li><strong>Varicocele:</strong> Enlarged veins affecting sperm production.</li>
              <li><strong>Hormonal Imbalance:</strong> Low testosterone or other hormone disorders.</li>
              <li><strong>Infections:</strong> STDs, mumps, or urinary infections damaging sperm health.</li>
              <li><strong>Lifestyle Factors:</strong> Stress, obesity, heat exposure, tight clothing.</li>
              <li><strong>Genetic Disorders:</strong> Conditions like Klinefelter syndrome.</li>
            </ul>
          </section>

          <section>
            <h2>Diagnosis</h2>
            <p>Tests available in Sri Lanka include:</p>
            <ul>
              <li>Semen Analysis – checks sperm count and motility.</li>
              <li>Blood Tests – hormone levels.</li>
              <li>Scrotal Ultrasound – detects varicocele.</li>
              <li>Genetic Testing – for chromosomal disorders.</li>
            </ul>
            <p>
              Available at hospitals like: <br />
              <strong>Ninewells Hospital, Asiri Medical Hospital, Nawaloka Hospital</strong>.
            </p>
          </section>

          <section>
            <h2>Treatment Options</h2>
            <ul>
              <li><strong>Lifestyle Changes:</strong> Quit smoking, reduce alcohol, healthy weight.</li>
              <li><strong>Medication:</strong> Hormonal therapy for imbalances.</li>
              <li><strong>Surgery:</strong> Varicocele repair, sperm retrieval.</li>
              <li><strong>ART:</strong> IUI, IVF, or ICSI – most common for severe male infertility.</li>
            </ul>
          </section>

          <section>
            <h2>Tips to Improve Male Fertility</h2>
            <ul>
              <li>Eat zinc and antioxidant-rich foods.</li>
              <li>Avoid prolonged laptop use on laps.</li>
              <li>Reduce stress with yoga or meditation.</li>
              <li>Exercise regularly, avoid excessive heat exposure.</li>
            </ul>
          </section>

          <section>
            <h2>Helpful Resources</h2>
            <ul>
              <li>
                <a href="https://www.who.int/health-topics/infertility" target="_blank" rel="noopener noreferrer">
                  WHO – Male Infertility
                </a>
              </li>
              <li>
                <a href="https://slcog.lk" target="_blank" rel="noopener noreferrer">
                  Sri Lanka College of Obstetricians and Gynaecologists
                </a>
              </li>
              <li>
                <a href="https://ninewellscare.com" target="_blank" rel="noopener noreferrer">
                  Ninewells Care IVF Clinic
                </a>
              </li>
            </ul>
          </section>

          <p className="bottom-line">
            <strong>Bottom Line:</strong> Male infertility is treatable in most cases with proper medical care
            and lifestyle changes. Early diagnosis improves success rates significantly.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MaleInfertility;
