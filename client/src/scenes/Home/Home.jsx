import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
function Home({userId}) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make an HTTP request to your backend to fetch user data
    fetch(`http://localhost:8000/user/getuser/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  return (
    <div className="container-lg d-flex align-items-center justify-content-center flex-column" style={{ height: '100vh' }}>
      <h1 className="display-2 mb-4">Home page</h1>



      {user ? (
        <div>
          
          <p>Welcome {user.firstName} {user.lastName}</p>
          {/* <p>Last Name: {user.lastName}</p> */}
      
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  );
};
export default Home