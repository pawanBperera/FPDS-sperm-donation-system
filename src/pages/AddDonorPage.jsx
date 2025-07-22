// File: src/pages/AddDonorPage.jsx
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
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [nationality, setNationality] = useState("");

  // Genetic screening
  const [diseases, setDiseases] = useState([]);

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
        age: age ? parseInt(age, 10) : null,
        bloodType,
        nationality,
        diseases,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "http://localhost:8080/api/donors",
        payload,
        config
      );
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error creating donor:", err);
      // Extract a safe error message
      const serverMsg = err.response?.data?.message || err.message || "Failed to add donor. Please try again.";
      setError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  // only first six conditions for donor
  const donorConditions = conditionsList.slice(0, 6);

  return (
      <div className="admin-page" style={{ marginLeft: "240px", minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
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
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                id="age"
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min={18}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="bloodType" className="form-label">
                Blood Type
              </label>
              <input
                id="bloodType"
                type="text"
                className="form-control"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="nationality" className="form-label">
                Nationality
              </label>
              <input
                id="nationality"
                type="text"
                className="form-control"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />
            </div>
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
                <label
                  className="form-check-label"
                  htmlFor={`cond-${id}`}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>

          <div className="d-flex gap-3">
            <button
              type="submit"
              className="btn btn-pink"
              disabled={loading}
            >
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
