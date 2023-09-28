import React from "react";

import Home from "../scenes/Home/Home";
import Scrap from "../pages/Scrap";
import MultiScrap from "../pages/Multipleurl/Multiurl";
import EmailValidationForm from "../pages/singleValidator/emailValidator";
import MultiEmailValidation from "../pages/MultiemailValidator/multiemailValidator";
import Pdfscrap from "../pages/Pdfscrap/Pdfscrap";

const protectedRoutes = [
    { path: "scenes/Home/Home", element:<Home /> },
    { path: "pages/Scrap", element:<Scrap /> },
    { path: "pages/Multipleurl/Multiurl", element:<MultiScrap /> },
    { path: "pages/singleValidator/emailValidator", element:<EmailValidationForm /> },
    { path: "pages/MultiemailValidator/multiemailValidator", element:<MultiEmailValidation /> },
    { path: "pages/Pdfscrap/Pdfscrap", element:<Pdfscrap /> },


]
export default protectedRoutes
