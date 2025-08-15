import React from "react";
import "./static-pages.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import MaleFertilityTrends from "../../components/MaleFertilityTrends";
import { useTranslation } from "react-i18next";

const MaleInfertility = () => {
  const { t } = useTranslation();




  return (
    <>
      <NavBar />
      <div className="medical-page-container">
        <div className="hero-section">
          <h1>{t("maleInfertility.heroTitle")}</h1>
          <p>{t("maleInfertility.heroDescription")}</p>
        </div>



        <div className="medical-content">
          <section>
            <h2>{t("maleInfertility.overviewTitle")}</h2>
            <p>{t("maleInfertility.overviewText")}</p>
          </section>



          <section>
            <h2>{t("maleInfertility.definitionTitle")}</h2>
            <p>{t("maleInfertility.definitionText")}</p>
          </section>



          <section>
            <h2>{t("maleInfertility.causesTitle")}</h2>
            <ul>
              {t("maleInfertility.causes", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>



          <section>
            <h2>{t("maleInfertility.diagnosisTitle")}</h2>
            <p>{t("maleInfertility.diagnosisIntro")}</p>
            <ul>
              {t("maleInfertility.diagnosisTests", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t("maleInfertility.diagnosisHospitals")}</p>
          </section>



          <section>
            <h2>{t("maleInfertility.treatmentsTitle")}</h2>
            <ul>
              {t("maleInfertility.treatments", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>



          <section>
            <h2>{t("maleInfertility.tipsTitle")}</h2>
            <ul>
              {t("maleInfertility.tips", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>



          <section>
            <h2>{t("maleInfertility.whoChartTitle")}</h2>
            <p className="text-muted">{t("maleInfertility.whoChartDesc")}</p>
            <MaleFertilityTrends />
            <small className="d-block mt-2">
              {t("maleInfertility.whoChartSource")}
            </small>
          </section>



          <section>
            <h2>{t("maleInfertility.resourcesTitle")}</h2>
            <ul>
              {t("maleInfertility.resources", { returnObjects: true }).map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </section>



          <p className="bottom-line">
            <strong>{t( "")}</strong> {t("maleInfertility.bottomLineText")}
          </p>
        </div>
      </div>


      
      <Footer />
    </>
  );
};



export default MaleInfertility;
