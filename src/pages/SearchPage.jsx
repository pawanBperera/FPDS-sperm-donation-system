// File: src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
//import { useNavigate } from "react-router-dom";
import DonorProfileCard from "../components/DonorProfileCard";
//import { getDonors } from "../services/donorApi";
import { getDonors, searchDonors } from "../services/donorApi";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";



import {
  cityOptions,
  //districtOptions,
  bloodTypeOptions,
  nationalityOptions,
  raceOptions,
  religionOptions,
  educationOptions,
  eyeColorOptions,
  hairColorOptions,
  languageOptions,
  maritalStatusOptions,
  assistOptions,
} from "../constants/searchOptions";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import srilankaTopo from "../data/srilanka.json";
import "./SearchPage.css";



export default function SearchPage() {
  //const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [nationality, setNationality] = useState("");
  const [race, setRace] = useState("");
  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [language, setLanguage] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [assist, setAssist] = useState("");
  const [donors, setDonors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);



  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await getDonors();
        setDonors(res.data);
      } catch (err) {
        console.error("Failed to load donors", err);
      }
    }
    fetchDonors();


const toggleVisibility = () => {
    setShowTopButton(window.scrollY > 400);
  };

  window.addEventListener("scroll", toggleVisibility);
  return () => window.removeEventListener("scroll", toggleVisibility);




  }, []);

  const topRef = useRef(null);

const scrollToTop = () => {
  topRef.current?.scrollIntoView({ behavior: "smooth" });
};


 /* const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      city,
      district,
      bloodType,
      nationality,
      race,
      religion,
      education,
      eyeColor,
      hairColor,
      language,
      maritalStatus,
      assist,
    }).toString();
    navigate(`/recipient/search-results?${params}`);
  };*/

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // Build params object dynamically
    const params = {};
    if (city) params.city = city;
    if (district) params.district = district;
    if (bloodType) params.bloodType = bloodType;
    if (nationality) params.nationality = nationality;
    if (race) params.race = race;
    if (religion) params.religion = religion;
    if (education) params.education = education;
    if (eyeColor) params.eyeColor = eyeColor;
    if (hairColor) params.hairColor = hairColor;
    if (language) params.spokenLanguages = language;
    if (maritalStatus) params.maritalStatus = maritalStatus;
    if (assist) params.willingToHelp = assist;

    const res = await searchDonors(params);
    setDonors(res.data);

setSearchPerformed(true);

  } catch (err) {
    console.error("Search failed:", err);
    setError("Failed to fetch donors. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
  <div className="search-page" style={{ marginLeft: "0px", minHeight: "100vh" }}>
    <div ref={topRef}></div>
    <NavBar />



     


{/*********************************************************************************************************************************** */}


 <div className="search-content">
        <h1 className="search-title">Search For Certified Donors</h1>
        <form className="filters-form" onSubmit={handleSubmit}>


          <div className="filters-top">

            <div className="map-filter">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 8900, center: [80, 7] }}
                style={{ width: "100%", maxWidth: 300, height: 300 }}
              >
                <Geographies geography={srilankaTopo}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name =
                        geo.properties.NAME_1 || geo.properties.DISTRICT;
                      const isSelected = name === district;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}

                         // onClick={() => setDistrict(name)}
                         onClick={() => {
                         setDistrict(name);
                         console.log("District selected:", name);
                        }}


                          fill={isSelected ? "#F3C8FF" : "#EAEAEC"}
                          stroke="#999"
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#F53", outline: "none", cursor: "pointer" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>

              {/*********************************************************************************************************************************** */}

            <div className="dropdown-grid">
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">City</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              >
                <option value="">Blood Type</option>
                {bloodTypeOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
                <option value="">Nationality</option>
                {nationalityOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <select value={race} onChange={(e) => setRace(e.target.value)}>
                <option value="">Race</option>
                {raceOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
              >
                <option value="">Religion</option>
                {religionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="">Education</option>
                {educationOptions.map((ed) => (
                  <option key={ed} value={ed}>
                    {ed}
                  </option>
                ))}
              </select>
              <select
                value={eyeColor}
                onChange={(e) => setEyeColor(e.target.value)}
              >
                <option value="">Eye Color</option>
                {eyeColorOptions.map((ec) => (
                  <option key={ec} value={ec}>
                    {ec}
                  </option>
                ))}
              </select>
              <select
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
              >
                <option value="">Hair Color</option>
                {hairColorOptions.map((hc) => (
                  <option key={hc} value={hc}>
                    {hc}
                  </option>
                ))}
              </select>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Spoken Language</option>
                {languageOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option value="">Marital Status</option>
                {maritalStatusOptions.map((ms) => (
                  <option key={ms} value={ms}>
                    {ms}
                  </option>
                ))}
              </select>
              <select value={assist} onChange={(e) => setAssist(e.target.value)}>
                <option value="">Willing to assist</option>
                {assistOptions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            </div>

            <div className="search-button-container">
            <button type="submit" className="btn-search">
              Search
            </button>
          </div>

          
        </form>
            
{/*********************************************************************************************************************************** */}


          

          

        <div className="suggestions-resources">
          <div className="suggestions-container">


{loading && <p>Loading donors...</p>}
{error && <p className="text-danger">{error}</p>}
{!loading && searchPerformed && donors.length === 0 && (
  <p>No donors found for the selected filters.</p>
)}



            
            {donors.map(donor => (
              <DonorProfileCard key={donor.userId} donor={donor} />
            ))}
          </div>


    

          <div className="resources-links">
            <a href="/recipient/guide">Guide for Intended Parents</a>
            <a href="/recipient/ivf-info">IVF information</a>
            <a href="/recipient/cost-of-ivf">Cost of IVF</a>
            <a href="/recipient/gender-selection">Gender Selection</a>
            <a href="/recipient/sperm-donation">Sperm Donation</a>
            <a href="/recipient/male-infertility">Male Infertility</a>
            <a href="/recipient/female-infertility">Female Infertility</a>
          
          
          
  {showTopButton && (
  <div
    onClick={scrollToTop}
    className="scroll-to-top-button"
    aria-label="Scroll to top"
    title="Back to Top"
  >
  <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: "1.5rem" }} />

  </div>
)}

          </div>



 

        </div>
      </div>






    </div>
  );
}
