import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaInfoCircle, FaListUl, FaLink } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FemaleInfertility = () => {
  const { t } = useTranslation();

  
  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>{t("femaleInfertility.heroTitle")}</h1>
        </div>

        {/* Overview */}
        <section className="info-section">
          <h2 className="section-title">
            <FaInfoCircle /> {t("femaleInfertility.overviewTitle")}<br></br>
          </h2>
          <div className="info-card">
            <p>{t("femaleInfertility.overviewText")}</p>
          </div>
        </section>

        {/* Causes */}
        <section className="info-section">
          <h2 className="section-title">
            <FaListUl /> {t("femaleInfertility.causesTitle")}<br></br>
          </h2>
          <div className="info-card">
            <ul>
              <li>{t("femaleInfertility.causes.0")}</li><br></br>
              <li>{t("femaleInfertility.causes.1")}</li><br></br>
              <li>{t("femaleInfertility.causes.2")}</li><br></br>
              <li>{t("femaleInfertility.causes.3")}</li><br></br>
              <li>{t("femaleInfertility.causes.4")}</li><br></br>
              <li>{t("femaleInfertility.causes.5")}</li><br></br>
            </ul>
          </div>
        </section>

        {/* Diagnosis */}
        <section>
          <h2>{t("femaleInfertility.diagnosisTitle")}</h2><br></br>
          <p>{t("femaleInfertility.diagnosisIntro")}</p><br></br>
          <ul>
            <li>{t("femaleInfertility.diagnosis.0")}</li><br></br>
            <li>{t("femaleInfertility.diagnosis.1")}</li><br></br>
            <li>{t("femaleInfertility.diagnosis.2")}</li><br></br>
            <li>{t("femaleInfertility.diagnosis.3")}</li><br></br>
          </ul>
        </section>

        {/* Treatments */}
        <section>
          <h2>{t("femaleInfertility.treatmentsTitle")}</h2><br></br>
          <ul>
            <li>{t("femaleInfertility.treatments.0")}</li>
            <li>{t("femaleInfertility.treatments.1")}</li>
            <li>{t("femaleInfertility.treatments.2")}</li>
            <li>{t("femaleInfertility.treatments.3")}</li>
          </ul>
          <p>{t("femaleInfertility.treatmentsNote")}</p>
        </section>

        {/* Tips */}
        <section>
          <h2>{t("femaleInfertility.tipsTitle")}</h2><br></br>
          <ul>
            <li>{t("femaleInfertility.tips.0")}</li><br></br>
            <li>{t("femaleInfertility.tips.1")}</li><br></br>
            <li>{t("femaleInfertility.tips.2")}</li><br></br>
            <li>{t("femaleInfertility.tips.3")}</li><br></br>
            <li>{t("femaleInfertility.tips.4")}</li><br></br>
          </ul>
        </section>

        {/* Resources */}
        <section className="info-section">
          <h2 className="section-title">
            <FaLink /> {t("femaleInfertility.resourcesTitle")}
          </h2>
          <div className="info-card resource-links">
            <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="resource-btn">
              {t("femaleInfertility.resources.0")}
            </a>
            <a href="https://slcog.lk" target="_blank" rel="noopener noreferrer" className="resource-btn">
              {t("femaleInfertility.resources.1")}
            </a>
            
            <a href="https://ninewellscare.com" target="_blank" rel="noopener noreferrer" className="resource-btn">
              {t("femaleInfertility.resources.2")}
            </a>
          </div>
        </section>

        <p className="bottom-line">
          <strong>
            </strong> {t("femaleInfertility.bottomLineText")}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default FemaleInfertility;
