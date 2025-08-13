import React, { useState, useEffect } from "react";
import { predict, getModelInfo, trainModel } from "../services/predictApi";

export default function AdminPrediction() {
  const [form, setForm] = useState({
    age: 26,
    childish_diseases: "no",
    accident_or_serious_trauma: "no",
    high_fevers_last_year: "no",
    alcohol_consumption: "hardly ever or never",
    smoking_habit: "never",
    hours_sitting_per_day: 6,
  });
  const [result, setResult] = useState(null);
  const [info, setInfo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getModelInfo()
      .then(r => setInfo(r.data))
      .catch(() => setInfo(null));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name.includes("age") || name.includes("hours") ? Number(value) : value }));
  };

  const onPredict = async () => {
    try {
      setBusy(true); setError(""); setResult(null);
      const { data } = await predict(form);
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.detail || "Prediction failed");
    } finally {
      setBusy(false);
    }
  };

  const onTrain = async () => {
    try {
      setBusy(true); setError("");
      const { data } = await trainModel();
      setInfo(data.metrics);
    } catch (e) {
      setError(e?.response?.data?.detail || "Train failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Prediction</h3>

      {/* Metrics / Status */}
      <div className="mb-3">
        {info ? (
          <small>
            <b>Model:</b> LogisticRegression • <b>F1(Altered):</b> {info.metrics?.f1_Altered ?? info.f1_Altered} • <b>ROC-AUC:</b> {info.metrics?.roc_auc ?? info.roc_auc}
          </small>
        ) : (
          <small>No trained model yet.</small>
        )}
        <button className="btn btn-sm btn-outline-primary ms-2" onClick={onTrain} disabled={busy}>
          {busy ? "Training..." : "Train/Re-train"}
        </button>
      </div>

      {/* Form */}
      <div className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-md-2">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" name="age" value={form.age} min={18} max={80} onChange={onChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Childish diseases</label>
            <select name="childish_diseases" className="form-select" value={form.childish_diseases} onChange={onChange}>
              <option>yes</option><option>no</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Accident/Trauma</label>
            <select name="accident_or_serious_trauma" className="form-select" value={form.accident_or_serious_trauma} onChange={onChange}>
              <option>yes</option><option>no</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">High fevers (last year)</label>
            <select name="high_fevers_last_year" className="form-select" value={form.high_fevers_last_year} onChange={onChange}>
              <option>less than three months ago</option>
              <option>more than three months ago</option>
              <option>no</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Alcohol</label>
            <select name="alcohol_consumption" className="form-select" value={form.alcohol_consumption} onChange={onChange}>
              <option>several times a day</option>
              <option>every day</option>
              <option>several times a week</option>
              <option>once a week</option>
              <option>hardly ever or never</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Smoking</label>
            <select name="smoking_habit" className="form-select" value={form.smoking_habit} onChange={onChange}>
              <option>never</option>
              <option>occasional</option>
              <option>daily</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Hours sitting/day</label>
            <input type="number" step="0.5" min="0" max="24" className="form-control" name="hours_sitting_per_day" value={form.hours_sitting_per_day} onChange={onChange} />
          </div>
        </div>

        <button className="btn btn-primary mt-3" onClick={onPredict} disabled={busy}>
          {busy ? "Predicting..." : "Predict"}
        </button>
      </div>

      {/* Result */}
      {error && <div className="alert alert-danger">{error}</div>}
      {result && (
        <div className="card p-3">
          <h5>Result: {result.prediction}</h5>
          <div>Confidence: {(result.probability * 100).toFixed(1)}%</div>
          {result.why?.length > 0 && (
            <div className="mt-2">
              <div className="text-muted">Top drivers:</div>
              <ul className="mb-0">
                {result.why.map((w, i) => (
                  <li key={i}><code>{w.feature}</code> (impact {w.impact})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
