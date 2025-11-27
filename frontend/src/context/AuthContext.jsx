import { createContext, useContext, useEffect, useReducer } from "react";
import authApi from "../api/authApi";
import { authReducer, initialState } from "./authReducer";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // CHECK SESSION
  const fetchUser = async () => {
    dispatch({ type: "LOADING" });

    try {
      const res = await authApi.getMe();
      dispatch({ type: "FETCH_SUCCESS", payload: res.data.user });
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

  // LOGIN
  const login = async (credentials) => {
    dispatch({ type: "LOADING" });

    try {
      const res = await authApi.login(credentials);

      // ❌ before: state updated only with short token
      // ✔ fix: manually set user
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });

      // 🔥 IMPORTANT - fetchUser after cookie is set
      await fetchUser();

      return res.data;
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data?.message || "Login failed",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //logout
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider
      value={{ ...state, register, login, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
