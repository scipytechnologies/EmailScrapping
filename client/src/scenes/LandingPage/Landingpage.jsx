import React from 'react'
import { useNavigate } from 'react-router-dom'
function LandingPage() {
  const navigate = useNavigate()
  return (
    // < !--main page-- >
    <div className="container-lg d-flex align-items-center justify-content-center flex-column" style={{ height: '100vh' }}>
      <h2 className="display-5 mb-3">Web Email Extraction and Email Validation System</h2>
      <button type="submit" className="btn btn-primary btn-lg mt-2" onClick={() => navigate('/Login')}>Get Started</button>
    </div>
  )
}

export default LandingPage