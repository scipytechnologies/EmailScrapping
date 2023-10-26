// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Home = () => {
//   const [user, setUser] = useState([]);
//   const navigate = useNavigate()
//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem('token'))
//     if (token === undefined) {
//       navigate('/Login')
//     }
//     else {
//       console.log('token before', token)
//       let body = {
//         token
//       }
//       axios.post('http://localhost:8000/user/auth', body)
//         .then((res) => {
//           const userId = res.data?._id
//           axios.get(`http://localhost:8000/user/getuser/${userId}`)
//             .then((res) => {
//               console.log('user', res.data)
//               setUser(res.data)
//             })
//         })
//         .catch((err) => {
//           console.log('err from home', err)
//         })
//     }
//   }, [])

//   return (
//     <div>
//       {/* <h2>User Details</h2> */}
//       <h4>Welcome {user.firstName} {user.lastName}</h4>
//       <p>First Name: {user.firstName}</p>
//       <p>Last Name: {user.lastName}</p>
//       <p>Email: {user.email}</p>
//     </div>
//   );  
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      navigate('/Login');
    } else {
      console.log('token before', token);
      let body = {
        token
      };
      axios.post('http://localhost:8000/user/auth', body)
        .then((res) => {
          const userId = res.data?._id;
          axios.get(`http://localhost:8000/user/getuser/${userId}`)
            .then((res) => {
              console.log('user', res.data);
              setUser(res.data);
            })
        })
        .catch((err) => {
          console.log('err from home', err);
        });
    }
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h1 className="card-subtitle mb-2 text-muted">Welcome {user.firstName} {user.lastName}</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Details</h5>
            <p className="card-text">First Name: {user.firstName}</p>
            <p className="card-text">Last Name: {user.lastName}</p>
            <p className="card-text">Email: {user.email}</p>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Details</h5>
            <p className="card-text">First Name: {user.firstName}</p>
            <p className="card-text">Last Name: {user.lastName}</p>
            <p className="card-text">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;


