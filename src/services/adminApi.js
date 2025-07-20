// File: src/services/adminApi.js
import axios from "../axiosInstance";

// Get all matches (pending)
export const fetchPendingMatches = async () => {
  const res = await axios.get("/api/matches/status/pending");
  return res.data;
};

// Get approved matches
export const fetchApprovedMatches = async () => {
  const res = await axios.get("/api/matches/status/approved");
  return res.data;
};

// Get rejected matches
export const fetchRejectedMatches = async () => {
  const res = await axios.get("/api/matches/status/rejected");
  return res.data;
};

// Update match status (approve or reject)
export const updateMatchStatus = async (matchId, status, adminId) => {
  const res = await axios.put(`/api/matches/${matchId}/status`, null, {
    params: {
      status,
      adminId,
    },
  });
  return res.data;
};

// Get match summary stats
export const fetchMatchStats = async () => {
  const res = await axios.get("/api/analytics/match-summary");
  return res.data;
};

// ✅ NEW: Total recipients count
export const fetchTotalRecipients = async () => {
  const res = await axios.get("/api/admin/analytics/total-recipients");
  return res.data;
};

// ✅ NEW: Total donors count
export const fetchTotalDonors = async () => {
  const res = await axios.get("/api/admin/analytics/total-donors");
  return res.data;
};

// ✅ NEW: Total matches count
export const fetchTotalMatches = async () => {
  const res = await axios.get("/api/admin/analytics/total-matches");
  return res.data;
};
