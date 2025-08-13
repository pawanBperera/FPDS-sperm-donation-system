// File: src/pages/RecipientProfileManager.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import "./RecipientProfileManager.css";


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
const provinceOptions = [
  "Central",
  "Eastern",
  "North Central",
  "Northern",
  "North Western",
  "Sabaragamuwa",
  "Southern",
  "Uva",
  "Western",
];

export default function RecipientProfileManager() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    ethnicity: "",
    religion: "",
    education: "",
    spoken_languages: [],
    smoker: null,
    couple_type: "",
    had_previous_donor: null,
    marital_status: "",
    province: "",
    nic: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        const token = await currentUser.getIdToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const res = await axios.get(`/api/recipients/${user.id}/profile`, config);
        const data = res.data;
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          date_of_birth: data.date_of_birth || "",
          ethnicity: data.ethnicity || "",
          religion: data.religion || "",
          education: data.education || "",
          spoken_languages: data.spoken_languages?.split(",") || [],
          smoker: data.smoker ? "yes" : "no",
          couple_type: data.couple_type || "",
          had_previous_donor: data.had_previous_donor ? "yes" : "no",
          marital_status: data.marital_status || "",
          province: data.province || "",
          nic: data.nic || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile. Please try again.");
        alert("Failed to load profile. Please try again.");
      }
    }
    fetchProfile();
  }, [user.id]);

  const toggleLanguage = (lang) => {
    setFormData((prev) => ({
      ...prev,
      spoken_languages: prev.spoken_languages.includes(lang)
        ? prev.spoken_languages.filter((l) => l !== lang)
        : [...prev.spoken_languages, lang],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.first_name || !formData.last_name) {
      setError("First and last name are required.");
      setLoading(false);
      return;
    }

    try {
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.put(`/api/recipients/${user.id}/profile`, {
        ...formData,
        spoken_languages: formData.spoken_languages.join(","),
        smoker: formData.smoker === "yes",
        had_previous_donor: formData.had_previous_donor === "yes",
      }, config);

      alert("Profile updated successfully!");
      navigate("/recipient/dashboard");
    } catch (err) {
      console.error("Update error:", err.response || err);
      setError("Failed to update profile. Try again.");
      alert("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <NavBar />
     <div
  className="recipient-dashboard"
  style={{ marginLeft: "240px", paddingTop: "64px", minHeight: "190vh" }}
>
        <RecipientSidebar />
        <main className="flex-grow-1 p-4">
          <h1>Your Profile</h1>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">NIC</label>
              <input type="text" className="form-control" name="nic" value={formData.nic} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Province</label>
              <select className="form-select" name="province" value={formData.province} onChange={handleChange}>
                <option value="">Select...</option>
                {provinceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Birthday</label>
              <input type="date" className="form-control" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Ethnicity</label>
              <select className="form-select" name="ethnicity" value={formData.ethnicity} onChange={handleChange}>
                <option value="">Select...</option>
                {ethnicityOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Religion</label>
              <select className="form-select" name="religion" value={formData.religion} onChange={handleChange}>
                <option value="">Select...</option>
                {religionOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Education</label>
              <select className="form-select" name="education" value={formData.education} onChange={handleChange}>
                <option value="">Select...</option>
                {educationOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <fieldset className="mb-3">
              <legend className="col-form-label">Spoken Languages</legend>
              {languageOptions.map((lang) => (
                <div className="form-check" key={lang}>
                  <input className="form-check-input" type="checkbox" id={`lang-${lang}`} checked={formData.spoken_languages.includes(lang)} onChange={() => toggleLanguage(lang)} />
                  <label className="form-check-label" htmlFor={`lang-${lang}`}>{lang}</label>
                </div>
              ))}
            </fieldset>
            <fieldset className="mb-3">
              <legend className="col-form-label">Smoker</legend>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" id="smoker-yes" value="yes" checked={formData.smoker === "yes"} onChange={handleChange} name="smoker" />
                <label className="form-check-label" htmlFor="smoker-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" id="smoker-no" value="no" checked={formData.smoker === "no"} onChange={handleChange} name="smoker" />
                <label className="form-check-label" htmlFor="smoker-no">No</label>
              </div>
            </fieldset>
            <div className="mb-3">
              <label className="form-label">Explain Your Couple Type</label>
              <select className="form-select" name="couple_type" value={formData.couple_type} onChange={handleChange}>
                <option value="">Select...</option>
                {coupleTypeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <fieldset className="mb-3">
              <legend className="col-form-label">Have you had a Donor before?</legend>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" id="had-donor-yes" value="yes" checked={formData.had_previous_donor === "yes"} onChange={handleChange} name="had_previous_donor" />
                <label className="form-check-label" htmlFor="had-donor-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" id="had-donor-no" value="no" checked={formData.had_previous_donor === "no"} onChange={handleChange} name="had_previous_donor" />
                <label className="form-check-label" htmlFor="had-donor-no">No</label>
              </div>
            </fieldset>
            <div className="mb-4">
              <label className="form-label">Marital Status</label>
              <select className="form-select" name="marital_status" value={formData.marital_status} onChange={handleChange}>
                <option value="">Select...</option>
                {maritalStatusOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary me-2" disabled={loading}>{loading ? "Updating…" : "Update"}</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/recipient/dashboard")}>Cancel</button>
          </form>
        </main>
      </div>
    </>
  );
}
