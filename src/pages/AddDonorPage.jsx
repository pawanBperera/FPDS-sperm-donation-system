import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "../components/Sidebars/AdminSidebar";
import { conditionsList } from "../constants"; // [{ id, label }…]
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";

export default function AddDonorPage() {
  const navigate = useNavigate();

  // Basic info
  const [donorId, setDonorId] = useState("");
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [dob, setDob] = useState("");

  const [bloodType, setBloodType] = useState("");
  const [nationality, setNationality] = useState("");

  // Genetic screening
  const [diseases, setDiseases] = useState([]);

  // medical & lifestyle fields
  const [childhoodDiseases, setChildhoodDiseases] = useState("");
  const [traumaticInjury, setTraumaticInjury] = useState("");
  const [highFeverLastYear, setHighFeverLastYear] = useState("");
  const [alcoholFrequency, setAlcoholFrequency] = useState("");
  const [smokingHabit, setSmokingHabit] = useState("");
  const [exerciseLevel, setExerciseLevel] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [stressLevel, setStressLevel] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleDisease = (id) => {
    setDiseases((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();


  console.log("😀👍 handleSave triggered");


    setError("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const token = await currentUser.getIdToken(true);

      const payload = {
        donorId,
        email,
        password: tempPassword,
        dob,

        bloodType,
        nationality,
        diseases,
        
        childhoodDiseases,
        traumaticInjury,
        highFeverLastYear,
        alcoholFrequency,
        smokingHabit,
        exerciseLevel,
        sleepQuality,
        stressLevel,
      };

      
    console.log("💪 Payload to send:", payload);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log("👾 Debug Payload Before Submit:", payload);

      console.log("📫 Sending POST to backend >>> >>> >>>");
      await axios.post("http://localhost:8080/api/donors", payload, config);
      console.log("📭 POST sent successfully!");
      navigate("/admin/dashboard");
    } catch (err) {

      console.error("❌ Error creating donor:", err);
      console.log("❌ Server Response:", err.response?.data);

      const serverMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to add donor. Please try again.";
      setError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  const donorConditions = conditionsList.slice(0, 6);



  return (
    <div className="admin-page" style={{ marginLeft: "240px", minHeight: "100vh" }}>
      <AdminSidebar />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Add New Donor</h1>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSave}>
          <h3>Basic Donor Information</h3>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label htmlFor="donorId" className="form-label">
                Donor ID
              </label>
              <input
                id="donorId"
                type="text"
                className="form-control"
                value={donorId}
                onChange={(e) => setDonorId(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="tempPassword" className="form-label">
                Temporary Password
              </label>
              <input
                id="tempPassword"
                type="password"
                className="form-control"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              
              <label htmlFor="dob" className="form-label">Date of Birth</label>
<input
  id="dob"
  type="date"
  className="form-control"
  value={dob}
  onChange={(e) => setDob(e.target.value)}
  required
/>

            </div>

            <select
  id="bloodType"
  className="form-select"
  value={bloodType}
  onChange={(e) => setBloodType(e.target.value)}
  required
>
  <option value="">Select Blood Type</option>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
</select>



            <select
  id="nationality"
  className="form-select"
  value={nationality}
  onChange={(e) => setNationality(e.target.value)}
  required
>
  <option value="">Select Nationality</option>
  <option value="Sri Lankan">Sri Lankan</option>
  <option value="Indian">Indian</option>
  <option value="Pakistani">Pakistani</option>
  <option value="Bangladeshi">Bangladeshi</option>
  <option value="Other">Other</option>
</select>



          </div>

          <h3>Genetic Screening Information</h3>
          <div className="mb-4">
            {donorConditions.map(({ id, label }) => (
              <div className="form-check" key={id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cond-${id}`}
                  checked={diseases.includes(id)}
                  onChange={() => toggleDisease(id)}
                />
                <label className="form-check-label" htmlFor={`cond-${id}`}>
                  {label}
                </label>
              </div>
            ))}
          </div>

          {/*  Medical & Lifestyle Section */}
          <h3>Medical & Lifestyle Information</h3>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">Childhood Diseases (ie , chicken pox, measles, polio)</label><hr></hr>
              <select
                className="form-select"
                value={childhoodDiseases}
                onChange={(e) => setChildhoodDiseases(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Traumatic Injury</label><hr></hr>
              <select
                className="form-select"
                value={traumaticInjury}
                onChange={(e) => setTraumaticInjury(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>


            <div className="col-md-4">
              <label className="form-label">High Fever Last Year</label><hr></hr>
              <select
                className="form-select"
                value={highFeverLastYear}
                onChange={(e) => setHighFeverLastYear(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="NO">No</option>
                <option value="LESS_THAN_3_MONTHS_AGO">
                  Less than 3 months ago
                </option>
                <option value="MORE_THAN_3_MONTHS_AGO">
                  More than 3 months ago
                </option>
              </select>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">Alcohol Frequency</label><hr></hr>
              <select
                className="form-select"
                value={alcoholFrequency}
                onChange={(e) => setAlcoholFrequency(e.target.value)}
                required
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
            <div className="col-md-4">
              <label className="form-label">Smoking Habit</label><hr></hr>
              <select
                className="form-select"
                value={smokingHabit}
                onChange={(e) => setSmokingHabit(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="NEVER">Never</option>
                <option value="OCCASIONAL">Occasional</option>
                <option value="DAILY">Daily</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Exercise Level</label><hr></hr>
              <select
                className="form-select"
                value={exerciseLevel}
                onChange={(e) => setExerciseLevel(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="LOW">Low</option>
                <option value="MODERATE">Moderate</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">Sleep Quality</label><hr></hr>
              <select
                className="form-select"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="POOR">Poor</option>
                <option value="AVERAGE">Average</option>
                <option value="GOOD">Good</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Stress Level</label><hr></hr>
              <select
                className="form-select"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="LOW">Low</option>
                <option value="MODERATE">Moderate</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-3">
            <button type="submit" 
            className="btn btn-pink" 
            disabled={loading}>
              {loading ? "Saving…" : "Save Record"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
