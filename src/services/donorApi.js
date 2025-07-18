// File: src/services/donorApi.js
import axios from "axios";
import { getAuth } from "firebase/auth";

// Helper: fetch a fresh Firebase ID token for authorization
async function fetchIdToken() {
  const user = getAuth().currentUser;
  if (!user) {
    console.warn("donorApi: no user signed in, skipping API call");
    return null;
  }

  return await user.getIdToken();
}

/**
 * Fetch all donor profiles (suggestions or default list)
 * GET /api/donors
 */
export async function getDonors() {
  const token = await fetchIdToken();
  if (!token) return { data: [] };
  return axios.get("/api/donors", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * Search donors by filter parameters
 * GET /api/donors/search?param1=value1&...
 */
export async function searchDonors(params) {
  const token = await fetchIdToken();
  if (!token) return { data: [] };
  return axios.get("/api/donors/search", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * Fetch a single donor profile
 * GET /api/donors/:id/profile
 */
export async function getDonorProfile(id) {
  const token = await fetchIdToken();
  if (!token) return { data: null };
  return axios.get(`/api/donors/${id}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function shortlistDonor(recipientId, donorId) {
  const token = await fetchIdToken();
  if (!token) return;

  return axios.post("/api/shortlisted-donors", {
    recipient_id: recipientId,
    donor_id: donorId,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
}