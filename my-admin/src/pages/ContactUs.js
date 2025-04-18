import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://book-your-appointment.onrender.com/api/contact");
      setContacts(res.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`https://book-your-appointment.onrender.com/api/contact/${id}`);
        fetchContacts();
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="appointments-container">
      <h2>Contact Messages</h2>
      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Reason</th>
              <th>Message</th>
              {/* <th>Newsletter</th> */}
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone || "-"}</td>
                  <td>{c.reason || "-"}</td>
                  <td>{c.message || "-"}</td>
                  {/* <td>{c.newsletter ? "Yes" : "No"}</td> */}
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(c._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No contact messages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUs;
