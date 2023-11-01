import React, { useState } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

const MultiEmailValidation = () => {
  const [emailList, setEmailList] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleValidation = async () => {
    setLoading(true); // Set loading state to true when validation starts
    try {
      const response = await axios.post(
        "https://email-scraping.onrender.com/scrape/multiverifyemail",
        {
          emails: emailList.split("\n").map((email) => email.trim()),
        }
      );
      const data = response.data;
      setResults(data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false); // Set loading state back to false when validation is complete
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      setEmailList(fileContent);
    };

    reader.readAsText(file);
  };

  const downloadSpreadsheet = () => {
    const csvContent = `Email,Email Validation,Regex,MX,SMTP,Reason\n${results
      .map((item) => {
        const email = item.email;
        const valid = item.result && item.result.valid ? "Valid" : "Invalid";
        const regexValid =
          item.result && item.result.validators.regex.valid
            ? "Valid"
            : "Invalid";
        const mxValid =
          item.result && item.result.validators.mx.valid ? "Valid" : "Invalid";
        const smtpValid =
          item.result && item.result.validators.smtp.valid
            ? "Valid"
            : "Invalid";
        const smtpReason =
          item.result && item.result.validators.smtp.reason
            ? item.result.validators.smtp.reason
            : "N/A";

        return `${email},${valid},${regexValid},${mxValid},${smtpValid},${smtpReason}`;
      })
      .join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "email_validation_results.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  console.log(results);
  return (
    <div className="container mt-5">
      <h1>Multi Email Validator</h1>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="fileInput">
          Upload File:
        </label>
        <input
          type="file"
          id="fileInput"
          accept=".txt"
          onChange={handleFileUpload}
          className="form-control"
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
          onClick={handleValidation}
          disabled={loading}
        >
          Verify Emails
        </button>
      )}

      <div>
        {results.length > 0
          ? results.map((item, index) => (
              <div className="email-container" key={index}>
                <p>Email: {item.email}</p>
                {item.result && (
                  <div>
                    <p>
                      Email: {item.email}
                      <span
                        style={{ color: item.result.valid ? "green" : "red" }}
                      >
                        {item.result.valid ? "Valid" : "Invalid"}
                      </span>
                    </p>
                    <p>
                      Regex:{" "}
                      {item.result.validators.regex.valid ? "Valid" : "Invalid"}
                    </p>
                    <p>
                      MX:{" "}
                      {item.result.validators.mx.valid ? "Valid" : "Invalid"}
                    </p>
                    <p>
                      SMTP:{" "}
                      {item.result.validators.smtp.valid ? "Valid" : "Invalid"}
                    </p>
                    {item.result.validators.smtp.reason && (
                      <p>Reason: {item.result.validators.smtp.reason}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          : null}
      </div>

      {results.length > 0 ? (
        <button className="btn btn-primary" onClick={downloadSpreadsheet}>
          Download Spreadsheet
        </button>
      ) : null}
    </div>
  );
};

export default MultiEmailValidation;
