import { createContext, useContext, useEffect, useReducer } from "react";
import authApi from "../api/authApi";
import { authReducer, initialState } from "./authReducer";
import { setAccessToken } from "@/api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // CHECK SESSION
  const fetchUser = async () => {
    dispatch({ type: "LOADING" });
    try {
      const res = await authApi.getMe();
      dispatch({ type: "FETCH_SUCCESS", payload: res.data.data });
      console.log(res.data.data);
    } catch {
      dispatch({ type: "ERROR", payload: null });
    }
  };

  // REGISTER
  const register = async (data) => {
    dispatch({ type: "LOADING" });

    try {
      const res = await authApi.register(data);
      dispatch({ type: "REGISTER_SUCCESS" });
      return res.data;
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || "Registration failed",
      });
      throw err;
    }
  };

  // LOGIN FUNCTION
  const login = async (credentials) => {
    dispatch({ type: "LOADING" });

    try {
      const res = await authApi.login(credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data?.user });
      setAccessToken(res.data.token);
      return res.data;
    } catch (err) {
      setAccessToken(null);
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || err.message,
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //logout
  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}
    setAccessToken(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, register, login, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
