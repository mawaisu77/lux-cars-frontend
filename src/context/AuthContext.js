import { createContext, useReducer } from "react";
import { getToken, getUser } from "../utils/storageUtils";

export const AuthContext = createContext();

export const authReducer = (state, action) => {

  switch (action.type) {
    case "REGISTER":
        return {
          user: null,
        };
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      return { user: null, token: null  };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: getUser() || null,
    token: getToken() || null
  });

  return (
    <AuthContext.Provider value={{...state, dispatch}} >
        {children}
    </AuthContext.Provider>
  )
};
