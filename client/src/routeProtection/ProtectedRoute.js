import React from "react";
import { Navigate ,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const ProtectedRoute = ({ user, children }) => {
  console.log(user)
  if (!user) {
    return <Navigate to="/scenes/Login/Signin" replace />;
  }

  return children;
};

export default ProtectedRoute;