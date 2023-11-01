import React, { useState } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

const EmailValidationForm = () => {
  // State variables
  const [displayemail, setdisplayEmail] = useState("");
  const [email, setEmail] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Event handler for email input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for verifying email
  const handleVerifyEmail = async () => {
    setLoading(true); // Set loading to true when verification begins
    setValidationResult(null); // Reset the view
    setdisplayEmail(email);
    try {
      const response = await axios.post(
        "https://email-scraping.onrender.com/scrape/verifyemail",
        { email }
      );

      if (response.status === 200) {
        const result = response.data;
        setValidationResult(result);
      } else {
        // Handle server errors here
        console.error("Server returned an error:", response.statusText);
      }
    } catch (error) {
      // Handle network errors here
      console.error("Network error:", error.message);
    } finally {
      setLoading(false); // Set loading to false when verification is complete
      if (email !== "") {
        setEmail(""); // Reset the input field only if an email was provided
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Email Validator</h1>
      <div className="mb-3">
        <label htmlFor="urlInput" className="form-label">
          Enter Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="urlInput"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          disabled={loading} // Disable the input during processing
        />
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "0px",
            marginTop: "2rem",
          }}
        >
          <PropagateLoader color="#2b158d" width="20" />
        </div>
      ) : (
        <button
          className="btn btn-primary"
          onClick={handleVerifyEmail}
          disabled={loading} // Disable the button during processing
        >
          Verify Email
        </button>
      )}

      {validationResult && (
        <div className="mt-4">
          <h3>Email Validation Result:</h3>
          <div className="email-container">
            <p>
              <span>The Email {displayemail} is </span>
              <span
                style={{
                  color: validationResult.valid ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {validationResult.valid ? "Valid" : "Invalid"}
              </span>
            </p>
            <p>
              Validators:
              <ul>
                <li>
                  The Regex is{" "}
                  {validationResult.validators.regex.valid
                    ? "Valid"
                    : "Invalid"}
                </li>
                {/* Uncomment the following lines for additional validators */}
                {/* <li>Typo: {validationResult.validators.typo.valid ? 'Valid' : 'Invalid'}</li>
                <li>Disposable: {validationResult.validators.disposable.valid ? 'Valid' : 'Invalid'}</li> */}
                <li>
                  The MX is{" "}
                  {validationResult.validators.mx.valid ? "Valid" : "Invalid"}
                </li>
                <li>
                  The SMTP is{" "}
                  {validationResult.validators.smtp.valid ? "Valid" : "Invalid"}
                  {validationResult.validators.smtp.reason &&
                    !validationResult.valid && (
                      <p>Reason: {validationResult.validators.smtp.reason}</p>
                    )}
                </li>
              </ul>
            </p>
            {validationResult.reason && !validationResult.valid && (
              <p>Reason: {validationResult.reason}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailValidationForm;
