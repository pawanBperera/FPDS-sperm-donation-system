
import React from "react";
import { conditionsList } from "../../constants"; 
import "./Step2.css";

export default function Step2({
  diseases, setDiseases,
  file, setFile,
  consent, setConsent,
  onBack,
  onRegister,
  loading
}) 



{
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
      <div className="step2-background">
      <div className="step2-wrapper">


  <div className="hed">
    <h2>Step 2</h2>
    <h3>Health Info</h3>
    <h4>Intended parent registration</h4>
    <h5>Do you, or any of your close family members have a history of the following conditions?</h5>
    </div>
  </div>
     


      <div className="step2-form">
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
        <label>Upload any medical screening reorts you have (PDF, max 5MB)</label>
        <br></br>
        <input type="file" accept="application/pdf" onChange={handleFile} />


       <br></br><br></br> 
       

       <div className="conf">
       <p>This file will remain confidential and only be reviwed by authorized clinic personnel.</p>
      </div>

        {file && <p>Selected: {file.name} ({(file.size/1024/1024).toFixed(1)} MB)</p>}
      </div>


      <br></br>


    
      <label className="consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        
        <p>I understand this will be used for matching only.</p>

      </label>

      <div className="buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onRegister} disabled={loading}>
          {loading ? "Registering…" : "Register"}
        </button>
      </div>
    </div>
    </div>
  );
}
