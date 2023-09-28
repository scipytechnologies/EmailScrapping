import React from "react";

import UserSignin from "../scenes/Login/Signin";
import UserSignup from "../scenes/Register/Signup";

const publicRoutes = [
    { path:"/Login", element: <UserSignin /> },
    { path:"/Register", element: <UserSignup /> }

]
export default publicRoutes