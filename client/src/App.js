import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import EmailVerificationForm from './pages/singleValidator/emailValidator'
import MultiScrap from './pages/Multipleurl/Multiurl';
import Scrap from './pages/Scrap';
import MultiEmailValidation from './pages/MultiemailValidator/multiemailValidator';
import Pdfscrap from './pages/Pdfscrap/Pdfscrap';
import UserSignup from './scenes/Register/Signup';
import Home from './scenes/Home/Home'
import LandingPage from './scenes/LandingPage/Landingpage';
import UserSignin from './scenes/Login/Signin';
import NavBar from './components/Navbar/Navbar';
import Snackbar from './components/Snackbar/Snackbar';

function App() {
  return (
    <>
      <BrowserRouter> 
      <NavBar />
      <Snackbar />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="Pdfscrap" element={<Pdfscrap/>} />
          <Route path="MultiEmail" element={<MultiEmailValidation/>}/>
          <Route path="EmailValidator" element={<EmailVerificationForm />}/>
          <Route path="Multiurl" element={<MultiScrap />} />
          <Route path="/Scrap" element={<Scrap />} />
          <Route path="/Register" element={<UserSignup/>} />
          <Route path="/Login" element={<UserSignin/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
