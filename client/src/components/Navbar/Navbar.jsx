import { toast } from "react-toastify";
import React from "react";
import { logout } from "../../store/loginedUser";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./appbar.css";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location

  const handleLogout = async (e) => {
    e.preventDefault();
    toast.success("Logged out successfully");
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  // Conditionally render the NavBar based on the route
  if (
    location.pathname === "/Login" ||
    location.pathname === "/Register" ||
    location.pathname === "/"
  ) {
    return null; // Don't render NavBar on login and register pages
  }

  return (
    <>
      <div className="appbar p-2">
        <div
          style={{ cursor: "pointer", display: "flex", alignItems: "end" }}
          onClick={() => navigate("/home")}
        >
          {" "}
          <h1 style={{ fontSize: "24px" }}>Email Extraction System </h1>{" "}
          <sup
            style={{
              fontSize: "10px",
              marginLeft: "5px",
              paddingBottom: "20px",
            }}
          >
            {" "}
            <small>Beta 1.0.0 </small>
          </sup>{" "}
        </div>
        <div>
          <>
            <NavLink to="/Scrap">Web Scrape</NavLink>
            <NavLink to="/Multiurl">Multi Web Scrape</NavLink>
            <NavLink to="/EmailValidator">Email Validator</NavLink>
            <NavLink to="/MultiEmail">Multi Email Validator</NavLink>
            <NavLink to="/Pdfscrap">PDF Extractor</NavLink>
            <button className="btn btn-dark m-3" onClick={handleLogout}>
              Logout
            </button>
          </>
        </div>
      </div>
    </>
  );
}

export default NavBar;
