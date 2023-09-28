import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
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
import protectedRoutes from './routes/ProtectedRoutes';
import ProtectedRoute from './routeProtection/ProtectedRoute';
import publicRoutes from '../src/routes/PublicRoute'
import Redirect from './routeProtection/ForcedRedirect';
import { setToken, clearToken, isConnected, setUserProfile } from './store/loginedUser'

function App() {
  const dispatch = useDispatch()
  const active = useSelector((state) => state.loginedUser?.isConnected)

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Snackbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Pdfscrap" element={<Pdfscrap />} />
          <Route path="/MultiEmail" element={<MultiEmailValidation />} />
          <Route path="/EmailValidator" element={<EmailVerificationForm />} />
          <Route path="/Multiurl" element={<MultiScrap />} />
          <Route path="/Scrap" element={<Scrap />} />
          <Route path="/Register" element={<UserSignup />} />
          <Route path="/Login" element={<UserSignin />} />
          <Route>
            {protectedRoutes.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={<ProtectedRoute user={active}>{route.element}</ProtectedRoute>}
                  key={index}
                />
              )
            })}
          </Route>
          {publicRoutes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={<Redirect user={active}> {route.element} </Redirect>}
                key={index} />
            );
          })}
          <Route path="/Register" element={<UserSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
