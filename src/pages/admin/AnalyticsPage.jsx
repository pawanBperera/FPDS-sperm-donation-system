import { useEffect, useState } from 'react';
import {
  fetchSummary,
  fetchAgeRisk,
  fetchPieData,
  fetchAnalyticsData,
  fetchPrediction,
  downloadReport 
} from '../../services/analyticsApi';

 import { SummaryCards } from '../../components/analytics/SummaryCards';
 import { RiskByAgeChart } from '../../components/analytics/RiskByAgeChart';
 import { HighRiskDonut } from '../../components/analytics/HighRiskDonut';
 import { AffectedDonorTable } from '../../components/analytics/AffectedDonorTable';
 import { ActionButtons } from '../../components/analytics/ActionButtons';

 
import { getAuth } from 'firebase/auth';
import './AnalyticsPage.css';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function AnalyticsPage() {
  const [summary, setSummary] = useState({ totalDonors: 0, pctHighRisk: 0, topAgeGroup: '' });
  const [ageRisk, setAgeRisk] = useState([]);
  const [pieData, setPieData] = useState({ highRisk: 0, lowRisk: 0 });
  const [rows, setRows] = useState([]);
const [prediction, setPrediction] = useState({ predictedHighRiskPct: 0, note: '' });
useEffect(() => {
  const auth = getAuth();
  if (auth.currentUser) {
    auth.currentUser
      .getIdToken()
      .then(token => console.log('🔥 Firebase ID token:', token));
  }
}, []);

  // loader function
  const loadAll = () => {
    fetchSummary()
      .then(res => setSummary(res.data))
      .catch(() => {/* handle error */});

    fetchAgeRisk()
      .then(res => setAgeRisk(res.data))
      .catch(() => {/* handle error */});

    fetchPieData()
      .then(res => setPieData(res.data))
      .catch(() => {/* handle error */});

    fetchAnalyticsData()
      .then(res => setRows(res.data))
      .catch(() => {/* handle error */});

 fetchPrediction()
     .then(res => setPrediction(res.data))
     .catch(() => {/* handle error */});

  };

  // run once on mount
  useEffect(() => {
    loadAll();
  }, []);



  const handleDownload = () => {
    downloadReport()
      .then(res => {
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        const url  = window.URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'analytics_report.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error('Download failed', err);
        alert('Could not download report.');
      });
  };

  return (
<div className="analytics-page">      <h1 className="text-center text-4xl font-bold text-purple-700 mb-6">
        Spermatogenesis Risk Prediction
      </h1>

      {/* Summary */}
       <div className="summary-cards-container">
   <SummaryCards summary={summary} className="summary-card" />
 </div>

      {/* Charts */}
     <div className="charts-section">
            <RiskByAgeChart data={ageRisk} />
            <HighRiskDonut highRisk={pieData.highRisk} lowRisk={pieData.lowRisk} />
      </div>
{/* Prediction card */}
     <div className="summary-card">
       <span className="summary-card-icon"><FaExclamationTriangle className="warning-icon" /></span>
       <div className="summary-card-content">
         <p className="label">Predicted High‑Risk Next 30 Days</p>
         <p className="value">{prediction.predictedHighRiskPct}%</p>
         <p className="text-xs text-gray-400">{prediction.note}</p>
       </div>
     </div>


      {/* Table */}
<h2 className="affected-donor-title">
            Affected Donor Details
      </h2>
      <div className="affected-donor-table">
  <AffectedDonorTable rows={rows} />
 </div>

      {/* Buttons */}
      <div className="action-buttons">
    <ActionButtons
      onDownload={handleDownload}
       onUpdate={loadAll}
     />
 </div>


    </div>



  );
}
