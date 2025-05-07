// File: src/components/Registration/Step2.js
import React from "react";
import { conditionsList } from "../../constants"; // e.g. [{ id: 1, label: "Thalassemia" }, ...]

export default function Step2({
  diseases, setDiseases,
  file, setFile,
  consent, setConsent,
  onBack,
  onRegister,
  loading
}) {
  const toggleDisease = (id) => {
    setDiseases(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
  };

  return (
    <div className="step2-form">
      <h2>Step 2: Health Info</h2>

      <div className="conditions-grid">
      {conditionsList.map(({ id, label }) => (
  <label key={id}>
    <input
      type="checkbox"
      checked={diseases.includes(id)}
      onChange={() => toggleDisease(id)}
    />
    {label}
  </label>
))}
      </div>
      <br></br>
      <div className="file-upload">
        <label>Upload your file (PDF, max 5MB)</label>
        <br></br>
        <input type="file" accept="application/pdf" onChange={handleFile} />
        {file && <p>Selected: {file.name} ({(file.size/1024/1024).toFixed(1)} MB)</p>}
      </div>
      <br></br>
      <label className="consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        I understand this will be used for matching only.
      </label>

      <div className="buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onRegister} disabled={loading}>
          {loading ? "Registering…" : "Register"}
        </button>
      </div>
    </div>
  );
}
