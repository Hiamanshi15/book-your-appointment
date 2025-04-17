import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      // Fetch all appointments (no user-specific filtering)
      const response = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(response.data.appointments);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Status updated successfully");
      fetchAppointments(); // Refresh after update
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch all appointments when the component loads
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="appointments-container">
      <h2>All Appointments</h2>
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
              {appointments.map((appointment) => (
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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AdminAppointments;
