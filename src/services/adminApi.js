
//import axios from "./axiosInstance"; 
import api from "./axiosInstance";


export const fetchPendingMatches = async () => {
  const res = await api.get("/matches/status/pending");


  return res.data;
};

// Get approved matches
export const fetchApprovedMatches = async () => {
  const res = await api.get("/matches/status/approved");
  return res.data;
};

// Get rejected matches
export const fetchRejectedMatches = async () => {
  const res = await api.get("/matches/status/rejected");
  return res.data;
};

// Update match status (approve or reject)
/*export const updateMatchStatus = async (matchId, status, adminId) => {
  const res = await api.put(`/matches/${matchId}/status`, null, {
    params: {
      status,
      adminId,
    },
  });
  return res.data;
};*/

export const updateShortlistStatus = async (id, status) => {
  const res = await api.put(`/admin/shortlists/${id}/status`, null, {
    params: { status }
  });
  return res.data;
};



// Get match summary stats
export const fetchMatchStats = async () => {
 const res = await api.get("/analytics/match-summary");
  return res.data;
};

// âœ… NEW: Total recipients count
export const fetchTotalRecipients = async () => {
  const res = await api.get("/admin/analytics/total-recipients");
  return res.data;
};

// âœ… NEW: Total donors count
export const fetchTotalDonors = async () =>  {
  const res = await api.get("/admin/analytics/total-donors");
  return res.data;
};

// âœ… NEW: Total matches count
export const fetchTotalMatches = async () => {
  const res = await api.get("/admin/analytics/total-matches");
  return res.data;
};

export const fetchAdminShortlists = async () => {
  const res = await api.get("/admin/shortlists");
  return res.data;
};