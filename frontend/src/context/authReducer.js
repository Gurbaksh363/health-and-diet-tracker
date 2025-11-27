export const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case "REGISTER_SUCCESS":
      return { ...state, loading: false };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case "ERROR":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
