
import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";//                 <---------------------------------------------
import { DonorSidebar } from "../components/Sidebars/DonorSidebar";
import "./DonorProfileManager.css";

export default function DonorProfileManager() {
//  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Dropdown option lists (tweak as needed)
  const willingOptions       = ["Please select", "Open to all", "Couples only", "Singles only"];
  const educationOptions     = ["Please select", "High School", "Bachelor’s", "Master’s", "Other"];
  const bloodTypeOptions     = ["Please select", "A+", "A–", "B+", "B–", "O+", "O–", "AB+", "AB–"];
  const maritalStatusOptions = ["Please select", "Single", "Married", "Divorced", "Widowed"];

  // Form state
  const [willingToHelp, setWillingToHelp]     = useState("");
  const [childrenCount, setChildrenCount]     = useState("");
  const [city, setCity]                       = useState("");
  const [district, setDistrict]               = useState("");
  const [race, setRace]                       = useState("");
  const [nationality, setNationality]         = useState("");
  const [religion, setReligion]               = useState("");
  const [education, setEducation]             = useState("");
  const [spokenLanguages, setSpokenLanguages] = useState("");
  const [smoker, setSmoker]                   = useState(false);
  const [bloodType, setBloodType]             = useState("");
  const [height, setHeight]                   = useState("");
  const [weight, setWeight]                   = useState("");
  const [hairColor, setHairColor]             = useState("");
  const [eyeColor, setEyeColor]               = useState("");
  const [maritalStatus, setMaritalStatus]     = useState("");
  const [hadBeenDonor, setHadBeenDonor]       = useState(false);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState("");
  const [dob, setDob]                         = useState("");
  const [childhoodDiseases, setChildhoodDiseases]     = useState("");
  const [traumaticInjury, setTraumaticInjury]         = useState("");
  const [highFeverLastYear, setHighFeverLastYear]     = useState("");
  const [alcoholFrequency, setAlcoholFrequency]       = useState("");
  const [smokingHabit, setSmokingHabit]               = useState("");
  const [exerciseLevel, setExerciseLevel]             = useState("");
  const [sleepQuality, setSleepQuality]               = useState("");
  const [stressLevel, setStressLevel]                 = useState("");




  // Fetch existing profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`/api/donors/${user.id}/profile`);
        const p = res.data;
        setWillingToHelp(p.willing_to_help || "");
        setChildrenCount(p.number_of_children || "");
        setCity(p.city || "");
        setDistrict(p.district || "");
        setRace(p.race || "");
        setNationality(p.nationality || "");
        setReligion(p.religion || "");
        setEducation(p.education || "");
        setSpokenLanguages(p.spoken_languages || "");
        setSmoker(Boolean(p.smoker));
        setBloodType(p.blood_type || "");
        setHeight(p.height_cm || "");
        setWeight(p.weight_kg || "");
        setHairColor(p.hair_color || "");
        setEyeColor(p.eye_color || "");
        setMaritalStatus(p.marital_status || "");
        setHadBeenDonor(Boolean(p.had_been_donor));
        setDob(p.dob || "");
        setChildhoodDiseases(p.childhoodDiseases || "");
        setTraumaticInjury(p.traumaticInjury || "");
        setHighFeverLastYear(p.highFeverLastYear || "");
        setAlcoholFrequency(p.alcoholFrequency || "");
        setSmokingHabit(p.smokingHabit || "");
        setExerciseLevel(p.exerciseLevel || "");
        setSleepQuality(p.sleepQuality || "");
        setStressLevel(p.stressLevel || "");



      } catch (err) {
        console.error("Error loading donor profile:", err);
        setError("Could not load your profile.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user.id]);



  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    try {
      await axios.put(`/api/donors/${user.id}/profile`, {
        willing_to_help:       willingToHelp,
        number_of_children:    childrenCount,
        city,
        district,
        race,
        nationality,
        religion,
        education,
        spoken_languages:      spokenLanguages,
        smoker,
        blood_type:            bloodType,
        height_cm:             height,
        weight_kg:             weight,
        hair_color:            hairColor,
        eye_color:             eyeColor,
        marital_status:        maritalStatus,
        had_been_donor: hadBeenDonor,
        willing_to_help: willingToHelp,
        bloodType,
        nationality,
        dob,
        childhoodDiseases,
        traumaticInjury,
        highFeverLastYear,
        alcoholFrequency,
        smokingHabit,
        exerciseLevel,
        sleepQuality,
        stressLevel
      });
      alert("Profile updated!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading profile…</div>;

  return (
    <div
  className="donor-page"
  style={{ marginLeft: "240px", minHeight: "100vh" }}
>
      <DonorSidebar />
      <main className="flex-grow-1 p-4">
        <h1 className="mb-4">Your Profile</h1>
        {error && <div className="alert alert-danger">{error}</div>}




        <form onSubmit={handleUpdate} className="donor-profile-form">
          {/* Willing to help */}
          <div className="mb-3">
            <label className="form-label">I’m Willing to help</label>
            <select
              className="form-select"
              value={willingToHelp}
              onChange={(e) => setWillingToHelp(e.target.value)}
            >
              {willingOptions.map((opt) => (
                <option key={opt} value={opt === "Please select" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Number of children */}
          <div className="mb-3">
            <label className="form-label">Number of Children</label>
            <input
              type="number"
              className="form-control"
              value={childrenCount}
              onChange={(e) => setChildrenCount(e.target.value)}
            />
          </div>

          {/* City & District */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">District</label>
              <input
                className="form-control"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
          </div>

          {/* Race */}
          <div className="mb-3">
            <label className="form-label">Race</label>
            <input
              className="form-control"
              value={race}
              onChange={(e) => setRace(e.target.value)}
            />
          </div>

          {/* Nationality */}
          <div className="mb-3">
            <label className="form-label">Nationality</label>
            <input
              className="form-control"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>

          {/* Religion */}
          <div className="mb-3">
            <label className="form-label">Religion</label>
            <input
              className="form-control"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            />
          </div>

          {/* Education */}
          <div className="mb-3">
            <label className="form-label">Education</label>
            <select
              className="form-select"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              {educationOptions.map((opt) => (
                <option key={opt} value={opt === "Please select" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Spoken Languages */}
          <div className="mb-3">
            <label className="form-label">Spoken Languages</label>
            <input
              className="form-control"
              value={spokenLanguages}
              onChange={(e) => setSpokenLanguages(e.target.value)}
            />
          </div>

          {/* Smoker */}
          <div className="mb-3">
            <label className="form-label d-block">Smoker</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="smoker"
                id="smokerYes"
                checked={smoker === true}
                onChange={() => setSmoker(true)}
              />
              <label className="form-check-label" htmlFor="smokerYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="smoker"
                id="smokerNo"
                checked={smoker === false}
                onChange={() => setSmoker(false)}
              />
              <label className="form-check-label" htmlFor="smokerNo">
                No
              </label>
            </div>
          </div>

          <div className="mb-3">
  <label className="form-label">Date of Birth</label>
  <input
    type="date"
    className="form-control"
    value={dob}
    onChange={(e) => setDob(e.target.value)}
  />
</div>


          {/* Blood Type */}
          <div className="mb-3">
            <label className="form-label">Blood Type</label>
            <select
              className="form-select"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              {bloodTypeOptions.map((opt) => (
                <option key={opt} value={opt === "Please select" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Height & Weight */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Height (cm)</label>
              <input
                type="number"
                className="form-control"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Weight (kg)</label>
              <input
                type="number"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          {/* Hair Color & Eye Color */}
          <div className="mb-3">
            <label className="form-label">Hair Color</label>
            <input
              className="form-control"
              value={hairColor}
              onChange={(e) => setHairColor(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Eye Color</label>
            <input
              className="form-control"
              value={eyeColor}
              onChange={(e) => setEyeColor(e.target.value)}
            />
          </div>

          {/* Marital Status */}
          <div className="mb-3">
            <label className="form-label">Marital Status</label>
            <select
              className="form-select"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              {maritalStatusOptions.map((opt) => (
                <option key={opt} value={opt === "Please select" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>




          {/* Had been Donor before */}
          <div className="mb-4">
            <label className="form-label d-block">
              Have you been a donor before?
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="hadDonor"
                id="hadDonorYes"
                checked={hadBeenDonor === true}
                onChange={() => setHadBeenDonor(true)}
              />
              <label className="form-check-label" htmlFor="hadDonorYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="hadDonor"
                id="hadDonorNo"
                checked={hadBeenDonor === false}
                onChange={() => setHadBeenDonor(false)}
              />
              <label className="form-check-label" htmlFor="hadDonorNo">
                No
              </label>
            </div>
          </div>



          <h4>Medical & Lifestyle Information</h4>

<div className="mb-3">
  <label className="form-label">Date of Birth</label>
  <input
    type="date"
    className="form-control"
    value={dob}
    onChange={(e) => setDob(e.target.value)}
  />
</div>

<div className="mb-3">
  <label className="form-label">Childhood Diseases</label>
  <select
    className="form-select"
    value={childhoodDiseases}
    onChange={(e) => setChildhoodDiseases(e.target.value)}
  >
    <option value="">Select</option>
    <option value="YES">Yes</option>
    <option value="NO">No</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label">Traumatic Injury</label>
  <select
    className="form-select"
    value={traumaticInjury}
    onChange={(e) => setTraumaticInjury(e.target.value)}
  >
    <option value="">Select</option>
    <option value="YES">Yes</option>
    <option value="NO">No</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label">High Fever Last Year</label>
  <select
    className="form-select"
    value={highFeverLastYear}
    onChange={(e) => setHighFeverLastYear(e.target.value)}
  >
    <option value="">Select</option>
    <option value="NO">No</option>
    <option value="LESS_THAN_3_MONTHS_AGO">Less than 3 months ago</option>
    <option value="MORE_THAN_3_MONTHS_AGO">More than 3 months ago</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label">Alcohol Frequency</label>
  <select
    className="form-select"
    value={alcoholFrequency}
    onChange={(e) => setAlcoholFrequency(e.target.value)}
  >
    <option value="">Select</option>
    <option value="NEVER">Never</option>
    <option value="HARDLY_EVER">Hardly ever</option>
    <option value="ONCE_A_WEEK">Once a week</option>
    <option value="SEVERAL_TIMES_WEEK">Several times a week</option>
    <option value="DAILY">Daily</option>
    <option value="SEVERAL_TIMES_DAY">Several times a day</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label">Smoking Habit</label>
  <select
    className="form-select"
    value={smokingHabit}
    onChange={(e) => setSmokingHabit(e.target.value)}
  >
    <option value="">Select</option>
    <option value="NEVER">Never</option>
    <option value="OCCASIONAL">Occasional</option>
    <option value="DAILY">Daily</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label">Exercise Level</label>
  <select
    className="form-select"
    value={exerciseLevel}
    onChange={(e) => setExerciseLevel(e.target.value)}
  >
    <option value="">Select</option>
    <option value="LOW">Low</option>
    <option value="MODERATE">Moderate</option>
    <option value="HIGH">High</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label">Sleep Quality</label>
  <select
    className="form-select"
    value={sleepQuality}
    onChange={(e) => setSleepQuality(e.target.value)}
  >
    <option value="">Select</option>
    <option value="POOR">Poor</option>
    <option value="AVERAGE">Average</option>
    <option value="GOOD">Good</option>
  </select>
</div>

<div className="mb-3">
  <label className="form-label">Stress Level</label>
  <select
    className="form-select"
    value={stressLevel}
    onChange={(e) => setStressLevel(e.target.value)}
  >
    <option value="">Select</option>
    <option value="LOW">Low</option>
    <option value="MODERATE">Moderate</option>
    <option value="HIGH">High</option>
  </select>
</div>


          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </main>
    </div>
  );
}