import axiosClient from "./axiosClient";

const authApi = {
  register: (userData) => axiosClient.post("/user/auth/register", userData),
  login: (credentials) => axiosClient.post("/user/auth/login", credentials),
  verifyEmail: (token, email) => axiosClient.post(`/user/auth/verify-email?token=${token}&email=${email}`),
  resendVerification: (email) => axiosClient.post("/user/auth/resend-verify", {email}),
  
  forgotPassword: (email) => axiosClient.post("/user/auth/forgot-password", {email}),
  resetPassword: (payload) => axiosClient.post("/user/auth/reset-password", payload),
  
  refresh: () => axiosClient.post("/user/auth/refresh-token"),
  logout: () => axiosClient.post("/user/auth/logout"),

  getMe: () => axiosClient.get("/user/profile"), 
};

export default authApi;
