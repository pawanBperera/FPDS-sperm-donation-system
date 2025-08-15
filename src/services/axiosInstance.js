
import axios from "axios";
import { getAuth } from "firebase/auth";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});



api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      
      const token = await user.getIdToken(/* forceRefresh= */ false);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;