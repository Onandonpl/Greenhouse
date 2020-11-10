import React, { createContext } from "react";
import { useAuthState } from "../hooks/useAuthState";
import { WindMillLoading } from "react-loadingg";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, pending] = useAuthState();
  if (pending) {
    return <WindMillLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        pending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
