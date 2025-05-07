// File: src/pages/AddDonorPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "../components/Sidebars/AdminSidebar";
import { conditionsList } from "../constants"; // [{id,label}…]
//import "./AddDonorPage.css"; // create if you need custom styles

export default function AddDonorPage() {
  const navigate = useNavigate();

  // Basic info
  const [donorId, setDonorId] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [nationality, setNationality] = useState("");
  const [bloodType2, setBloodType2] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  // Genetic screening
  const [diseases, setDiseases] = useState([]);

  // File upload
  const [file, setFile] = useState(null);

  const toggleDisease = (id) => {
    setDiseases((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: call API to create donor
    console.log({
      donorId,
      age,
      bloodType,
      nationality,
      bloodType2,
      tempPassword,
      diseases,
      file,
    });
    // After save, go back to admin dashboard
    navigate("/admin/dashboard");
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  // only first six conditions for donor
  const donorConditions = conditionsList.slice(0, 6);

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Add New Donor</h1>

        <form onSubmit={handleSave}>
          <h3>Basic Donor Information</h3>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Donor Id</label>
              <input
                type="text"
                className="form-control"
                value={donorId}
                onChange={(e) => setDonorId(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Blood Type</label>
              <input
                type="text"
                className="form-control"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nationality</label>
              <input
                type="text"
                className="form-control"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Blood Type</label>
              <input
                type="text"
                className="form-control"
                value={bloodType2}
                onChange={(e) => setBloodType2(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Temp. Password</label>
              <input
                type="text"
                className="form-control"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
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
                <label className="form-check-label" htmlFor={`cond-${id}`}>
                  {label}
                </label>
              </div>
            ))}
          </div>

          <h3>Upload Report</h3>
          <div className="mb-4">
            <div className="border border-dashed p-4 text-center">
              <p>Upload Report here (PDF only, max 5MB)</p>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="form-control"
              />
              {file && <small className="text-muted">{file.name}</small>}
            </div>
          </div>

          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-pink">
              Save Record
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
