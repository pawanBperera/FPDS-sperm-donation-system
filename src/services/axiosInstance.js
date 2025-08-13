// File: src/services/axiosInstance.js
import axios from "axios";
import { getAuth } from "firebase/auth";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});


// Add request interceptor to attach Firebase auth token
/*api.interceptors.request.use(
  (config) => {
  const raw = localStorage.getItem("user");
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(err) => Promise.reject(err)
);*/

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // get a fresh token (this will automatically re-use a cached one if still valid)
      const token = await user.getIdToken(/* forceRefresh= */ false);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;