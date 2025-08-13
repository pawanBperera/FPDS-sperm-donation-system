import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";


const GenderSelection = () => {
  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Gender Selection in Assisted Reproduction</h1>
          <p>
            Learn about gender selection methods, legal aspects, and ethical considerations in Sri Lanka.
          </p>
        </div>

        {/* Intro */}
        <section>
          <h2>What is Gender Selection?</h2>
          <p>
            Gender selection refers to the process of choosing the sex of a baby before conception or implantation. 
            This can be done for medical reasons, such as preventing genetic disorders linked to a specific gender, 
            or for personal preference in some countries.
          </p>
        </section>

        {/* Methods */}
        <section>
          <h2>Medical Techniques for Gender Selection</h2>
          <ul>
            <li><strong>Preimplantation Genetic Testing (PGT):</strong> Used during IVF to analyze embryos before transfer. This is the most accurate method for gender selection.</li>
            <li><strong>Sperm Sorting (MicroSort):</strong> Separates X and Y chromosomes in sperm. Not widely available in Sri Lanka.</li>
          </ul>
        </section>

        {/* Legal Context */}
        <section>
          <h2>Is Gender Selection Legal in Sri Lanka?</h2>
          <p>
            In Sri Lanka, gender selection is <strong>strictly regulated</strong>. It is generally prohibited for non-medical reasons 
            and allowed only when there is a medical need, such as preventing genetic diseases associated with a specific sex.
          </p>
        </section>

        {/* Ethical Considerations */}
        <section>
          <h2>Ethical Considerations</h2>
          <p>
            The Sri Lankan Medical Council and fertility specialists emphasize that gender selection should not be used for 
            cultural or social preference, as it raises concerns about gender imbalance and discrimination.
          </p>
        </section>

        {/* Risks */}
        <section>
          <h2>Risks and Limitations</h2>
          <ul>
            <li>Additional cost and complexity during IVF treatment.</li>
            <li>Emotional and ethical stress for intended parents.</li>
            <li>No 100% guarantee unless PGT is used.</li>
          </ul>
        </section>

        {/* Clinics */}
        <section>
          <h2>Where to Learn More</h2>
          <p>
            Most leading fertility clinics in Sri Lanka (such as <a href="https://ninewellscare.com" target="_blank" rel="noopener noreferrer">Ninewells Care IVF</a> and 
            <a href="https://asirihealth.com" target="_blank" rel="noopener noreferrer"> Asiri Fertility Centre</a>) follow ethical and legal guidelines for 
            gender selection. Always consult your doctor for clarity.
          </p>
        </section>

        {/* Resources */}
        <section>
          <h2>Helpful Resources</h2>
          <ul>
            <li><a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO – Gender and Ethics in Health</a></li>
            <li><a href="https://slcog.lk" target="_blank" rel="noopener noreferrer">Sri Lanka College of Obstetricians and Gynaecologists</a></li>
          </ul>
        </section>

        <p className="bottom-line">
          <strong>Bottom Line:</strong> Gender selection in Sri Lanka is limited to medical reasons only. 
          Always seek advice from certified fertility specialists and follow local laws and ethical guidelines.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default GenderSelection;
