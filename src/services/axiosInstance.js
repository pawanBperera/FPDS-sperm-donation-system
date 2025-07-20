// File: src/services/axiosInstance.js
import axios from "axios";
import { getAuth } from "firebase/auth";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // Change to full URL like "http://localhost:8080/api" if needed
});

// Add request interceptor to attach Firebase auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Token injection failed:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
