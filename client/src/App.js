import React, { useState, useEffect } from "react";

import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmailVerificationForm from "./pages/singleValidator/emailValidator";
import MultiScrap from "./pages/Multipleurl/Multiurl";
import Scrap from "./pages/Scrap";
import MultiEmailValidation from "./pages/MultiemailValidator/multiemailValidator";
import Pdfscrap from "./pages/Pdfscrap/Pdfscrap";
import Admin from "./pages/Admin/admin";
import UserSignup from "./scenes/Register/Signup";
import Home from "./scenes/Home/Home";
import LandingPage from "./scenes/LandingPage/Landingpage";
import UserSignin from "./scenes/Login/Signin";
import NavBar from "./components/Navbar/Navbar";
import Snackbar from "./components/Snackbar/Snackbar";
import ProtectedRoute from "./routeProtection/ProtectedRoute";
import { isConnected, loggeduser, setRole } from "./store/loginedUser";
import { useNavigate } from "react-router-dom";
import ForceRedirect from "./routeProtection/ForcedRedirect";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const active = useSelector((state) => state.auth.isConnected);

  const Auth = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      let body = {
        token,
      };
      axios
        .post("https://email-scraping.onrender.com/user/auth", body)
        .then((res) => {
          const userId = res.data?._id;
          axios
            .get(`https://email-scraping.onrender.com/user/getuser/${userId}`)
            .then((res) => {
              dispatch(loggeduser(res.data._id));
              dispatch(isConnected());
              dispatch(setRole(res.data.role));
            });
        })
        .catch((err) => {
          console.log("err from home", err);
        });
    }
  };

  useEffect(() => {
    Auth();
  }, []);

  return (
    <>
      <NavBar />
      <Snackbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoute user={active}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Pdfscrap"
          element={
            <ProtectedRoute user={active}>
              <Pdfscrap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MultiEmail"
          element={
            <ProtectedRoute user={active}>
              <MultiEmailValidation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EmailValidator"
          element={
            <ProtectedRoute user={active}>
              <EmailVerificationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Multiurl"
          element={
            <ProtectedRoute user={active}>
              <MultiScrap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Scrap"
          element={
            <ProtectedRoute user={active}>
              <Scrap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin"
          element={
            <ProtectedRoute user={active}>
              <Admin />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/Register" element={<UserSignup />} />
        <Route
          path="/Login"
          element={
            <ForceRedirect>
              {" "}
              <UserSignin />
            </ForceRedirect>
          }
        />
      </Routes>
    </>
  );
}

export default App;
