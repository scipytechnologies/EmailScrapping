import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

const Pdfscrap = () => {
  const [url, setUrl] = useState("");
  const [pdfLinks, setPdfLinks] = useState(new Set());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfsFound, setPdfsFound] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setPdfsFound(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://email-scraping.onrender.com/scrape/pdfscrap",
        { url }
      );
      const newLinks = response.data.pdfLinks;

      // Create a new Set with only the new links
      const newPdfLinks = new Set(newLinks);

      setPdfLinks(newPdfLinks); // Set the state to the new Set of links

      if (newLinks.length > 0) {
        setPdfsFound(true); // PDFs were found
      } else {
        setPdfsFound(false); // No PDFs found
      }

      setError(null);
    } catch (err) {
      setError("Failed to fetch PDF links.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>PDF Extractor</h1>
      <div className="mb-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="urlInput" className="form-label">
            Enter URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="urlInput"
            placeholder="eg:- https://www.example.com"
            value={url}
            onChange={handleUrlChange}
            required
          />
        </form>
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
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          Pdf Scrap
        </button>
      )}

      {error && <p className="error">{error}</p>}

      {pdfLinks.size > 0 && (
        <div className="mt-4">
          <h3>PDF Links:</h3>
          <div className="email-container">
            <ul>
              {[...pdfLinks].map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {!pdfsFound && !loading && url && (
        <p className="email-container">No PDFs found.</p>
      )}
    </div>
  );
};

export default Pdfscrap;
