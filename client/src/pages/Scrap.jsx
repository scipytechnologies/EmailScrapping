import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

function Scrap() {
  const [url, setUrl] = useState("");
  const [emailLinks, setEmailLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleShowEmails = async () => {
    setLoading(true);
    setErr(false);
    const body = {
      url: url,
    };
    axios
      .post("https://email-scraping.onrender.com/scrape/getscrap", body)
      .then((res) => {
        console.log(res);
        setEmailLinks(res.data.emailLinks);
        setLoading(false);
        if (res.data.emailLinks.length === 0) {
          setErr(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Web Scrape</h1>
      <div className="mb-3">
        <label htmlFor="urlInput" className="form-label">
          Enter URL:
        </label>
        <input
          type="text"
          className="form-control"
          id="urlInput"
          placeholder="eg:- www.example.com"
          value={url}
          onChange={handleUrlChange}
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
        <button className="btn btn-primary" onClick={handleShowEmails}>
          Show Emails
        </button>
      )}

      <div className="mt-4">
        <h3>Scraped Emails:</h3>
        <div className="email-container">
          {emailLinks && emailLinks.length > 0 ? (
            <>
              <p>Total Email Count: {emailLinks.length}</p>
              {emailLinks.map((emailLink, index) => (
                <span key={index}>
                  {emailLink}
                  <br />
                </span>
              ))}
            </>
          ) : err ? (
            <p>No emails found. Please try again.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Scrap;
