import React, { useState, useEffect } from "react";
import { predict, getModelInfo, trainModel } from "../services/predictApi";
import "./admin-prediction.css";

import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

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
  const metrics = info?.metrics ?? info ?? {};


const navigate = useNavigate();


  useEffect(() => {
    getModelInfo()
      .then((r) => setInfo(r.data))
      .catch(() => setInfo(null));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name.includes("age") || name.includes("hours") ? Number(value) : value,
    }));
  };

  const onPredict = async () => {
    try {
      setBusy(true);
      setError("");
      setResult(null);
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
    setBusy(true);
    setError("");
    await trainModel();                       // kick off training
    const r = await getModelInfo();           // fetch full meta (metrics + analytics)
    setInfo(r.data);
  } catch (e) {
    setError(e?.response?.data?.detail || "Train failed");
  } finally {
    setBusy(false);
  }
};


  return (
    <div className="container mt-4 admin-prediction">
      <h3 className="admin-prediction__title">Fertility Prediction Tool</h3>
      
      <p className="desc">Enter personal 
        and lifestyle details below 
        to receive a fertility health 
        prediction. The system analyzes 
        inputs and estimates the 
        likelihood of an Altered or 
        Normal fertility outcome, and 
        highlights the top factors 
        influencing the result.</p>

      {/* Metrics / Status */}
      <div className="mb-3 model-metrics">
        {info ? (
          <small className="model-metrics__text">
            <b>Model:</b> LogisticRegression •{" "}
<b>F1(Altered):</b> {metrics.f1_Altered} • <b>ROC-AUC:</b> {metrics.roc_auc}
            <b>ROC-AUC:</b> {info.metrics?.roc_auc ?? info.roc_auc}
          </small>
        ) : (
          <small className="model-metrics__text model-metrics__text--empty">
            No trained model yet.
          </small>
        )}



        <button
          className="btn btn-sm btn-outline-primary ms-2 model-metrics__train-btn"
          onClick={onTrain}
          disabled={busy}
        >
          {busy ? 
          "Training...⏸" 
          : "Train ▶"}
        </button>





      </div>

      {/* Form */}
      <div className="card p-3 mb-3 prediction-form">
        <div className="row g-2 prediction-form__grid">
          <div className="col-md-2 form-field form-field--age">
            <label className="form-label form-field__label">Age</label>
            <input
              type="number"
              className="form-control form-field__input"
              name="age"
              value={form.age}
              min={18}
              max={80}
              onChange={onChange}
            />
          </div>

          <div className="col-md-3 form-field form-field--childish">
            <label className="form-label form-field__label">Childish diseases</label>
            <select
              name="childish_diseases"
              className="form-select form-field__input"
              value={form.childish_diseases}
              onChange={onChange}
            >
              <option>yes</option>
              <option>no</option>
            </select>
          </div>

          <div className="col-md-3 form-field form-field--trauma">
            <label className="form-label form-field__label">Accident/Trauma</label>
            <select
              name="accident_or_serious_trauma"
              className="form-select form-field__input"
              value={form.accident_or_serious_trauma}
              onChange={onChange}
            >
              <option>yes</option>
              <option>no</option>
            </select>
          </div>

          <div className="col-md-4 form-field form-field--fever">
            <label className="form-label form-field__label">High fevers (last year)</label>
            <select
              name="high_fevers_last_year"
              className="form-select form-field__input"
              value={form.high_fevers_last_year}
              onChange={onChange}
            >
              <option>less than three months ago</option>
              <option>more than three months ago</option>
              <option>no</option>
            </select>
          </div>



          <div className="col-md-4 form-field form-field--alcohol">
            <label className="form-label form-field__label">Alcohol</label>
            <select
              name="alcohol_consumption"
              className="form-select form-field__input"
              value={form.alcohol_consumption}
              onChange={onChange}
            >
              <option>several times a day</option>
              <option>every day</option>
              <option>several times a week</option>
              <option>once a week</option>
              <option>hardly ever or never</option>
            </select>
          </div>




          <div className="col-md-4 form-field form-field--smoking">
            <label className="form-label form-field__label">Smoking</label>
            <select
              name="smoking_habit"
              className="form-select form-field__input"
              value={form.smoking_habit}
              onChange={onChange}
            >
              <option>never</option>
              <option>occasional</option>
              <option>daily</option>
            </select>
          </div>

          <div className="col-md-4 form-field form-field--sitting">
            <label className="form-label form-field__label">Hours sitting/day</label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="24"
              className="form-control form-field__input"
              name="hours_sitting_per_day"
              value={form.hours_sitting_per_day}
              onChange={onChange}
            />
          </div>
        </div>

        <button
          className="btn btn-primary mt-3 predict-btn"
          onClick={onPredict}
          disabled={busy}
        >
          {busy ? "Predicting...💭" : "Predict"}
        </button>
      </div>

      {/* Result */}
      {error && <div className="alert alert-danger prediction-error">{error}</div>}

      {result && (
        <div className="card p-3 prediction-result">
          <h5 className="prediction-result__title">
            Result: {result.prediction}
          </h5>
          <div className="prediction-result__confidence">
            Confidence: {(result.probability * 100).toFixed(1)}%
          </div>

          {result.why?.length > 0 && (
            <div className="mt-2 prediction-result__drivers">
              <div className="text-muted prediction-result__drivers-label">
                Top drivers:
              </div>
              <ul className="mb-0 prediction-result__drivers-list">
                {result.why.map((w, i) => (
                  <li key={i} className="prediction-result__driver">
                    <code className="prediction-result__driver-feature">{w.feature}</code>{" "}
                    <span className="prediction-result__driver-impact">(impact {w.impact})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}


{info?.analytics && (
  <div className="card p-3 mt-4">
    <h5 className="mb-3">Analytics</h5>

    <div className="row">
      {/* Class Distribution */}
      <div className="col-md-6">
        <h6>Class Distribution</h6>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            {(() => {
              const classLabels = (info.metrics?.classes) || (info.classes) || ["Normal", "Altered"];
              const classPieData = Object.entries(info.analytics.class_counts || {})
                .map(([name, value]) => ({ name, value: Number(value) }));
              const COLORS = {
                [classLabels[0]]: "#ff5050ff",
                [classLabels[1]]: "#50ff70fe",
              };
              return (
                <>
                  <Pie
                    data={classPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {classPieData.map((d, i) => (
                      <Cell key={i} fill={COLORS[d.name] || "#8884d8"} />
                    ))}
                  </Pie>
                  <ReTooltip formatter={(v, n) => [Number(v), n]} />
                  <Legend />
                </>
              );
            })()}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Global Feature Importance */}
      <div className="col-md-6">
        <h6>Global Feature Importance</h6>
        {Array.isArray(info.analytics.global_importance) && info.analytics.global_importance.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={info.analytics.global_importance.slice(0, 8)}
              margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" angle={-30} textAnchor="end" interval={0} />
              <YAxis />
              <ReTooltip />
              <Bar dataKey="importance" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-muted small">No importance data yet — train the model first.</div>
        )}
      </div>
    </div>
  </div>
)}
</div>
 )}

<button
    className="btn btn-secondary"
    style={{ 
       padding: "12px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: "10px",
      backgroundColor: "#f88ef0ff", // custom blue
      color: "black", // text color
      border: "none",
      borderRadius: "18px",
      boxShadow: "0 6px #6c2667ff", // 3D effect
      cursor: "pointer", 

 display: "flex",
    justifyContent: "center",
    alignItems: "center",

    }}
    onClick={() => navigate("/admin/dashboard")}
  >
    Back to Dashboard
  </button>
 
</div>
  );
}
