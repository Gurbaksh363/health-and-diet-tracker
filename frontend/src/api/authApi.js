import axiosClient from "./axiosClient";

const authApi = {
  
  register: (userData) => axiosClient.post("/user/auth/register", userData),
  login: (credentials) => axiosClient.post("/user/auth/login", credentials),
  verifyEmail: (token, email) => axiosClient.post(`/user/auth/verify-email?token=${token}&email=${email}`),
  resendVerification: (email) => axiosClient.post("/user/auth/resend-verify", {email}),
  getMe: () => axiosClient.get("/user/auth/me"), 
};

export default authApi;
