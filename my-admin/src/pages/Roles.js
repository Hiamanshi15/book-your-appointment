import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");

  const fetchRoles = async () => {
    try {
      const res = await axios.get("https://book-your-appointment.onrender.com/api/roles");
      setRoles(res.data.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    if (!roleName) return;

    try {
      await axios.post("https://book-your-appointment.onrender.com/api/roles", { name: roleName });
      setRoleName("");
      fetchRoles();
    } catch (error) {
      console.error("Error adding role:", error);
      alert(error.response?.data?.error || "Error adding role");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await axios.delete(`https://book-your-appointment.onrender.com/api/roles/${id}`);
        fetchRoles();
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="appointments-container">
      <h2>Add Roles</h2>

      <form onSubmit={handleAddRole} style={{ marginBottom: "20px", display: 'flex',gap:'10px'}}>
        <select style={{height: '25px'}}
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="ServiceProvider">ServiceProvider</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="add-btn">Add Role</button>
      </form>

      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((role) => (
                <tr key={role._id}>
                  <td>{role.name}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(role._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No roles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
