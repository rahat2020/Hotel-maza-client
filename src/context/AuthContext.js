import { createContext, useEffect, useReducer, useState } from "react";
import jwt_decode from 'jwt-decode';

const INITIAL_STATE = {
  user: localStorage.getItem("user") || "",
  // token: JSON.parse(localStorage.getItem("token")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [token, setToken] = useState("")

  useEffect(() => {
    localStorage.setItem("user", state.user);
  }, [state.user]);


  useEffect(() => {
    const authToken = localStorage.getItem("token") ?? "";
    let tkn = null;
    if (authToken) {
      return setToken(jwt_decode(authToken))
    } else {
      localStorage.setItem("token", tkn)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        token,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
