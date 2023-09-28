import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const ForceRedirect = ({ user, children }) => {
    const active = useSelector((state) => state.loginedUser.token)
    console.log(user)
    console.log(active);
    if (active) {
        return <Navigate to="/Home" replace />;
    }
    else {
        return <Navigate to="/Login" replace />;
    }
    return children;
}
export default ForceRedirect; 