import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace '123' with the actual user ID you want to fetch from your backend
        const userId = response.data.id;

        // Fetch user data using the "get by ID" method from your backend
        const response = await axios.get(`http://localhost:8000/user/getuser/${userId}`); // Replace with your actual backend endpoint
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // No need to depend on any prop, as the user ID is hardcoded or fetched from your backend

  return (
    <div>
      <h2>User Information</h2>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <div>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
