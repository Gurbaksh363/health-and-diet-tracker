export const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };

    case "FETCH_SUCCESS":
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };

    case "LOGOUT":
      return { user: null, isAuthenticated: false, loading: false, error: null };

    case "ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
