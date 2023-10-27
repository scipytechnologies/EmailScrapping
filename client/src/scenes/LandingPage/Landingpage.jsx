import React from "react";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    // < !--main page-- >
    <>
      <div
        className="container-lg d-flex align-items-center justify-content-center flex-column"
        style={{ height: "100vh" }}
      >
        <h2 className="display-5 mb-3">Email Scrape Validation Tool</h2>
        <button
          type="submit"
          className="btn btn-primary btn-lg mt-2"
          onClick={() => navigate("/Login")}
        >
          Get Started
        </button>
      </div>
      <div>
        <h4>About us</h4>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </>
  );
}

export default LandingPage;
