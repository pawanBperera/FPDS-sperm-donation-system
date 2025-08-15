import axios from '../axiosInstance';

// raw JSON from backend
export const fetchSummary       = () => 
  axios.get('/api/admin/analytics/summary');

export const fetchAgeRisk       = () => 
  axios.get('/api/admin/analytics/age-risk');

export const fetchPieData       = () => 
  axios.get('/api/admin/analytics/pie');

export const fetchAnalyticsData = () => 
  axios.get('/api/admin/analytics/data');



// for report, expect a blob and trigger a download
export const downloadReport = () =>
  axios.get('/api/admin/analytics/report', { responseType: 'blob' });

export const fetchPrediction = () =>
  axios.get('/api/admin/analytics/predict');

