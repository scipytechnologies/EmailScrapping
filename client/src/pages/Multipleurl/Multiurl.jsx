// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import * as XLSX from 'xlsx';

// function MultiScrap() {
//   const [file, setFile] = useState(null);
//   const [emailData, setEmailData] = useState([]);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleScrap = async () => {
//     if (!file) {
//       setError('Please upload a file.');
//       return;
//     }

//     try {
//       const fileContents = await readFileContents(file);
//       const urls = fileContents.split('\n').filter(Boolean);

//       const response = await fetch('http://localhost:8000/scrape/multipleurl', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ urls }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEmailData(data.emailData);
//         setError('');
//       } else {
//         setError('Error extracting emails');
//       }
//     } catch (error) {
//       setError('Internal server error');
//     }
//   };

//   const handleDownload = () => {
//     if (emailData.length > 0) {
//       const csvData = [["URL", "Email"]];
    
//       emailData.forEach((item) => {
//         const url = item.url;
//         if (item.emails.length === 0) {
//           // If there are no emails for this URL, just add the URL row
//           csvData.push([url, '']);
//         } else {
//           // Add the URL once followed by its associated emails
//           csvData.push([url, item.emails[0]]); // Add the first email
//           for (let i = 1; i < item.emails.length; i++) {
//             csvData.push(['', item.emails[i]]); // Add subsequent emails with an empty URL cell
//           }
//         }
//       });
    
//       const csvContent = csvData.map((row) => row.join(',')).join('\n');
//       const dataURI = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    
//       const a = document.createElement('a');
//       a.href = dataURI;
//       a.download = 'email_data.csv';
//       a.click();
//     }
//   };
  
  
  

//   const readFileContents = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const contents = event.target.result;
//         resolve(contents);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsText(file);
//     });
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Multiple Email Scraper</h1>
//       <form className="mb-3">
//         <label htmlFor="urlInput" className="form-label">
//           Upload a Text File:
//         </label>
//         <input className="form-control" id="urlInput" type="file" accept=".txt" onChange={handleFileChange} />
//       </form>
//       <div className="mb-3">
//         <button className="btn btn-primary" onClick={handleScrap}>
//           Scrap Emails
//         </button>
//         <button className="btn btn-success" onClick={handleDownload} disabled={emailData.length === 0}>
//           Download CSV
//         </button>
//       </div>
//       {error && <p className="error">{error}</p>}
//       <div className="result">
//         {emailData.length > 0 && (
//           <div className="mt-4">
//             <h2>Extracted Emails</h2>
//             <div className="email-container">
//               <ul>
//                 {emailData.map((item, index) => (
//                   <li key={index}>
//                     <strong>URL:</strong> {item.url}
//                     <ul>
//                       {item.emails.map((email, i) => (
//                         <li key={i}>{email}</li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MultiScrap;



import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';

function MultiScrap() {
  const [file, setFile] = useState(null);
  const [emailData, setEmailData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleScrap = async () => {
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    try {
      setLoading(true); // Set loading to true when scraping begins

      const fileContents = await readFileContents(file);
      const urls = fileContents.split('\n').filter(Boolean);

      const response = await fetch('http://localhost:8000/scrape/multipleurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmailData(data.emailData);
        setError('');
      } else {
        setError('Error extracting emails');
      }
    } catch (error) {
      setError('Internal server error');
    } finally {
      setLoading(false); // Set loading back to false when scraping completes
    }
  };

  const handleDownload = () => {
    if (emailData.length > 0) {
      const csvData = [["URL", "Email"]];

      emailData.forEach((item) => {
        const url = item.url;
        if (item.emails.length === 0) {
          // If there are no emails for this URL, just add the URL row
          csvData.push([url, '']);
        } else {
          // Add the URL once followed by its associated emails
          csvData.push([url, item.emails[0]]); // Add the first email
          for (let i = 1; i < item.emails.length; i++) {
            csvData.push(['', item.emails[i]]); // Add subsequent emails with an empty URL cell
          }
        }
      });

      const csvContent = csvData.map((row) => row.join(',')).join('\n');
      const dataURI = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);

      const a = document.createElement('a');
      a.href = dataURI;
      a.download = 'email_data.csv';
      a.click();
    }
  };

  const readFileContents = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target.result;
        resolve(contents);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="container mt-5">
      <h1>Multiple Email Scraper</h1>
      <form className="mb-3">
        <label htmlFor="urlInput" className="form-label">
          Upload a Text File:
        </label>
        <input className="form-control" id="urlInput" type="file" accept=".txt" onChange={handleFileChange} />
      </form>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleScrap} disabled={loading}>
          {loading ? 'Loading...' : 'Scrap Emails'}
        </button>
        <button className="btn btn-success" onClick={handleDownload} disabled={emailData.length === 0}>
          Download CSV
        </button>
      </div>
      {loading && <div className="loader"></div>} {/* Loader */}
      {!loading && error && <p className="error">{error}</p>} {/* Error message */}
      {!loading && emailData.length > 0 && (
        <div className="result">
          <div className="mt-4">
            <h2>Extracted Emails</h2>
            <div className="email-container">
              <ul>
                {emailData.map((item, index) => (
                  <li key={index}>
                    <strong>URL:</strong> {item.url}
                    <ul>
                      {item.emails.map((email, i) => (
                        <li key={i}>{email}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiScrap;
