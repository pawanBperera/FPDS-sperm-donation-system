// File: src/pages/RecipientProfileManager.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import axios from "axios";

// Dropdown options
const ethnicityOptions = [
  "Sinhalese",
  "Sri Lankan Tamil",
  "Indian Tamil",
  "Sri Lankan Moor",
  "Burgher",
  "Malay",
  "Other",
];
const religionOptions = [
  "Buddhist",
  "Hindu",
  "Muslim",
  "Christian",
  "Catholic",
  "Other",
];
const educationOptions = [
  "High School",
  "Diploma",
  "Bachelor’s Degree",
  "Master’s Degree",
  "PhD",
  "Other",
];
const languageOptions = [
  "Sinhala",
  "Tamil",
  "English",
  "Hindi",
  "Korean",
  "Japanese",
  "French",
  "Italian",
  "Spanish",
  "Other",
];
const coupleTypeOptions = [
  "Married Couple",
  "Single Parent",
  "Cohabiting Couple",
  "Other",
];
const maritalStatusOptions = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
];





export default function RecipientProfileManager() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [languages, setLanguages] = useState([]);
  const [smoker, setSmoker] = useState(null);
  const [coupleType, setCoupleType] = useState("");
  const [hadDonor, setHadDonor] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`/api/recipients/${user.id}/profile`);
        const data = res.data;
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setDob(data.date_of_birth || "");
        setEthnicity(data.ethnicity || "");
        setReligion(data.religion || "");
        setEducation(data.education || "");
        setLanguages(data.spoken_languages?.split(",") || []);
        setSmoker(data.smoker ? "yes" : "no");
        setCoupleType(data.couple_type || "");
        setHadDonor(data.had_previous_donor ? "yes" : "no");
        setMaritalStatus(data.marital_status || "");
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    fetchProfile();
  }, [user.id]);

  // Handle multi-select languages
  const toggleLanguage = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!firstName || !lastName) {
      setError("First and last name are required.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`/api/recipients/${user.id}/profile`, {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob,
        ethnicity,
        religion,
        education,
        spoken_languages: languages.join(","),
        smoker: smoker === "yes",
        couple_type: coupleType,
        had_previous_donor: hadDonor === "yes",
        marital_status: maritalStatus,
      });
      alert("Profile updated successfully!");
      navigate("/recipient/dashboard");
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex vh-100">
        <RecipientSidebar />

        <main className="flex-grow-1 p-4">
          <h1>Your Profile</h1>
          {error && <p className="text-danger">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Birthday</label>
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ethnicity</label>
              <select
                className="form-select"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
              >
                <option value="">Select...</option>
                {ethnicityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Religion</label>
              <select
                className="form-select"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
              >
                <option value="">Select...</option>
                {religionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Education</label>
              <select
                className="form-select"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="">Select...</option>
                {educationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="mb-3">
              <legend className="col-form-label">Spoken Languages</legend>
              {languageOptions.map((lang) => (
                <div className="form-check" key={lang}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`lang-${lang}`}
                    checked={languages.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                  />
                  <label className="form-check-label" htmlFor={`lang-${lang}`}>
                    {lang}
                  </label>
                </div>
              ))}
            </fieldset>

            <fieldset className="mb-3">
              <legend className="col-form-label">Smoker</legend>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="smoker-yes"
                  value="yes"
                  checked={smoker === "yes"}
                  onChange={() => setSmoker("yes")}
                />
                <label className="form-check-label" htmlFor="smoker-yes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="smoker-no"
                  value="no"
                  checked={smoker === "no"}
                  onChange={() => setSmoker("no")}
                />
                <label className="form-check-label" htmlFor="smoker-no">
                  No
                </label>
              </div>
            </fieldset>

            <div className="mb-3">
              <label className="form-label">Explain Your Couple Type</label>
              <select
                className="form-select"
                value={coupleType}
                onChange={(e) => setCoupleType(e.target.value)}
              >
                <option value="">Select...</option>
                {coupleTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="mb-3">
              <legend className="col-form-label">Have you had a Donor before?</legend>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="had-donor-yes"
                  value="yes"
                  checked={hadDonor === "yes"}
                  onChange={() => setHadDonor("yes")}
                />
                <label className="form-check-label" htmlFor="had-donor-yes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="had-donor-no"
                  value="no"
                  checked={hadDonor === "no"}
                  onChange={() => setHadDonor("no")}
                />
                <label className="form-check-label" htmlFor="had-donor-no">
                  No
                </label>
              </div>
            </fieldset>

            <div className="mb-4">
              <label className="form-label">Marital Status</label>
              <select
                className="form-select"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option value="">Select...</option>
                {maritalStatusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={loading}
            >
              {loading ? "Updating…" : "Update"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/recipient/dashboard")}
            >
              Cancel
            </button>
          </form>
        </main>
      </div>
    </>
  );
}