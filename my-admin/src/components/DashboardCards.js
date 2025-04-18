import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../pages/style.css';

const DashboardCards = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch all data: appointments, users, and contacts
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch data for appointments, users, and contacts concurrently
      const [appointmentsRes, usersRes, contactsRes] = await Promise.all([
        axios.get("https://book-your-appointment.onrender.com/api/appointments"),
        axios.get("https://book-your-appointment.onrender.com/api/auth/users"),
        axios.get("https://book-your-appointment.onrender.com/api/contact"),
      ]);

      // Set the state with the data
      setAppointments(appointmentsRes.data.appointments);
      setUsers(usersRes.data);
      setContacts(contactsRes.data.contacts);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `https://book-your-appointment.onrender.com/api/appointments/${appointmentId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Status updated successfully");
      fetchData(); // Refresh after update
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleViewAll = (section) => {
    switch (section) {
      case 'appointments':
        navigate('/appointments');
        break;
      case 'users':
        navigate('/users');
        break;
      case 'complaints':
        navigate('/contact-us');
        break;
      default:
        break;
    }
  };


  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="dashboard-cards">
        {/* Appointments Card */}
        <div className="card">
          <h3>Appointments</h3>
          <p>{appointments.length}</p>
        </div>

        {/* Users Card */}
        <div className="card">
          <h3>Users</h3>
          <p>{users.length}</p>
        </div>

        {/* Complaints Card */}
        <div className="card">
          <h3>Complaints</h3>
          <p>{contacts.length}</p>

        </div>
      </div>

      {/* Appointments Table UI */}
      <div className="appointments-container">
        <div className="dash-btn-style">
          <h2>All Appointments</h2>
          <button onClick={() => handleViewAll('appointments')}>View All</button>
        </div>
        {appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact No.</th>
                  <th>Date</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Change Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment._id} className={appointment.status}>
                    <td>{appointment.userName}</td>
                    <td>{appointment.userContact}</td>
                    <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                    <td>{appointment.userNote}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Users Table UI */}
      <div className="appointments-container">
        <div className="dash-btn-style">
          <h2>All Users</h2>
          <button onClick={() => handleViewAll('users')}>View All</button>
        </div>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Complaints Table UI */}
      <div className="appointments-container">
        <div className="dash-btn-style">
          <h2>All Complaints</h2>
          <button onClick={() => handleViewAll('complaints')}>View All</button>
        </div>
        {contacts.length === 0 ? (
          <p>No complaints found</p>
        ) : (
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
                </tr>
              </thead>
              <tbody>
                {contacts.slice(0, 5).map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.reason}</td>
                    <td>{contact.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default DashboardCards;
