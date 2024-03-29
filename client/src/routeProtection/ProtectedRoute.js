import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/Login" replace />;
  }
  return children;
};

export default ProtectedRoute;
