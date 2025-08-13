import React, { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { getAuth } from "firebase/auth";
import "./PredictionPage.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  


  // Dummy pie data (static for now)
  const pieData = [
  { name: "Achieved Score", value: prediction?.score || 0 },
  { name: "Penalty", value: 100 - (prediction?.score || 0) }
];




  const COLORS = ["#4caf50", "#ffc107", "#f44336"];

 const { donorId, recipientId } = useParams();
  console.log("Params from URL:", donorId, recipientId);

  
const navigate = useNavigate();

//*************************************************************************** */
const fetchPrediction = async () => {
  setLoading(true);

  try {
    // ✅ Use route params if available, fallback for demo mode
   const donor = donorId && donorId !== "undefined" ? parseInt(donorId) : 3;
const recipient = recipientId && recipientId !== "undefined" ? parseInt(recipientId) : 10;



console.log("✅ Using IDs → Donor:", donor, "| Recipient:", recipient);

    // ✅ Firebase Auth check
    const auth = getAuth();
    if (!auth.currentUser) {
      alert("Please log in to use this feature.");
      setLoading(false);
      return;
    }

    const token = await auth.currentUser.getIdToken();

    
    // ✅ API call
    const response = await axios.get("http://localhost:8080/api/predict-compatibility", {
      headers: { Authorization: `Bearer ${token}` },
      params: { donorId: donor, recipientId: recipient }
    });

    console.log("Prediction API Response:", response.data);
    setPrediction(response.data);

  } catch (err) {
    console.error("Error fetching prediction:", err);
    setError("Could not fetch prediction");
  } finally {
    setLoading(false);
  }
};






  return (
    <div className="prediction-container">

      <h2 className="prediction-title">Compatibility Predictor</h2>
     <p className="prediction-subtitle">
        
      </p>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}


      {loading && <p style={{ textAlign: "center" }}>Calculating...</p>}

      {!prediction && !loading && (
       <div className="predict-btn-wrapper">
          <button className="predict-btn" onClick={fetchPrediction}>
            Predict Compatibility
          </button>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    className="btn btn-secondary"
    style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px" }}
    onClick={() => navigate("/admin/dashboard")}
  >
    Back to Dashboard
  </button>
</div>

        </div>





      )}




     {prediction && (
  <>
    {/* Score */}
   <div className="prediction-score-wrapper">
      <h1 className="prediction-score">{prediction?.score}</h1>

     <h3
  className="prediction-risk"
  style={{
    color:
      prediction?.overallRisk === "LOW" ? "green" :
      prediction?.overallRisk === "MEDIUM" ? "orange" : "red"
  }}
>
  {prediction?.overallRisk} RISK
</h3>

    </div>

    {/* Charts */}

    
    <div className="prediction-charts">
      {/* Bar Chart */}



 <div className="bar-chart-section">
   <h4>Factor Breakdown</h4>
  
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
    
      data={[
         { name: "Genetic", value: prediction?.riskBreakdown?.genetic ?? 0 },
        { name: "Location", value: prediction?.riskBreakdown?.location ?? 0 },
      { name: "Ethnicity", value: prediction?.riskBreakdown?.ethnicity ?? 0 }
      ]}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#62359aff" />
    </BarChart>
  </ResponsiveContainer>
</div>



      {/* Pie Chart */}
      <div className="pie-chart-section">
        <h4>Risk Distribution</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={80} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Quick Facts */}
    <div className="prediction-quick-facts">
      <h4>Quick Facts</h4>
      <p>Genetic Risk: {prediction?.details?.geneticRisk}</p>
      <p>Province Match: {prediction?.details?.provinceMatch ? "Yes ✅" : "No ❌"}</p>
      <p>Ethnicity Match: {prediction?.details?.ethnicityMatch ? "Yes ✅" : "No ❌"}</p>
    </div>

    {/* Insights */}
<div className="prediction-insights">
        <h4>Insights</h4>
      <p>
        Genetic risk between donor and recipient is {prediction?.details?.geneticRisk}.
        {prediction?.details?.provinceMatch
          ? " Both belong to the same province."
          : " They are in different provinces."}
        {prediction?.details?.ethnicityMatch
          ? " Ethnicity matches."
          : " Ethnicity does not match, but this is optional."}
        Overall, the match is considered {prediction?.overallRisk}.
      </p>


      
    </div>

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

    
  </>

  
)}

    </div>
  );
};



export default PredictionPage;
