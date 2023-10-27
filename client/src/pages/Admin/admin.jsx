import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/getallusers"
      ); // Replace with your API endpoint
      setUsers(response.data); // Assuming your API returns an array of users
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteUser(userId) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/user/deleteuser/${userId}`
      );

      if (response.status === 200) {
        // If the user was successfully deleted, fetch the updated list of users
        fetchUsers();
        alert("Deleted");
      } else if (response.status === 403) {
        // Handle the case where the user deletion was forbidden (e.g., admin user)
        console.log("Cannot delete admin user");
      } else if (response.status === 404) {
        // Handle the case where the user to be deleted was not found
        console.log("User not found");
      } else {
        // Handle other errors
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>User List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>SI.No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
