import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ForceRedirect = ({ user, children }) => {
  const active = useSelector((state) => state.auth.isConnected);
  const role = useSelector((state) => state.auth.role);
  if (active) {
    if (role) {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/Home" replace />;
    }
  }
  return children;
};
export default ForceRedirect;
