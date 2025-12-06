import axios from "axios";
import authApi from "./authApi";

// Store access token in memory, not localStorage
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

const axiosClient = axios.create({
  baseURL: "http://localhost:5050/v1",
  withCredentials: true,
});

// 1️⃣ Attach token to every request
axiosClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 2️⃣ Response interceptor → refresh token if expired
let isRefreshing = false;
let queue = [];

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const errorCode = error.response?.data?.error?.code;

    // ❌ NOT a refresh case → return error so UI catches it
    if (
      error.response?.status === 401 &&
      errorCode !== "TOKEN_EXPIRED" &&
      errorCode !== "SESSION_EXPIRED"
    ) {
      return Promise.reject(error);
    }

    // 🔁 Refresh token logic only if expired token
    if (
      error.response?.status === 401 &&
      (errorCode === "TOKEN_EXPIRED" || errorCode === "SESSION_EXPIRED") &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => queue.push(resolve)).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await authApi.refresh();
        const newToken = refreshResponse.data.token;

        setAccessToken(newToken);

        queue.forEach((cb) => cb(newToken));
        queue = [];
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        queue = [];
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosClient;
