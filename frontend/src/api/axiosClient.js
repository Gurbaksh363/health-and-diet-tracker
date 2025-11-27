import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5050/v1",
  withCredentials: true, 
  timeout: 10000,
});

// 📌 Optional: Handle unauthorized globally
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err.response?.data || "API Error");

    // If session expired or user logged out from server
    if (err.response?.status === 401) {
      console.warn("User unauthorized. Session expired?");
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
