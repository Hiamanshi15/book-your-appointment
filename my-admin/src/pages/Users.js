import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
        fetchUsers(); // refresh user list
      } catch (err) {
        console.error("Error deleting user", err);
      }
    }
  };

  return (
    <div className="appointments-container">
      <h2>Users List</h2>
      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.name || "N/A"}</td>
                  <td>
                    {/* Edit feature can open a form or modal */}
                    {/* <button className="edit-btn">Edit</button> */}
                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
