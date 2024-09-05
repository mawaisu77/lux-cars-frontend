import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { getToken, getUser, removeToken, removeUser } from "./storageUtils";
import { isTokenExpired } from "./isTokenExpired";

const ProtectedRoute = ({ children, allowedRoles = ['admin'] }) => {
//   const {user} = useAuthContext();
  const storedToken = getToken();
  const location = useLocation();
  const user = getUser()

  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    // "/reset-password/:token",
    "/verify-email/:token",
  ];


    // If token is expired, remove it and redirect to login
    if (storedToken && isTokenExpired(storedToken)) {
      removeToken();
      removeUser()
      return <Navigate to="/login" state={{ from: location }} />;
    }

  if (storedToken && publicPaths.includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  if (!storedToken && !publicPaths.includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  // if (user && user.role === 'admin' && location.pathname !== "/admin/dahsboard") {
  //   return <Navigate to="/admin" />;
  // }

  return <>{children}</>;
};


export default ProtectedRoute;
